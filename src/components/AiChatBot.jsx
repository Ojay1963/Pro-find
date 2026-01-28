import React, { useEffect, useRef, useState } from 'react'
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa'

const suggestions = [
  'Find listings under $300k',
  'Schedule a viewing',
  'What neighborhoods are trending?',
  'Talk to a verified agent'
]

const STORAGE_KEY = 'profind-ai-chat-v1'
const MAX_HISTORY = 12
const systemPrompt =
  'You are Profind AI, a concise real-estate assistant. Ask for city, budget, beds/baths, timeline, and goals. Keep replies under 80 words.'
const API_BASE = import.meta.env.VITE_API_BASE || ''

const AiChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Hi! I am Profind AI. Ask me about listings, pricing, or agents.'
    }
  ])

  const messagesEndRef = useRef(null)
  const isMountedRef = useRef(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isMountedRef.current) return
    isMountedRef.current = true
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed)
      }
    } catch (error) {
      console.warn('Failed to read chat history', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch (error) {
      console.warn('Failed to store chat history', error)
    }
  }, [messages])

  const buildApiMessages = (nextMessages) => {
    const recent = nextMessages.slice(-MAX_HISTORY)
    const mapped = recent.map((message) => ({
      role: message.role === 'user' ? 'user' : 'assistant',
      content: message.text
    }))
    return [
      { role: 'system', content: systemPrompt },
      ...mapped
    ]
  }

  const handleClear = () => {
    const cleared = [
      {
        id: 'welcome',
        role: 'bot',
        text: 'Hi! I am Profind AI. Ask me about listings, pricing, or agents.'
      }
    ]
    setMessages(cleared)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear chat history', error)
    }
  }

  const appendAssistantDelta = (assistantId, delta) => {
    if (!delta) return
    setMessages((prev) =>
      prev.map((message) =>
        message.id === assistantId
          ? { ...message, text: `${message.text}${delta}` }
          : message
      )
    )
  }

  const fetchNonStreamReply = async (apiMessages) => {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages: apiMessages })
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data?.error || `Request failed: ${response.status}`)
    }

    return data?.reply?.trim() || 'I am here to help. What details can you share?'
  }

  const handleSend = async (messageText) => {
    const trimmed = messageText.trim()
    if (!trimmed) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed
    }

    const assistantId = `bot-${Date.now()}`
    const nextMessages = [...messages, userMessage, { id: assistantId, role: 'bot', text: '' }]
    setMessages(nextMessages)
    setInput('')
    setIsTyping(true)

    let timeoutId
    try {
      const controller = new AbortController()
      timeoutId = setTimeout(() => controller.abort(), 20000)
      const response = await fetch(`${API_BASE}/api/chat/stream`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream'
        },
        body: JSON.stringify({
          messages: buildApiMessages([...messages, userMessage])
        })
      })

      const contentType = response.headers.get('content-type') || ''
      if (!response.ok || contentType.includes('application/json')) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.error || `Request failed: ${response.status}`)
      }

      if (!response.body) {
        throw new Error('Streaming body not available')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let isDone = false

      const processEvent = (rawEvent) => {
        const lines = rawEvent.split('\n')
        let dataLines = []
        let eventType = ''
        lines.forEach((line) => {
          if (line.startsWith('data:')) dataLines.push(line.slice(5).trim())
          if (line.startsWith('event:')) eventType = line.slice(6).trim()
        })
        const dataText = dataLines.join('\n').trim()
        if (!dataText) return
        if (dataText === '[DONE]') return
        try {
          const payload = JSON.parse(dataText)
          const type = payload.type || eventType
          if (type === 'response.output_text.delta') {
            appendAssistantDelta(assistantId, payload.delta)
            return
          }
          if (type === 'response.completed' || type === 'response.error') {
            isDone = true
          }
        } catch (error) {
          console.warn('Failed to parse stream chunk', error)
        }
      }

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop() || ''
        events.forEach(processEvent)
        if (isDone) break
      }

      clearTimeout(timeoutId)
      if (isDone) {
        await reader.cancel().catch(() => {})
      }

      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId && message.text.trim().length === 0
            ? { ...message, text: 'I am here to help. What details can you share?' }
            : message
        )
      )
    } catch (error) {
      try {
        const reply = await fetchNonStreamReply(buildApiMessages([...messages, userMessage]))
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId ? { ...message, text: reply } : message
          )
        )
      } catch (fallbackError) {
        console.error('Chat failed', error, fallbackError)
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  text:
                    fallbackError?.message ||
                    'Sorry, I could not reach Profind AI. Please try again in a moment.'
                }
              : message
          )
        )
      }
    } finally {
      if (timeoutId) clearTimeout(timeoutId)
      setIsTyping(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSend(input)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[92vw] max-w-sm sm:max-w-md h-[520px] bg-white/95 rounded-3xl shadow-2xl border border-white/40 backdrop-blur-xl flex flex-col overflow-hidden animate-fade-up">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-2xl bg-white/15 flex items-center justify-center text-white text-lg">
                <FaComments />
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-300 border-2 border-green-700" />
              </div>
              <div>
                <p className="font-semibold">Profind AI</p>
                <p className="text-xs text-green-100">Instant home search support</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
                aria-label="Clear chat history"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/15 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-white text-gray-700 rounded-bl-none border border-gray-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 rounded-2xl rounded-bl-none px-4 py-2 text-xs shadow-sm border border-gray-100 flex items-center gap-2">
                  <span>Profind AI is typing</span>
                  <span className="flex items-center gap-1">
                    {['0ms', '150ms', '300ms'].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"
                        style={{ animationDelay: delay }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-white/90">
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSend(item)}
                  disabled={isTyping}
                  className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-green-500 hover:text-green-600 transition-colors disabled:opacity-60"
                >
                  {item}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white input-spotlight"
                placeholder="Ask Profind AI..."
                aria-label="Ask Profind AI"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors disabled:opacity-60 shadow-lg shadow-green-600/20"
                aria-label="Send message"
                disabled={isTyping}
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-green-600/30"
          aria-label="Open Profind AI chat"
        >
          <FaComments className="text-lg" />
          <span className="text-sm font-semibold">Ask Profind AI</span>
        </button>
      )}
    </div>
  )
}

export default AiChatBot
