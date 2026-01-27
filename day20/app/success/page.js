export default function Success() {
  return (
    <section className="success">
      <h1>Success Stories</h1>
      <p className="success-subtitle">
        Real-world automation solutions delivering measurable business impact.
      </p>

      <div className="success-grid">
        <div className="success-card">
          <h3>Enterprise Workflow Automation</h3>
          <p>
            Automated internal approval workflows, reducing processing time by
            <strong> 65%</strong> and eliminating manual errors.
          </p>
          <span>Industry: Finance</span>
        </div>

        <div className="success-card">
          <h3>AI Document Processing</h3>
          <p>
            Implemented AI-powered document extraction, saving over
            <strong> 120+ hours/month</strong>.
          </p>
          <span>Industry: Operations</span>
        </div>

        <div className="success-card">
          <h3>System Integration Platform</h3>
          <p>
            Connected 6+ tools into a unified automation pipeline using APIs and n8n.
          </p>
          <span>Industry: SaaS</span>
        </div>
      </div>
    </section>
  );
}
