import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">K8</div>

      <nav className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/success">Success</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <button className="login-btn">Login</button>
    </header>
  );
}
