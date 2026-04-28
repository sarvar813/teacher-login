import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Loader } from 'lucide-react';
import { api } from '../../api';

export default function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTeachers()
      .then(res => {
        setTeachers(res.results || []);
      })
      .catch(err => console.error("O'qituvchilarni yuklashda xatolik:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ height: '100%' }}>
      <div className="flex-between">
        <div>
          <h1 className="heading-2">O'qituvchilar ro'yxati</h1>
          <p className="text-muted">Haqiqiy baza orqali bog'langan tizim</p>
        </div>
        <button className="btn btn-primary"><Plus size={18} /> Yangi Qo'shish</button>
      </div>

      <div className="glass flex-col" style={{ flex: 1, padding: '1.5rem', gap: '1rem' }}>
        <div className="input-group" style={{ flexDirection: 'row', width: '350px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" className="input-field" placeholder="Ism yoki fan bo'yicha izlash..." style={{ paddingLeft: '2.5rem' }} />
          </div>
        </div>

        {loading ? (
          <div className="flex-center" style={{ flex: 1, flexDirection: 'column', gap: '1rem' }}>
            <Loader className="spinner" size={32} color="var(--primary)" />
            <p className="text-muted">Bazadan yuklanmoqda...</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>O'qituvchi logini (I.O.F)</th>
                  <th style={{ padding: '1rem' }}>Username (Login)</th>
                  <th style={{ padding: '1rem' }}>Telefon raqami</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {teachers.length === 0 ? (
                  <tr>
                     <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Hech qanday o'qituvchi topilmadi
                     </td>
                  </tr>
                ) : teachers.map(teacher => (
                  <tr key={teacher.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div className="flex-center gap-3" style={{ justifyContent: 'flex-start' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', overflow: 'hidden' }}>
                          <img src={`https://ui-avatars.com/api/?name=${teacher.full_name || teacher.username}&background=6366f1&color=fff`} alt="" style={{width:'100%', height:'100%'}} />
                        </div>
                        <span style={{ fontWeight: 500 }}>{teacher.full_name || 'Ism kiritilmagan'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>@{teacher.username}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{teacher.phone || '-'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${teacher.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                        {teacher.status || 'active'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div className="flex-center gap-2" style={{ justifyContent: 'flex-start' }}>
                        <button className="btn-outline flex-center" style={{ padding: '0.4rem', borderRadius: '8px', color: 'var(--accent)', borderColor: 'var(--surface-border)' }}>
                          <Edit size={16} />
                        </button>
                        <button className="btn-outline flex-center" style={{ padding: '0.4rem', borderRadius: '8px', color: 'var(--danger)', borderColor: 'var(--surface-border)' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
