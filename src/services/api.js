import axios from 'axios';

// Esta é a configuração central da sua API.
// Quando você subir para produção, você pode mudar o valor no arquivo .env
// ou mudar a baseURL aqui diretamente.

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export default api;
