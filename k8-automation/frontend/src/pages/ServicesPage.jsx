// src/pages/ServicesPage.jsx — Admin services management
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { PlusCircle, Edit2, Trash2, Zap, Search, RefreshCw, Code2, Globe, Cpu, Shield, Star, TrendingUp, ToggleRight, ToggleLeft } from 'lucide-react';

const ICON_MAP = {
  zap: Zap, code2: Code2, globe: Globe, bot: Cpu,
  workflow: Zap, shield: Shield, star: Star, trending: TrendingUp,
};

const ServicesPage = () => {
  const { isFullAdmin } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const navigate = useNavigate();

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services', { params: { page, limit: 10 } });
      setServices(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, [page]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/services/${id}`);
      toast.success('Service deleted');
      setServices(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleActive = async (service) => {
    try {
      const res = await api.put(`/services/${service._id}`, { isActive: !service.isActive });
      setServices(prev => prev.map(s => s._id === service._id ? res.data.data : s));
      toast.success('Service visibility updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update service');
    }
  };

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeIn 0.4s ease' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: '800', marginBottom: '6px' }}>Services</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {services.length} service{services.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={fetchServices}>
              <RefreshCw size={14} /> Refresh
            </button>
            <Link to="/dashboard/services/add">
              <button className="btn btn-primary btn-sm">
                <PlusCircle size={14} /> Add Service
              </button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px' }}>
          <Search size={16} style={{
            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
          }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search services..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '44px' }}
          />
        </div>

        {/* Pagination Info */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Showing {services.length} of {pagination.total} results
        </div>

        {/* Table */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          {/* Table Header — hidden on mobile via CSS */}
          <div className="responsive-table-header services-table-header">
            <span>Title</span>
            <span>Description</span>
            <span>Active</span>
            <span>Created By</span>
            <span>Actions</span>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <div className="spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <Zap size={40} style={{ opacity: 0.25 }} />
              <p style={{ fontWeight: '600' }}>{search ? 'No services match your search' : 'No services yet'}</p>
              {!search && (
                <Link to="/dashboard/services/add">
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '8px' }}>
                    <PlusCircle size={14} /> Create First Service
                  </button>
                </Link>
              )}
            </div>
          ) : (
            filtered.map((service, i) => {
              const ServiceIcon = ICON_MAP[service.icon] || Zap;
              return (
                <div key={service._id}
                  className="responsive-table-row services-table-row"
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.15s ease',
                    animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Title */}
                  <div>
                    <div className="mobile-label">Title</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'rgba(0,255,204,0.08)', border: '1px solid rgba(0,255,204,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <ServiceIcon size={14} style={{ color: 'var(--accent-primary)' }} />
                      </div>
                      <span style={{ fontWeight: '500', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {service.title}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="mobile-label">Description</div>
                    <span style={{
                      color: 'var(--text-secondary)', fontSize: '0.85rem',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {service.description}
                    </span>
                  </div>

                  {/* Active */}
                  <div>
                    <div className="mobile-label">Status</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ fontSize: '0.9rem', color: service.isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </div>
                      <button
                        onClick={() => handleToggleActive(service)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        title={service.isActive ? 'Deactivate service' : 'Activate service'}
                      >
                        {service.isActive
                          ? <ToggleRight size={22} style={{ color: 'var(--accent-primary)' }} />
                          : <ToggleLeft size={22} style={{ color: 'var(--text-muted)' }} />
                        }
                      </button>
                    </div>
                  </div>

                  {/* Created By */}
                  <div>
                    <div className="mobile-label">Created By</div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                      {service.createdBy?.name || 'Unknown'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div>
                    <div className="mobile-label">Actions</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate(`/dashboard/services/edit/${service._id}`)}
                        style={{ padding: '6px 12px' }}
                      >
                        <Edit2 size={13} />
                      </button>
                      {isFullAdmin && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(service._id, service.title)}
                          disabled={deleting === service._id}
                          style={{ padding: '6px 12px' }}
                        >
                          {deleting === service._id
                            ? <div className="spinner" style={{ width: '12px', height: '12px', borderWidth: '2px' }} />
                            : <Trash2 size={13} />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {pagination.pages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary btn-sm"
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Page {page} of {pagination.pages}
            </div>
            <button
              className="btn btn-secondary btn-sm"
              disabled={page === pagination.pages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
