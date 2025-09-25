'use client';

import React from 'react';
import { useBooks } from '@/contexts/FavoritesContext';
import { FaCalendarAlt, FaFire, FaBullseye, FaTrophy } from 'react-icons/fa';
import styles from './readingCalendar.module.css';

export default function ReadingCalendar() {
  const { readBooks } = useBooks();

  // Calcular estatísticas do mês atual
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' });
  
  // Filtrar livros lidos neste mês
  const booksThisMonth = readBooks.filter(book => {
    if (!book.readAt) return false;
    const readDate = new Date(book.readAt);
    return readDate.getMonth() === currentMonth && readDate.getFullYear() === currentYear;
  });

  // Meta mensal (simulada)
  const monthlyGoal = 4;
  const progress = Math.min(100, (booksThisMonth.length / monthlyGoal) * 100);
  const remainingDays = new Date(currentYear, currentMonth + 1, 0).getDate() - currentDate.getDate();
  
  // Calcular streak de leitura (dias consecutivos)
  const calculateStreak = () => {
    const today = new Date();
    let streak = 0;
    const checkDate = new Date(today);
    
    for (let i = 0; i < 30; i++) {
      const hasReadToday = readBooks.some(book => {
        if (!book.readAt) return false;
        const readDate = new Date(book.readAt);
        return (
          readDate.toDateString() === checkDate.toDateString()
        );
      });
      
      if (hasReadToday) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const streak = calculateStreak();

  // Gerar calendário visual simples
  const generateCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    // Dias vazios no início
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const hasRead = readBooks.some(book => {
        if (!book.readAt) return false;
        const readDate = new Date(book.readAt);
        return readDate.toDateString() === date.toDateString();
      });
      
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push({
        day,
        hasRead,
        isToday
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendar();

  return (
    <div className={styles.readingCalendar}>
      <div className={styles.calendarHeader}>
        <FaCalendarAlt className={styles.calendarIcon} />
        <h2 className={styles.sectionTitle}>📅 Progresso de {monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h2>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <FaBullseye className={styles.statIcon} />
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{booksThisMonth.length}/{monthlyGoal}</div>
            <div className={styles.statLabel}>Meta Mensal</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <FaFire className={styles.statIcon} />
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{streak}</div>
            <div className={styles.statLabel}>Dias Seguidos</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <FaTrophy className={styles.statIcon} />
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{Math.round(progress)}%</div>
            <div className={styles.statLabel}>Progresso</div>
          </div>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className={styles.progressText}>
        {progress >= 100 
          ? '🎉 Parabéns! Meta atingida!' 
          : `Faltam ${monthlyGoal - booksThisMonth.length} livros para sua meta`
        }
      </p>

      <div className={styles.calendar}>
        <div className={styles.weekDays}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className={styles.weekDay}>{day}</div>
          ))}
        </div>
        
        <div className={styles.calendarGrid}>
          {calendarDays.map((day, index) => (
            <div 
              key={index} 
              className={`${styles.calendarDay} ${
                day ? (day.hasRead ? styles.readDay : '') : styles.emptyDay
              } ${day?.isToday ? styles.today : ''}`}
            >
              {day ? day.day : ''}
              {day?.hasRead && <div className={styles.readDot}></div>}
            </div>
          ))}
        </div>
      </div>

      {booksThisMonth.length > 0 && (
        <div className={styles.thisMonthBooks}>
          <h3>📚 Livros lidos este mês:</h3>
          <div className={styles.booksList}>
            {booksThisMonth.map((book, index) => (
              <div key={book.id || index} className={styles.bookItem}>
                <span className={styles.bookTitle}>{book.volumeInfo?.title || 'Título não disponível'}</span>
                <span className={styles.readDate}>
                  {new Date(book.readAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
