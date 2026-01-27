const services = [
  {
    title: "Workflow Automation",
    desc: "Design and execution of automated workflows using triggers, webhooks, and resilient pipelines.",
    tag: "Most Popular"
  },
  {
    title: "System Integration",
    desc: "Connect your tools and platforms seamlessly with custom integrations and API orchestration."
  },
  {
    title: "AI Automation",
    desc: "Leverage AI to automate complex decision-making processes."
  },
  {
    title: "Automation Consulting",
    desc: "Strategic guidance to identify automation opportunities and optimize workflows."
  },
  {
    title: "AI-Powered Analytics",
    desc: "Transform data into actionable insights with AI-driven analytics."
  },
  {
    title: "Process Optimization",
    desc: "Streamline your business processes with intelligent automation strategies."
  },
  {
    title: "Smart Document Processing",
    desc: "Automate document handling with AI-powered extraction and classification."
  },
  {
    title: "Custom Workflow Development",
    desc: "Build tailored automation solutions designed for your business needs."
  }
];

export default function ServicesGrid() {
  return (
    <section className="services">
      <h2>Our Automation Services</h2>

      <div className="services-grid">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            {s.tag && <span className="badge">{s.tag}</span>}
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <button className="service-btn">GET THE SERVICE</button>
          </div>
        ))}
      </div>
    </section>
  );
}
