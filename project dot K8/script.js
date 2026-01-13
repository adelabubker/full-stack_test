
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


// Global state management
let successStoriesData = [];
let filteredStoriesData = [];
let currentIndustryFilter = 'all';

// DOM Elements
const fetchStoriesBtn = document.getElementById('fetchStoriesBtn');
const resetStoriesBtn = document.getElementById('resetStoriesBtn');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');
const storiesContainer = document.getElementById('storiesContainer');
const industryFilters = document.getElementById('industryFilters');
const storiesStats = document.getElementById('storiesStats');
const storyModal = document.getElementById('storyModal');
const closeStoryModal = document.getElementById('closeStoryModal');

// Industry mapping for dynamic assignment
const industries = ['Finance', 'Healthcare', 'Retail', 'Technology', 'Manufacturing'];


async function fetchSuccessStories() {
  const startTime = performance.now();
  
  showLoadingState();
  
  try {
    const response = await fetch('https://randomuser.me/api/?results=12&nat=us,gb,ca,au');

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    successStoriesData = data.results.map((user, index) => {
      const industry = industries[index % industries.length];
      const hoursSaved = Math.floor(Math.random() * 40) + 10; 
      const efficiency = Math.floor(Math.random() * 30) + 70; 
      
      return {
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        photo: user.picture.large,
        company: `${user.name.last} ${industry === 'Technology' ? 'Tech' : industry === 'Finance' ? 'Capital' : industry === 'Healthcare' ? 'Medical' : industry === 'Retail' ? 'Store' : 'Industries'}`,
        industry: industry,
        location: `${user.location.city}, ${user.location.state}`,
        hoursSaved: hoursSaved,
        efficiency: efficiency,
        email: user.email,
        phone: user.phone,
        clientSince: new Date(user.registered.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }),
        timezone: user.location.timezone.description,
        testimonial: generateTestimonial(industry, hoursSaved, efficiency)
      };
    });
    
    const endTime = performance.now();
    const fetchTime = Math.round(endTime - startTime);

    document.getElementById('fetchTime').textContent = `${fetchTime}ms`;

    filteredStoriesData = [...successStoriesData];
 
    renderStories(filteredStoriesData);

    updateStatistics(filteredStoriesData);

    showSuccessState();
    
  } catch (error) {
    showErrorState(error.message);
  }
}

function generateTestimonial(industry, hours, efficiency) {
  const testimonials = {
    Finance: `K8's automation solutions transformed our financial workflows, saving us ${hours} hours per week and increasing efficiency by ${efficiency}%. Their expertise in n8n integration helped us streamline our entire accounting process.`,
    Healthcare: `With K8's automation, our patient data processing became ${efficiency}% more efficient. We now save ${hours} hours weekly, allowing our staff to focus on patient care instead of paperwork.`,
    Retail: `K8 automated our inventory management and customer service workflows. We're now ${efficiency}% more efficient and save ${hours} hours every week. The ROI has been incredible.`,
    Technology: `The workflow automation K8 implemented has been a game-changer. Our development team saves ${hours} hours per week, and our deployment efficiency improved by ${efficiency}%.`,
    Manufacturing: `K8's automation expertise helped us optimize our supply chain processes. We achieved ${efficiency}% efficiency gains and save ${hours} hours weekly on manual tasks.`
  };
  
  return testimonials[industry] || `K8's automation solutions have been transformative for our business.`;
}

function showLoadingState() {
  loadingState.style.display = 'block';
  errorState.style.display = 'none';
  storiesContainer.innerHTML = '';
  fetchStoriesBtn.disabled = true;
  fetchStoriesBtn.innerHTML = '<span class="btn-icon">⏳</span> Loading...';
}


function showErrorState(message) {
  loadingState.style.display = 'none';
  errorState.style.display = 'block';
  storiesContainer.innerHTML = '';
  fetchStoriesBtn.disabled = false;
  fetchStoriesBtn.innerHTML = '<span class="btn-icon">📊</span> Load Success Stories';
  
  errorMessage.textContent = message || 'An unexpected error occurred. Please check your connection and try again.';
}

function showSuccessState() {
  loadingState.style.display = 'none';
  errorState.style.display = 'none';
  fetchStoriesBtn.style.display = 'none';
  resetStoriesBtn.style.display = 'inline-flex';
  industryFilters.style.display = 'flex';
  storiesStats.style.display = 'flex';
}


function renderStories(stories) {
  if (stories.length === 0) {
    storiesContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted">No success stories found for the selected industry.</p>
      </div>
    `;
    return;
  }
  
  storiesContainer.innerHTML = stories.map(story => `
    <div class="col-md-6 col-lg-4">
      <div class="story-card" data-story-id="${story.id}">
        <div class="story-card-header">
          <img src="${story.photo}" alt="${story.name}" class="story-client-photo">
          <div class="story-client-info">
            <h5 class="story-client-name">${story.name}</h5>
            <p class="story-company">${story.company}</p>
          </div>
        </div>
        
        <div class="story-card-body">
          <div class="story-detail">
            <span class="story-icon">🏢</span>
            <span class="story-label">Industry:</span>
            <span class="story-value">${story.industry}</span>
          </div>
          
          <div class="story-detail">
            <span class="story-icon">📍</span>
            <span class="story-label">Location:</span>
            <span class="story-value">${story.location}</span>
          </div>
          
          <div class="story-metrics">
            <div class="metric-item">
              <div class="metric-value">${story.hoursSaved}h</div>
              <div class="metric-label">Saved Weekly</div>
            </div>
            <div class="metric-divider"></div>
            <div class="metric-item">
              <div class="metric-value">${story.efficiency}%</div>
              <div class="metric-label">Efficiency</div>
            </div>
          </div>
        </div>
        
        <button class="story-details-btn">
          View Full Story →
        </button>
      </div>
    </div>
  `).join('');
  
  attachStoryClickListeners();
}


function attachStoryClickListeners() {
  const storyCards = document.querySelectorAll('.story-card');
  
  storyCards.forEach(card => {
    const detailsBtn = card.querySelector('.story-details-btn');
    const storyId = card.dataset.storyId;
    
    detailsBtn.addEventListener('click', () => {
      showStoryModal(storyId);
    });
    
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('story-details-btn')) {
        showStoryModal(storyId);
      }
    });
  });
}


function showStoryModal(storyId) {
  const story = successStoriesData.find(s => s.id === storyId);
  
  if (!story) return;
  
  document.getElementById('modalClientPhoto').src = story.photo;
  document.getElementById('modalClientName').textContent = story.name;
  document.getElementById('modalCompanyName').textContent = story.company;
  document.getElementById('modalIndustry').textContent = story.industry;
  document.getElementById('modalLocation').textContent = story.location;
  document.getElementById('modalHoursSaved').textContent = `${story.hoursSaved} hours/week`;
  document.getElementById('modalEfficiency').textContent = `${story.efficiency}% improvement`;
  document.getElementById('modalEmail').textContent = story.email;
  document.getElementById('modalPhone').textContent = story.phone;
  document.getElementById('modalClientSince').textContent = story.clientSince;
  document.getElementById('modalTimezone').textContent = story.timezone;
  document.getElementById('modalTestimonial').textContent = story.testimonial;
  
  storyModal.classList.add('active');
  document.body.classList.add('modal-open');
}


function updateStatistics(stories) {
  const totalStories = stories.length;
  const avgEfficiency = Math.round(
    stories.reduce((sum, story) => sum + story.efficiency, 0) / totalStories
  );
  const totalHours = stories.reduce((sum, story) => sum + story.hoursSaved, 0);
  
  document.getElementById('totalStories').textContent = totalStories;
  document.getElementById('avgEfficiency').textContent = `${avgEfficiency}%`;
  document.getElementById('totalHoursSaved').textContent = `${totalHours}h`;
}


function resetDashboard() {

  successStoriesData = [];
  filteredStoriesData = [];
  currentIndustryFilter = 'all';

  storiesContainer.innerHTML = '';
  loadingState.style.display = 'none';
  errorState.style.display = 'none';
  fetchStoriesBtn.style.display = 'inline-flex';
  fetchStoriesBtn.disabled = false;
  fetchStoriesBtn.innerHTML = '<span class="btn-icon">📊</span> Load Success Stories';
  resetStoriesBtn.style.display = 'none';
  industryFilters.style.display = 'none';
  storiesStats.style.display = 'none';
  
  const industryFilterBtns = document.querySelectorAll('.industry-filter-btn');
  industryFilterBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.industry === 'all') {
      btn.classList.add('active');
    }
  });
  
  document.getElementById('totalStories').textContent = '0';
  document.getElementById('avgEfficiency').textContent = '0%';
  document.getElementById('totalHoursSaved').textContent = '0';
  document.getElementById('fetchTime').textContent = '0ms';
}


function filterStoriesByIndustry(industry) {
  currentIndustryFilter = industry;
  
  if (industry === 'all') {
    filteredStoriesData = [...successStoriesData];
  } else {
    filteredStoriesData = successStoriesData.filter(story => story.industry === industry);
  }
  
  renderStories(filteredStoriesData);
  updateStatistics(filteredStoriesData);
}

fetchStoriesBtn.addEventListener('click', fetchSuccessStories);
resetStoriesBtn.addEventListener('click', resetDashboard);
retryBtn.addEventListener('click', fetchSuccessStories);


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('industry-filter-btn')) {
    document.querySelectorAll('.industry-filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    e.target.classList.add('active');
    
    const industry = e.target.dataset.industry;
    filterStoriesByIndustry(industry);
  }
});

closeStoryModal.addEventListener('click', () => {
  storyModal.classList.remove('active');
  document.body.classList.remove('modal-open');
});

storyModal.addEventListener('click', (e) => {
  if (e.target === storyModal) {
    storyModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (storyModal.classList.contains('active')) {
      storyModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }
});
