export default function ContactPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have a question or want to work together? Drop us a message.
        </p>

        <form action="/success" style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            style={styles.input}
          />

          <textarea
            placeholder="Your Message"
            required
            rows="4"
            style={styles.textarea}
          />

          <button style={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000000",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#5b989f",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: 8,
    fontSize: 28,
  },
  subtitle: {
    marginBottom: 24,
    color: "#666",
    fontSize: 14,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
  },
  textarea: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    resize: "none",
  },
  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },
};
