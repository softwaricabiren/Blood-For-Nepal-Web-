import React, { useState } from 'react';

export default function VolunteerForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '' });
  const [status, setStatus] = useState(null);

  function update(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('http://localhost:5000/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', email: '', phone: '', location: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="grid-2">
        <label>
          Name
          <input name="name" value={form.name} onChange={update} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={update} required />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={update} />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={update} />
        </label>
      </div>
      <button className="btn" type="submit">Volunteer</button>
      {status && (
        <p className={status.type === 'success' ? 'success' : 'error'}>{status.message}</p>
      )}
    </form>
  );
}
