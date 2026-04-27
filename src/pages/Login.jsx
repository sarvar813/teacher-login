import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, GraduationCap, Lock, Mail, QrCode } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'terminal') navigate('/terminal');
    else navigate('/teacher');
  };

  return (
    <div className="flex-center flex-col animate-fade-in" style={{ minHeight: '100vh', padding: '1rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        
        <div className="flex-center flex-col gap-4" style={{ marginBottom: '2.5rem' }}>
          <div className="flex-center" style={{ 
            width: '64px', height: '64px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            boxShadow: '0 0 20px var(--primary-glow)'
          }}>
            <ShieldCheck size={32} color="white" />
          </div>
          <h1 className="heading-2" style={{ textAlign: 'center' }}>Tizimga kirish</h1>
          <p className="text-muted" style={{ textAlign: 'center', marginTop: '-0.5rem' }}>
            O'qituvchilar dars va nazorat tizimi
          </p>
        </div>

        <form className="flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label className="input-label">Email yoki ID</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" className="input-field" placeholder="admin@maktab.uz" style={{ paddingLeft: '2.75rem' }} />
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label">Parol</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="password" className="input-field" placeholder="••••••••" style={{ paddingLeft: '2.75rem' }} />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => handleLogin('admin')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <ShieldCheck size={18} /> Direktor / Kurator kirishi
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => handleLogin('teacher')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <GraduationCap size={18} /> O'qituvchi sifatida kirish
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => handleLogin('terminal')}
              style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--success)', color: 'var(--success)' }}
            >
              <QrCode size={18} /> Maktab Turniketi (Faol rejim)
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
