import React from 'react';
import { HelpCircle, MessageCircle, Phone, Package, RefreshCw, CreditCard, Clock, Mail, ChevronRight } from 'lucide-react';

const Help = () => (
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
            <div className="max-w-[1200px] mx-auto text-center relative z-10">
                <div className="inline-block mb-4 px-6 py-2 border-2 border-[var(--color-primary)]">
                    <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        APOIO AO CLIENTE
                    </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Central de Ajuda
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Encontra respostas rápidas sobre pedidos, entregas, pagamentos e devoluções.<br />Se precisares, a nossa equipa está sempre a um clique de distância.
                </p>
            </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                {/* FAQ Card */}
                <a href="/faq" className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <HelpCircle className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Perguntas Frequentes
                        </h3>
                        <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Vê as dúvidas mais comuns sobre entregas, pagamentos e utilização da Essência Artesanal
                        </p>
                        <span className="text-[var(--color-primary)] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Ver FAQ <ChevronRight className="h-4 w-4" />
                        </span>
                    </div>
                </a>

                {/* Contact Card */}
                <a href="/contacto" className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-accent)]">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[var(--color-accent)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <MessageCircle className="h-10 w-10 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Falar com a Equipa
                        </h3>
                        <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Envia uma mensagem por email ou WhatsApp, chat para esclarecimento personalizado
                        </p>
                        <span className="text-[var(--color-primary)] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Ir para Fala Connosco <ChevronRight className="h-4 w-4" />
                        </span>
                    </div>
                </a>

                {/* Phone Card */}
                <a href="tel:+244926464089" className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Phone className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Tempo médio de resposta
                        </h3>
                        <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Em dias úteis, a maioria das mensagens enviadas pela Essência Artesanal é respondida em menos de 2 horas
                        </p>
                        <span className="text-[var(--color-primary)] font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Para pedidos urgentes, menciona isso na mensagem
                        </span>
                    </div>
                </a>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 pb-20">
                {/* Topics Section - Takes 2 columns */}
                <div className="lg:col-span-2">
                    <div className="bg-white shadow-xl border-l-8 border-[var(--color-primary)]">
                        <div className="bg-[var(--color-bg-soft)] p-8 border-b-2 border-[var(--color-border)]">
                            <h2 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Tópicos Principais
                            </h2>
                            <p className="text-[var(--color-muted)] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Explora as áreas mais procuradas pelos nossos clientes
                            </p>
                        </div>

                        <div className="p-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Envios e entregas */}
                                <a href="/envios" className="group p-6 border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[var(--color-bg-soft)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                                            <Package className="h-6 w-6 text-[var(--color-primary)]" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Envios e entregas
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Prazos médios de entrega, zonas cobertas, taxas de envio e agendamento de entregas e curtas promoções.
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] font-semibold mt-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Ver detalhes <ChevronRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </a>

                                {/* Devoluções e trocas */}
                                <a href="/devolucoes" className="group p-6 border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[var(--color-bg-soft)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                                            <RefreshCw className="h-6 w-6 text-[var(--color-primary)]" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Devoluções e trocas
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Como solicitar frases, prazos de devolução, condições para produtos e o processo de reembolso.
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] font-semibold mt-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Ver políticas <ChevronRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </a>

                                {/* Pagamentos e Multicaixa */}
                                <a href="/faq" className="group p-6 border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[var(--color-bg-soft)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                                            <CreditCard className="h-6 w-6 text-[var(--color-primary)]" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Pagamentos e Multicaixa
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Tipos de pagamento aceites (Multicaixa e outras opções), como é processado em todas e segurança.
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] font-semibold mt-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Detalhes completos na seção de FAQ <ChevronRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </a>

                                {/* Pedidos e estado de encomenda */}
                                <a href="/faq" className="group p-6 border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[var(--color-bg-soft)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                                            <Clock className="h-6 w-6 text-[var(--color-primary)]" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Pedidos e estado de encomenda
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Como acompanhar o pedido de encomenda, alterar um pedido, e sobre actualizações de estado em tempo real. Mais pedido(s)?"
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] font-semibold mt-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                Assistir "A minha conta" e Mapa pedido(s)!" <ChevronRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Takes 1 column */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Quick Tips */}
                    <div className="bg-[var(--color-bg-soft)] border-2 border-[var(--color-border)] p-8 shadow-xl">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                                <Mail className="h-6 w-6 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Dica rápida
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Queres mais detalhes enviares no primeiro contacto (data ou evento, local, tipo de festa, número de convidados), mais rápido conseguiremos indicar o kit ideal de produtos neon.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-white p-8 shadow-xl border-2 border-[var(--color-border)]">
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Horário de Atendimento
                        </h3>
                        <div className="space-y-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)]">
                                <span className="font-semibold text-[var(--color-text)]">Segunda - Sexta</span>
                                <span className="text-[var(--color-muted)]">9h - 20h</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)]">
                                <span className="font-semibold text-[var(--color-text)]">Sábado</span>
                                <span className="text-[var(--color-muted)]">9h - 18h</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-[var(--color-text)]">Domingo</span>
                                <span className="text-[var(--color-primary)] font-bold">Encerrado</span>
                            </div>
                        </div>
                    </div>

                    {/* Still Need Help */}
                    <div className="bg-[var(--color-primary)] text-white p-8 shadow-xl">
                        <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Ainda precisas de ajuda?
                        </h3>
                        <p className="text-white/90 text-sm mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            A nossa equipa está pronta para responder às tuas questões. Contacta-nos!
                        </p>
                        <a
                            href="/contacto"
                            className="inline-block bg-white text-[var(--color-primary)] px-6 py-3 font-bold text-sm hover:bg-[var(--color-accent)] transition-all duration-300 w-full text-center"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Fala Connosco
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Help;
