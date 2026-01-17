import React from 'react';
import { Shield, UserCheck, Database, Lock, Share2, Cookie, FileText, Bell, Mail } from 'lucide-react';

const Privacy = () => {
    const sections = [
        {
            icon: Shield,
            title: '1. Introdução',
            content: 'Esta Política de Privacidade explica como a Lia recolhe, usa e protege as tuas informações. Ao aceder ao site ou fazer um pedido, concordas em partilhar os teus dados pessoais conosco. Queremos que te sintas seguro — a privacidade e transparência são muito importantes para nós.'
        },
        {
            icon: Database,
            title: '2. Dados que recolhemos',
            content: 'Podemos recolher diferentes tipos de informação quando usas o nosso website:',
            list: [
                'Nome completo',
                'E-mail',
                'Número de telefone (exemplo: telemóvel ou telefone fixo)',
                'Morada de entrega e de faturação',
                'Dados de navegação (exemplo: o que viste, clicaste, etc.)',
                'Dados de navegação (exemplo: o que viste, clicaste, etc.)'
            ]
        },
        {
            icon: UserCheck,
            title: '3. Como usamos os teus dados',
            content: 'Recolhemos as informações para oferecer uma experiência melhor e personalizada:',
            list: [
                'Processar pedidos e pagamentos',
                'Enviar confirmações e actualizações sobre o pedido',
                'Melhorar a navegação e experiência no site',
                'Enviar comunicações de marketing (apenas se concordares)',
                'Prevenir fraude e garantir segurança'
            ]
        },
        {
            icon: Lock,
            title: '4. Como protegemos os teus dados',
            content: 'Tomamos a segurança dos teus dados a sério. Utilizamos tecnologias modernas e procedimentos de segurança para proteger as tuas informações contra acessos não autorizados.',
            highlight: 'Nunca armazenamos informações completas de cartões de pagamento. Os pagamentos são processados através de plataformas seguras e certificadas.'
        },
        {
            icon: Share2,
            title: '5. Com quem partilhamos os dados',
            content: 'Não vendemos, alugamos ou partilhamos os teus dados pessoais para fins de marketing de terceiros. Apenas partilhamos quando:',
            list: [
                'É necessário para processar o teu pedido',
                'Empresas de envio e entrega precisam da morada',
                'Processadores de pagamento (Google Analytics, Facebook Pixel, etc.)',
                'É exigido por lei ou por autoridades judiciais'
            ]
        },
        {
            icon: Cookie,
            title: '6. Gestão e protecção de dados',
            content: 'Usamos cookies e tecnologias semelhantes para melhorar a tua experiência de navegação. Os cookies ajudam-nos a lembrar as tuas preferências e a analisar o tráfego do site.',
            list: [
                'Cookies técnicos (essenciais para o funcionamento do site)',
                'Cookies de análise (para entender como usas o site)',
                'Adaptar / rejeitar / apagar os cookies'
            ]
        },
        {
            icon: FileText,
            title: '7. Os teus direitos',
            content: 'Tens o controlo total sobre os teus dados. Podes exercer os seguintes direitos a qualquer momento:',
            list: [
                'Aceder aos teus dados',
                'Corrigir dados incorrectos',
                'Pedir a eliminação da conta',
                'Opor-te ao processamento de dados',
                'Descarregar os dados (Google Analytics, etc.)'
            ],
            note: 'Para exercer qualquer direito, contacta-nos através do email: suporte@lia.ao'
        },
        {
            icon: Bell,
            title: '8. Alterações desta política',
            content: 'Podemos actualizar esta Política de Privacidade periodicamente para reflectir mudanças nas nossas práticas ou por motivos legais. Quaisquer alterações serão publicadas nesta página com a data de actualização revista. Recomendamos que revises esta política regularmente.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            PRIVACIDADE
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Política de Privacidade
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        A tua privacidade é prioridade para nós da Lia. Explicámos aqui como recolhemos,<br />tratamos e protegemos os teus dados pessoais ao utilizar este website.
                    </p>
                    <p className="text-sm text-gray-500 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Última actualização: {new Date().toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {sections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <div key={index} className="bg-white border border-[var(--color-border)] p-8 hover:border-[var(--color-accent)] transition-all duration-300">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-[var(--color-primary)] pt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {section.title}
                                        </h2>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {section.content}
                                    </p>

                                    {section.list && (
                                        <ul className="space-y-3 ml-4">
                                            {section.list.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="text-[var(--color-primary)] mt-1">•</span>
                                                    <span className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.highlight && (
                                        <div className="mt-4 bg-[var(--color-bg-soft)] p-4 border-l-4 border-[var(--color-primary)]">
                                            <p className="text-sm text-gray-700 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {section.highlight}
                                            </p>
                                        </div>
                                    )}

                                    {section.note && (
                                        <div className="mt-4 bg-[var(--color-bg-soft-2)] p-4">
                                            <p className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                <strong>Nota:</strong> {section.note}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Resumo rápido */}
                        <div className="bg-[var(--color-bg-soft)] p-8 border border-[var(--color-border)]">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="h-6 w-6 text-[var(--color-primary)]" />
                                <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Resumo rápido
                                </h3>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    <span className="text-[var(--color-primary)] mt-1">✓</span>
                                    <span>Não vendemos os teus dados pessoais</span>
                                </li>
                                <li className="flex items-start gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    <span className="text-[var(--color-primary)] mt-1">✓</span>
                                    <span>Usamos os teus dados para gerir pedidos</span>
                                </li>
                                <li className="flex items-start gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    <span className="text-[var(--color-primary)] mt-1">✓</span>
                                    <span>Podes aceder e apagar os teus dados a qualquer momento</span>
                                </li>
                                <li className="flex items-start gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    <span className="text-[var(--color-primary)] mt-1">✓</span>
                                    <span>Protegemos os teus dados com segurança avançada</span>
                                </li>
                            </ul>
                        </div>

                        {/* Gestão de cookies */}
                        <div className="bg-white p-8 border border-[var(--color-border)]">
                            <div className="flex items-center gap-3 mb-4">
                                <Cookie className="h-6 w-6 text-[var(--color-primary)]" />
                                <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Gestão de cookies
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Podes configurar o teu navegador para recusar ou aceitar cookies. No entanto, algumas funcionalidades do site podem não funcionar correctamente se desactivares os cookies.
                            </p>
                        </div>

                        {/* Ainda com dúvidas */}
                        <div className="bg-[var(--color-primary)] text-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="h-6 w-6" />
                                <h3 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Ainda com dúvidas sobre privacidade?
                                </h3>
                            </div>
                            <p className="text-white/90 text-sm mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Se tens perguntas específicas sobre como tratamos os teus dados ou desejas exercer algum dos teus direitos, contacta-nos.
                            </p>
                            <a
                                href="/contacto"
                                className="inline-block bg-white text-[var(--color-primary)] px-6 py-3 font-bold text-sm transition-all duration-300 hover:bg-[var(--color-accent)] w-full text-center"
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
};

export default Privacy;
