export default function PublicationCard({ publication, index }) {
  return (
    <div className="card publication-card">
      <div className="card-header">
        <span className="card-badge">{publication.platform}</span>
        <span className="card-year">{publication.year}</span>
      </div>
      <h4 className="card-title">
        <a href={publication.url} target="_blank" rel="noopener noreferrer">
          [{index}] {publication.title}
        </a>
      </h4>
      {publication.authors?.length > 0 && (
        <p className="card-authors">
          👤 {publication.authors.slice(0, 3).join(', ')}
          {publication.authors.length > 3 && ' et al.'}
        </p>
      )}
      {publication.snippet && (
        <p className="card-snippet">{publication.snippet}</p>
      )}
      <a href={publication.url} target="_blank" rel="noopener noreferrer" className="card-link">
        View Publication →
      </a>
    </div>
  )
}