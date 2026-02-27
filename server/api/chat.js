const MAX_HISTORY = 12
const SYSTEM_PROMPT =
  'You are Profind AI, a concise real-estate assistant. Ask for city, budget, beds/baths, timeline, and goals. Keep replies under 80 words.'
const AI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

const normalizeMessageText = (content) => {
  if (Array.isArray(content)) {
    return content
      .map((item) => item?.text || '')
      .join('\n')
      .trim()
  }
  return String(content ?? '').trim()
}

const callGemini = async (messages) => {
  const geminiKey = (process.env.GEMINI_API_KEY || '').trim()
  if (!geminiKey) throw new Error('GEMINI_API_KEY missing')

  const contents = messages.map((message) => {
    const role = message.role === 'assistant' ? 'model' : 'user'
    return { role, parts: [{ text: normalizeMessageText(message.content) }] }
  })

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiKey
      },
      body: JSON.stringify({ contents })
    }
  )

  const raw = await response.text()
  const data = raw ? JSON.parse(raw) : {}
  if (!response.ok) {
    throw new Error(data?.error?.message || 'Gemini request failed')
  }
  const parts = data?.candidates?.[0]?.content?.parts || []
  const text = parts.map((part) => part.text).join('\n').trim()
  return text || 'I am here to help. What details can you share?'
}

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
    const apiKey = (process.env.OPENAI_API_KEY || '').trim()
    if (apiKey) {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: AI_MODEL,
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

      const raw = await response.text()
      const data = raw ? JSON.parse(raw) : {}
      if (response.ok) {
        const reply = extractOutputText(data) || 'I am here to help. What details can you share?'
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ reply }))
        return
      }
    }

    const geminiReply = await callGemini([{ role: 'system', content: SYSTEM_PROMPT }, ...recent])
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ reply: geminiReply, fallback: 'gemini' }))
  } catch (error) {
    console.error('AI request failed', error)
    res.statusCode = 502
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: error.message || 'AI request failed' }))
  }
}
