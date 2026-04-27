import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QRTerminal() {
  const navigate = useNavigate();
  const [lastScan, setLastScan] = useState(null);

  const handleScan = (result) => {
    if (result && result.length > 0) {
      const scannedData = result[0].rawValue;
      
      // Simulate checking DB
      const newScan = {
        id: Date.now(),
        data: scannedData,
        time: new Date().toLocaleTimeString(),
        type: scannedData.includes('teacher') ? 'Teacher' : 'O\'quvchi',
        name: scannedData.includes('teacher') ? 'Azizov Alisher' : 'Azamat Qodirov',
        grade: scannedData.includes('teacher') ? 'Matematika' : '8-"B" sinf',
        status: 'success'
      };

      setLastScan(newScan);
      
      // Save globally for Admin/Director dashboard to listen
      const existingLogs = JSON.parse(localStorage.getItem('checkinLogs') || '[]');
      localStorage.setItem('checkinLogs', JSON.stringify([newScan, ...existingLogs]));

      // Clear the message after 3 seconds
      setTimeout(() => setLastScan(null), 3000);
    }
  };

  return (
    <div className="flex-center flex-col animate-fade-in" style={{ height: '100vh', background: 'var(--bg-darker)' }}>
      
      <button 
        onClick={() => navigate('/')} 
        className="btn btn-outline" 
        style={{ position: 'absolute', top: '1rem', left: '1rem' }}
      >
        <ArrowLeft size={18} /> Orqaga
      </button>

      <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <h1 className="heading-2" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Maktab Turniketi</h1>
        <p className="text-muted" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          O'quvchi yoki O'qituvchilar kameraga QR kodini tuting
        </p>

        <div style={{ width: '300px', height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '2px solid var(--primary)', position: 'relative' }}>
          <Scanner 
            onScan={handleScan}
            onError={(e) => console.log(e)}
            formats={['qr_code']}
          />
        </div>

        <div style={{ marginTop: '2rem', minHeight: '80px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          {lastScan ? (
             <div className="animate-fade-in flex-center" style={{ 
               background: 'rgba(34, 197, 94, 0.1)', 
               border: '1px solid var(--success)',
               color: 'var(--success)',
               padding: '1rem',
               borderRadius: 'var(--radius-md)',
               width: '100%',
               gap: '1rem'
             }}>
                <CheckCircle size={32} />
                <div className="flex-col">
                  <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>{lastScan.name}</span>
                  <span style={{ fontSize: '0.9rem' }}>{lastScan.grade} | Muvaffaqiyatli - {lastScan.time}</span>
                </div>
             </div>
          ) : (
            <div className="flex-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <AlertTriangle size={20} />
              <span>QR kod kutilmoqda...</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
