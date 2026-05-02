import { QrCode, Link as LinkIcon, CloudUpload } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="w-full bg-black/40 backdrop-blur-md shadow-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <QrCode className="text-red-500 w-8 h-8" />
          <h1 className="text-white font-bold text-xl tracking-wide hidden sm:block">Gerenciador de QR Codes</h1>
        </div>
        
        <nav className="flex h-full">
          <button 
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-4 sm:px-6 h-full font-medium transition-colors ${
              activeTab === 'create' 
                ? 'text-white border-b-2 border-red-500' 
                : 'text-gray-400 hover:text-white border-b-2 border-transparent'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Criar QR Code</span>
            <span className="sm:hidden">Criar</span>
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 sm:px-6 h-full font-medium transition-colors ${
              activeTab === 'upload' 
                ? 'text-white border-b-2 border-red-500' 
                : 'text-gray-400 hover:text-white border-b-2 border-transparent'
            }`}
          >
            <CloudUpload className="w-4 h-4" />
            Upload
          </button>
        </nav>
      </div>
    </header>
  );
}
