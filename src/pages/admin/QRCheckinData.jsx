import React, { useState, useEffect } from 'react';
import { Download, QrCode, Search, Loader } from 'lucide-react';
import { api } from '../../api';

export default function QRCheckinData() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAttendanceLogs()
      .then(res => setLogs(res.results || []))
      .catch(err => console.error("Error fetching attendance logs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%' }}>
      <div className="flex-between">
        <div className="flex-center gap-3">
          <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <QrCode size={24} color="var(--primary)" />
          </div>
          <div>
            <h1 className="heading-2">Barcha QR Nazoratlar</h1>
            <p className="text-muted">Turniketdan va o'qituvchilardan o'tgan barcha skaner tarixlari</p>
          </div>
        </div>
        <button className="btn btn-outline" style={{ color: 'var(--success)', borderColor: 'var(--success)' }}>
          <Download size={18} /> Excel ga yuklash
        </button>
      </div>

      <div className="glass flex-col" style={{ flex: 1, padding: '1.5rem', gap: '1rem' }}>
        <div className="input-group" style={{ flexDirection: 'row', width: '300px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" className="input-field" placeholder="Ism orqali izlash..." style={{ paddingLeft: '2.5rem' }} />
          </div>
        </div>

        {loading ? (
           <div className="flex-center" style={{ flex: 1, flexDirection: 'column', gap: '1rem' }}>
              <Loader className="spinner" size={32} color="var(--primary)" />
              <p className="text-muted">Ma'lumotlar backenddan yuklanmoqda...</p>
           </div>
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>Sana</th>
                  <th style={{ padding: '1rem' }}>Kirish / Chiqish vaqti</th>
                  <th style={{ padding: '1rem' }}>O'qituvchi (F.I.O)</th>
                  <th style={{ padding: '1rem' }}>Holati</th>
                  <th style={{ padding: '1rem' }}>Qo'shimcha</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Hozircha hech qanday ma'lumot yo'q.
                    </td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem' }}>{log.date}</td>
                      <td style={{ padding: '1rem' }}>
                        <div>{log.check_in_time ? new Date(log.check_in_time).toLocaleTimeString() : '-'}</div>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{log.check_out_time ? new Date(log.check_out_time).toLocaleTimeString() : ''}</div>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{log.teacher_name}</td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${log.status === 'present' ? 'badge-success' : log.status === 'late' ? 'badge-warning' : 'badge-danger'}`}>
                          {log.status_display || log.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {log.is_late ? <span style={{color:'var(--warning)'}}>{log.late_minutes} daqiqa kechikdi</span> : log.notes || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
