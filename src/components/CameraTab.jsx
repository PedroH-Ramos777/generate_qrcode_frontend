import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Scan, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function CameraTab() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Reticle = () => (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64">
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-green-500/80 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-green-500/80 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-green-500/80 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-green-500/80 rounded-br-lg"></div>
        
        {/* Center scan line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-500/80 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)] animate-pulse"></div>
      </div>
    </div>
  );

  const captureAndSend = useCallback(async () => {
    if (!webcamRef.current) return;
    
    // Capture image as base64
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setLoading(true);
    setError(null);

    try {
      // Convert base64 to Blob
      const res = await fetch(imageSrc);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append('file', blob, 'camera_capture.jpg');

      const response = await axios.post('/api/qrcodes/ler-qrcode/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const conteudo = response.data.conteudo;
      
      if (conteudo) {
        if (conteudo.startsWith('http')) {
          window.location.href = conteudo;
        } else {
          alert("QR Code Lido: " + conteudo);
        }
      }

    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Nenhum QR Code detectado na foto atual.');
    } finally {
      setLoading(false);
    }
  }, [webcamRef]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-2xl mx-auto transform transition-all flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Scanner de Câmera ao Vivo
      </h2>

      <div className="relative w-full aspect-[4/3] sm:aspect-video bg-black rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "environment" }}
          className="w-full h-full object-cover"
        />
        <Reticle />
      </div>

      <p className="mt-6 text-gray-800 font-bold text-lg sm:text-xl tracking-tight text-center">
        Aponte a câmera para um código QR
      </p>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 w-full max-w-md mx-auto">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      <button 
        onClick={captureAndSend}
        disabled={loading}
        className="mt-6 w-full sm:w-auto px-10 py-3.5 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 tracking-wide"
      >
        {loading ? (
           <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Scan className="w-6 h-6" />
        )}
        SCANNER DE CÂMERA
      </button>

      <p className="mt-4 text-sm text-gray-500 text-center font-medium">
        Use a câmera do seu dispositivo para escanear um código QR.
      </p>
    </div>
  );
}
