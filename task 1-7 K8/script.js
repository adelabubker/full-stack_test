const services = [
  {
    id: 1,
    title: "Workflow Automation",
    description: "Design and execution of automated workflows using triggers, webhooks, and resilient pipelines."
  },
  {
    id: 2,
    title: "System Integration",
    description: "Connect your tools and platforms seamlessly with custom integrations and API orchestration."
  },
  {
    id: 3,
    title: "AI Automation",
    description: "Leverage AI to automate complex decision-making processes."
  },
  {
    id: 4,
    title: "Automation Consulting",
    description: "Strategic guidance to identify automation opportunities and optimize workflows."
  }
];

const servicesContainer = document.getElementById("servicesContainer");
let html = "";

services.forEach(service => {
  html += `
  <div class="col-md-6 col-lg-3">
  <div class="card h-100 shadow-sm service-card" data-service="${service.title}">
<div class="card-body">
    <h5 class="card-title">${service.title}</h5>
  <p class="card-text">${service.description}</p>
    <button class="btn btn-outline-light rounded-pill w-100 mt-3">Get the service</button>
  </div>
</div>
</div>
`;
});

servicesContainer.innerHTML = html;
