import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'

export default function ChatInterface({ messages, onSend, isLoading }) {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    onSend(input)
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const QUICK_QUERIES = [
    'What are the latest treatments?',
    'Show me active clinical trials',
    'What do researchers say about prognosis?',
    'Are there any new drugs being tested?'
  ]

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {isLoading && (
          <div className="message assistant">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
              <span className="typing-text">Searching publications & trials...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <div className="quick-queries">
          {QUICK_QUERIES.map((q, i) => (
            <button key={i} className="quick-query-chip"
              onClick={() => { setInput(q) }}
              disabled={isLoading}>
              {q}
            </button>
          ))}
        </div>

        <div className="input-row">
          <textarea
            className="chat-input"
            placeholder="Ask about treatments, clinical trials, research findings..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={2}
            disabled={isLoading}
          />
          <button
            className="btn-send"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
        <p className="input-hint">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}