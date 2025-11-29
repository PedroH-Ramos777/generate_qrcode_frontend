// src/modules/ui.js

const resultArea = document.getElementById('result-area');
const qrcodeImage = document.getElementById('qrcode-image');
const downloadLink = document.getElementById('download-link');
const messageArea = document.getElementById('message-area');
const submitButton = document.getElementById('submit-button');

// Variável para rastrear a URL temporária ativa (começa como null)
let currentObjectURL = null; 

/**
 * Libera a URL temporária anterior da memória do navegador, se houver.
 * Essencial para evitar vazamento de memória.
 */
function cleanupObjectURL() {
    if (currentObjectURL) {
        URL.revokeObjectURL(currentObjectURL);
        currentObjectURL = null; 
        // console.log("URL temporária anterior revogada."); // Pode ser usado para debug
    }
}

// ---------------------------------------------
// Funções de Gerenciamento de Estado e Exibição
// ---------------------------------------------

export function updateButtonState(isLoading) {
    submitButton.disabled = isLoading;
    if (isLoading) {
        // Usa o spinner vermelho e desabilita
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2 text-red-300"></i> GERANDO...';
    } else {
        // Restaura o ícone e habilita
        submitButton.innerHTML = '<i class="fas fa-magic"></i> GERAR QR CODE';
    }
}

export function displayQrcode(imageBlob, titulo) {
    // 1. LIMPEZA: Revoga a URL antiga antes de criar a nova
    cleanupObjectURL(); 
    
    // 2. Cria a nova URL temporária e a armazena
    const imageUrl = URL.createObjectURL(imageBlob);
    currentObjectURL = imageUrl; 
    
    // 3. Atualiza a interface (DOM)
    qrcodeImage.src = imageUrl;
    downloadLink.href = imageUrl;
    downloadLink.download = `${titulo}.png`;
    
    messageArea.textContent = '';
    resultArea.classList.remove('hidden');
}

export function displayError(message) {
    // 1. LIMPEZA: Revoga qualquer URL ativa em caso de erro
    cleanupObjectURL(); 
    
    messageArea.textContent = `Erro: ${message}`;
    resultArea.classList.add('hidden');
    qrcodeImage.src = ''; 
}

// ---------------------------------------------
// Opcional: Limpeza ao Fechar a Página
// ---------------------------------------------

// Adiciona um listener para limpar a última URL criada quando o usuário fechar a aba
window.addEventListener('beforeunload', cleanupObjectURL);