import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* logo */}
        <div className="logo">
          Next<span>Store</span>
        </div>

        {/* links */}
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>

        {/* button */}
        <div>
          <button className="nav-btn">Login</button>
        </div>

      </div>
    </nav>
  );
}
