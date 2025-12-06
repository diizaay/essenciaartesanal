# Seed data for Essência Artesanal

categories_data = [
    {'name': 'Brincos', 'slug': 'brincos', 'image': 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&q=85'},
    {'name': 'Colares', 'slug': 'colares', 'image': 'https://images.unsplash.com/photo-1613989999658-0075d1359836?crop=entropy&cs=srgb&fm=jpg&q=85'},
    {'name': 'Pulseiras', 'slug': 'pulseiras', 'image': 'https://images.unsplash.com/photo-1661009603404-200d20353dac?crop=entropy&cs=srgb&fm=jpg&q=85'},
    {'name': 'Anéis', 'slug': 'aneis', 'image': 'https://images.unsplash.com/photo-1573227890085-12ab5d68a170?crop=entropy&cs=srgb&fm=jpg&q=85'},
    {'name': 'Acessórios de Cabelo', 'slug': 'acessorios-cabelo', 'image': 'https://images.unsplash.com/photo-1601938219471-fb3393955f15?crop=entropy&cs=srgb&fm=jpg&q=85'},
    {'name': 'Sabonetes Artesanais', 'slug': 'sabonetes', 'image': 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=srgb&fm=jpg&q=85'},
    {'name': 'Porta-chaves', 'slug': 'porta-chaves', 'image': 'https://images.unsplash.com/photo-1675582090584-4ae9400f7326?crop=entropy&cs=srgb&fm=jpg&q=85'},
    {'name': 'Bolsas Artesanais', 'slug': 'bolsas', 'image': 'https://images.unsplash.com/photo-1528797664208-e5a8c0b98881?crop=entropy&cs=srgb&fm=jpg&q=85'},
    {'name': 'Velas Aromáticas', 'slug': 'velas', 'image': 'https://images.pexels.com/photos/773252/pexels-photo-773252.jpeg?q=85'},
    {'name': 'Decoração', 'slug': 'decoracao', 'image': 'https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2?crop=entropy&cs=srgb&fm=jpg&q=85'}
]

products_data = [
    # Brincos
    {
        'name': 'Brincos de Pérola Dourados',
        'slug': 'brincos-perola-dourados',
        'category': 'brincos',
        'price': 45.90,
        'images': [
            'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Brincos elegantes feitos à mão com pérolas naturais e banho de ouro. Perfeitos para ocasiões especiais.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Brincos Folha Prateados',
        'slug': 'brincos-folha-prateados',
        'category': 'brincos',
        'price': 38.50,
        'images': [
            'https://images.unsplash.com/photo-1693212793204-bcea856c75fe?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1608508644127-ba99d7732fee?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Brincos delicados em formato de folha com acabamento prateado. Design minimalista e moderno.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Brincos Argola Dourados',
        'slug': 'brincos-argola-dourados',
        'category': 'brincos',
        'price': 42.00,
        'images': [
            'https://images.unsplash.com/photo-1608508644127-ba99d7732fee?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?q=85'
        ],
        'description': 'Argolas clássicas em banho de ouro, perfeitas para o dia a dia com estilo.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Brincos Tassel Azul',
        'slug': 'brincos-tassel-azul',
        'category': 'brincos',
        'price': 35.90,
        'images': [
            'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?q=85',
            'https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Brincos vibrantes com franjas azuis, perfeitos para um visual boho-chic.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Brincos Minimalistas Dourados',
        'slug': 'brincos-minimalistas-dourados',
        'category': 'brincos',
        'price': 32.90,
        'images': [
            'https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Brincos minimalistas e elegantes, ideais para todos os momentos.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Brincos Geométricos Prateados',
        'slug': 'brincos-geometricos-prateados',
        'category': 'brincos',
        'price': 40.00,
        'images': [
            'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?q=85',
            'https://images.unsplash.com/photo-1693212793204-bcea856c75fe?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Design geométrico moderno com acabamento em prata.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Brincos de Couro Natural',
        'slug': 'brincos-couro-natural',
        'category': 'brincos',
        'price': 29.90,
        'images': [
            'https://images.unsplash.com/photo-1573227890085-12ab5d68a170?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1608508644127-ba99d7732fee?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Brincos leves de couro natural, confortáveis para uso diário.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Brincos Círculo Duplo',
        'slug': 'brincos-circulo-duplo',
        'category': 'brincos',
        'price': 44.50,
        'images': [
            'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Brincos com círculos duplos entrelaçados, design sofisticado.',
        'inStock': True,
        'featured': False
    },
    
    # Colares
    {
        'name': 'Colar Coração Prateado',
        'slug': 'colar-coracao-prateado',
        'category': 'colares',
        'price': 55.00,
        'images': [
            'https://images.unsplash.com/photo-1613989999658-0075d1359836?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Colar delicado com pingente de coração em prata, romântico e elegante.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Colar de Pérolas Lilás',
        'slug': 'colar-perolas-lilas',
        'category': 'colares',
        'price': 68.90,
        'images': [
            'https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1613989999658-0075d1359836?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Colar luxuoso com pérolas naturais em tons lilás. Peça única e especial.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Colar Turquesa Artesanal',
        'slug': 'colar-turquesa-artesanal',
        'category': 'colares',
        'price': 72.00,
        'images': [
            'https://images.pexels.com/photos/135486/pexels-photo-135486.jpeg?q=85',
            'https://images.unsplash.com/photo-1613989999658-0075d1359836?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Colar com pedra turquesa natural, montado artesanalmente.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Colar Minimalista Dourado',
        'slug': 'colar-minimalista-dourado',
        'category': 'colares',
        'price': 48.50,
        'images': [
            'https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.pexels.com/photos/135486/pexels-photo-135486.jpeg?q=85'
        ],
        'description': 'Colar delicado com design minimalista em banho de ouro.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Colar Longo Boho',
        'slug': 'colar-longo-boho',
        'category': 'colares',
        'price': 58.90,
        'images': [
            'https://images.unsplash.com/photo-1613989999658-0075d1359836?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Colar longo estilo boho com diversos pingentes.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Colar Camadas Delicado',
        'slug': 'colar-camadas-delicado',
        'category': 'colares',
        'price': 62.00,
        'images': [
            'https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1613989999658-0075d1359836?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Colar com três camadas delicadas, moderno e elegante.',
        'inStock': True,
        'featured': True
    },
    
    # Pulseiras
    {
        'name': 'Pulseira de Contas Natural',
        'slug': 'pulseira-contas-natural',
        'category': 'pulseiras',
        'price': 32.90,
        'images': [
            'https://images.unsplash.com/photo-1661009603404-200d20353dac?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1679590988898-50c20140aec0?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Pulseira de contas em tons naturais, estilo zen e harmonioso.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Pulseira Macramê Bege',
        'slug': 'pulseira-macrame-bege',
        'category': 'pulseiras',
        'price': 28.50,
        'images': [
            'https://images.unsplash.com/photo-1679590988898-50c20140aec0?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.pexels.com/photos/34103995/pexels-photo-34103995.jpeg?q=85'
        ],
        'description': 'Pulseira em macramê feita artesanalmente em tons bege.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Pulseira Dourada Elegante',
        'slug': 'pulseira-dourada-elegante',
        'category': 'pulseiras',
        'price': 45.00,
        'images': [
            'https://images.pexels.com/photos/34103995/pexels-photo-34103995.jpeg?q=85',
            'https://images.unsplash.com/photo-1661009603404-200d20353dac?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Pulseira sofisticada com acabamento dourado.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Pulseira de Pedras Naturais',
        'slug': 'pulseira-pedras-naturais',
        'category': 'pulseiras',
        'price': 38.90,
        'images': [
            'https://images.unsplash.com/photo-1661009603404-200d20353dac?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1679590988898-50c20140aec0?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Pulseira com pedras naturais coloridas, energizante.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Pulseira Trio Minimalista',
        'slug': 'pulseira-trio-minimalista',
        'category': 'pulseiras',
        'price': 52.00,
        'images': [
            'https://images.unsplash.com/photo-1679590988898-50c20140aec0?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.pexels.com/photos/34103995/pexels-photo-34103995.jpeg?q=85'
        ],
        'description': 'Conjunto de três pulseiras minimalistas para usar juntas.',
        'inStock': True,
        'featured': False
    },
    
    # Anéis
    {
        'name': 'Anel Prata com Pedra',
        'slug': 'anel-prata-pedra',
        'category': 'aneis',
        'price': 42.90,
        'images': [
            'https://images.unsplash.com/photo-1573227890085-12ab5d68a170?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1528797664208-e5a8c0b98881?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Anel delicado em prata com pedra natural incrustada.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Anel Minimalista Dourado',
        'slug': 'anel-minimalista-dourado',
        'category': 'aneis',
        'price': 35.00,
        'images': [
            'https://images.unsplash.com/photo-1528797664208-e5a8c0b98881?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1573227890085-12ab5d68a170?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Anel fino e elegante com banho de ouro.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Anel Conjunto Trio',
        'slug': 'anel-conjunto-trio',
        'category': 'aneis',
        'price': 58.90,
        'images': [
            'https://images.unsplash.com/photo-1528797664208-e5a8c0b98881?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1573227890085-12ab5d68a170?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Conjunto de três anéis para usar empilhados.',
        'inStock': True,
        'featured': False
    },
    
    # Acessórios de Cabelo
    {
        'name': 'Scrunchie Veludo Rosa',
        'slug': 'scrunchie-veludo-rosa',
        'category': 'acessorios-cabelo',
        'price': 18.50,
        'images': [
            'https://images.unsplash.com/photo-1601938219471-fb3393955f15?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1606772016409-d4a55e32be6e?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Scrunchie macio de veludo em tom rosa delicado.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Scrunchies Coloridos Kit',
        'slug': 'scrunchies-coloridos-kit',
        'category': 'acessorios-cabelo',
        'price': 45.00,
        'images': [
            'https://images.unsplash.com/photo-1606772016409-d4a55e32be6e?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1601938219471-fb3393955f15?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Kit com 5 scrunchies em cores variadas.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Presilha Metálica Dourada',
        'slug': 'presilha-metalica-dourada',
        'category': 'acessorios-cabelo',
        'price': 22.90,
        'images': [
            'https://images.unsplash.com/photo-1578220154766-1c39bcecc1dc?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1601938219471-fb3393955f15?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Presilha moderna com acabamento dourado.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Tiara Acolchoada Bege',
        'slug': 'tiara-acolchoada-bege',
        'category': 'acessorios-cabelo',
        'price': 28.50,
        'images': [
            'https://images.unsplash.com/photo-1606772016409-d4a55e32be6e?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1578220154766-1c39bcecc1dc?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Tiara confortável e elegante em tom bege.',
        'inStock': True,
        'featured': True
    },
    
    # Sabonetes
    {
        'name': 'Sabonete Lavanda Natural',
        'slug': 'sabonete-lavanda-natural',
        'category': 'sabonetes',
        'price': 22.00,
        'images': [
            'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1605264964528-06403738d6dc?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Sabonete artesanal de lavanda, relaxante e aromático.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Kit Sabonetes Naturais',
        'slug': 'kit-sabonetes-naturais',
        'category': 'sabonetes',
        'price': 58.00,
        'images': [
            'https://images.unsplash.com/photo-1605264964528-06403738d6dc?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1618840313409-66c0d92d6f26?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Kit com 4 sabonetes artesanais de aromas variados.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Sabonete Rosa Mosqueta',
        'slug': 'sabonete-rosa-mosqueta',
        'category': 'sabonetes',
        'price': 24.90,
        'images': [
            'https://images.unsplash.com/photo-1618840313409-66c0d92d6f26?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.pexels.com/photos/773252/pexels-photo-773252.jpeg?q=85'
        ],
        'description': 'Sabonete nutritivo com óleo de rosa mosqueta.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Sabonete Presente Especial',
        'slug': 'sabonete-presente-especial',
        'category': 'sabonetes',
        'price': 32.00,
        'images': [
            'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Sabonete artesanal embalado para presente.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Sabonete Mel e Aveia',
        'slug': 'sabonete-mel-aveia',
        'category': 'sabonetes',
        'price': 21.50,
        'images': [
            'https://images.pexels.com/photos/773252/pexels-photo-773252.jpeg?q=85',
            'https://images.unsplash.com/photo-1618840313409-66c0d92d6f26?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Sabonete esfoliante com mel e aveia natural.',
        'inStock': True,
        'featured': False
    },
    
    # Porta-chaves
    {
        'name': 'Porta-chaves Couro Marrom',
        'slug': 'porta-chaves-couro-marrom',
        'category': 'porta-chaves',
        'price': 25.90,
        'images': [
            'https://images.unsplash.com/photo-1675582090584-4ae9400f7326?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.unsplash.com/photo-1675582122314-cabef1d757ec?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Porta-chaves artesanal em couro legítimo.',
        'inStock': True,
        'featured': False
    },
    {
        'name': 'Porta-chaves Vintage',
        'slug': 'porta-chaves-vintage',
        'category': 'porta-chaves',
        'price': 29.90,
        'images': [
            'https://images.unsplash.com/photo-1675582122314-cabef1d757ec?crop=entropy&cs=srgb&fm=jpg&q=85',
            'https://images.pexels.com/photos/16030463/pexels-photo-16030463.jpeg?q=85'
        ],
        'description': 'Porta-chaves com design vintage e acabamento rústico.',
        'inStock': True,
        'featured': True
    },
    {
        'name': 'Porta-chaves Personalizado',
        'slug': 'porta-chaves-personalizado',
        'category': 'porta-chaves',
        'price': 35.00,
        'images': [
            'https://images.pexels.com/photos/16030463/pexels-photo-16030463.jpeg?q=85',
            'https://images.unsplash.com/photo-1675582090584-4ae9400f7326?crop=entropy&cs=srgb&fm=jpg&q=85'
        ],
        'description': 'Porta-chaves que pode ser personalizado com iniciais.',
        'inStock': True,
        'featured': False
    }
]

# Admin user for initial seeding
# IMPORTANT: Change password in production!
admin_user_data = {
    'email': 'admin@essencia.com',
    'name': 'Admin Essência',
    'phone': '+244 912 345 678',
    'password': 'admin123',  #  Change this in production!
    'isAdmin': True
}
