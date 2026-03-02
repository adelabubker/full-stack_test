// src/components/Navbar.jsx — Fully responsive with animated hamburger menu
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── ESC key to close ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const navLinks = [
    { label: 'Home',     href: '/' },
    { label: 'Services', href: '/services-page' },
    { label: 'Success',  href: '/success-page' },
    { label: 'Contact',  href: '/contact-page' },
  ];

  const isActive = (href) => location.pathname === href;
  const close = () => setMobileOpen(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
    close();
  };

  /* ── Hamburger bar style helper ── */
  const barStyle = (rotate, translateY, opacity = 1) => ({
    display: 'block',
    width: '22px',
    height: '2px',
    background: 'var(--text-primary)',
    borderRadius: '2px',
    transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.25s ease',
    transform: `${translateY} ${rotate}`,
    opacity,
  });

  return (
    <>
      {/* ══ NAV BAR ══════════════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || mobileOpen
          ? 'rgba(10,10,10,0.98)'
          : 'rgba(10,10,10,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled || mobileOpen
          ? '1px solid rgba(201,168,76,0.12)'
          : '1px solid transparent',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '68px', padding: '0 5%',
        }}>

          {/* ── Logo ── */}
          <Link to="/" onClick={close} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '700', fontSize: '1.6rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.02em',
            }}>K8</span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden-mobile" style={{
            display: 'flex', alignItems: 'center', gap: '36px',
          }}>
            {navLinks.map(({ label, href }) => (
              <Link key={label} to={href} style={{
                position: 'relative',
                color: isActive(href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '0.92rem',
                fontWeight: isActive(href) ? '600' : '400',
                transition: 'color 0.2s',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                paddingBottom: '4px',
              }}>
                {label}
                {/* Active underline */}
                <span style={{
                  position: 'absolute', bottom: '-2px', left: 0, right: 0,
                  height: '2px',
                  background: 'var(--gold)',
                  borderRadius: '1px',
                  transform: isActive(href) ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.25s ease',
                  transformOrigin: 'left',
                }} />
              </Link>
            ))}
          </div>

          {/* ── Desktop Auth Buttons ── */}
          <div className="hidden-mobile" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate('/dashboard')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '6px' }}
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-gold btn-sm"
                onClick={() => navigate('/login')}
                style={{ borderRadius: '50px', padding: '8px 24px' }}
              >
                Login
              </button>
            )}
          </div>

          {/* ── Animated Hamburger Button (mobile only) ── */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(prev => !prev)}
            style={{
              display: 'none', /* overridden by .show-mobile */
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            className="show-mobile hamburger-btn"
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={mobileOpen
              ? barStyle('rotate(45deg)', 'translateY(7px)')
              : barStyle('rotate(0deg)', 'translateY(0)')
            } />
            <span style={mobileOpen
              ? barStyle('rotate(0deg)', 'translateY(0)', 0)
              : barStyle('rotate(0deg)', 'translateY(0)', 1)
            } />
            <span style={mobileOpen
              ? barStyle('rotate(-45deg)', 'translateY(-7px)')
              : barStyle('rotate(0deg)', 'translateY(0)')
            } />
          </button>
        </div>
      </nav>

      {/* ── Mobile Backdrop ── */}
      <div
        onClick={close}
        style={{
          position: 'fixed', inset: 0, top: '68px', zIndex: 998,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ── Mobile Slide-Down Menu ── */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: '68px', left: 0, right: 0,
          zIndex: 999,
          background: 'rgba(10,10,10,0.99)',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          padding: mobileOpen ? '28px 5% 32px' : '0 5%',
          maxHeight: mobileOpen ? '100vh' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.23,1,0.32,1), padding 0.3s ease',
          /* Only visible on mobile — hidden-mobile counterpart */
          display: 'none', /* .mobile-menu class overrides */
        }}
        className="mobile-menu"
      >
        {/* Nav Links */}
        <nav style={{
          display: 'flex', flexDirection: 'column',
          gap: '4px', marginBottom: '24px',
        }}>
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={label}
              to={href}
              onClick={close}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px',
                borderRadius: '10px',
                fontSize: '1.05rem',
                fontWeight: isActive(href) ? '700' : '500',
                color: isActive(href) ? 'var(--gold)' : 'var(--text-primary)',
                textDecoration: 'none',
                background: isActive(href)
                  ? 'rgba(201,168,76,0.08)'
                  : 'transparent',
                borderLeft: `3px solid ${isActive(href) ? 'var(--gold)' : 'transparent'}`,
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-16px)',
                transitionDelay: mobileOpen ? `${i * 0.05}s` : '0s',
              }}
              onMouseEnter={e => {
                if (!isActive(href)) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(href)) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: isActive(href) ? 'var(--gold)' : 'var(--text-muted)',
                flexShrink: 0,
                transition: 'background 0.2s',
              }} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.07)',
          marginBottom: '20px',
        }} />

        {/* Auth Buttons */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '10px',
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 0.3s ease ${navLinks.length * 0.05 + 0.05}s, transform 0.3s ease ${navLinks.length * 0.05 + 0.05}s`,
        }}>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <button
                  className="btn btn-primary"
                  style={{
                    width: '100%', justifyContent: 'center',
                    borderRadius: '10px', textTransform: 'none',
                    letterSpacing: '0', fontSize: '0.95rem',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                  onClick={() => { navigate('/dashboard'); close(); }}
                >
                  <LayoutDashboard size={16} /> Go to Dashboard
                </button>
              )}
              <button
                className="btn btn-secondary"
                style={{
                  width: '100%', justifyContent: 'center',
                  borderRadius: '10px', textTransform: 'none',
                  letterSpacing: '0', fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-gold"
                style={{
                  width: '100%', justifyContent: 'center',
                  borderRadius: '10px', textTransform: 'none',
                  letterSpacing: '0', fontSize: '0.95rem',
                }}
                onClick={() => { navigate('/login'); close(); }}
              >
                Login
              </button>
              <button
                className="btn btn-outline"
                style={{
                  width: '100%', justifyContent: 'center',
                  borderRadius: '10px', textTransform: 'none',
                  letterSpacing: '0', fontSize: '0.95rem',
                }}
                onClick={() => { navigate('/register'); close(); }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
