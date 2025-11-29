🔗 Gerador de QR Code - Frontend (Vanilla JS + Tailwind)Este é o frontend da aplicação de geração de QR Code, desenvolvido com HTML, JavaScript Vanilla (usando módulos ES6) e estilização moderna através do Tailwind CSS.O objetivo principal é consumir o endpoint da API FastAPI em Python, enviando os dados e exibindo a imagem PNG binária do QR Code na interface do usuário.

🏗️ Arquitetura do FrontendO projeto adota um padrão de Separação por Módulos (ES Modules) para garantir que a interface e a lógica de comunicação estejam estritamente separadas.

📁 Estrutura de PastasFRONTEND_QRCODE/
├── index.html                  # Layout e Design (HTML + Tailwind CDN)
└── src/                        
    ├── main.js                 # Ponto de entrada e orquestração
    └── modules/
        ├── api.js              # Lógica de Comunicação com a API
        └── ui.js               # Lógica de Interface e DOM

🧠 Visão Geral dos MódulosArquivoResponsabilidadeDetalhesindex.htmlEstrutura e EstiloImporta o src/main.js usando type="module" para ativar a sintaxe import/export.src/main.jsOrquestradorCaptura dados do formulário, trata eventos e coordena o fluxo de trabalho (Chamar API -> Atualizar UI).src/modules/api.jsCamada de DadosContém a função generateQrcode(), que envia a requisição POST para o Backend e lida com a resposta binária (Blob).src/modules/ui.jsCamada de InterfaceContém funções para manipular o DOM: updateButtonState() (spinner), displayQrcode() e displayError().

🎨 Design e EstilizaçãoO design utiliza uma paleta de cores moderna focada em vermelho e cinza escuro para alto contraste.Fundo: Gradiente intenso (linear-gradient) de cinza escuro para vermelho escuro.Controles: Botões com gradientes de vermelho e efeitos hover e focus bem definidos.Ícones: Utilização do Font Awesome para feedback visual (link, download, spinner).