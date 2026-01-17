import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqCategories = [
        {
            category: 'PEDIDOS & PAGAMENTOS',
            questions: [
                {
                    question: 'Que métodos de pagamento posso usar?',
                    answer: 'Aceitamos transferência bancária, Multicaixa e pagamento à cobrança. Durante o checkout, poderá escolher o método que melhor se adequa às suas necessidades.'
                },
                {
                    question: 'O meu pagamento não foi confirmado. O que faço?',
                    answer: 'Se o pagamento não for confirmado em até 24h, entre em contacto connosco com o comprovativo. A nossa equipa verificará e actualizará o status do pedido rapidamente.'
                },
                {
                    question: 'Como posso acompanhar o meu pedido?',
                    answer: 'Após a confirmação do pedido, enviaremos um código de rastreamento para o seu email. Pode usar este código para acompanhar a entrega em tempo real.'
                },
                {
                    question: 'Posso cancelar o meu pedido?',
                    answer: 'Pedidos podem ser cancelados em até 24h após a confirmação. Depois desse prazo, se o produto já estiver em preparação, não será possível cancelar.'
                }
            ]
        },
        {
            category: 'ENVIOS & ENTREGAS',
            questions: [
                {
                    question: 'Quanto tempo demora a entrega?',
                    answer: 'O prazo de entrega varia entre 2 a 5 dias úteis para Luanda e 5 a 10 dias úteis para outras províncias. Prazos podem variar em campanhas especiais.'
                },
                {
                    question: 'Qual é o prazo de entrega?',
                    answer: 'Em Luanda zona urbana: 2-5 dias. Luanda periferia: 3-7 dias. Outras províncias: 5-10 dias úteis. Envios express também disponíveis mediante consulta.'
                },
                {
                    question: 'Fazem entregas em todo o país?',
                    answer: 'Sim, fazemos entregas em todas as províncias de Angola. Os prazos e custos variam conforme a localização.'
                },
                {
                    question: 'Posso agendar a entrega para uma data/hora específica?',
                    answer: 'Actualmente não oferecemos agendamento de data/hora exacta, mas pode deixar instruções especiais no campo de observações durante o checkout.'
                }
            ]
        },
        {
            category: 'DEVOLUÇÕES & TROCAS',
            questions: [
                {
                    question: 'Posso devolver um produto?',
                    answer: 'Sim, aceitamos devoluções em até 7 dias após a recepção, desde que o produto esteja nas condições originais, sem uso e com a embalagem intacta.'
                },
                {
                    question: 'O que faço se o produto chegar danificado?',
                    answer: 'Entre em contacto connosco imediatamente com fotos do produto e da embalagem. Faremos a troca ou reembolso sem custos adicionais para si.'
                },
                {
                    question: 'Quanto tempo leva para uma troca ser concluída?',
                    answer: 'Após recebermos o produto devolvido, o processo de troca leva entre 5-7 dias úteis. Receberá actualizações por email em cada etapa.'
                }
            ]
        },
        {
            category: 'PRODUTOS & STOCK',
            questions: [
                {
                    question: 'Os produtos são feitos artesanalmente?',
                    answer: 'Sim, todos os nossos produtos são feitos à mão por artesãos locais angolanos, garantindo peças únicas e de alta qualidade com técnicas tradicionais.'
                },
                {
                    question: 'Os produtos neon são recarregáveis ou precisam de bateria?',
                    answer: 'Os nossos produtos neon funcionam ligados à corrente eléctrica (220V). Não necessitam de bateria e incluem transformador adequado.'
                },
                {
                    question: 'Posso personalizar um produto?',
                    answer: 'Alguns produtos permitem personalização de cores, tamanhos ou detalhes. Entre em contacto connosco para discutir as suas necessidades específicas e orçamento.'
                },
                {
                    question: 'O stock apresentado no site é actualizado?',
                    answer: 'Sim, o nosso stock é actualizado em tempo real. Se um produto aparecer disponível, significa que temos em stock nesse momento.'
                }
            ]
        },
        {
            category: 'CONTA & SUPORTE',
            questions: [
                {
                    question: 'Preciso de criar conta para fazer uma compra?',
                    answer: 'Não é obrigatório criar conta. Pode fazer compras como visitante, mas ter uma conta permite acompanhar pedidos e ter checkout mais rápido.'
                },
                {
                    question: 'Como entro em contacto com o suporte?',
                    answer: 'Pode contactar-nos por email, WhatsApp ou através da página "Fala Connosco". Respondemos normalmente em menos de 2 horas em dias úteis.'
                },
                {
                    question: 'A Lia atende empresas e eventos?',
                    answer: 'Sim, trabalhamos com empresas e eventos. Para orçamentos personalizados e grandes quantidades, entre em contacto directo com a nossa equipa comercial.'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            FAQ • APOIO AO CLIENTE
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Perguntas frequentes sobre a Lia
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Reunimos as dúvidas mais comuns sobre pagamentos, entregas, produtos e suporte<br />para facilitar a tua experiência. Se não encontrares a resposta aqui, a nossa equipa está pronta para ajudar.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                {/* Quick Access Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <a href="#pedidos" className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                <HelpCircle className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                TODAS AS CATEGORIAS
                            </h3>
                            <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Vê as dúvidas mais comuns em todas as categorias de ajuda
                            </p>
                        </div>
                    </a>

                    <a href="/contacto" className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-accent)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                <MessageCircle className="h-8 w-8 text-[var(--color-primary)]" />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                FALAR COM A EQUIPA
                            </h3>
                            <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Envia mensagem directa para esclarecimento personalizado
                            </p>
                        </div>
                    </a>

                    <a href="tel:+244926464089" className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                <Phone className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                AINDA COM DÚVIDAS?
                            </h3>
                            <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Vai à nossa página de FAQ ou fala directamente com equipa
                            </p>
                        </div>
                    </a>
                </div>

                {/* FAQ Categories */}
                <div className="pb-20">
                    <div className="space-y-12">
                        {faqCategories.map((category, catIndex) => (
                            <div key={catIndex} className="bg-white shadow-xl border-l-8 border-[var(--color-primary)]">
                                <div className="bg-[var(--color-bg-soft)] p-8 border-b-2 border-[var(--color-border)]">
                                    <h2 className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {category.category}
                                    </h2>
                                </div>

                                <div className="p-8">
                                    <div className="space-y-4">
                                        {category.questions.map((faq, index) => {
                                            const globalIndex = `${catIndex}-${index}`;
                                            const isOpen = openIndex === globalIndex;

                                            return (
                                                <div
                                                    key={index}
                                                    className="border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300"
                                                >
                                                    <button
                                                        onClick={() => toggleFAQ(globalIndex)}
                                                        className="w-full p-6 flex items-center justify-between text-left hover:bg-[var(--color-bg-soft)] transition-colors"
                                                    >
                                                        <h3 className="text-lg font-bold text-[var(--color-primary)] pr-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                            {faq.question}
                                                        </h3>
                                                        <ChevronDown
                                                            className={`h-6 w-6 text-[var(--color-primary)] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                                                }`}
                                                        />
                                                    </button>

                                                    <div
                                                        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                                                            }`}
                                                    >
                                                        <div className="px-6 pb-6 border-t-2 border-[var(--color-border)] pt-4">
                                                            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 bg-[var(--color-primary)] text-white p-12 shadow-xl text-center">
                        <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Não encontrou a resposta que procura?
                        </h3>
                        <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Entre em contacto connosco e teremos todo o gosto em ajudar!
                        </p>
                        <a
                            href="/contacto"
                            className="inline-block bg-white text-[var(--color-primary)] px-10 py-4 font-bold text-lg transition-all duration-300 hover:bg-[var(--color-accent)] hover:shadow-xl"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Fale Connosco
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
