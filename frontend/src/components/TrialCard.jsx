const STATUS_COLORS = {
  RECRUITING: '#16a34a',
  ACTIVE_NOT_RECRUITING: '#2563eb',
  COMPLETED: '#6b7280',
  TERMINATED: '#dc2626',
  DEFAULT: '#d97706'
}

export default function TrialCard({ trial, index }) {
  const statusColor = STATUS_COLORS[trial.status?.toUpperCase()] || STATUS_COLORS.DEFAULT

  return (
    <div className="card trial-card">
      <div className="card-header">
        <span className="card-badge trial-badge" style={{ backgroundColor: statusColor }}>
          {trial.status}
        </span>
      </div>
      <h4 className="card-title">
        <a href={trial.url} target="_blank" rel="noopener noreferrer">
          [{index}] {trial.title}
        </a>
      </h4>
      <div className="trial-details">
        <p>📍 <strong>Location:</strong> {trial.location}</p>
        <p>📞 <strong>Contact:</strong> {trial.contact}</p>
        {trial.eligibility && (
          <details className="eligibility-details">
            <summary>📋 Eligibility Criteria</summary>
            <p>{trial.eligibility}</p>
          </details>
        )}
      </div>
      <a href={trial.url} target="_blank" rel="noopener noreferrer" className="card-link">
        View on ClinicalTrials.gov →
      </a>
    </div>
  )
}