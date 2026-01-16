import React from 'react';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import './App.css';

function App() {
  const services = [
    {
      id: 1,
      title: "Workflow Automation",
      description: "Design and execution of automated workflows using triggers, webhooks, and resilient pipelines.",
      isPopular: true
    },
    {
      id: 2,
      title: "System Integration",
      description: "Connect your tools and platforms seamlessly with custom integrations and API orchestration.",
      isPopular: false
    },
    {
      id: 3,
      title: "AI Automation",
      description: "Leverage AI to automate complex decision-making processes.",
      isPopular: false
    },
    {
      id: 4,
      title: "Automation Consulting",
      description: "Strategic guidance to identify automation opportunities and optimize workflows.",
      isPopular: false
    }
  ];

  return (
    <div className="app">
      <Navbar />
      
      <main className="main-content">
        <h1 className="section-title">Our Automation Services</h1>
        <p className="section-subtitle">
          Enterprise-grade solutions powered by cutting-edge technology
        </p>
        
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </main>
      
      <footer className="footer">
        <p>© 2024 K8 Automation Solutions</p>
        <p className="footer-text">Professional Workflow Automation</p>
      </footer>
    </div>
  );
}

export default App;