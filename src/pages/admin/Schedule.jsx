import React, { useState, useEffect } from 'react';
import { Calendar as CalIcon, Filter, X, Check, Search } from 'lucide-react';

export default function Schedule() {
  const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"];
  const classes = ["8-'A'", "8-'B'", "9-'A'", "9-'B'"];
  
  const subjects = ["Fizika", "Matematika", "Tarix", "Ona tili", "Ingliz tili"];
  const teachers = ["Azizov A.", "Qodirov M.", "Usmonova G.", "Toshmatov V."];

  const [schedule, setSchedule] = useState({});
  const [confirmModal, setConfirmModal] = useState(false);
  
  const [editModal, setEditModal] = useState({
    isOpen: false,
    cls: '',
    day: '',
    subject: '',
    teacher: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('schoolSchedule');
    if (saved) {
      setSchedule(JSON.parse(saved));
    }
  }, []);

  const openEditModal = (cls, day) => {
    const data = schedule[`${cls}-${day}`] || { subject: '', teacher: '' };
    setEditModal({
      isOpen: true,
      cls,
      day,
      subject: data.subject === "Noma'lum Fan" ? "" : data.subject,
      teacher: data.teacher === "Noma'lum O'qituvchi" ? "" : data.teacher
    });
  };

  const handleSaveEdit = () => {
    const newSchedule = { ...schedule };
    const { cls, day, subject, teacher } = editModal;
    
    if (subject.trim() === '' && teacher.trim() === '') {
      delete newSchedule[`${cls}-${day}`];
    } else {
      newSchedule[`${cls}-${day}`] = {
        subject: subject.trim() || "Noma'lum Fan",
        teacher: teacher.trim() || "Noma'lum O'qituvchi"
      };
    }
    
    setSchedule(newSchedule);
    localStorage.setItem('schoolSchedule', JSON.stringify(newSchedule));
    setEditModal({ ...editModal, isOpen: false });
  };

  const generateAutoSchedule = () => {
    const newSchedule = {};
    classes.forEach(cls => {
      days.forEach(day => {
        const rSub = subjects[Math.floor(Math.random() * subjects.length)];
        const rTeach = teachers[Math.floor(Math.random() * teachers.length)];
        newSchedule[`${cls}-${day}`] = { subject: rSub, teacher: rTeach };
      });
    });
    setSchedule(newSchedule);
    localStorage.setItem('schoolSchedule', JSON.stringify(newSchedule));
    setConfirmModal(false);
  };

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%', position: 'relative' }}>
      <div className="flex-between">
        <div>
          <h1 className="heading-2">Dars Jadvali</h1>
          <p className="text-muted">Haftalik umumiy sinflar dars jadvalini ustiga bosib tahrirlang</p>
        </div>
        <div className="flex-center gap-3">
          <button className="btn btn-outline"><Filter size={18}/> Filtrlash</button>
          <button className="btn btn-primary" onClick={() => setConfirmModal(true)}>
            <CalIcon size={18} /> Avtomatik taqsimlash
          </button>
        </div>
      </div>

      <div className="glass" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem', border: '1px solid var(--surface-border)', background: 'var(--bg-darker)' }}>Sinflar \ Kunlar</th>
              {days.map(day => (
                <th key={day} style={{ padding: '1rem', border: '1px solid var(--surface-border)', background: 'var(--bg-darker)' }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <tr key={cls}>
                <td style={{ padding: '1rem', border: '1px solid var(--surface-border)', fontWeight: 'bold' }}>{cls} sinf</td>
                {days.map(day => {
                  const data = schedule[`${cls}-${day}`];
                  return (
                    <td 
                      key={day} 
                      style={{ padding: '1rem', border: '1px solid var(--surface-border)', cursor: 'pointer', transition: 'all 0.2s' }} 
                      className="glass-hover"
                      onClick={() => openEditModal(cls, day)}
                      title="Tahrirlash uchun bosing"
                    >
                      {data ? (
                        <div className="flex-col gap-1">
                          <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>{data.subject}</span>
                          <span className="text-muted" style={{ fontSize: '0.75rem' }}>{data.teacher}</span>
                        </div>
                      ) : (
                        <div className="text-muted" style={{ fontSize: '0.8rem', opacity: 0.5 }}>Dars qo'shish +</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONFIRM MODAL (Avtomatik Taqsimlash) */}
      {confirmModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-fade-in">
          <div className="glass-panel flex-col" style={{ padding: '2rem', width: '100%', maxWidth: '400px', gap: '1.5rem', border: '1px solid var(--surface-border)' }}>
            <h2 className="heading-3" style={{ textAlign: 'center' }}>Diqqat!</h2>
            <p className="text-body" style={{ textAlign: 'center' }}>
              Avtomatik taqsimlash bosilsa, oldingi barcha yozilgan jadval qayta tuziladi va o'chib ketadi. Davom etamizmi?
            </p>
            <div className="grid grid-cols-2 gap-3" style={{ marginTop: '0.5rem' }}>
              <button className="btn btn-outline" onClick={() => setConfirmModal(false)}>Bekor qilish</button>
              <button className="btn btn-danger" onClick={generateAutoSchedule}>Ha, yangilash</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL (Dars qo'shish yoki o'zgartirish) */}
      {editModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-fade-in">
          <div className="glass flex-col" style={{ padding: '2rem', width: '100%', maxWidth: '450px', gap: '1.5rem', background: 'var(--bg-dark)' }}>
            
            <div className="flex-between">
              <h2 className="heading-3">{editModal.cls} sinf, {editModal.day}</h2>
              <button className="btn-outline flex-center" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none' }} onClick={() => setEditModal({ ...editModal, isOpen: false })}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-col gap-4">
              <div className="input-group">
                <label className="input-label">Fan nomi</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Masalan: Fizika" 
                  value={editModal.subject}
                  onChange={(e) => setEditModal({ ...editModal, subject: e.target.value })}
                  style={{ background: 'var(--bg-darker)' }}
                />
              </div>

              <div className="input-group">
                <label className="input-label">O'qituvchi nomi (I.O.F)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Masalan: Azizov A." 
                  value={editModal.teacher}
                  onChange={(e) => setEditModal({ ...editModal, teacher: e.target.value })}
                  style={{ background: 'var(--bg-darker)' }}
                />
              </div>
              <p className="text-muted" style={{ fontSize: '0.8rem' }}>Ikkala maydonni bo'sh qoldirsangiz, dars jadvaldan o'chiriladi.</p>
            </div>

            <div className="flex-center" style={{ justifyContent: 'flex-end', marginTop: '1rem', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={() => setEditModal({ ...editModal, isOpen: false })}>Bekor qilish</button>
              <button className="btn btn-primary" onClick={handleSaveEdit}><Check size={18} /> Saqlash</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
