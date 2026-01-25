import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  function update(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', email: '', message: '' });
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
      </div>
      <label>
        Message
        <textarea name="message" rows="4" value={form.message} onChange={update} required />
      </label>
      <button className="btn" type="submit">Send Message</button>
      {status && (
        <p className={status.type === 'success' ? 'success' : 'error'}>{status.message}</p>
      )}
    </form>
  );
}
