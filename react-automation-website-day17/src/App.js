import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services onServiceClick={handleServiceClick} />
      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedService={selectedService}
      />
      <Footer />
    </div>
  );
}

export default App;
