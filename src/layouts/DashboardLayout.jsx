import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, Video, QrCode, 
  Settings, LogOut, Menu, X, ChevronRight, Bell, Search
} from 'lucide-react';

export default function DashboardLayout({ role }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const adminMenu = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "O'qituvchilar", path: "/admin/teachers", icon: <Users size={20} /> },
    { name: "Dars Jadvali", path: "/admin/schedule", icon: <Calendar size={20} /> },
    { name: "QR Nazorat", path: "/admin/qr-checkin", icon: <QrCode size={20} /> },
    { name: "Video Tekshiruv", path: "/admin/video-review", icon: <Video size={20} /> },
    { name: "Sozlamalar", path: "/admin/settings", icon: <Settings size={20} /> }
  ];

  const teacherMenu = [
    { name: "Dashboard", path: "/teacher", icon: <LayoutDashboard size={20} /> },
    { name: "Mening Darslarim", path: "/teacher/schedule", icon: <Calendar size={20} /> },
    { name: "QR Skaner", path: "/teacher/qr-scan", icon: <QrCode size={20} /> },
    { name: "Statistika", path: "/teacher/stats", icon: <Users size={20} /> }
  ];

  const menu = role === 'admin' ? adminMenu : teacherMenu;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)' }}>
      
      {/* Sidebar */}
      <aside 
        className="glass" 
        style={{ 
          width: isSidebarOpen ? '260px' : '80px', 
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0, bottom: 0, left: 0,
          zIndex: 50
        }}
      >
        <div className="flex-between" style={{ padding: '1.5rem', borderBottom: '1px solid var(--surface-border)' }}>
          {isSidebarOpen && (
            <div className="flex-center gap-2">
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>T</span>
              </div>
              <span className="heading-3" style={{ fontSize: '1.25rem' }}>E-Maktab</span>
            </div>
          )}
          <button className="btn-outline flex-center" style={{ padding: '0.5rem', borderRadius: '8px', width: isSidebarOpen ? 'auto' : '100%' }} onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <ChevronRight size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
            {menu.map((item, idx) => {
              const active = location.pathname === item.path;
              return (
                <li key={idx}>
                  <Link 
                    to={item.path} 
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '1rem', 
                      padding: '0.75rem 1rem', 
                      borderRadius: 'var(--radius-md)',
                      background: active ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      color: active ? 'var(--primary)' : 'var(--text-muted)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {item.icon}
                    {isSidebarOpen && <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--surface-border)' }}>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', justifyContent: isSidebarOpen ? 'flex-start' : 'center', color: 'var(--danger)', borderColor: 'transparent' }}
            onClick={() => navigate('/')}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Chiqish</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        marginLeft: isSidebarOpen ? 'calc(260px + 2rem)' : 'calc(80px + 2rem)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Header */}
        <header className="glass" style={{ margin: '1rem 1rem 0 0', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="input-group" style={{ flexDirection: 'row', width: '300px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" className="input-field" placeholder="Izlash..." style={{ paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem 0.5rem 2.5rem' }} />
            </div>
          </div>
          
          <div className="flex-center gap-4">
            <button style={{ background: 'transparent', color: 'var(--text-muted)', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></span>
            </button>
            <div className="flex-center gap-2">
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={`https://ui-avatars.com/api/?name=${role}&background=6366f1&color=fff`} alt="avatar" style={{width:'100%', height:'100%'}} />
              </div>
              <div className="flex-col">
                <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>{role} Name</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: 15324</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '1.5rem 1rem 1.5rem 0', flex: 1 }}>
          <Outlet />
        </div>
      </main>

    </div>
  );
}
