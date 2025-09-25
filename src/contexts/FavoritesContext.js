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
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  // Carregar dados do localStorage quando o componente montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('sebonatela-favorites');
      const savedReadBooks = localStorage.getItem('sebonatela-read-books');
      const savedAchievements = localStorage.getItem('sebonatela-achievements');
      
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      
      if (savedReadBooks) {
        setReadBooks(JSON.parse(savedReadBooks));
      }

      if (savedAchievements) {
        setUnlockedAchievements(JSON.parse(savedAchievements));
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

  // Salvar conquistas no localStorage sempre que a lista mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sebonatela-achievements', JSON.stringify(unlockedAchievements));
    }
  }, [unlockedAchievements]);

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

  // Funções para conquistas
  const unlockAchievement = (achievementId) => {
    setUnlockedAchievements(prev => {
      const isAlreadyUnlocked = prev.some(ach => ach.id === achievementId);
      if (isAlreadyUnlocked) {
        return prev;
      }
      const newAchievement = {
        id: achievementId,
        unlockedAt: new Date().toISOString()
      };
      return [...prev, newAchievement];
    });
  };

  const isAchievementUnlocked = (achievementId) => {
    return unlockedAchievements.some(ach => ach.id === achievementId);
  };

  const getAchievementUnlockDate = (achievementId) => {
    const achievement = unlockedAchievements.find(ach => ach.id === achievementId);
    return achievement ? achievement.unlockedAt : null;
  };

  // Funções para gerenciar dados salvos
  const clearAllData = () => {
    setFavorites([]);
    setReadBooks([]);
    setUnlockedAchievements([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sebonatela-favorites');
      localStorage.removeItem('sebonatela-read-books');
      localStorage.removeItem('sebonatela-achievements');
    }
  };

  const exportData = () => {
    const data = {
      favorites,
      readBooks,
      unlockedAchievements,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
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
    // Conquistas
    unlockedAchievements,
    unlockAchievement,
    isAchievementUnlocked,
    getAchievementUnlockDate,
    // Gerenciamento de dados
    clearAllData,
    exportData,
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
