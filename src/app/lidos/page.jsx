'use client';

import React from 'react';
import Image from 'next/image';
import { useBooks } from '@/contexts/FavoritesContext';
import { FaBookOpen, FaCalendarAlt, FaHeart, FaTrash } from 'react-icons/fa';
import Aside from '@/components/Aside';
import Footer from '@/components/Footer';
import styles from './lidos.module.css';

export default function LidosPage() {
  const { readBooks, removeFromReadBooks, toggleFavorite, isFavorite } = useBooks();

  const handleRemoveFromRead = (bookId) => {
    removeFromReadBooks(bookId);
  };

  const handleToggleFavorite = (book) => {
    toggleFavorite(book);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (readBooks.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <main className={styles.mainContainer}>
          <Aside />
          <section className={styles.mainSection}>
            <div className={styles.header}>
              <FaBookOpen className={styles.headerIcon} />
              <h1 className={styles.title}>Livros Lidos</h1>
            </div>
            <div className={styles.emptyState}>
              <FaBookOpen className={styles.emptyIcon} />
              <h2>Nenhum livro lido ainda</h2>
              <p>Comece a marcar os livros que você já leu para acompanhar seu progresso!</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        <Aside />
        <section className={styles.mainSection}>
      <div className={styles.header}>
        <FaBookOpen className={styles.headerIcon} />
        <h1 className={styles.title}>Livros Lidos</h1>
        <p className={styles.subtitle}>
          {readBooks.length} {readBooks.length === 1 ? 'livro lido' : 'livros lidos'}
        </p>
      </div>

      <div className={styles.booksGrid}>
        {readBooks.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.imageContainer}>
              <Image
                src={book.volumeInfo.imageLinks?.thumbnail || '/images/placeholder.jpg'}
                alt={book.volumeInfo.title}
                width={150}
                height={200}
                className={styles.bookImage}
              />
              <div className={styles.overlay}>
                <div className={styles.actionButtons}>
                  <button
                    className={`${styles.actionButton} ${styles.favoriteButton} ${
                      isFavorite(book.id) ? styles.active : ''
                    }`}
                    onClick={() => handleToggleFavorite(book)}
                    title={isFavorite(book.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.removeButton}`}
                    onClick={() => handleRemoveFromRead(book.id)}
                    title="Remover dos livros lidos"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
            
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{book.volumeInfo.title}</h3>
              <p className={styles.bookAuthor}>
                {book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}
              </p>
              <div className={styles.readDate}>
                <FaCalendarAlt className={styles.dateIcon} />
                <span>Lido em {formatDate(book.readAt)}</span>
              </div>
              {book.volumeInfo.publishedDate && (
                <p className={styles.publishYear}>
                  Publicado em {book.volumeInfo.publishedDate.split('-')[0]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
