"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do localStorage quando o componente montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('sebonatela-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, []);

  // Salvar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sebonatela-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

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

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
