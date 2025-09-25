'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaBookOpen, FaCheck } from 'react-icons/fa'; // Ícones
import { useBooks } from '@/contexts/FavoritesContext';
import styles from './bookList.module.css';

export default function BookList({ books, onPageChange, currentPage, totalPages }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const { toggleFavorite, isFavorite, toggleReadStatus, isRead } = useBooks();

  const handleOpenPopup = (book) => {
    setSelectedBook(book);
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  const handleToggleFavorite = (book) => {
    toggleFavorite(book);
  };

  const handleToggleReadStatus = (book) => {
    toggleReadStatus(book);
  };

  // Função para truncar o título do livro
  const truncateTitle = (title, maxLength = 30) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    }
    return title;
  };

  // Ordenar os livros por data de publicação em ordem decrescente
  const sortedBooks = [...books].sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || '1900-01-01');
    const dateB = new Date(b.volumeInfo.publishedDate || '1900-01-01');
    return dateB - dateA; // Ordem decrescente
  });

  // Exibir apenas 10 livros por vez
  const startIndex = (currentPage - 1) * 10;
  const paginatedBooks = sortedBooks.slice(startIndex, startIndex + 10);

  return (
    <div className={styles.bookList}>
      <div className={styles.booksContainer}>
        {paginatedBooks.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.cardHeader}>
              <Image
                src={book.volumeInfo.imageLinks?.thumbnail || '/images/book-placeholder.svg'}
                alt={book.volumeInfo.title}
                width={180}
                height={180}
                className={styles.bookImage}
              />
              <div className={styles.actionButtons}>
                <FaHeart
                  className={`${styles.favoriteIcon} ${
                    isFavorite(book.id) ? styles.favoriteActive : ''
                  }`}
                  onClick={() => handleToggleFavorite(book)}
                  title={isFavorite(book.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                />
                <div 
                  className={`${styles.readIcon} ${
                    isRead(book.id) ? styles.readActive : ''
                  }`}
                  onClick={() => handleToggleReadStatus(book)}
                  title={isRead(book.id) ? 'Marcar como não lido' : 'Marcar como lido'}
                >
                  {isRead(book.id) ? <FaCheck /> : <FaBookOpen />}
                </div>
              </div>
            </div>
            <h3 className={styles.bookTitle} title={book.volumeInfo.title}>
              {truncateTitle(book.volumeInfo.title)}
            </h3>
            <hr className={styles.separator} />
            <p className={styles.bookAuthor}>
              {book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}
            </p>
            <hr className={styles.separator} />
            <p className={styles.bookYear}>
              {book.volumeInfo.publishedDate
                ? `Ano: ${book.volumeInfo.publishedDate.split('-')[0]}`
                : 'Ano não disponível'}
            </p>
            <button
              className={styles.viewMoreButton}
              onClick={() => handleOpenPopup(book)}
            >
              Ver mais
            </button>
          </div>
        ))}
      </div>

      {/* Exibir paginação apenas se houver livros */}
      {books.length > 0 && (
        <div className={styles.pagination}>
          <button
            className={styles.arrowButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className={styles.arrowButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      )}

      {/* Popup */}
      {selectedBook && (
        <div className={styles.popupOverlay} onClick={handleClosePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedBook.volumeInfo.title}</h2>
            <p>{selectedBook.volumeInfo.description || 'Descrição não disponível.'}</p>
            <button className={styles.closeButton} onClick={handleClosePopup}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}