'use client';

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Importando ícones do React Icons
import { FaCog, FaBook, FaHeart, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import Aside from '@/components/Aside';
import MainSection from '@/components/MainSection';
import Dashboard from '@/components/Dashboard';
import FeaturedBooks from '@/components/FeaturedBooks';
import Achievements from '@/components/Achievements';
import Recommendations from '@/components/Recommendations';
import RandomBook from '@/components/RandomBook';
import ReadingCalendar from '@/components/ReadingCalendar';
import Footer from '@/components/Footer';

// Importar o hook
import { useBooks } from '@/contexts/FavoritesContext';

// Componente de teste para adicionar livros rapidamente
const QuickTestComponent = () => {
  const { addToFavorites, addToReadBooks, clearAllData, exportData } = useBooks();
  
  const sampleBooks = [
    { id: '1', title: 'Dom Casmurro', author: 'Machado de Assis', year: '1899' },
    { id: '2', title: '1984', author: 'George Orwell', year: '1949' },
    { id: '3', title: 'O Cortiço', author: 'Aluísio Azevedo', year: '1890' },
    { id: '4', title: 'Harry Potter', author: 'J.K. Rowling', year: '1997' },
    { id: '5', title: 'O Pequeno Príncipe', author: 'Saint-Exupéry', year: '1943' }
  ];

  const addSampleBook = (type) => {
    const randomBook = sampleBooks[Math.floor(Math.random() * sampleBooks.length)];
    const bookWithId = { ...randomBook, id: `${randomBook.id}-${Date.now()}` };
    
    if (type === 'favorite') {
      addToFavorites(bookWithId);
    } else if (type === 'read') {
      addToReadBooks(bookWithId);
    }
  };

  const downloadData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sebonatela-backup.json';
    a.click();
  };

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '20px', 
      margin: '20px', 
      borderRadius: '10px',
      border: '2px solid #e9ecef'
    }}>
      <h3 style={{ color: '#495057', marginBottom: '15px' }}>🧪 Painel de Teste - Persistência de Dados</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <button 
          onClick={() => addSampleBook('favorite')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#e91e63', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ❤️ Adicionar Favorito
        </button>
        <button 
          onClick={() => addSampleBook('read')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📖 Marcar como Lido
        </button>
        <button 
          onClick={downloadData}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          💾 Exportar Dados
        </button>
        <button 
          onClick={clearAllData}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🗑️ Limpar Tudo
        </button>
      </div>
      <p style={{ fontSize: '14px', color: '#6c757d', margin: 0 }}>
        Use estes botões para testar a persistência. Recarregue a página para ver se os dados foram salvos!
      </p>
    </div>
  );
};

export default function Page() {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        {/* Aside */}
        <Aside />

        {/* Sessão principal com TUDO DE INCRÍVEL */}
        <div className={styles.contentArea}>
          <MainSection />
          <Dashboard />
          <QuickTestComponent />
          <ReadingCalendar />
          <FeaturedBooks />
          <RandomBook />
          <Recommendations />
          <Achievements />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}