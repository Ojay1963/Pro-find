const MAX_HISTORY = 12
const SYSTEM_PROMPT =
  'You are Profind AI, a concise real-estate assistant. Ask for city, budget, beds/baths, timeline, and goals. Keep replies under 80 words.'

const normalizeContent = (role, content) => {
  if (Array.isArray(content)) return content
  const text = String(content ?? '')
  const type = role === 'assistant' ? 'output_text' : 'input_text'
  return [
    {
      type,
      text
    }
  ]
}

const extractOutputText = (data) => {
  const output = Array.isArray(data?.output) ? data.output : []
  const chunks = []

  output.forEach((item) => {
    if (item.type !== 'message' || !Array.isArray(item.content)) return
    item.content.forEach((part) => {
      if (part.type === 'output_text' && part.text) {
        chunks.push(part.text)
      }
    })
  })

  return chunks.join('\n').trim()
}

const readJsonBody = async (req) => {
  let raw = ''
  for await (const chunk of req) {
    raw += chunk
  }
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    return
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        reply:
          'Profind AI is offline right now. Please try again later or talk to a verified agent.',
        offline: true
      })
    )
    return
  }

  const body = await readJsonBody(req)
  const incoming = Array.isArray(body?.messages) ? body.messages : []
  if (incoming.length === 0) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'messages array is required.' }))
    return
  }

  const recent = incoming.slice(-MAX_HISTORY).map((message) => ({
    role: message.role,
    content: message.content
  }))

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recent.map((message) => ({
            role: message.role,
            content: normalizeContent(message.role, message.content)
          }))
        ],
        max_output_tokens: 200
      })
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          reply:
            'Profind AI is unavailable at the moment. Please try again shortly or contact an agent.',
          offline: true,
          detail: data
        })
      )
      return
    }

    const reply = extractOutputText(data) || 'I am here to help. What details can you share?'
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ reply }))
  } catch (error) {
    console.error('OpenAI request failed', error)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        reply:
          'Profind AI is unavailable at the moment. Please try again shortly or contact an agent.',
        offline: true
      })
    )
  }
}
