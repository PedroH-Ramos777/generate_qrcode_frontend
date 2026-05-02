import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, QrCode, ScanLine, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function UploadTab() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.svg']
    },
    multiple: false
  });

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/qrcodes/ler-qrcode/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data.conteudo);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Erro ao analisar imagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-2xl mx-auto transform transition-all">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Upload e Análise de Imagem
      </h2>

      <div 
        {...getRootProps()} 
        className={`relative cursor-pointer border-2 border-dashed rounded-xl p-10 sm:p-16 text-center transition-all ${
          isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <CloudUpload className="w-16 h-16 text-gray-400" />
            <QrCode className="w-6 h-6 text-red-500 absolute -top-1 -right-2 bg-white rounded-sm" />
          </div>
          {file ? (
            <p className="text-gray-800 font-semibold">{file.name}</p>
          ) : (
            <p className="text-gray-500 font-medium max-w-xs mx-auto">
              Selecione uma imagem de QR Code (.png, .jpg, .svg) ou arraste e solte
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <button 
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="w-full sm:w-auto px-10 py-3.5 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
             <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <ScanLine className="w-5 h-5" />
          )}
          ANALISAR QR CODE
        </button>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Faça upload de uma imagem de QR Code para abrir a URL contida.
        </p>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg text-center shadow-inner">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-green-800">Conteúdo do QR Code</h3>
          </div>
          <p className="text-green-700 font-medium break-all">{result}</p>
          {result.startsWith('http') && (
            <a href={result} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-6 py-2.5 rounded-md shadow transition">
              Abrir Link Seguro
            </a>
          )}
        </div>
      )}
    </div>
  );
}
