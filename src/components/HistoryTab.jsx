import React from 'react';
import { Trash2, ExternalLink, Clock, Trash } from 'lucide-react';

export default function HistoryTab({ history, onRemove, onClear, onView }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-2xl mx-auto transform transition-all flex flex-col">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 text-center sm:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Histórico de QR Codes
          </h2>
          <p className="text-gray-500 text-sm mt-1">Sua lista de códigos gerados recentemente</p>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors px-4 py-2 hover:bg-red-50 rounded-lg"
          >
            <Trash className="w-4 h-4" />
            Limpar Tudo
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Clock className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">Nenhum histórico encontrado.</p>
          <p className="text-sm">Gere um novo QR Code para vê-lo aqui.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="group bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-md transition-all hover:border-red-200"
            >
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="font-bold text-gray-800 truncate" title={item.titulo}>
                  {item.titulo}
                </h3>
                <p className="text-xs text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <Clock className="w-3 h-3" />
                  {item.date}
                </p>
                <p className="text-sm text-red-600 truncate mt-1 font-medium" title={item.url}>
                  {item.url}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onView(item)}
                  className="p-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
                  title="Gerar Novamente"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2.5 bg-white border border-gray-200 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <p className="mt-8 text-xs text-gray-400 text-center italic">
        * Os dados são salvos localmente no seu navegador.
      </p>
    </div>
  );
}
