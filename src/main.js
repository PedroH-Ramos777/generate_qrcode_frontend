// main.js

import { generateQrcode } from './services/api.js';
import { updateButtonState, displayQrcode, displayError } from './services/ui.js';

document.getElementById('qrcode-form').addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const titulo = document.getElementById('titulo').value;

    try {
        updateButtonState(true); // 1. Começa o loading

        // 2. Chama a lógica de negócio (API)
        const imageBlob = await generateQrcode(url, titulo);
        
        // 3. Atualiza a interface com o sucesso
        displayQrcode(imageBlob, titulo);

    } catch (error) {
        // 4. Trata e exibe o erro
        console.error('Falha na aplicação:', error);
        displayError(error.message || 'Ocorreu um erro desconhecido.');

    } finally {
        updateButtonState(false); // 5. Finaliza o loading
    }
}