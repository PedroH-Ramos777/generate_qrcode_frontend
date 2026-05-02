import { useState } from 'react';
import { Link as LinkIcon, FileText, Wand2, CheckCircle, Download } from 'lucide-react';
import api from '../services/api';

export default function CreateTab({ addToHistory }) {
  const [url, setUrl] = useState('');
  const [titulo, setTitulo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qrcodeUrl, setQrcodeUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQrcodeUrl(null);

    try {
      const response = await api.post('/qrcodes/', 
        { url, titulo },
        { responseType: 'blob' }
      );
      
      const blobUrl = URL.createObjectURL(response.data);
      setQrcodeUrl(blobUrl);
      
      if (addToHistory) {
        addToHistory({ url, titulo });
      }
    } catch (err) {
      setError('Erro ao gerar QR Code. Verifique se a API está rodando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto transform transition-all">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
        Gerar QR Code
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="url" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <LinkIcon className="w-4 h-4 text-red-500 mr-2" />
            URL para Codificar
          </label>
          <input 
            type="url" 
            id="url" 
            required 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 outline-none transition duration-200 shadow-sm"
            placeholder="https://sua-url-aqui.com.br" 
          />
        </div>

        <div>
          <label htmlFor="titulo" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <FileText className="w-4 h-4 text-red-500 mr-2" />
            Nome do Arquivo
          </label>
          <input 
            type="text" 
            id="titulo" 
            required 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 outline-none transition duration-200 shadow-sm"
            placeholder="ex: meu_site_qrcode" 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-900 transition duration-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
             <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Wand2 className="w-5 h-5" />
          )}
          GERAR QR CODE
        </button>
      </form>

      {error && <p className="mt-5 text-center text-red-600 font-medium">{error}</p>}

      {qrcodeUrl && (
        <>
          <hr className="my-6 border-gray-200" />
          <div className="mt-6 text-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" /> 
              Seu QR Code está pronto!
            </h2>
            
            <img 
              src={qrcodeUrl} 
              alt="QR Code Gerado" 
              className="w-56 h-56 mx-auto border-8 border-gray-100 rounded-xl shadow-xl mb-6" 
            />
            
            <a 
              href={qrcodeUrl} 
              download={`${titulo || 'qrcode'}.png`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white py-2.5 px-8 rounded-lg font-semibold hover:from-red-600 hover:to-red-800 transition duration-200 cursor-pointer shadow-lg"
            >
              <Download className="w-5 h-5" /> 
              Baixar Imagem
            </a>
          </div>
        </>
      )}
    </div>
  );
}
