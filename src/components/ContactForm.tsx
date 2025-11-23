'use client';

import type { FormEvent } from 'react';

export function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // TODO: Replace with backend submission
    // eslint-disable-next-line no-console
    console.log('Contact form submission', Object.fromEntries(formData.entries()));
    alert('Thanks! We will reach out shortly.');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="grid">
        <label>
          <div>Name</div>
          <input name="name" required className="panel" style={{ width: '100%', marginTop: '0.35rem' }} />
        </label>
        <label>
          <div>Company</div>
          <input name="company" required className="panel" style={{ width: '100%', marginTop: '0.35rem' }} />
        </label>
      </div>

      <div className="grid">
        <label>
          <div>Email</div>
          <input type="email" name="email" required className="panel" style={{ width: '100%', marginTop: '0.35rem' }} />
        </label>
        <label>
          <div>Industry</div>
          <input name="industry" className="panel" style={{ width: '100%', marginTop: '0.35rem' }} />
        </label>
      </div>

      <label>
        <div>Message</div>
        <textarea name="message" rows={4} className="panel" style={{ width: '100%', marginTop: '0.35rem' }} />
      </label>

      <p className="muted" style={{ marginTop: '0.75rem' }}>
        This form is static. Submissions will be wired to a backend in a future iteration.
      </p>

      <button type="submit" className="cta-button" style={{ marginTop: '1rem' }}>
        Request Early Access
      </button>
    </form>
  );
}
