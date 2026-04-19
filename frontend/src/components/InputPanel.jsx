import { useState } from 'react'

const QUICK_EXAMPLES = [
  { disease: 'Lung Cancer', query: 'Latest immunotherapy treatments' },
  { disease: 'Parkinson\'s Disease', query: 'Deep Brain Stimulation' },
  { disease: 'Type 2 Diabetes', query: 'Clinical trials near me' },
  { disease: 'Alzheimer\'s Disease', query: 'Top researchers and recent studies' },
]

export default function InputPanel({ onStart }) {
  const [form, setForm] = useState({
    patientName: '',
    disease: '',
    initialQuery: '',
    location: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.disease) return
    onStart(form)
  }

  const loadExample = (ex) => {
    setForm(prev => ({ ...prev, disease: ex.disease, initialQuery: ex.query }))
  }

  return (
    <div className="input-panel">
      <div className="input-panel-inner">
        <h1 className="panel-title">Your Medical Research Companion</h1>
        <p className="panel-subtitle">
          Get structured, source-backed insights from thousands of medical publications and clinical trials
        </p>

        <div className="quick-examples">
          <p className="examples-label">Quick examples:</p>
          <div className="examples-grid">
            {QUICK_EXAMPLES.map((ex, i) => (
              <button key={i} className="example-chip" onClick={() => loadExample(ex)}>
                {ex.disease} — {ex.query}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="research-form">
          <div className="form-group">
            <label>Patient Name <span className="optional">(optional)</span></label>
            <input
              type="text"
              placeholder="e.g. John Smith"
              value={form.patientName}
              onChange={e => setForm(p => ({ ...p, patientName: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>Disease / Condition <span className="required">*</span></label>
            <input
              type="text"
              placeholder="e.g. Parkinson's Disease, Lung Cancer, Type 2 Diabetes"
              value={form.disease}
              onChange={e => setForm(p => ({ ...p, disease: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>What do you want to know? <span className="optional">(optional)</span></label>
            <input
              type="text"
              placeholder="e.g. Deep Brain Stimulation, latest treatments, clinical trials"
              value={form.initialQuery}
              onChange={e => setForm(p => ({ ...p, initialQuery: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>Location <span className="optional">(optional - for nearby trials)</span></label>
            <input
              type="text"
              placeholder="e.g. Toronto, Canada"
              value={form.location}
              onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn-start">
            🔬 Start Research Session
          </button>
        </form>
      </div>
    </div>
  )
}