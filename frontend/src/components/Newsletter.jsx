import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', message: 'Insira um e-mail válido.' });
      return;
    }
    setStatus({ type: 'success', message: 'Inscrito com sucesso!' });
    setEmail('');
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-[1200px] mx-auto border border-[var(--color-border-soft)] bg-white p-8 sm:p-10 md:p-12 grid gap-8 md:gap-10 lg:grid-cols-[1.1fr_0.9fr] shadow-lg">
        <div className="bg-[var(--color-bg-soft)] overflow-hidden fade-in">
          <img
            src="DSC_0050.webp"
            alt="Coleção de cerâmicas claras"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-6">
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-primary)] font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            BOLETIM INFORMATIVO
          </span>
          <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Receba as últimas informações e ofertas especiais
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Histórias do ateliê, pré-venda de coleções e vantagens exclusivas apenas para assinantes.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu e-mail"
              className="flex-1 border-2 border-gray-300 px-5 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              aria-label="Digite seu e-mail"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-95 uppercase tracking-wide shadow-md"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Inscrever-se
              <Send className="h-4 w-4" />
            </button>
          </form>
          {status && (
            <div
              className={`flex items-center gap-2 text-sm ${status.type === 'success' ? 'text-[var(--color-primary)]' : 'text-red-500'
                }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
              role="status"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{status.message}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
