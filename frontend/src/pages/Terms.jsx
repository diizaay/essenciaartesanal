import React from 'react';
import { FileText, Shield, CreditCard, Package, AlertCircle, Scale, Bell, Mail } from 'lucide-react';

const Terms = () => {
    const sections = [
        {
            icon: FileText,
            title: '1. Aceitação dos Termos',
            content: 'Ao aceder e usar este website, você aceita e concorda em estar vinculado aos termos e condições aqui descritos. Se não concordar com qualquer parte destes termos, não deve usar o nosso website.'
        },
        {
            icon: Shield,
            title: '2. Utilização do site',
            content: 'Este website é fornecido apenas para uso pessoal e não comercial. Você concorda em não usar o website para fins ilegais ou não autorizados, violar quaisquer leis, ou transmitir qualquer material prejudicial ou ofensivo.',
            list: [
                'Fins ilegais ou não autorizados',
                'Violar quaisquer leis locais, nacionais ou internacionais',
                'Transmitir qualquer material prejudicial ou ofensivo'
            ]
        },
        {
            icon: CreditCard,
            title: '3. Conta de utilizador e segurança',
            content: 'Ao criar uma conta no nosso website, você é responsável por manter a confidencialidade da sua informação de login e por todas as actividades que ocorram sob a sua conta.',
            list: [
                'Informar dados verdadeiros e actualizados ao registar-se',
                'Não partilhar as suas credenciais com terceiros',
                'Notificar-nos imediatamente de qualquer uso não autorizado da sua conta'
            ]
        },
        {
            icon: Package,
            title: '4. Pedidos, preço e pagamentos',
            content: 'Fazemos todos os esforços para garantir que as descrições e preços dos produtos sejam precisos. Os preços apresentados incluem IVA quando aplicável.',
            list: [
                'Os preços estão sujeitos a alterações sem aviso prévio',
                'As cores dos produtos podem variar ligeiramente das imagens devido a configurações de ecrã',
                'Reservamo-nos o direito de limitar quantidades por pedido ou por cliente',
                'Todos os preços são em Kwanzas, e não aceitamos devoluções de artigos 100% personalizados'
            ]
        },
        {
            icon: AlertCircle,
            title: '5. Devoluções, trocas e reembolsos',
            content: 'Oferecemos devoluções e trocas, desde que os produtos estejam nas suas condições originais. Você tem um prazo de 7 dias para solicitar devolução ou troca após a recepção do pedido.',
            highlight: 'Produtos personalizados não podem ser devolvidos excepto em casos de defeito de fabrico.'
        },
        {
            icon: Scale,
            title: '6. Propriedade intelectual',
            content: 'Todo o conteúdo deste website, incluindo textos, gráficos, logotipos, imagens, fotografias, vídeos e software, é propriedade da Lia e está protegido pelas leis de direitos autorais, marcas registadas e outras leis de propriedade intelectual.'
        },
        {
            icon: Shield,
            title: '7. Privacidade e protecção de dados',
            content: 'Levamos a sério a protecção dos seus dados pessoais. Recolhemos e utilizamos os seus dados conforme descrito na nossa Política de Privacidade.',
            link: { text: 'Leia a nossa Política de Privacidade', url: '/privacidade' }
        },
        {
            icon: Bell,
            title: '8. Alterações destes Termos',
            content: 'A Lia reserva-se o direito de modificar estes Termos e Condições a qualquer momento sem aviso prévio. Quaisquer alterações entrarão em vigor imediatamente após a publicação no website. Recomendamos que reveja periodicamente estes termos para manter-se informado sobre quaisquer mudanças.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-6 py-2 border-2 border-[var(--color-primary)]">
                        <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            TERMOS & CONDIÇÕES
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Termos de utilização da Lia
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Ao utilizar o nosso site e fazer um pedido, você concorda com os termos abaixo.<br />Lê com atenção - queremos que a tua compra seja informada desde o início.
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
                                <div key={index} className="bg-white border-2 border-[var(--color-border)] p-8 hover:border-[var(--color-accent)] transition-all duration-300">
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

                                    {section.link && (
                                        <a
                                            href={section.link.url}
                                            className="inline-block mt-4 text-[var(--color-primary)] font-semibold hover:underline"
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            {section.link.text} →
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Em resumo */}
                        <div className="bg-[var(--color-bg-soft)] p-8 border-2 border-[var(--color-border)]">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="h-6 w-6 text-[var(--color-primary)]" />
                                <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Em resumo
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Estes termos descrevem como deve utilizar este site, como deve fazer os seus pedidos, as nossas políticas de devolução e mais informações importantes.
                            </p>
                        </div>

                        {/* Ligações úteis */}
                        <div className="bg-white p-8 border-2 border-[var(--color-border)]">
                            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Ligações úteis
                            </h3>
                            <div className="space-y-4">
                                <a href="/privacidade" className="block text-gray-600 hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    → Política de Privacidade
                                </a>
                                <a href="/envios" className="block text-gray-600 hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    → Envios e Entregas
                                </a>
                                <a href="/devolucoes" className="block text-gray-600 hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    → Devoluções e Trocas
                                </a>
                                <a href="/faq" className="block text-gray-600 hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    → Perguntas Frequentes
                                </a>
                            </div>
                        </div>

                        {/* Ainda com dúvidas */}
                        <div className="bg-[var(--color-primary)] text-white p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="h-6 w-6" />
                                <h3 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Ainda com dúvidas sobre estes termos?
                                </h3>
                            </div>
                            <p className="text-white/90 text-sm mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Se tens alguma questão sobre estes Termos e Condições, não hesites em contactar-nos. Estamos aqui para ajudar!
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

export default Terms;
