import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

const columns = [
  {
    title: 'Links rápidos',
    links: [
      { label: 'Início', to: '/' },
      { label: 'Produtos', to: '/produtos' },
      { label: 'Sobre nós', to: '/sobre' },
      { label: 'Fala connosco', to: '/contacto' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Central de ajuda', to: '/ajuda' },
      { label: 'Envios e entregas', to: '/envios' },
      { label: 'Devoluções', to: '/devolucoes' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos e condições', to: '/termos' },
      { label: 'Política de privacidade', to: '/privacidade' },
    ],
  },
];

const Footer = () => (
  <footer className="px-4 sm:px-6 lg:px-8 bg-white border-t border-[var(--color-border-soft)]">
    <div className="max-w-[1200px] mx-auto py-16 space-y-12">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        {/* Logo e Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2" aria-label="Ir para a página inicial">
            <img src="/logo.png" alt="Essência Artesanal" className="h-12 w-auto" />
          </Link>
          <div className="space-y-3 text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
              <span>Luanda, Angola</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0" />
              <a href="tel:+244951868817" className="hover:text-[var(--color-primary)] transition-colors">
                +244 926 464 089 | 951 868 817
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
              <a href="mailto:suporte@essenciaartesanal.ao" className="hover:text-[var(--color-primary)] transition-colors">
                suporte@essenciaartesanal.ao
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://www.instagram.com/essencia_artesanal0ficial?igsh=aDF3aDM0d2V0anM0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Essência Artesanal"
              className="text-gray-600 hover:text-[var(--color-primary)] transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100095310111884"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Essência Artesanal"
              className="text-gray-600 hover:text-[var(--color-primary)] transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@essenciaartesanal?_r=1&_t=ZG-92H2VrcoOmm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Essência Artesanal"
              className="text-gray-600 hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Colunas de Links */}
        {columns.map((column) => (
          <div key={column.title} className="space-y-4">
            <h4 className="text-base font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {column.title}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-[var(--color-primary)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="border-t border-[var(--color-border-soft)] pt-6 text-center text-sm text-gray-600 space-y-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <p>© {new Date().getFullYear()} Essência Artesanal · Todos os direitos reservados</p>
        <p>
          Desenvolvido por{' '}
          <a
            href="https://pontocriativo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline transition-all"
            style={{ color: '#0853A6' }}
          >
            CriaTec
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
