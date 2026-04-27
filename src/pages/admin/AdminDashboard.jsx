import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Clock, Video, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Initial Load
    const localLogs = JSON.parse(localStorage.getItem('checkinLogs') || '[]');
    setLogs(localLogs.slice(0, 5));
    
    const localVideos = JSON.parse(localStorage.getItem('pendingVideos') || '[{"id": 1, "title": "8 \\"B\\" sinf - Fizika", "teacher": "Qodirov M."}, {"id": 2, "title": "9 \\"A\\" sinf - Ona tili", "teacher": "Usmonova G."}]');
    if (!localStorage.getItem('pendingVideos')) {
      localStorage.setItem('pendingVideos', JSON.stringify(localVideos));
    }
    setVideos(localVideos);

    // Listen to changes from Terminal (if opened in another tab)
    const handleStorage = () => {
      const updatedLogs = JSON.parse(localStorage.getItem('checkinLogs') || '[]');
      setLogs(updatedLogs.slice(0, 5));

      const updatedVideos = JSON.parse(localStorage.getItem('pendingVideos') || '[]');
      setVideos(updatedVideos);
    };

    window.addEventListener('storage', handleStorage);
    
    // Fallback polling (in case it is tested in the same tab, which is unlikely but good to have)
    const interval = setInterval(handleStorage, 2000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    }
  }, []);
  const handleVideoAction = (id, action) => {
    const updatedVideos = videos.filter(v => v.id !== id);
    setVideos(updatedVideos);
    localStorage.setItem('pendingVideos', JSON.stringify(updatedVideos));
    
    // Log interaction natively so the frontend teacher could theoretically receive it
    const responses = JSON.parse(localStorage.getItem('videoResponses') || '{}');
    responses[id] = action;
    localStorage.setItem('videoResponses', JSON.stringify(responses));
    window.dispatchEvent(new Event('storage'));
  };

  const stats = [
    { label: "Jami O'qituvchilar", value: "48", icon: <Users size={24} color="var(--primary)" />, trend: "+2" },
    { label: "Bugun Kelganlar", value: "42", icon: <UserCheck size={24} color="var(--success)" />, trend: "87%" },
    { label: "Kelmaganlar", value: "3", icon: <UserX size={24} color="var(--danger)" /> },
    { label: "Kechikkanlar", value: "3", icon: <Clock size={24} color="var(--warning)" /> },
    { label: "Qabul Qilinmagan Videolar", value: "5", icon: <Video size={24} color="var(--danger)" /> },
    { label: "O'rtacha KPI", value: "92%", icon: <TrendingUp size={24} color="var(--success)" />, trend: "+1.2%" },
  ];

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%' }}>
      
      <div className="flex-between">
        <div>
          <h1 className="heading-2">Dashboard</h1>
          <p className="text-muted">Bugungi kun xulosasi va analitikalar</p>
        </div>
        <div className="flex-center gap-2">
          <button className="btn btn-primary">Xisobot yuklash (PDF)</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
        {stats.map((item, idx) => (
          <div key={idx} className="glass glass-hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
              {item.icon}
            </div>
            <div className="flex-col">
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>{item.label}</span>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
                <span className="heading-2">{item.value}</span>
                {item.trend && <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{item.trend}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginTop: '1rem' }}>
        {/* Recent Check-ins */}
        <div className="glass" style={{ padding: '1.5rem' }}>
          <h3 className="heading-3" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>So'nggi QR Check-in lar</h3>
          <div className="flex-col gap-4">
            {logs.length === 0 ? (
              <p className="text-muted" style={{ padding: '1rem', textAlign: 'center' }}>Hali skaner qilinmadi.</p>
            ) : (
              logs.map((log) => (
              <div key={log.id} className="flex-between animate-fade-in" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
                <div className="flex-center gap-3">
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', overflow: 'hidden' }}>
                    <img src={`https://ui-avatars.com/api/?name=${log.name}&background=8b5cf6&color=fff`} alt="" style={{width:'100%', height:'100%'}} />
                  </div>
                  <div className="flex-col">
                    <span style={{ fontWeight: 500 }}>{log.name}</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>{log.type === 'Teacher' ? log.grade + ' o\'qituvchisi' : log.grade}</span>
                  </div>
                </div>
                <div className="flex-col" style={{ alignItems: 'flex-end' }}>
                  <span className="badge badge-success">{log.time}</span>
                  <span className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>O'z vaqtida</span>
                </div>
              </div>
              ))
            )}
          </div>
        </div>

        {/* Video Review Queue */}
        <div className="glass" style={{ padding: '1.5rem' }}>
          <h3 className="heading-3" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Kutilayotgan Dars Videolari</h3>
          <div className="flex-col gap-4">
            {videos.length === 0 ? (
              <p className="text-muted" style={{ padding: '1rem', textAlign: 'center' }}>Hamma videolar tekshirilgan.</p>
            ) : (
              videos.map((vid, i) => (
              <div key={vid.id} className="flex-between animate-fade-in" style={{ paddingBottom: '1rem', borderBottom: i !== videos.length - 1 ? '1px solid var(--surface-border)' : 'none' }}>
                <div className="flex-center gap-3">
                  <div style={{ width: '48px', height: '36px', borderRadius: '8px', background: 'var(--bg-darker)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Video size={16} color="var(--primary)" />
                  </div>
                  <div className="flex-col">
                    <span style={{ fontWeight: 500 }}>{vid.title}</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>O'qituvchi: {vid.teacher}</span>
                  </div>
                </div>
                <div className="flex-center gap-2">
                  <button onClick={() => handleVideoAction(vid.id, 'accept')} className="btn btn-success" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Qabul</button>
                  <button onClick={() => handleVideoAction(vid.id, 'reject')} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Rad</button>
                </div>
              </div>
              ))
            )}
            {videos.length > 0 && <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem' }}>Barchasini ko'rish</button>}
          </div>
        </div>

      </div>
    </div>
  );
}
