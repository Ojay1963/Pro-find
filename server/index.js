import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json({ limit: '1mb' }))

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

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.json({
      reply:
        'Profind AI is offline right now. Please try again later or talk to a verified agent.',
      offline: true
    })
  }

  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : []
  if (incoming.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: incoming.map((message) => ({
          role: message.role,
          content: normalizeContent(message.role, message.content)
        })),
        max_output_tokens: 200
      })
    })

    const data = await response.json()
    if (!response.ok) {
      return res.json({
        reply:
          'Profind AI is unavailable at the moment. Please try again shortly or contact an agent.',
        offline: true,
        detail: data
      })
    }

    const reply = extractOutputText(data)
    return res.json({ reply })
  } catch (error) {
    console.error('OpenAI request failed', error)
    return res.json({
      reply:
        'Profind AI is unavailable at the moment. Please try again shortly or contact an agent.',
      offline: true
    })
  }
})

app.post('/api/chat/stream', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(200).json({
      error: 'AI_DISABLED',
      message: 'Missing OPENAI_API_KEY on server.'
    })
  }

  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : []
  if (incoming.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' })
  }

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: incoming.map((message) => ({
          role: message.role,
          content: normalizeContent(message.role, message.content)
        })),
        max_output_tokens: 200,
        stream: true
      })
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      return res.status(200).json({
        error: data?.error?.message || 'OpenAI request failed.',
        detail: data
      })
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders?.()

    const reader = response.body.getReader()
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      res.write(Buffer.from(value))
    }

    res.end()
  } catch (error) {
    if (controller.signal.aborted) return
    console.error('OpenAI streaming request failed', error)
    res.status(200).json({ error: 'Server error while contacting OpenAI.' })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.listen(port, () => {
  console.log(`AI server listening on http://localhost:${port}`)
})
