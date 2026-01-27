export default function Contact() {
  return (
    <section className="contact">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">
        Let’s discuss how automation can scale your business.
      </p>

      <form className="contact-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="text" placeholder="Company (optional)" />
        <textarea placeholder="Describe your automation needs..." rows="5" />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}
