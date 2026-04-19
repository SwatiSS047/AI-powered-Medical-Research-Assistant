import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import InputPanel from './components/InputPanel'
import './App.css'

// ✅ ONE API_BASE — correct place, correct URL
const API_BASE = 'https://ai-powered-medical-research-assistant-production-db6f.up.railway.app'

function App() {
  const [sessionId, setSessionId] = useState(null)
  const [patientInfo, setPatientInfo] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = (info) => {
    setPatientInfo(info)
    setMessages([{
      role: 'assistant',
      content: `## Welcome to Curalink 🧬\n\nHello${info.patientName ? `, **${info.patientName}**` : ''}! I'm your AI medical research assistant.\n\nI'm ready to help you explore research on **${info.disease}**. Ask me anything — about treatments, studies, clinical trials, or any specific aspect of your condition.\n\n*What would you like to know?*`,
      sources: [],
      clinicalTrials: []
    }])
  }

  const sendMessage = async (message) => {
    if (!message.trim() || !patientInfo) return

    const userMsg = { role: 'user', content: message }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      // ✅ Uses the API_BASE defined above — NO localhost here
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message,
          disease: patientInfo.disease,
          patientName: patientInfo.patientName,
          location: patientInfo.location
        })
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `Server error: ${res.status}`)
      }

      const data = await res.json()
      setSessionId(data.sessionId)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        sources: data.sources || [],
        clinicalTrials: data.clinicalTrials || [],
        meta: data.meta
      }])
    } catch (err) {
      console.error('Fetch error:', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Error: ${err.message}. Please try again.`,
        sources: [],
        clinicalTrials: []
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const resetSession = () => {
    setSessionId(null)
    setPatientInfo(null)
    setMessages([])
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🧬</span>
          <span className="logo-text">Cura<span className="logo-accent">link</span></span>
        </div>
        <p className="logo-tagline">AI Medical Research Assistant</p>
        {patientInfo && (
          <div className="session-info">
            <span>🔬 {patientInfo.disease}</span>
            {patientInfo.patientName && <span>👤 {patientInfo.patientName}</span>}
            <button onClick={resetSession} className="btn-reset">New Session</button>
          </div>
        )}
      </header>

      <main className="app-main">
        {!patientInfo ? (
          <InputPanel onStart={handleStart} />
        ) : (
          <ChatInterface
            messages={messages}
            onSend={sendMessage}
            isLoading={isLoading}
          />
        )}
      </main>
    </div>
  )
}

export default App