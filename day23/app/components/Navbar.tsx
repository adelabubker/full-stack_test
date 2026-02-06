import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">NextStore</div>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </div>
      </div>
    </nav>
  );
}
