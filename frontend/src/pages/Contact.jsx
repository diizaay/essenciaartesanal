import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            APOIO AO CLIENTE
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Fala Connosco
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Estamos aqui para ajudar! Escolhe o teu canal preferido ou envia-nos<br />uma mensagem através do formulário abaixo.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {/* Email Card */}
                    <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Mail className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Email
                            </h3>
                            <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Resposta média: menos de 2 horas
                            </p>
                            <a
                                href="mailto:suporte@essenciaartesanal.ao"
                                className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors font-medium break-all"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                suporte@essenciaartesanal.ao
                            </a>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-accent)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[var(--color-accent)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Phone className="h-10 w-10 text-[var(--color-primary)]" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Telefone
                            </h3>
                            <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Atendimento: Segunda a Sábado
                            </p>
                            <div className="space-y-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                <p className="text-[var(--color-text)] font-medium">+244 926 464 089</p>
                                <p className="text-[var(--color-text)] font-medium">+244 951 868 817</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Card */}
                    <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <MapPin className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Localização
                            </h3>
                            <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Venha visitar-nos
                            </p>
                            <p className="text-[var(--color-text)] font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Luanda, Angola
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-5 gap-8 pb-20">
                    {/* Contact Form - Takes 3 columns */}
                    <div className="lg:col-span-3">
                        <div className="bg-white shadow-xl border-l-8 border-[var(--color-primary)]">
                            <div className="bg-[var(--color-bg-soft)] p-8 border-b-2 border-[var(--color-border)]">
                                <div className="flex items-center gap-3 mb-2">
                                    <MessageCircle className="h-8 w-8 text-[var(--color-primary)]" />
                                    <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Envia uma Mensagem
                                    </h2>
                                </div>
                                <p className="text-[var(--color-muted)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Preenche o formulário abaixo e responderemos em breve
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            Nome Completo *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-all bg-[var(--color-bg-soft)]"
                                            placeholder="João Silva"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-all bg-[var(--color-bg-soft)]"
                                            placeholder="exemplo@email.com"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            Telefone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-all bg-[var(--color-bg-soft)]"
                                            placeholder="923 456 789"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            Assunto
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-all bg-[var(--color-bg-soft)]"
                                            placeholder="Questão sobre produto"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Mensagem *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full border border-[var(--color-border)] px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-all resize-none bg-[var(--color-bg-soft)]"
                                        placeholder="Escreve aqui a tua mensagem..."
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-4 font-bold text-lg transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    <span>Enviar Mensagem</span>
                                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-sm text-[var(--color-muted)] text-center mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    * Campos obrigatórios
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar Info - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Priority Support */}
                        <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] p-8 shadow-xl">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                                    <Clock className="h-6 w-6 text-[var(--color-primary)]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Atendimento Prioritário
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Clientes registados recebem suporte mais rápido e status de pedidos actualizado em tempo real.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white p-8 shadow-xl border border-[var(--color-border)]">
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

                        {/* FAQ Link */}
                        <div className="bg-[var(--color-bg-soft)] p-8 shadow-lg border-l-4 border-[var(--color-accent)]">
                            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Perguntas Frequentes
                            </h3>
                            <p className="text-[var(--color-muted)] text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Talvez a resposta já esteja na nossa central de ajuda.
                            </p>
                            <a
                                href="/faq"
                                className="inline-block bg-[var(--color-accent)] text-[var(--color-primary)] px-6 py-2 font-bold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Ver FAQ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
