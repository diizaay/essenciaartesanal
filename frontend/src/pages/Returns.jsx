import React from 'react';
import { RotateCcw, Package, Clock, CheckCircle, Shield, HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Returns = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            DEVOLUÇÕES
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Política de Devoluções
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Queremos que fiques completamente satisfeito com a tua compra.<br />Saiba como devolver um produto de forma simples e rápida.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Processo de Devolução */}
                        <div className="bg-white border border-[var(--color-border)] p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <RotateCcw className="h-6 w-6 text-[var(--color-primary)]" />
                                <h2 className="text-2xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Como Devolver
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="text-center p-6 bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                                    <div className="w-12 h-12 bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        1
                                    </div>
                                    <h3 className="font-bold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Contacte-nos
                                    </h3>
                                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Entre em contacto em até 7 dias
                                    </p>
                                </div>

                                <div className="text-center p-6 bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                                    <div className="w-12 h-12 bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        2
                                    </div>
                                    <h3 className="font-bold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Autorização
                                    </h3>
                                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Receberá instruções detalhadas
                                    </p>
                                </div>

                                <div className="text-center p-6 bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                                    <div className="w-12 h-12 bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        3
                                    </div>
                                    <h3 className="font-bold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Envie
                                    </h3>
                                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Envie o produto
                                    </p>
                                </div>

                                <div className="text-center p-6 bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                                    <div className="w-12 h-12 bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        4
                                    </div>
                                    <h3 className="font-bold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Reembolso
                                    </h3>
                                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Receba o reembolso
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Nossa Política */}
                        <div className="bg-white border border-[var(--color-border)] p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="h-6 w-6 text-[var(--color-primary)]" />
                                <h2 className="text-2xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Nossa Política
                                </h2>
                            </div>

                            <div className="space-y-4 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                <p>
                                    Queremos que fiques completamente satisfeito com a tua compra. Se por algum motivo não estiveres satisfeito,
                                    aceitamos devoluções dentro de <strong className="text-[var(--color-primary)]">7 dias</strong> após a recepção do produto.
                                </p>
                                <p>
                                    Para que a devolução seja aceite, o produto deve estar nas condições originais, sem uso e com todas as etiquetas.
                                </p>
                            </div>
                        </div>

                        {/* Condições para Devolução */}
                        <div className="bg-white border border-[var(--color-border)] p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <CheckCircle className="h-6 w-6 text-[var(--color-primary)]" />
                                <h2 className="text-2xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Condições para Devolução
                                </h2>
                            </div>

                            <ul className="space-y-4 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                <li>Produto em condições originais, sem uso</li>
                                <li>Embalagem original intacta</li>
                                <li>Todas as etiquetas e acessórios incluídos</li>
                                <li>Prazo de 7 dias após a recepção</li>
                            </ul>
                        </div>

                        {/* Reembolso */}
                        <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Package className="h-6 w-6 text-[var(--color-primary)]" />
                                <h2 className="text-2xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Reembolso
                                </h2>
                            </div>

                            <div className="space-y-4 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                <p>
                                    Após recebermos e inspecionarmos o produto devolvido, processaremos o reembolso em até <strong className="text-[var(--color-primary)]">5 dias úteis</strong>.
                                    O valor será creditado no método de pagamento original.
                                </p>
                                <p className="text-sm bg-white p-4 border-l-4 border-[var(--color-primary)]">
                                    <strong>Nota:</strong> Os custos de envio de devolução são da responsabilidade do cliente, exceto em casos de produtos defeituosos ou erro no envio.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Resumo Rápido */}
                        <div className="bg-[var(--color-bg-soft)] p-8 border border-[var(--color-border)]">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="h-6 w-6 text-[var(--color-primary)]" />
                                <h3 className="text-xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Resumo Rápido
                                </h3>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary)]">•</span>
                                    <span><strong>Prazo:</strong> 7 dias após recepção</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary)]">•</span>
                                    <span><strong>Reembolso:</strong> Até 5 dias úteis</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary)]">•</span>
                                    <span><strong>Condição:</strong> Produto sem uso</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary)]">•</span>
                                    <span><strong>Custos:</strong> A cargo do cliente</span>
                                </li>
                            </ul>
                        </div>

                        {/* Precisa de Ajuda */}
                        <div className="bg-white p-8 border border-[var(--color-border)]">
                            <div className="flex items-center gap-3 mb-4">
                                <HelpCircle className="h-6 w-6 text-[var(--color-primary)]" />
                                <h3 className="text-xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Precisa de Ajuda?
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Se tiveres dúvidas sobre o processo de devolução, a nossa equipa está pronta para ajudar.
                            </p>
                            <Link
                                to="/contacto"
                                className="inline-block bg-[var(--color-accent)] text-[var(--color-primary)] px-6 py-3 font-bold text-sm transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white w-full text-center"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Fala Connosco
                            </Link>
                        </div>

                        {/* Links Úteis */}
                        <div className="bg-[var(--color-primary)] text-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="h-6 w-6" />
                                <h3 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Links Úteis
                                </h3>
                            </div>
                            <ul className="space-y-3 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                <li>
                                    <Link to="/envios" className="hover:underline">
                                        → Política de Envios
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="hover:underline">
                                        → Perguntas Frequentes
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/termos" className="hover:underline">
                                        → Termos e Condições
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ajuda" className="hover:underline">
                                        → Central de Ajuda
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns;
