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
    res.end(JSON.stringify({ error: 'AI_DISABLED', message: 'Missing OPENAI_API_KEY on server.' }))
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
        max_output_tokens: 200,
        stream: true
      })
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: data?.error?.message || 'OpenAI request failed.' }))
      return
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')

    const reader = response.body.getReader()
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      res.write(Buffer.from(value))
    }

    res.end()
  } catch (error) {
    console.error('OpenAI streaming request failed', error)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Server error while contacting OpenAI.' }))
  }
}
