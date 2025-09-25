'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useBooks } from '@/contexts/FavoritesContext';
import { FaRandom, FaHeart, FaBookOpen, FaStar, FaMagic } from 'react-icons/fa';
import styles from './randomBook.module.css';

export default function RandomBook() {
  const { addToFavorites, removeFromFavorites, isFavorite, toggleReadStatus, isRead } = useBooks();
  const [currentBook, setCurrentBook] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  // Biblioteca de livros aleatórios
  const randomBookPool = [
    {
      id: 'random-1',
      volumeInfo: {
        title: 'O Cortiço',
        authors: ['Aluísio Azevedo'],
        publishedDate: '1890',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=WGJDDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Romance naturalista que retrata a vida em um cortiço no Rio de Janeiro.',
        categories: ['Literatura Brasileira', 'Naturalismo'],
        pageCount: 284
      },
      rating: 4.2,
      funFact: '🏠 Considerado um dos maiores romances naturalistas do Brasil!'
    },
    {
      id: 'random-2',
      volumeInfo: {
        title: 'O Hobbit',
        authors: ['J.R.R. Tolkien'],
        publishedDate: '1937',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'A aventura de Bilbo Bolseiro em uma jornada inesperada.',
        categories: ['Fantasia', 'Aventura'],
        pageCount: 310
      },
      rating: 4.9,
      funFact: '🧙‍♂️ Tolkien criou toda uma linguagem élfica para seus livros!'
    },
    {
      id: 'random-3',
      volumeInfo: {
        title: 'Memórias Póstumas de Brás Cubas',
        authors: ['Machado de Assis'],
        publishedDate: '1881',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=ab6jCgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Um defunto autor narra sua própria história de forma irônica.',
        categories: ['Literatura Brasileira', 'Realismo'],
        pageCount: 208
      },
      rating: 4.6,
      funFact: '👻 É narrado por um morto - revolucionário para a época!'
    },
    {
      id: 'random-4',
      volumeInfo: {
        title: 'Orgulho e Preconceito',
        authors: ['Jane Austen'],
        publishedDate: '1813',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=s1gVAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Romance clássico sobre Elizabeth Bennet e Mr. Darcy.',
        categories: ['Romance', 'Clássico'],
        pageCount: 432
      },
      rating: 4.8,
      funFact: '💕 Um dos romances mais populares de todos os tempos!'
    },
    {
      id: 'random-5',
      volumeInfo: {
        title: 'Fahrenheit 451',
        authors: ['Ray Bradbury'],
        publishedDate: '1953',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=4Q_QrObWBcQC&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Distopia sobre uma sociedade que queima livros.',
        categories: ['Ficção Científica', 'Distopia'],
        pageCount: 256
      },
      rating: 4.7,
      funFact: '🔥 451°F é a temperatura em que o papel de livro pega fogo!'
    }
  ];

  const rollRandomBook = async () => {
    setIsRolling(true);
    
    // Simular o "rolamento" do dado
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Selecionar um livro aleatório
    const randomIndex = Math.floor(Math.random() * randomBookPool.length);
    setCurrentBook(randomBookPool[randomIndex]);
    setIsRolling(false);
  };

  const handleFavoriteToggle = (book) => {
    if (isFavorite(book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <div className={styles.randomBook}>
      <div className={styles.sectionHeader}>
        <FaRandom className={styles.diceIcon} />
        <h2 className={styles.sectionTitle}>🎲 Livro da Sorte</h2>
        <p className={styles.sectionSubtitle}>
          Deixe o destino escolher sua próxima leitura!
        </p>
      </div>

      <div className={styles.randomContainer}>
        <button 
          className={styles.rollButton}
          onClick={rollRandomBook}
          disabled={isRolling}
        >
          {isRolling ? (
            <>
              <FaRandom className={styles.rollingDice} />
              Rolando o dado...
            </>
          ) : (
            <>
              <FaRandom />
              {currentBook ? 'Rolar Novamente' : 'Descobrir Livro'}
            </>
          )}
        </button>

        {isRolling && (
          <div className={styles.loadingAnimation}>
            <div className={styles.magicSparkles}>
              <FaMagic className={styles.sparkle} />
              <FaMagic className={styles.sparkle} />
              <FaMagic className={styles.sparkle} />
            </div>
            <p>Invocando a magia dos livros... ✨</p>
          </div>
        )}

        {currentBook && !isRolling && (
          <div className={styles.bookReveal}>
            <div className={styles.revealHeader}>
              <h3>🎉 Seu livro da sorte é:</h3>
            </div>
            
            <div className={styles.bookCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={currentBook.volumeInfo.imageLinks?.thumbnail || '/images/book-placeholder.svg'}
                  alt={currentBook.volumeInfo.title}
                  width={150}
                  height={200}
                  className={styles.bookImage}
                />
                
                <div className={styles.overlay}>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.actionButton} ${styles.favoriteButton} ${
                        isFavorite(currentBook.id) ? styles.active : ''
                      }`}
                      onClick={() => handleFavoriteToggle(currentBook)}
                      title={isFavorite(currentBook.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <FaHeart />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.readButton} ${
                        isRead(currentBook.id) ? styles.active : ''
                      }`}
                      onClick={() => toggleReadStatus(currentBook)}
                      title={isRead(currentBook.id) ? 'Marcar como não lido' : 'Marcar como lido'}
                    >
                      <FaBookOpen />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{currentBook.volumeInfo.title}</h3>
                <p className={styles.bookAuthor}>
                  {currentBook.volumeInfo.authors?.join(', ')}
                </p>
                
                <div className={styles.bookMeta}>
                  <div className={styles.rating}>
                    <FaStar className={styles.starIcon} />
                    <span>{currentBook.rating}</span>
                  </div>
                  <div className={styles.pages}>
                    {currentBook.volumeInfo.pageCount} páginas
                  </div>
                  <div className={styles.year}>
                    {currentBook.volumeInfo.publishedDate.split('-')[0]}
                  </div>
                </div>
                
                <p className={styles.bookDescription}>
                  {currentBook.volumeInfo.description}
                </p>
                
                <div className={styles.funFactCard}>
                  <div className={styles.funFactHeader}>
                    <FaMagic />
                    <span>Curiosidade</span>
                  </div>
                  <p className={styles.funFact}>{currentBook.funFact}</p>
                </div>
                
                <div className={styles.categories}>
                  {currentBook.volumeInfo.categories?.map((category, index) => (
                    <span key={index} className={styles.category}>
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {!currentBook && !isRolling && (
          <div className={styles.emptyState}>
            <FaRandom className={styles.emptyIcon} />
            <p>Clique no botão acima para descobrir um livro surpresa!</p>
            <small>Cada rolagem é uma nova aventura 🌟</small>
          </div>
        )}
      </div>
    </div>
  );
}
