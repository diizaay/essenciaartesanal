import React from 'react';
import { Heart, Users, Star, Palette, ShoppingBag, CheckCircle } from 'lucide-react';

const About = () => (
  <div className="min-h-screen bg-white">
    {/* Hero Section */}
    <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        <div className="inline-block mb-4 px-6 py-2 border-2 border-[var(--color-primary)]">
          <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
            SOBRE NÓS
          </span>
        </div>
        <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          A Essência Artesanal
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Nasceu para fazer a sua casa brilhar. Cada peça é feita à mão com paixão e<br />qualidade premium, trazendo autenticidade e elegância ao seu lar.
        </p>
      </div>
    </div>

    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {/* Satisfação */}
        <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              98%
            </div>
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Satisfação
            </h3>
          </div>
        </div>

        {/* Avaliação */}
        <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-accent)]">
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              4.8★
            </div>
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Avaliação
            </h3>
          </div>
        </div>

        {/* Produtos */}
        <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +200
            </div>
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Produtos
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 pb-20">
        {/* Quem Somos - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-xl border-l-8 border-[var(--color-primary)] mb-8">
            <div className="bg-[var(--color-bg-soft)] p-8 border-b-2 border-[var(--color-border)]">
              <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Quem Somos
              </h2>
            </div>

            <div className="p-8 space-y-6">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Somos uma empresa angolana especializada em produtos artesanais que dão vida e cor aos ambientes. Nosso foco é criar peças únicas, de alta qualidade e com design contemporâneo.
              </p>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Trabalhamos diretamente com artesãos locais, preservando técnicas tradicionais e garantindo que cada item conte uma história.
              </p>

              {/* Lista de Destaques */}
              <div className="bg-[var(--color-bg-soft)] p-6 border-l-4 border-[var(--color-accent)] mt-6">
                <ul className="list-disc list-inside space-y-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <li className="text-gray-700">Produtos exclusivos e diferenciados</li>
                  <li className="text-gray-700">Entregas rápidas em todo o país</li>
                  <li className="text-gray-700">Artesanato feito à mão com materiais premium</li>
                  <li className="text-gray-700">Catálogo diversificado para todos os estilos</li>
                  <li className="text-gray-700">Crescimento constante de novas categorias</li>
                  <li className="text-gray-700">Peças únicas e cuidadosamente cuidadas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* O que nos torna diferentes */}
          <div className="bg-white shadow-xl border-l-8 border-[var(--color-accent)]">
            <div className="bg-[var(--color-bg-soft)] p-8 border-b-2 border-[var(--color-border)]">
              <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                O que nos torna diferentes
              </h2>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Heart, title: 'Autenticidade', desc: 'Cada peça é 100% feita à mão por artesãos angolanos.' },
                  { icon: Star, title: 'Qualidade Premium', desc: 'Materiais selecionados e controlo rigoroso de produção.' },
                  { icon: Users, title: 'Impacto Social', desc: 'Apoio direto a comunidades artesanais locais.' },
                  { icon: Palette, title: 'Experiência', desc: 'Design contemporâneo que combina tradição e modernidade.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg">
                    <item.icon className="h-10 w-10 text-[var(--color-primary)] mb-4" />
                    <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Como trabalhamos */}
          <div className="bg-white p-8 shadow-xl border-2 border-[var(--color-border)]">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Como Trabalhamos
            </h3>
            <div className="space-y-6">
              {[
                { num: '1', title: 'Entendemos a sua visão', desc: 'Conversamos sobre estilo, cores, tamanho e necessidades.' },
                { num: '2', title: 'Apresentamos opções', desc: 'Mostramos propostas e sugestões personalizadas.' },
                { num: '3', title: 'Validamos a escolha', desc: 'Ajustamos detalhes e confirmamos o design final.' },
                { num: '4', title: 'Entrega rápida e segura', desc: 'Enviamos com embalagem cuidadosa e acompanhamento até a entrega.' }
              ].map(step => (
                <div key={step.num} className="border-l-4 border-[var(--color-accent)] pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {step.num}
                    </span>
                    <h4 className="font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Nosso Compromisso */}
          <div className="bg-[var(--color-bg-soft)] border-2 border-[var(--color-border)] p-8 shadow-xl">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nosso Compromisso
            </h3>
            <ul className="list-disc list-inside space-y-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li className="text-gray-700 text-sm">Garantir autenticidade em cada produto</li>
              <li className="text-gray-700 text-sm">Trabalhar apenas com artesãos qualificados</li>
              <li className="text-gray-700 text-sm">Utilizar materiais sustentáveis e de alta qualidade</li>
              <li className="text-gray-700 text-sm">Entregas rápidas e seguras em todo o país</li>
              <li className="text-gray-700 text-sm">Suporte personalizado em todas as etapas</li>
              <li className="text-gray-700 text-sm">Preservar e valorizar a cultura artesanal angolana</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-[var(--color-primary)] text-white p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Pronto para descobrir peças únicas?
            </h3>
            <p className="text-white/90 text-sm mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Explore nossa coleção e traga a essência artesanal para o seu lar.
            </p>
            <div className="space-y-3">
              <a
                href="/produtos"
                className="flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-6 py-3 font-bold text-sm hover:bg-[var(--color-accent)] transition-all duration-300 w-full"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <ShoppingBag className="h-5 w-5" />
                Ver Produtos
              </a>
              <a
                href="/contacto"
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 font-bold text-sm hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 w-full"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Fale Connosco
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
