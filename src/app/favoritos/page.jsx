'use client';

import React from 'react';
import Image from 'next/image';
import { useBooks } from '@/contexts/FavoritesContext';
import { FaHeart, FaTrash, FaBookOpen } from 'react-icons/fa';
import Aside from '@/components/Aside';
import Footer from '@/components/Footer';
import styles from './favoritos.module.css';

export default function FavoritosPage() {
  const { favorites, removeFromFavorites, toggleReadStatus, isRead } = useBooks();

  const handleRemoveFromFavorites = (bookId) => {
    removeFromFavorites(bookId);
  };

  const handleToggleReadStatus = (book) => {
    toggleReadStatus(book);
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <main className={styles.mainContainer}>
          <Aside />
          <section className={styles.mainSection}>
            <div className={styles.header}>
              <FaHeart className={styles.headerIcon} />
              <h1 className={styles.title}>Meus Favoritos</h1>
            </div>
            <div className={styles.emptyState}>
              <FaHeart className={styles.emptyIcon} />
              <h2>Nenhum livro favoritado ainda</h2>
              <p>Explore nossa biblioteca e adicione livros aos seus favoritos!</p>
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
            <FaHeart className={styles.headerIcon} />
            <h1 className={styles.title}>Meus Favoritos</h1>
            <p className={styles.subtitle}>
              {favorites.length} {favorites.length === 1 ? 'livro favorito' : 'livros favoritos'}
            </p>
          </div>

          <div className={styles.booksGrid}>
            {favorites.map((book) => (
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
                        className={`${styles.actionButton} ${styles.readButton} ${
                          isRead(book.id) ? styles.active : ''
                        }`}
                        onClick={() => handleToggleReadStatus(book)}
                        title={isRead(book.id) ? 'Marcar como não lido' : 'Marcar como lido'}
                      >
                        <FaBookOpen />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.removeButton}`}
                        onClick={() => handleRemoveFromFavorites(book.id)}
                        title="Remover dos favoritos"
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
                  {isRead(book.id) && (
                    <div className={styles.readBadge}>
                      <FaBookOpen className={styles.readIcon} />
                      <span>Já lido</span>
                    </div>
                  )}
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
