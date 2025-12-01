// services/api.js

const API_URL = 'https://generate-qrcode-backend-fastapi-docker.onrender.com/qrcodes/';

/**
 * Envia os dados para a API e retorna a imagem como um Blob.
 * @param {string} url - A URL a ser codificada.
 * @param {string} titulo - O nome do arquivo.
 * @returns {Promise<Blob>} - Um objeto Blob da imagem PNG.
 */
export async function generateQrcode(url, titulo) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url, titulo: titulo })
    });

    if (!response.ok) {
        let errorMessage = `Erro HTTP: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorMessage;
        } catch (e) {
            // Ignora se não for JSON (ex: erro CORS, 500 puro)
        }
        throw new Error(errorMessage);
    }

    return response.blob();
}