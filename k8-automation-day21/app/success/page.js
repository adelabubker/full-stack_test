export default function SuccessPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 Success</h1>
        <p style={styles.text}>
          Your message has been sent successfully.
        </p>

        <a href="/" style={styles.link}>
          Back to Home
        </a>
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
    background: "#5b989f",
    padding: 32,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  text: {
    color: "#555",
    marginBottom: 20,
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
