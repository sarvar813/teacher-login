import React, { useState, useEffect } from 'react';
import { Camera, PlayCircle, StopCircle, Clock, QrCode, CheckCircle, AlertCircle, Video, List, Activity, User, LogOut } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [lessonStatus, setLessonStatus] = useState('idle'); // idle, active, ended
  const [videoStatus, setVideoStatus] = useState('idle'); // idle, sent, accepted, rejected

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setProfile(JSON.parse(userStr));
    } else {
      navigate('/'); // if not logged in, boot out
    }
  }, [navigate]);

  const handleScanCode = async (result) => {
    if (result && result.length > 0 && !isCheckedIn) {
      const scannedData = result[0].rawValue;
      try {
        // Haqiqiy backend ga yuborish
        await api.checkIn(scannedData);
        setIsCheckedIn(true);
        setShowScanner(false);
      } catch (err) {
        console.error(err);
        alert("Xato: O'qitishda muammo bo'ldi (yoki bu noto'g'ri QR-Kod). API: /attendance/check-in/");
      }
    }
  };

  const handlePhotoSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideoStatus('sent');
    try {
      // Darslarni tekshirib olib, birinchisiga yuklaymiz. Agar yo'q bo'lsa 1 ga.
      let activeLessonId = 1;
      try {
        const lessons = await api.getLessonsToday();
        if (lessons.results && lessons.results.length > 0) {
          activeLessonId = lessons.results[0].id;
        }
      } catch (err) {
        console.warn("Darslarni olishda xato, default 1 ishlatiladi");
      }

      // Faylni to'g'ridan-to'g'ri FormData sifatida API orqali jo'natamiz
      await api.uploadPhoto(activeLessonId, file);
      setVideoStatus('accepted');
      alert("Muvaffaqiyatli! Rasm adminga yuborildi.");
    } catch(error) {
       console.error("Upload error details:", error);
       alert("Rasm yuborishda xato yuz berdi. Dars raqami topilmagan yoki noto'g'ri bo'lishi mumkin.\n\n" + (error.data ? JSON.stringify(error.data) : error.message));
       setVideoStatus('rejected');
    }
  };
  
  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Top Welcome Section */}
      <div className="glass flex-between" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        <div className="flex-col gap-2">
          <h1 className="heading-2">Xush kelibsiz, {profile?.first_name || profile?.username || "Ustoz"}!</h1>
          <p className="text-muted">Bugungi darslaringiz va statistikangiz bilan tanashing.</p>
        </div>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={40} color="white" />
        </div>
      </div>

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
            <div className="flex-col gap-4">
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Maktabga kelganimni tasdiqlash</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Xonaga kirishdan avval (yoki maktab ostonasida) maktabning maxsus QR kodini o'z telefoningizda skanerlang.
              </p>
              
              {!isCheckedIn ? (
                showScanner ? (
                  <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto', border: '2px solid var(--primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    <Scanner
                      onScan={handleScanCode}
                      onError={(err) => console.log(err)}
                      components={{ audio: false, finder: false }}
                    />
                    <button className="btn btn-outline" style={{ width: '100%', borderRadius: 0, border: 'none', borderTop: '1px solid var(--primary)' }} onClick={() => setShowScanner(false)}>
                      Bekor qilish
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', maxWidth: '250px' }}
                    onClick={() => setShowScanner(true)}
                  >
                    <Camera size={18} /> Skanerni ochish (Telefon)
                  </button>
                )
              ) : (
                <div className="flex-center gap-3 animate-fade-in" style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-md)', color: 'var(--success)' }}>
                  <CheckCircle size={24} />
                  <span>Siz maktabga soat {new Date().toLocaleTimeString()} da yetib keldingiz.</span>
                </div>
              )}
            </div>
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
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Rasm Tasdiq (Dars boshida)</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                Dars boshlanganini tasdiqlash uchun bitta rasm (Dalil) tushiring va yuboring.
              </p>
              <div style={{ position: 'relative' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handlePhotoSelect}
                  disabled={videoStatus === 'sent' || videoStatus === 'accepted'}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
                />
                <button 
                  className="btn btn-outline" 
                  style={{ width: '100%', borderColor: 'var(--primary)', color: 'var(--primary)', opacity: (videoStatus === 'sent' || videoStatus === 'accepted') ? 0.6 : 1 }}
                  disabled={videoStatus === 'sent' || videoStatus === 'accepted'}
                >
                  <Camera size={18} /> {
                    videoStatus === 'sent' ? "Rasm yuborilmoqda..." : 
                    videoStatus === 'accepted' ? "Muvaffaqiyatli qabul qilindi!" : 
                    "Rasm tushish va yuborish"
                  }
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
