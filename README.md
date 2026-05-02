# Gerenciador de QR Codes - Frontend (React + Vite)

Este é o frontend do aplicativo "Gerenciador de QR Codes", projetado para trabalhar em conjunto com uma API Python em FastAPI. O projeto foi construído usando React, Vite e estilizado com Tailwind CSS v4 para entregar uma interface moderna, rápida e totalmente responsiva.

## 🌟 Funcionalidades

O projeto conta com uma interface dividida em três abas principais, baseada em um esquema visual "Dark" e componentes arredondados e responsivos:

1. **Criar QR Code**
   - Formulário para gerar um QR Code a partir de uma URL/texto.
   - Envia requisições de criação via API e exibe o QR Code gerado em formato de imagem na tela, permitindo que o usuário o baixe.

2. **Upload e Análise**
   - Área "Drag & Drop" (arrastar e soltar) construída com `react-dropzone`.
   - Lê a imagem do QR Code enviada pelo computador e exibe a URL extraída pelo backend.

3. **Scanner de Câmera ao Vivo**
   - Permite que o usuário acesse a câmera do celular/computador para escanear QR Codes fisicamente usando a biblioteca `react-webcam`.
   - Tira uma "foto" e envia para análise.
   - Se o resultado for um link válido, redireciona o usuário de forma automática para a página contida no QR Code.

## 🛠️ Tecnologias Utilizadas

- **[React](https://reactjs.org/)** (v19)
- **[Vite](https://vitejs.dev/)** - Bundler ultrarrápido
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) - Framework utilitário para a estilização
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições de API
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones modernos
- **[React Webcam](https://www.npmjs.com/package/react-webcam)** - Acesso a câmeras

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js (v18+) instalado.
- API Backend (FastAPI) rodando localmente na porta `8000`.

### Passos de Instalação

1. Instale as dependências:
```bash
npm install
```

2. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

### 📱 Testando a Câmera no Celular
A maioria dos navegadores de celular bloqueia a câmera em endereços inseguros (`http://`). Para facilitar os testes do `Scanner de Câmera` no próprio dispositivo:

Nós configuramos o projeto com o plugin `@vitejs/plugin-basic-ssl` e um **Proxy Reverso**.
Inicie o projeto expondo para a sua rede local e usando os certificados:
```bash
npm run dev -- --host
```
1. Acesse pelo celular a URL da sua rede, por exemplo: `https://192.168.x.x:5173`.
2. O seu celular dirá que a conexão não é segura (pois o certificado SSL foi gerado no seu PC para desenvolvimento e não é público). Clique em **"Avançado" -> "Ir para o site assim mesmo"**.
3. *Proxy:* O Vite interceptará tudo que o React mandar para `/api/...` e encaminhará internamente para o seu Python (`http://127.0.0.1:8000`), sem bloquear chamadas ou gerar conflitos de *Mixed Content*.

## 📁 Estrutura de Diretórios

```
generate_qrcode_frontend/
├── public/                 # Assets públicos
├── src/
│   ├── assets/             # Imagens (Ex: vite.svg, hero.png)
│   ├── components/         # Componentes React
│   │   ├── CameraTab.jsx   # Aba de Câmera Ao Vivo
│   │   ├── CreateTab.jsx   # Aba de Geração do QR
│   │   ├── Header.jsx      # Cabeçalho da aplicação
│   │   └── UploadTab.jsx   # Aba de envio de imagens
│   ├── App.jsx             # Componente raiz, controla o estado das abas
│   ├── index.css           # Estilos globais e injeção do Tailwind
│   └── main.jsx            # Ponto de entrada da aplicação React
├── vite.config.js          # Configurações do Vite (Proxy, SSL e Tailwind)
└── package.json            # Dependências e scripts npm
```

## ⚠️ Sobre o Redirecionamento da API

Por padrão de segurança em aplicações *Single Page* (SPA), redirecionamentos HTTP padrão da API (como a rota `303` ou `scan-and-redirect`) são frequentemente barrados pelo CORS no Javascript. 

Por isso, este frontend está configurado para consumir preferencialmente a rota de dados pura (ex: `/qrcodes/ler-qrcode/`), recebendo o link decodificado e permitindo que o React em si execute o redirecionamento (`window.location.href`), o que é muito mais ágil e seguro.
