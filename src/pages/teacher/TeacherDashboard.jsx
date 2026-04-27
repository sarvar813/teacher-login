import React, { useState } from 'react';
import { Camera, PlayCircle, StopCircle, Clock, QrCode, CheckCircle, AlertCircle } from 'lucide-react';

export default function TeacherDashboard() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lessonStatus, setLessonStatus] = useState('idle'); // idle, active, ended
  
  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div className="flex-between">
        <div>
          <h1 className="heading-2">Mening Holatim</h1>
          <p className="text-muted">Bugungi darslar va vazifalar</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isCheckedIn ? (
            <div className="badge badge-success flex-center gap-1" style={{ padding: '0.5rem 1rem' }}>
              <CheckCircle size={16} /> Maktabda (08:15 kirdi)
            </div>
          ) : (
            <div className="badge badge-warning flex-center gap-1" style={{ padding: '0.5rem 1rem' }}>
              <AlertCircle size={16} /> Kelmadi
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
        
        {/* QR Check in Section */}
        <div className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ 
            width: '100px', height: '100px', 
            background: isCheckedIn ? 'rgba(34, 197, 94, 0.1)' : 'rgba(99, 102, 241, 0.1)', 
            borderRadius: '50%', 
            marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <QrCode size={48} color={isCheckedIn ? "var(--success)" : "var(--primary)"} />
          </div>
          <h2 className="heading-3 mb-2">{isCheckedIn ? "Muvaffaqiyatli Check-in!" : "QR orqali Check-in"}</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>
            {isCheckedIn ? "Siz jismonan maktabda ekanligingiz tasdiqlandi. Endi darsni boshlashingiz mumkin." : "Maktabga kelganingizni tasdiqlash uchun admin bergan QR kodni skanerlang."}
          </p>
          
          <button 
            className={`btn ${isCheckedIn ? 'btn-outline' : 'btn-primary'}`} 
            style={{ width: '100%', maxWidth: '250px' }}
            onClick={() => setIsCheckedIn(!isCheckedIn)}
          >
            <Camera size={18} /> 
            {isCheckedIn ? "Skanerni qayta ochish" : "Kamerani ochish va skanerlash"}
          </button>
        </div>

        {/* Current Lesson Action Section */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>Hozirgi Dars: 8 "B" sinf</h3>
          <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Fan: Fizika | Vaqt: 08:30 - 09:15</p>

          <div className="flex-col gap-4">
            
            <div className="flex-between" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div className="flex-center gap-2">
                <Clock size={20} color="var(--primary)" />
                <span style={{ fontWeight: 500 }}>Dars holati:</span>
              </div>
              <span className={`badge ${lessonStatus === 'active' ? 'badge-primary' : lessonStatus === 'ended' ? 'badge-success' : 'badge-warning'}`}>
                {lessonStatus === 'active' ? 'Dars ketmoqda...' : lessonStatus === 'ended' ? 'Yakunlangan' : 'Kutilmoqda'}
              </span>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem', marginTop: '1rem' }}>
              <button 
                className={`btn ${lessonStatus === 'active' ? 'btn-outline' : 'btn-primary'}`}
                disabled={!isCheckedIn || lessonStatus === 'ended'}
                onClick={() => setLessonStatus('active')}
                style={{ opacity: (!isCheckedIn || lessonStatus === 'ended') ? 0.5 : 1 }}
              >
                <PlayCircle size={20} /> Start Lesson
              </button>
              
              <button 
                className={`btn ${lessonStatus === 'active' ? 'btn-danger' : 'btn-outline'}`}
                disabled={lessonStatus !== 'active'}
                onClick={() => setLessonStatus('ended')}
                style={{ opacity: lessonStatus !== 'active' ? 0.5 : 1 }}
              >
                <StopCircle size={20} /> End Lesson
              </button>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--surface-border)' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Video Tasdiq (Dars boshida)</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                Dars boshlanganini tasdiqlash uchun 1-2 minutlik sinf muhiti va o'quvchilar ko'rinib turgan video yuboring.
              </p>
              <button 
                className="btn btn-outline" 
                style={{ width: '100%', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                disabled={lessonStatus !== 'active'}
              >
                <Video size={18} /> Video yozib olish va yuborish
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
