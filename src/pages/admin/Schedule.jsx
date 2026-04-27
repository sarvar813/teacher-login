import React, { useState, useEffect } from 'react';
import { Calendar as CalIcon, Filter } from 'lucide-react';

export default function Schedule() {
  const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"];
  const classes = ["8-'A'", "8-'B'", "9-'A'", "9-'B'"];
  
  const subjects = ["Fizika", "Matematika", "Tarix", "Ona tili", "Ingliz tili"];
  const teachers = ["Azizov A.", "Qodirov M.", "Usmonova G.", "Toshmatov V."];

  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('schoolSchedule');
    if (saved) {
      setSchedule(JSON.parse(saved));
    }
  }, []);

  const handleCellClick = (cls, day) => {
    const defaultVal = schedule[`${cls}-${day}`] ? `${schedule[`${cls}-${day}`].subject} - ${schedule[`${cls}-${day}`].teacher}` : "";
    const input = window.prompt(`Dars kiritish: ${cls} sinf, ${day}\nFormat: Fan nomi - O'qituvchi nomi (masalan: Matematika - Azizov)`, defaultVal);
    
    if (input !== null) {
      const parts = input.split('-');
      const newSchedule = { ...schedule };
      
      if (input.trim() === '') {
        delete newSchedule[`${cls}-${day}`];
      } else {
        newSchedule[`${cls}-${day}`] = {
          subject: parts[0]?.trim() || "Noma'lum Fan",
          teacher: parts[1]?.trim() || "Noma'lum O'qituvchi"
        };
      }
      
      setSchedule(newSchedule);
      localStorage.setItem('schoolSchedule', JSON.stringify(newSchedule));
    }
  };

  const generateAutoSchedule = () => {
    if (!window.confirm("Barcha darslar avtomatik yangilansinmi? (Eski jadval o'chadi)")) return;
    
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
  };

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%' }}>
      <div className="flex-between">
        <div>
          <h1 className="heading-2">Dars Jadvali</h1>
          <p className="text-muted">Haftalik umumiy sinflar dars jadvalini ustiga bosib tahrirlang</p>
        </div>
        <div className="flex-center gap-3">
          <button className="btn btn-outline"><Filter size={18}/> Filtrlash</button>
          <button className="btn btn-primary" onClick={generateAutoSchedule}><CalIcon size={18} /> Avtomatik taqsimlash</button>
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
                      onClick={() => handleCellClick(cls, day)}
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
    </div>
  );
}
