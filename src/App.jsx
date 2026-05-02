import { useState, useEffect } from 'react';
import Header from './components/Header';
import CreateTab from './components/CreateTab';
import UploadTab from './components/UploadTab';
import CameraTab from './components/CameraTab';
import HistoryTab from './components/HistoryTab';

function App() {
  const [activeTab, setActiveTab] = useState('create'); // Aba inicial alterada para Criar
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('qr_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('qr_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item) => {
    setHistory(prev => [
      { ...item, id: Date.now(), date: new Date().toLocaleString('pt-BR') },
      ...prev.slice(0, 49) // Limita a 50 itens
    ]);
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
