import React, { useState } from 'react';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa'; // Ícone de coração
import styles from './bookList.module.css';

export default function BookList({ books, onPageChange, currentPage, totalPages }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOpenPopup = (book) => {
    setSelectedBook(book);
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  // Função para truncar o título do livro
  const truncateTitle = (title, maxLength = 20) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    }
    return title;
  };

  return (
    <div className={styles.bookList}>
      <div className={styles.booksContainer}>
        {books.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail || '/images/placeholder.jpg'}
              alt={book.volumeInfo.title}
              width={150}
              height={150}
              className={styles.bookImage}
            />
            <h3 className={styles.bookTitle} title={book.volumeInfo.title}>
              {truncateTitle(book.volumeInfo.title)}
            </h3>
            <p className={styles.bookAuthor}>
              {book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}
            </p>
            <button className={styles.favoriteButton}>
              <FaHeart /> Favoritar
            </button>
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