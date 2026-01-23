import React, { useState, useEffect } from 'react';
import CONFIG from '../config/config';

const ContactModal = ({ isOpen, onClose, selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if all fields are filled
  useEffect(() => {
    const allFilled = Object.values(formData).every(value => value.trim() !== '');
    setIsFormValid(allFilled);
  }, [formData]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setStatusMessage({ text: '', type: '' });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const showStatus = (text, type) => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      if (statusMessage.text) {
        setStatusMessage({ text: '', type: '' });
      }
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      showStatus('Please fill all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: `Service Inquiry: ${selectedService}`,
        message: formData.message.trim(),
        service: selectedService
      };

      console.log('Sending data to n8n:', submitData);

      const response = await fetch(CONFIG.n8nWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (result.success) {
        showStatus("Message sent successfully! We'll get back to you soon.", 'success');

        if (result.leadId) {
          console.log('Lead created with ID:', result.leadId);
          localStorage.setItem('lastLeadId', result.leadId);
        }

        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending form:', error);

      if (error.message.includes('Failed to fetch')) {
        showStatus('Connection error. Please check your network and try again.', 'error');
      } else if (error.message.includes('Validation failed')) {
        showStatus('Please check all fields and provide a valid email address.', 'error');
      } else {
        showStatus(error.message || 'Failed to send message. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`} 
      id="contactModal"
      onClick={handleOverlayClick}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-header-title">Get Started</h2>
        <p className="modal-header-subtitle" id="selectedService">
          {selectedService}
        </p>

        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="form-input"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="form-input form-textarea"
              placeholder="Tell us about your automation needs..."
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            id="submitBtn"
            className={`submit-btn ${!isFormValid || isSubmitting ? 'disabled' : ''}`}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {statusMessage.text && (
            <div
              id="statusMessage"
              className={`status-message ${statusMessage.type} visible`}
            >
              {statusMessage.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
