# 🚀 Guia de Deploy - Essência Artesanal no Vercel

Deploy completo do e-commerce no Vercel com backend serverless, Cloudinary para imagens e prevenção de cold starts.

---

## 📋 Pré-requisitos

✅ Conta Vercel (grátis): https://vercel.com/signup  
✅ Conta Cloudinary (grátis): https://cloudinary.com  
✅ Conta MongoDB Atlas (grátis): https://www.mongodb.com/cloud/atlas/register  
✅ Repositório GitHub com o código

---

## 1️⃣ Configurar Cloudinary

### Passo 1: Obter Credenciais

1. Acesse: https://console.cloudinary.com/
2. No Dashboard, você verá:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Copie esses 3 valores (você vai precisar deles)

---

## 2️⃣ Configurar MongoDB Atlas

### Passo 1: Criar Cluster (se ainda não tem)

1. Acesse: https://cloud.mongodb.com/
2. Crie um cluster gratuito (M0 Sandbox)
3. Crie um usuário de banco de dados
4. Permita acesso de qualquer IP (0.0.0.0/0)

### Passo 2: Obter Connection String

1. Clique em "Connect" no seu cluster
2. Escolha "Connect your application"
3. Copie a connection string: `mongodb+srv://username:password@...`
4. Substitua `<password>` pela senha do usuário

---

## 3️⃣ Deploy no Vercel

### Passo 1: Conectar Repositório

1. Acesse: https://vercel.com/new
2. Importe seu repositório GitHub: `diizaay/essenciaartesanal`
3. Vercel detectará automaticamente o projeto

### Passo 2: Configurar Build

Vercel usará as configurações do `vercel.json`, mas confirme:

- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/build`
- **Install Command**: `pip install -r api/requirements.txt`

### Passo 3: Adicionar Variáveis de Ambiente

Clique em "Environment Variables" e adicione:

```
MONGO_URL = mongodb+srv://seu-usuario:senha@cluster...
DB_NAME = essencia_artesanal
CORS_ORIGINS = https://your-app.vercel.app
JWT_SECRET = gere-uma-chave-secreta-forte-aqui
JWT_ALGORITHM = HS256
JWT_EXPIRATION_HOURS = 720
CLOUDINARY_CLOUD_NAME = seu-cloud-name
CLOUDINARY_API_KEY = sua-api-key
CLOUDINARY_API_SECRET = seu-api-secret
```

> **Dica**: Para gerar JWT_SECRET forte:
> ```bash
> python -c "import secrets; print(secrets.token_urlsafe(32))"
> ```

### Passo 4: Deploy!

1. Clique em "Deploy"
2. Aguarde ~3-5 minutos
3. Seu site estará no ar! 🎉

---

## 4️⃣ Configurar Prevenção de Cold Starts

### Opção A: GitHub Actions (Recomendado)

O workflow já está configurado em `.github/workflows/keep-warm.yml`.

**Configurar:**

1. No GitHub, vá em: `Settings` → `Secrets and variables` → `Actions`
2. Adicione um novo secret:
   - Nome: `API_URL`
   - Valor: `https://your-app.vercel.app`
3. O workflow rodará automaticamente a cada 5 minutos

### Opção B: Script Local

Execute o script localmente:

```bash
export API_URL=https://your-app.vercel.app
python scripts/keep_warm.py
```

### Resultado

✅ API mantida "quente"  
✅ Tempo de resposta: ~100-300ms (sem cold start)  
✅ Primeira visita não demorará 2-4 segundos

---

## 5️⃣ Seed do Banco de Dados

Após o deploy, popule o banco com dados iniciais:

```bash
curl -X POST https://your-app.vercel.app/api/seed
```

Ou crie apenas o usuário admin:

```bash
curl -X POST https://your-app.vercel.app/api/seed-admin
```

**Credenciais padrão do admin** (altere após primeiro login):
- Email: `admin@essenciaartesanal.com`
- Senha: Veja em `backend/seed_data.py`

---

## 6️⃣ Testar o Deploy

### 1. Frontend

Acesse: `https://your-app.vercel.app`

✅ Página inicial carrega  
✅ Produtos aparecem  
✅ Navegação funciona

### 2. API

Teste o health check:

```bash
curl https://your-app.vercel.app/api/health
```

Resposta esperada:
```json
{
  "status": "healthy",
  "database": "connected",
  "message": "API is running smoothly"
}
```

### 3. Upload de Imagens

1. Faça login no admin: `https://your-app.vercel.app/admin`
2. Crie/edite um produto
3. Faça upload de uma imagem
4. Verifique se a URL é do Cloudinary: `https://res.cloudinary.com/...`

---

## 7️⃣ Migrar Imagens Existentes (Opcional)

Se você tem imagens em `/backend/uploads`, precisa migrá-las para Cloudinary:

### Script de Migração

```python
import cloudinary
import cloudinary.uploader
from pathlib import Path

# Configurar Cloudinary
cloudinary.config(
    cloud_name="SEU_CLOUD_NAME",
    api_key="SUA_API_KEY",
    api_secret="SEU_API_SECRET"
)

# Fazer upload de todas as imagens
uploads_dir = Path("backend/uploads")
for image_path in uploads_dir.glob("*.jpg") + uploads_dir.glob("*.png"):
    result = cloudinary.uploader.upload(
        str(image_path),
        folder="essencia-artesanal"
    )
    print(f"✓ {image_path.name} → {result['secure_url']}")
```

Depois, atualize as URLs nos produtos no banco de dados.

---

## 🔧 Troubleshooting

### API retorna 500

- Verifique as variáveis de ambiente no Vercel
- Confira os logs: `vercel logs`

### Imagens não aparecem

- Verifique credenciais do Cloudinary
- Teste upload manual no console do Cloudinary

### Cold starts ainda ocorrem

- Confirme que GitHub Actions está rodando
- Verifique o secret `API_URL` no GitHub

### Banco de dados não conecta

- Verifique MONGO_URL está correto
- Confirme IP 0.0.0.0/0 está permitido no MongoDB Atlas

---

## 📊 Monitoramento

### Vercel Dashboard

- Acesse: https://vercel.com/dashboard
- Veja Analytics, Logs, Deployments

### Cloudinary Dashboard

- Acessoacesse: https://console.cloudinary.com/
- Monitore uso de armazenamento e bandwidth

---

## 🎉 Pronto!

Seu e-commerce está no ar com:

✅ Frontend React otimizado  
✅ Backend FastAPI serverless  
✅ Uploads em Cloudinary  
✅ MongoDB Atlas  
✅ Cold starts minimizados  
✅ Deploy automático (Git push = deploy)

**URL do seu site**: `https://your-app.vercel.app`

---

## 🔗 Links Úteis

- Vercel Docs: https://vercel.com/docs
- Cloudinary Docs: https://cloudinary.com/documentation
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
