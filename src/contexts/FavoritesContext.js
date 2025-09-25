"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const BooksContext = createContext();

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks deve ser usado dentro de BooksProvider');
  }
  return context;
};

// Para compatibilidade com código existente
export const useFavorites = () => {
  const context = useBooks();
  return {
    favorites: context.favorites,
    addToFavorites: context.addToFavorites,
    removeFromFavorites: context.removeFromFavorites,
    toggleFavorite: context.toggleFavorite,
    isFavorite: context.isFavorite
  };
};

export const BooksProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  // Carregar dados do localStorage quando o componente montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('sebonatela-favorites');
      const savedReadBooks = localStorage.getItem('sebonatela-read-books');
      
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      
      if (savedReadBooks) {
        setReadBooks(JSON.parse(savedReadBooks));
      }
    }
  }, []);

  // Salvar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sebonatela-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Salvar livros lidos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sebonatela-read-books', JSON.stringify(readBooks));
    }
  }, [readBooks]);

  // Funções para favoritos
  const addToFavorites = (book) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === book.id);
      if (isAlreadyFavorite) {
        return prev;
      }
      return [...prev, book];
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== bookId));
  };

  const toggleFavorite = (book) => {
    const isFavorite = favorites.some(fav => fav.id === book.id);
    if (isFavorite) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  const isFavorite = (bookId) => {
    return favorites.some(fav => fav.id === bookId);
  };

  // Funções para livros lidos
  const addToReadBooks = (book) => {
    setReadBooks(prev => {
      const isAlreadyRead = prev.some(read => read.id === book.id);
      if (isAlreadyRead) {
        return prev;
      }
      return [...prev, { ...book, readAt: new Date().toISOString() }];
    });
  };

  const removeFromReadBooks = (bookId) => {
    setReadBooks(prev => prev.filter(read => read.id !== bookId));
  };

  const toggleReadStatus = (book) => {
    const isRead = readBooks.some(read => read.id === book.id);
    if (isRead) {
      removeFromReadBooks(book.id);
    } else {
      addToReadBooks(book);
    }
  };

  const isRead = (bookId) => {
    return readBooks.some(read => read.id === bookId);
  };

  const value = {
    // Favoritos
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    // Livros lidos
    readBooks,
    addToReadBooks,
    removeFromReadBooks,
    toggleReadStatus,
    isRead,
    // Estatísticas
    favoritesCount: favorites.length,
    readBooksCount: readBooks.length
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

// Para compatibilidade com código existente
export const FavoritesProvider = BooksProvider;
