// src/components/DashboardLayout.jsx — Dashboard shell with responsive sidebar
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-void)' }}>
      {/* Desktop Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Mobile overlay backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 149,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <main style={{
        flex: 1, overflow: 'auto',
        padding: 'clamp(16px, 4vw, 36px)',
        background: 'var(--bg-void)',
      }}>
        {/* Mobile Dashboard Header */}
        <div className="show-mobile" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              style={{ background: 'transparent', border: '1px solid var(--border-mid)', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Menu size={20} />
            </button>
            <div style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Rajdhani, sans-serif', fontWeight: '700', fontSize: '1rem', color: '#0a0a0a',
            }}>
              K8
            </div>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => window.location.href = '/'}
            style={{ borderRadius: '6px' }}
          >
            Exit
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
