---
description: Commit and push changes to GitHub automatically
---

# Auto-sync with GitHub

Este workflow faz automaticamente commit e push das alterações para o GitHub após cada edição.

## Passos executados automaticamente:

// turbo-all

1. Adicionar todos os arquivos modificados
```bash
git add .
```

2. Criar commit com mensagem descritiva
```bash
git commit -m "Auto-commit: [descrição das alterações]"
```

3. Push para o GitHub
```bash
git push origin master
```

## Notas:
- As credenciais do GitHub já estão configuradas via HTTPS
- O primeiro push já foi concluído com sucesso
- Os comandos rodam automaticamente após cada edição solicitada pelo usuário
