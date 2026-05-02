import { useState, useEffect } from 'react';
import Header from './components/Header';
import CreateTab from './components/CreateTab';
import UploadTab from './components/UploadTab';
import CameraTab from './components/CameraTab';
import HistoryTab from './components/HistoryTab';

function App() {
  const [activeTab, setActiveTab] = useState('create'); // Aba inicial alterada para Criar
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('qr_history');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Erro ao carregar histórico:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('qr_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item) => {
    setHistory(prev => {
      const currentHistory = Array.isArray(prev) ? prev : [];
      const newItem = { 
        ...item, 
        id: Date.now(), 
        date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      return [newItem, ...currentHistory.slice(0, 49)];
    });
  };

  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    if (window.confirm('Deseja limpar todo o histórico?')) {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B36] to-[#4A1521] flex flex-col font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex items-center justify-center p-6">
        {activeTab === 'create' && <CreateTab addToHistory={addToHistory} />}
        {activeTab === 'upload' && <UploadTab />}
        {activeTab === 'camera' && <CameraTab />}
        {activeTab === 'history' && (
          <HistoryTab 
            history={history} 
            onRemove={removeFromHistory} 
            onClear={clearHistory}
            onView={(item) => setActiveTab('create')} // Simplesmente muda de aba, o usuário pode ver os detalhes no histórico
          />
        )}
      </main>
    </div>
  );
}

export default App;
