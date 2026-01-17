import React from 'react';
import { Package, Truck, MapPin, Clock, DollarSign, ShieldCheck } from 'lucide-react';

const Shipping = () => (
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[var(--color-bg-soft)] py-20 px-4">
            <div className="max-w-[1200px] mx-auto text-center relative z-10">
                <div className="inline-block mb-4 px-6 py-2 border border-[var(--color-primary)]">
                    <span className="text-[var(--color-primary)] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        ENVIOS & ENTREGAS
                    </span>
                </div>
                <h1 className="text-5xl md:text-5xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Como funcionam os envios da Lia
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Aqui encontras as informações sobre prazos, zonas de entrega e condições especiais<br />para pedidos neon. Se ainda tiveres dúvidas, podes sempre falar com a nossa equipa de apoio ao cliente.
                </p>
            </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
            {/* Process Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
                {/* Processamento */}
                <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                            <Package className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Processamento
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Pedidos processados em 1-2 dias úteis após confirmação do pagamento
                        </p>
                    </div>
                </div>

                {/* Envio */}
                <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-accent)]">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                            <Truck className="h-8 w-8 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Envio
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Transportadoras confiáveis para garantir produtos em perfeito estado
                        </p>
                    </div>
                </div>

                {/* Cobertura */}
                <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-primary)]">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                            <MapPin className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Cobertura
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Fazemos entregas em todas as províncias de Angola
                        </p>
                    </div>
                </div>

                {/* Rastreamento */}
                <div className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-[var(--color-accent)]">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                            <Clock className="h-8 w-8 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Rastreamento
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Código de rastreamento para acompanhar o seu pedido
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 pb-20">
                {/* Prazos e Modalidades - Takes 2 columns */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Prazos de Entrega */}
                    <div className="bg-white shadow-xl border-l-8 border-[var(--color-primary)]">
                        <div className="bg-[var(--color-bg-soft)] p-8 border-b-2 border-[var(--color-border)]">
                            <h2 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Prazos de Entrega
                            </h2>
                        </div>

                        <div className="p-8">
                            <div className="space-y-6">
                                {/* Luanda */}
                                <div className="p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            LUANDA - ZONA URBANA
                                        </h3>
                                        <span className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            2-5 dias
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Entregas rápidas em áreas urbanas de Luanda. Para pedidos confirmados até às 12h, processamento no mesmo dia útil.
                                    </p>
                                </div>

                                {/* Outras Zonas Luanda */}
                                <div className="p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            LUANDA - PERIFERIAS
                                        </h3>
                                        <span className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            3-7 dias
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Zonas com maior distância do centro podem ter prazo adicional. Vias em obras ou de difícil acesso podem afetar prazos.
                                    </p>
                                </div>

                                {/* Outras Províncias */}
                                <div className="p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            OUTRAS PROVÍNCIAS
                                        </h3>
                                        <span className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            5-10 dias
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Huambo, Benguela e grandes capitais têm prazo médio de 5-7 dias úteis. Zonas mais remotas podem chegar até 10 dias úteis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modalidades de envio */}
                    <div className="bg-white shadow-xl border-l-8 border-[var(--color-accent)]">
                        <div className="bg-[var(--color-bg-soft)] p-8 border-b-2 border-[var(--color-border)]">
                            <h2 className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Modalidades de envio
                            </h2>
                            <p className="text-[var(--color-muted)] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Escolhe a opção que melhor se adequa às tuas necessidades
                            </p>
                        </div>

                        <div className="p-8 space-y-4">
                            <div className="border-l-4 border-[var(--color-accent)] pl-6 py-3">
                                <h4 className="font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    EXPRESS
                                </h4>
                                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Entregas em 1-2 dias úteis
                                </p>
                                <p className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Para pedidos confirmados até 12h em dias úteis. Ideal para eventos com prazo curto. Consulte disponibilidade com a equipa.
                                </p>
                            </div>

                            <div className="border-l-4 border-[var(--color-accent)] pl-6 py-3">
                                <h4 className="font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    ENTREGA PADRÃO EXPRESS
                                </h4>
                                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Envios normais dentro do prazo
                                </p>
                                <p className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Para todos os pedidos com prazo de entrega de até 4 dias. Por defeito para a maioria das compras.
                                </p>
                            </div>

                            <div className="border-l-4 border-[var(--color-accent)] pl-6 py-3">
                                <h4 className="font-bold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    ENTREGA NO MOMENTO DO EVENTO
                                </h4>
                                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Levantamento em 3-7 dias úteis
                                </p>
                                <p className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Algumas campanhas especiais (Black Friday, datas de fim de ano) podem ter preparação adicional de 1-2 dias.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Takes 1 column */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Custos de Envio */}
                    <div className="bg-white p-8 shadow-xl border border-[var(--color-border)]">
                        <div className="flex items-center gap-3 mb-6">
                            <DollarSign className="h-8 w-8 text-[var(--color-primary)]" />
                            <h3 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Custos de Envio
                            </h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <li className="text-gray-700">Envio grátis para compras acima de 15.000 Kz</li>
                            <li className="text-gray-700">Custo fixo de 2.000 Kz para Luanda</li>
                            <li className="text-gray-700">Custos variáveis para outras províncias (calculado no checkout)</li>
                        </ul>
                    </div>

                    {/* Preparação de encomenda */}
                    <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] p-8 shadow-xl">
                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Preparação de encomenda
                        </h3>
                        <div className="space-y-4 text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <p className="leading-relaxed">
                                Queremos que cada entrega e envio estejam condições para o teu evento.
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Pedidos pagos até às 12h são normalmente preparados no próprio dia</li>
                                <li>Em campanhas especiais (Black Friday, datas festivas, etc.) os prazos podem ter um acréscimo de 1-2 dias úteis</li>
                                <li>Produtos personalizados ou kits especiais podem ter um prazo de preparação próprio, indicado na página do produto ou durante o checkout</li>
                            </ul>
                        </div>
                    </div>

                    {/* Acompanhar o seu pedido */}
                    <div className="bg-[var(--color-primary)] text-white p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="h-8 w-8 text-white" />
                            <h3 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Acompanhar o seu pedido
                            </h3>
                        </div>
                        <p className="text-white/90 text-sm mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Assim que o pagamento é confirmado, o pedido ficará actualizado em tempo real.
                        </p>
                        <ul className="space-y-2 text-sm text-white/90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <li>• Pré-Luanda: frete a pedido já será validado com menos de 7-9 dias úteis</li>
                            <li>• Outras províncias: confirmaremos o 7-10 dias antes da data</li>
                            <li>• Quando preparado, receberá mensagem "Já pronto para serem entregues!"</li>
                        </ul>
                    </div>

                    {/* Dúvidas */}
                    <div className="bg-white border border-[var(--color-border)] p-8 shadow-xl">
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Ainda com dúvidas sobre envios?
                        </h3>
                        <p className="text-[var(--color-muted)] text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Vê a nossa página de FAQ ou fala diretamente com a nossa equipa de suporte em alguma página Fala connosco.
                        </p>
                        <div className="space-y-2">
                            <a
                                href="/faq"
                                className="block text-center bg-[var(--color-accent)] text-[var(--color-primary)] px-6 py-3 font-bold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Ver FAQ
                            </a>
                            <a
                                href="/contacto"
                                className="block text-center border border-[var(--color-border)] text-[var(--color-primary)] px-6 py-3 font-bold text-sm hover:border-[var(--color-primary)] transition-all duration-300"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Fala Connosco
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Shipping;
