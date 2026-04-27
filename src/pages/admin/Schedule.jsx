import React from 'react';
import { Calendar as CalIcon, Filter } from 'lucide-react';

export default function Schedule() {
  const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"];
  const classes = ["8-'A'", "8-'B'", "9-'A'", "9-'B'"];

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%' }}>
      <div className="flex-between">
        <div>
          <h1 className="heading-2">Dars Jadvali</h1>
          <p className="text-muted">Haftalik umumiy sinflar dars jadvalini boshqarish</p>
        </div>
        <div className="flex-center gap-3">
          <button className="btn btn-outline"><Filter size={18}/> Filtrlash</button>
          <button className="btn btn-primary"><CalIcon size={18} /> Avtomatik taqsimlash</button>
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
                {days.map(day => (
                  <td key={day} style={{ padding: '1rem', border: '1px solid var(--surface-border)', cursor: 'pointer' }} className="glass-hover">
                    <div className="flex-col gap-1">
                      <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>{["Fizika", "Matematika", "Tarix", "Ona tili"][Math.floor(Math.random()*4)]}</span>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{["Azizov A.", "Qodirov M.", "Usmonova G."][Math.floor(Math.random()*3)]}</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
