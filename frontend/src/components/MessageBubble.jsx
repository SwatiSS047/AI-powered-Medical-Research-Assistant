import ReactMarkdown from 'react-markdown'
import PublicationCard from './PublicationCard'
import TrialCard from './TrialCard'

export default function MessageBubble({ message }) {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`message ${isAssistant ? 'assistant' : 'user'}`}>
      {isAssistant && (
        <div className="message-avatar">🧬</div>
      )}

      <div className="message-content">
        <div className="message-bubble">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        {/* Publications */}
        {isAssistant && message.sources?.length > 0 && (
          <div className="sources-section">
            <h3 className="sources-title">
              📚 Research Publications ({message.sources.length})
              {message.meta && (
                <span className="meta-info">
                  · Analyzed {message.meta.totalCandidatesRetrieved} candidates
                </span>
              )}
            </h3>
            <div className="cards-grid">
              {message.sources.map((source, i) => (
                <PublicationCard key={i} publication={source} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Clinical Trials */}
        {isAssistant && message.clinicalTrials?.length > 0 && (
          <div className="sources-section">
            <h3 className="sources-title">🔬 Clinical Trials ({message.clinicalTrials.length})</h3>
            <div className="cards-grid">
              {message.clinicalTrials.map((trial, i) => (
                <TrialCard key={i} trial={trial} index={i + 1} />
              ))}
            </div>
          </div>
        )}
      </div>

      {!isAssistant && (
        <div className="message-avatar user-avatar">👤</div>
      )}
    </div>
  )
}