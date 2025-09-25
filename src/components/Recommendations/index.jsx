'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useBooks } from '@/contexts/FavoritesContext';
import { FaRobot, FaRandom, FaHeart, FaBookOpen, FaMagic } from 'react-icons/fa';
import styles from './recommendations.module.css';

export default function Recommendations() {
  const { addToFavorites, removeFromFavorites, isFavorite, toggleReadStatus, isRead } = useBooks();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRecommendations, setCurrentRecommendations] = useState([]);

  // Base de recomendações (em um app real viria de uma API de ML/IA)
  const recommendationPool = [
    {
      id: 'rec-1',
      volumeInfo: {
        title: '1984',
        authors: ['George Orwell'],
        publishedDate: '1949',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Uma distopia sobre vigilância, controle e a natureza da verdade.',
        categories: ['Ficção', 'Distopia'],
      },
      reason: 'Baseado no seu interesse por clássicos'
    },
    {
      id: 'rec-2',
      volumeInfo: {
        title: 'O Alquimista',
        authors: ['Paulo Coelho'],
        publishedDate: '1988',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=cH9FDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'A jornada de um jovem pastor em busca de seu tesouro pessoal.',
        categories: ['Ficção', 'Filosofia'],
      },
      reason: 'Popular entre leitores brasileiros'
    },
    {
      id: 'rec-3',
      volumeInfo: {
        title: 'Sapiens',
        authors: ['Yuval Noah Harari'],
        publishedDate: '2011',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=FmyBAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Uma breve história da humanidade desde a idade da pedra.',
        categories: ['História', 'Ciência'],
      },
      reason: 'Tendência em não-ficção'
    },
    {
      id: 'rec-4',
      volumeInfo: {
        title: 'Harry Potter e a Pedra Filosofal',
        authors: ['J.K. Rowling'],
        publishedDate: '1997',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'O primeiro livro da saga do jovem bruxo Harry Potter.',
        categories: ['Fantasia', 'Jovem Adulto'],
      },
      reason: 'Para quem gosta de aventura'
    },
    {
      id: 'rec-5',
      volumeInfo: {
        title: 'A Revolução dos Bichos',
        authors: ['George Orwell'],
        publishedDate: '1945',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=MnoYEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Uma fábula política sobre uma revolução de animais em uma fazenda.',
        categories: ['Ficção', 'Político'],
      },
      reason: 'Clássico atemporal'
    }
  ];

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simular carregamento da IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Pegar 3 recomendações aleatórias
    const shuffled = [...recommendationPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    setCurrentRecommendations(selected);
    setIsGenerating(false);
  };

  // Gerar recomendações iniciais
  React.useEffect(() => {
    if (currentRecommendations.length === 0) {
      generateRecommendations();
    }
  }, []);

  const handleFavoriteToggle = (book) => {
    if (isFavorite(book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <div className={styles.recommendations}>
      <div className={styles.sectionHeader}>
        <FaRobot className={styles.robotIcon} />
        <h2 className={styles.sectionTitle}>🤖 Recomendações Personalizadas</h2>
        <p className={styles.sectionSubtitle}>
          Nossa IA selecionou especialmente para você
        </p>
        
        <button 
          className={styles.generateButton}
          onClick={generateRecommendations}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <FaMagic className={styles.spinIcon} />
              Gerando...
            </>
          ) : (
            <>
              <FaRandom />
              Novas Recomendações
            </>
          )}
        </button>
      </div>

      {isGenerating ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Nossa IA está analisando seus gostos...</p>
        </div>
      ) : (
        <div className={styles.recommendationsGrid}>
          {currentRecommendations.map((book, index) => (
            <div key={book.id} className={styles.recommendationCard}>
              <div className={styles.cardNumber}>#{index + 1}</div>
              
              <div className={styles.imageContainer}>
                <Image
                  src={book.volumeInfo.imageLinks?.thumbnail || '/images/book-placeholder.svg'}
                  alt={book.volumeInfo.title}
                  width={120}
                  height={160}
                  className={styles.bookImage}
                />
                
                <div className={styles.overlay}>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.actionButton} ${styles.favoriteButton} ${
                        isFavorite(book.id) ? styles.active : ''
                      }`}
                      onClick={() => handleFavoriteToggle(book)}
                      title={isFavorite(book.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <FaHeart />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.readButton} ${
                        isRead(book.id) ? styles.active : ''
                      }`}
                      onClick={() => toggleReadStatus(book)}
                      title={isRead(book.id) ? 'Marcar como não lido' : 'Marcar como lido'}
                    >
                      <FaBookOpen />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{book.volumeInfo.title}</h3>
                <p className={styles.bookAuthor}>
                  {book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}
                </p>
                
                <div className={styles.reasonBadge}>
                  <FaRobot />
                  <span>{book.reason}</span>
                </div>
                
                <p className={styles.bookDescription}>
                  {book.volumeInfo.description}
                </p>
                
                <div className={styles.categories}>
                  {book.volumeInfo.categories?.map((category, categoryIndex) => (
                    <span key={categoryIndex} className={styles.category}>
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.aiInfo}>
        <FaRobot className={styles.aiIcon} />
        <div>
          <h4>Como funciona nossa IA?</h4>
          <p>Analisamos seus livros favoritos, histórico de leitura e tendências para encontrar sua próxima grande descoberta!</p>
        </div>
      </div>
    </div>
  );
}
