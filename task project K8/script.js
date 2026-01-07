const modal = document.getElementById('contactModal');
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('statusMessage');
const selectedService = document.getElementById('selectedService');
const inputs = form.querySelectorAll('input, textarea');

document.querySelectorAll('.service-card button').forEach(btn => {
  btn.addEventListener('click', e => {
    const service = e.target.closest('.service-card').dataset.service;
    selectedService.textContent = `Interested in ${service}`;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  });
});

document.getElementById('closeModal').addEventListener('click', closeModal);

function closeModal() {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
  form.reset();
  submitBtn.classList.add('disabled');
  statusMessage.className = 'status-message';
}

inputs.forEach(input =>
  input.addEventListener('input', () => {
    const isValid = [...inputs].every(i => i.value.trim() !== '');
    submitBtn.classList.toggle('disabled', !isValid);
  })
);

form.addEventListener('submit', e => {
  e.preventDefault();
  if (submitBtn.classList.contains('disabled')) return;

  submitBtn.textContent = 'Sending...';

  setTimeout(() => {
    statusMessage.textContent = 'Message sent successfully!';
    statusMessage.classList.add('success', 'visible');
    submitBtn.textContent = 'Send Message';

    setTimeout(closeModal, 1500);
  }, 1000);
});
