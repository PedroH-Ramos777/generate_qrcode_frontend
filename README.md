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

4. **Histórico Local**
   - Salva automaticamente todos os QR Codes gerados no armazenamento local do navegador (`localStorage`).
   - Permite visualizar links gerados anteriormente e excluí-los se necessário, mesmo após fechar o navegador.

## 🛠️ Tecnologias Utilizadas

- **[React](https://reactjs.org/)** (v19)
- **[Vite](https://vitejs.dev/)** - Bundler ultrarrápido
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) - Framework utilitário para a estilização
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições de API
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones modernos
- **[React Webcam](https://www.npmjs.com/package/react-webcam)** - Acesso a câmeras

## 🚀 Como Rodar o Projeto

### 1. Pré-requisitos
- **Node.js** (v18 ou superior) instalado no computador.

### 2. Instalação e Execução
No terminal, dentro da pasta do projeto, execute:
```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

### 3. Como conectar com a sua API (Backend)
Se você ou outra pessoa quiser usar este frontend com um backend diferente, existem dois caminhos:

#### **A. No Ambiente de Desenvolvimento (Local)**
Para testar localmente, o projeto usa um **Proxy**. Isso permite que o celular acesse a câmera via HTTPS enquanto a API roda em HTTP no PC.
- Abra o arquivo `vite.config.js`.
- Localize o campo `target` dentro de `server.proxy`.
- Mude o link `http://127.0.0.1:8000` para o endereço local da sua nova API.

#### **B. No Ambiente de Produção (Publicado)**
Se você for publicar o site na internet (Vercel, Render, etc):
- Localize o arquivo `.env` na raiz.
- Mude `VITE_API_URL=/api` para o link real da sua API na nuvem (ex: `https://sua-api.com`).

---

### 📱 Testando a Câmera no Celular
A maioria dos navegadores de celular bloqueia a câmera em endereços inseguros (`http://`). Para facilitar os testes no dispositivo:

1. Inicie o projeto com o comando:
   ```bash
   npm run dev -- --host
   ```
2. Acesse a URL da sua rede exibida no terminal (ex: `https://192.168.x.x:5173`).
3. Como o certificado SSL é local, o celular dará um aviso de "Conexão não segura". Clique em **"Avançado"** e em **"Ir para o site assim mesmo"**.
4. O site abrirá com HTTPS e a câmera funcionará!

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
