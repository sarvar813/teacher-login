import React, { useState, useEffect } from 'react';
import { Video, Check, X, Eye } from 'lucide-react';

export default function VideoReviewList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadVideos = () => {
      const vids = JSON.parse(localStorage.getItem('pendingVideos') || '[]');
      setVideos(vids);
    };
    loadVideos();
    window.addEventListener('storage', loadVideos);
    return () => window.removeEventListener('storage', loadVideos);
  }, []);

  const handleAction = (id, action) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    localStorage.setItem('pendingVideos', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%' }}>
      <div className="flex-between">
        <div>
          <h1 className="heading-2">Video Tasdiqlash Arxivlari</h1>
          <p className="text-muted">Dars jarayoniga oid yuborilgan barcha isbot videolar</p>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
        {videos.length === 0 ? (
           <div className="glass flex-center" style={{ padding: '3rem', gridColumn: 'span 2' }}>
              <p className="text-muted">Kutilayotgan videolar yo'q.</p>
           </div>
        ) : videos.map(vid => (
          <div key={vid.id} className="glass flex-col" style={{ padding: '1.5rem', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--warning)' }}></div>
            
            <div className="flex-between">
              <span className="badge badge-warning">Tekshirish kutilmoqda</span>
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>{new Date(vid.id).toLocaleTimeString()}</span>
            </div>

            <div className="flex-center" style={{ background: 'rgba(0,0,0,0.4)', height: '160px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <Video size={48} color="rgba(255,255,255,0.2)" />
            </div>

            <div>
              <h3 className="heading-3" style={{ fontSize: '1.2rem' }}>{vid.title}</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>Yubordi: {vid.teacher}</p>
            </div>

            <div className="flex-between" style={{ marginTop: '0.5rem', gap: '1rem' }}>
              <button className="btn btn-outline" style={{ flex: 1 }}><Eye size={16} /> Ko'rish</button>
              <button onClick={() => handleAction(vid.id, 'accept')} className="btn btn-success" style={{ padding: '0.75rem' }}><Check size={18} /></button>
              <button onClick={() => handleAction(vid.id, 'reject')} className="btn btn-danger" style={{ padding: '0.75rem' }}><X size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
