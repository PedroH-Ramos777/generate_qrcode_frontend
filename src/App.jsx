import { useState } from 'react';
import Header from './components/Header';
import CreateTab from './components/CreateTab';
import UploadTab from './components/UploadTab';
import CameraTab from './components/CameraTab';

function App() {
  const [activeTab, setActiveTab] = useState('camera'); // Default based on prompt

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B36] to-[#4A1521] flex flex-col font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex items-center justify-center p-6">
        {activeTab === 'create' && <CreateTab />}
        {activeTab === 'upload' && <UploadTab />}
        {activeTab === 'camera' && <CameraTab />}
      </main>
    </div>
  );
}

export default App;
