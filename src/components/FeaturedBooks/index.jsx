'use client';

import React from 'react';
import Image from 'next/image';
import { useBooks } from '@/contexts/FavoritesContext';
import { FaHeart, FaStar, FaBookOpen, FaCrown } from 'react-icons/fa';
import styles from './featuredBooks.module.css';

export default function FeaturedBooks() {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite, toggleReadStatus, isRead } = useBooks();

  // Livros em destaque (simulados - em um app real viriam da API)
  const featuredBooks = [
    {
      id: 'featured-1',
      volumeInfo: {
        title: 'O Pequeno Príncipe',
        authors: ['Antoine de Saint-Exupéry'],
        publishedDate: '1943',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=TUP1PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Um clássico da literatura mundial que toca o coração de crianças e adultos.',
        categories: ['Ficção', 'Clássico'],
        pageCount: 96
      },
      saleInfo: { listPrice: { amount: 25.90 } },
      rating: 4.8,
      featured: true
    },
    {
      id: 'featured-2', 
      volumeInfo: {
        title: 'Cem Anos de Solidão',
        authors: ['Gabriel García Márquez'],
        publishedDate: '1967',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=keNjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'Uma obra-prima do realismo mágico que conta a saga da família Buendía.',
        categories: ['Ficção', 'Realismo Mágico'],
        pageCount: 432
      },
      saleInfo: { listPrice: { amount: 42.90 } },
      rating: 4.9,
      featured: true
    },
    {
      id: 'featured-3',
      volumeInfo: {
        title: 'Dom Casmurro',
        authors: ['Machado de Assis'],
        publishedDate: '1899',
        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=V-3AEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
        description: 'O clássico brasileiro que explora ciúme, amor e dúvida.',
        categories: ['Ficção', 'Clássico Nacional'],
        pageCount: 256
      },
      saleInfo: { listPrice: { amount: 29.90 } },
      rating: 4.7,
      featured: true
    }
  ];

  const handleFavoriteToggle = (book) => {
    if (isFavorite(book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <div className={styles.featuredBooks}>
      <div className={styles.sectionHeader}>
        <FaCrown className={styles.crownIcon} />
        <h2 className={styles.sectionTitle}>📚 Livros em Destaque</h2>
        <p className={styles.sectionSubtitle}>Os melhores da nossa curadoria especial</p>
      </div>
      
      <div className={styles.booksGrid}>
        {featuredBooks.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.bookBadge}>
              <FaCrown />
              <span>Destaque</span>
            </div>
            
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
              
              <div className={styles.bookMeta}>
                <div className={styles.rating}>
                  <FaStar className={styles.starIcon} />
                  <span>{book.rating}</span>
                </div>
                <div className={styles.pages}>
                  {book.volumeInfo.pageCount} páginas
                </div>
              </div>
              
              <p className={styles.bookDescription}>
                {book.volumeInfo.description}
              </p>
              
              {book.saleInfo?.listPrice && (
                <div className={styles.price}>
                  R$ {book.saleInfo.listPrice.amount.toFixed(2)}
                </div>
              )}
              
              <div className={styles.categories}>
                {book.volumeInfo.categories?.map((category, index) => (
                  <span key={index} className={styles.category}>
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
