const services = [
  {
    id: 1,
    title: "Workflow Automation",
    description: "Design and execution of automated workflows using triggers, webhooks, and resilient pipelines.",
    category: "workflow",
  },
  {
    id: 2,
    title: "System Integration",
    description: "Connect your tools and platforms seamlessly with custom integrations and API orchestration.",
    category: "workflow",
  },
  {
    id: 3,
    title: "AI Automation",
    description: "Leverage AI to automate complex decision-making processes.",
    category: "ai",
  },
  {
    id: 4,
    title: "Automation Consulting",
    description: "Strategic guidance to identify automation opportunities and optimize workflows.",
    category: "workflow",
  },
  {
    id: 5,
    title: "AI-Powered Analytics",
    description: "Transform data into actionable insights with AI-driven analytics and reporting.",
    category: "ai",
  },
  {
    id: 6,
    title: "Process Optimization",
    description: "Streamline your business processes with intelligent automation strategies.",
    category: "workflow",
  },
  {
    id: 7,
    title: "Smart Document Processing",
    description: "Automate document handling with AI-powered extraction and classification.",
    category: "ai",
  },
  {
    id: 8,
    title: "Custom Workflow Development",
    description: "Build tailored automation solutions designed specifically for your business needs.",
    category: "workflow",
  }
];


const servicesContainer = document.getElementById("servicesContainer");
const filterTabs = document.querySelectorAll(".filter-tab");
const contactModal = document.getElementById("contactModal");
const selectedService = document.getElementById("selectedService");
const closeModalBtn = document.getElementById("closeModal");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");


const topService = services.reduce((max, service) => 
  service.popularity > max.popularity ? service : max
);


function renderServices(list) {
  if (list.length === 0) {
    servicesContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted">No services found matching your criteria.</p>
      </div>
    `;
    return;
  }

  servicesContainer.innerHTML = list.map(service => {
    const isTopService = service.id === topService.id;
    return `
      <div class="col-md-6 col-lg-4">
        <div class="service-card ${isTopService ? 'top-service' : ''}"
             data-service="${service.title}"
             data-category="${service.category}">
          ${isTopService ? '<div class="top-badge">Most Popular</div>' : ''}
          <div class="card-body">
            <h5 class="card-title">${service.title}</h5>
            <p class="card-text">${service.description}</p>
            <button class="service-cta">Get the service</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

renderServices(services);


searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const activeFilter = document.querySelector(".filter-tab.active").dataset.filter;
  
  let filteredServices = services;

  if (activeFilter !== "all") {
    filteredServices = filteredServices.filter(s => s.category === activeFilter);
  }

  if (searchTerm) {
    filteredServices = filteredServices.filter(s => 
      s.title.toLowerCase().includes(searchTerm) ||
      s.description.toLowerCase().includes(searchTerm)
    );
  }
  
  renderServices(filteredServices);
});

filterTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    filterTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let filteredServices = services;

    if (filter !== "all") {
      filteredServices = filteredServices.filter(s => s.category === filter);
    }

    if (searchTerm) {
      filteredServices = filteredServices.filter(s => 
        s.title.toLowerCase().includes(searchTerm) ||
        s.description.toLowerCase().includes(searchTerm)
      );
    }
    
    renderServices(filteredServices);
  });
});


resetBtn.addEventListener("click", () => {

  searchInput.value = "";

  filterTabs.forEach(t => t.classList.remove("active"));
  document.querySelector('.filter-tab[data-filter="all"]').classList.add("active");

  renderServices(services);

 
});

servicesContainer.addEventListener("click", e => {
  if (e.target.classList.contains("service-cta")) {
    const card = e.target.closest(".service-card");
    selectedService.textContent = card.dataset.service;
    contactModal.classList.add("active");
    document.body.classList.add("modal-open");
  }
});

const paragraphs = document.querySelectorAll("#servicesContainer p");

paragraphs.forEach((p, index) => {
  if (index === 0) {

    p.style.color = "#f3b86b"; 
    p.style.fontWeight = "700";
  } else {

    p.style.color = "rgba(255,255,255,0.8)";
    p.style.fontWeight = "400";

    p.addEventListener("mouseenter", () => {
      p.style.transform = "translateX(5px)";
      p.style.transition = "transform 0.2s ease";
    });
    p.addEventListener("mouseleave", () => {
      p.style.transform = "translateX(0)";
    });

    p.addEventListener("click", () => {
      alert(`You clicked on: "${p.textContent}"`);
    });
  }
});


closeModalBtn.addEventListener("click", closeModal);
contactModal.addEventListener("click", e => {
  if (e.target === contactModal) closeModal();
});

function closeModal() {
  contactModal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");
const formInputs = contactForm.querySelectorAll(".form-input");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    const allFilled = Array.from(formInputs).every(inp => inp.value.trim() !== "");
    submitBtn.classList.toggle("disabled", !allFilled);
  });
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
    console.log("Form submitted");
  if (submitBtn.classList.contains("disabled")) return;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;
  
  setTimeout(() => {
    statusMessage.textContent = "Message sent successfully! We'll get back to you soon.";
    statusMessage.className = "status-message success visible";
    submitBtn.textContent = "Send Message";
    submitBtn.disabled = false;

    setTimeout(() => {
      contactForm.reset();
      statusMessage.classList.remove("visible");
      submitBtn.classList.add("disabled");
      closeModal();
    }, 3000);
  }, 1500);
});
