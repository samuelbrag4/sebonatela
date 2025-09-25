'use client';

import React from 'react';
import { useBooks } from '@/contexts/FavoritesContext';
import { FaBook, FaHeart, FaTrophy, FaFire, FaCalendarAlt, FaDice } from 'react-icons/fa';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const { favorites, readBooks, favoritesCount, readBooksCount } = useBooks();

  // Calcular estatísticas
  const totalBooks = favoritesCount + readBooksCount;
  const readPercentage = totalBooks > 0 ? Math.round((readBooksCount / totalBooks) * 100) : 0;

  // Calcular livros lidos este mês
  const currentMonth = new Date().getMonth();
  const booksThisMonth = readBooks.filter(book => {
    const readDate = new Date(book.readAt);
    return readDate.getMonth() === currentMonth;
  }).length;

  // Gêneros mais lidos (simulado)
  const topGenres = [
    { name: 'Ficção', count: Math.max(1, Math.floor(readBooksCount * 0.4)), color: '#3498db' },
    { name: 'Romance', count: Math.max(1, Math.floor(readBooksCount * 0.3)), color: '#e74c3c' },
    { name: 'Mistério', count: Math.max(1, Math.floor(readBooksCount * 0.2)), color: '#9b59b6' },
    { name: 'Biografia', count: Math.max(1, Math.floor(readBooksCount * 0.1)), color: '#f39c12' }
  ];

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.sectionTitle}>📊 Seu Dashboard de Leitura</h2>
      
      <div className={styles.statsGrid}>
        {/* Card de livros lidos */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaBook />
          </div>
          <div className={styles.statInfo}>
            <h3>{readBooksCount}</h3>
            <p>Livros Lidos</p>
            <small>+{booksThisMonth} este mês</small>
          </div>
        </div>

        {/* Card de favoritos */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaHeart />
          </div>
          <div className={styles.statInfo}>
            <h3>{favoritesCount}</h3>
            <p>Favoritos</p>
            <small>Na sua lista</small>
          </div>
        </div>

        {/* Card de progresso */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaTrophy />
          </div>
          <div className={styles.statInfo}>
            <h3>{readPercentage}%</h3>
            <p>Progresso</p>
            <small>Taxa de conclusão</small>
          </div>
        </div>

        {/* Card de streak */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaFire />
          </div>
          <div className={styles.statInfo}>
            <h3>7</h3>
            <p>Dias</p>
            <small>Sequência de leitura</small>
          </div>
        </div>
      </div>

      {/* Gráfico de gêneros */}
      <div className={styles.genreChart}>
        <h3>📚 Gêneros Favoritos</h3>
        <div className={styles.chartBars}>
          {topGenres.map((genre, index) => (
            <div key={index} className={styles.genreBar}>
              <div className={styles.barLabel}>{genre.name}</div>
              <div className={styles.barContainer}>
                <div 
                  className={styles.bar}
                  style={{ 
                    width: `${Math.max(20, (genre.count / Math.max(1, readBooksCount)) * 100)}%`,
                    backgroundColor: genre.color 
                  }}
                ></div>
              </div>
              <div className={styles.barCount}>{genre.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
