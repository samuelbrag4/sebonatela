'use client';

import React, { useState } from 'react';
import { useBooks } from '@/contexts/FavoritesContext';
import { 
  FaTrophy, FaMedal, FaStar, FaFire, FaBookOpen, FaHeart, FaCrown, FaRocket
} from 'react-icons/fa';
import styles from './achievements.module.css';

export default function Achievements() {
  const { readBooksCount, favoritesCount } = useBooks();
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Sistema simplificado de conquistas com ícones confiáveis
  const achievements = [
    // Marco Inicial
    {
      id: 'first-book',
      title: 'Primeiro Passo',
      description: 'Leia seu primeiro livro',
      icon: FaBookOpen,
      target: 1,
      current: readBooksCount,
      completed: readBooksCount >= 1,
      color: '#3498db',
      rarity: 'comum',
      category: 'Marco'
    },
    {
      id: 'first-favorite',
      title: 'Primeiro Amor',
      description: 'Adicione seu primeiro livro aos favoritos',
      icon: FaHeart,
      target: 1,
      current: favoritesCount,
      completed: favoritesCount >= 1,
      color: '#e91e63',
      rarity: 'comum',
      category: 'Marco'
    },

    // Quantidade
    {
      id: 'bookworm',
      title: 'Devorador de Livros',
      description: 'Leia 10 livros',
      icon: FaFire,
      target: 10,
      current: readBooksCount,
      completed: readBooksCount >= 10,
      color: '#e74c3c',
      rarity: 'raro',
      category: 'Quantidade'
    },
    {
      id: 'master-reader',
      title: 'Mestre da Literatura',
      description: 'Leia 25 livros',
      icon: FaCrown,
      target: 25,
      current: readBooksCount,
      completed: readBooksCount >= 25,
      color: '#9b59b6',
      rarity: 'épico',
      category: 'Quantidade'
    },

    // Coleção
    {
      id: 'collector',
      title: 'Colecionador',
      description: 'Adicione 5 livros aos favoritos',
      icon: FaTrophy,
      target: 5,
      current: favoritesCount,
      completed: favoritesCount >= 5,
      color: '#16a085',
      rarity: 'raro',
      category: 'Coleção'
    },
    {
      id: 'super-collector',
      title: 'Super Colecionador',
      description: 'Adicione 15 livros aos favoritos',
      icon: FaMedal,
      target: 15,
      current: favoritesCount,
      completed: favoritesCount >= 15,
      color: '#d4af37',
      rarity: 'épico',
      category: 'Coleção'
    },

    // Velocidade
    {
      id: 'speed-reader',
      title: 'Leitor Veloz',
      description: 'Leia 3 livros rapidamente',
      icon: FaRocket,
      target: 3,
      current: Math.min(3, readBooksCount),
      completed: readBooksCount >= 3,
      color: '#1abc9c',
      rarity: 'raro',
      category: 'Velocidade'
    },

    // Especiais
    {
      id: 'perfectionist',
      title: 'Perfeccionista',
      description: 'Complete sua jornada de leitura',
      icon: FaStar,
      target: 20,
      current: Math.min(20, readBooksCount + favoritesCount),
      completed: (readBooksCount + favoritesCount) >= 20,
      color: '#f39c12',
      rarity: 'épico',
      category: 'Especial'
    }
  ];

  const categories = ['Todas', 'Marco', 'Quantidade', 'Coleção', 'Velocidade', 'Especial'];
  
  const filteredAchievements = selectedCategory === 'Todas' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);
  
  const completedAchievements = achievements.filter(a => a.completed);
  const nextAchievement = achievements.find(a => !a.completed);

  const getCategoryIcon = (category) => {
    const icons = {
      'Marco': '🏁',
      'Quantidade': '📚',
      'Coleção': '💎',
      'Velocidade': '⚡',
      'Especial': '🎯'
    };
    return icons[category] || '🏆';
  };

  return (
    <div className={styles.achievements}>
      <div className={styles.sectionHeader}>
        <FaTrophy className={styles.trophyIcon} />
        <h2 className={styles.sectionTitle}>🏆 Suas Conquistas</h2>
        <p className={styles.sectionSubtitle}>
          {completedAchievements.length} de {achievements.length} conquistadas
        </p>
      </div>

      {/* Próxima conquista */}
      {nextAchievement && (
        <div className={styles.nextAchievement}>
          <h3 className={styles.nextTitle}>🎯 Próxima Conquista</h3>
          <div className={styles.achievementCard}>
            <div className={styles.achievementIcon} style={{ backgroundColor: nextAchievement.color }}>
              <nextAchievement.icon />
            </div>
            <div className={styles.achievementInfo}>
              <h4 className={styles.achievementTitle}>{nextAchievement.title}</h4>
              <p className={styles.achievementDesc}>{nextAchievement.description}</p>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${Math.min(100, (nextAchievement.current / nextAchievement.target) * 100)}%`,
                      backgroundColor: nextAchievement.color
                    }}
                  ></div>
                </div>
                <span className={styles.progressText}>
                  {nextAchievement.current} / {nextAchievement.target}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros de categoria */}
      <div className={styles.categoryFilters}>
        {categories.map(category => (
          <button 
            key={category} 
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category !== 'Todas' ? getCategoryIcon(category) : '🏆'} {category}
          </button>
        ))}
      </div>

      {/* Grid de conquistas */}
      <div className={styles.achievementsGrid}>
        {filteredAchievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`${styles.achievementItem} ${
              achievement.completed ? styles.completed : styles.locked
            } ${styles[achievement.rarity]}`}
          >
            <div 
              className={styles.achievementIcon} 
              style={{ backgroundColor: achievement.completed ? achievement.color : '#bdc3c7' }}
            >
              <achievement.icon />
            </div>
            
            <div className={styles.achievementContent}>
              <div className={styles.achievementHeader}>
                <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                <span className={styles.rarity}>{achievement.rarity}</span>
              </div>
              
              <p className={styles.achievementDesc}>{achievement.description}</p>
              
              {achievement.completed ? (
                <div className={styles.completedBadge}>
                  <FaMedal className={styles.medalIcon} />
                  <span>Conquistado!</span>
                </div>
              ) : (
                <div className={styles.progress}>
                  <div className={styles.progressMini}>
                    <div 
                      className={styles.progressFillMini}
                      style={{ 
                        width: `${Math.min(100, (achievement.current / achievement.target) * 100)}%`,
                        backgroundColor: achievement.color
                      }}
                    ></div>
                  </div>
                  <span className={styles.progressTextMini}>
                    {achievement.current}/{achievement.target}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className={styles.achievementStats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{completedAchievements.length}</span>
          <span className={styles.statLabel}>Conquistadas</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>
            {Math.round((completedAchievements.length / achievements.length) * 100)}%
          </span>
          <span className={styles.statLabel}>Progresso Total</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>
            {completedAchievements.filter(a => 
              a.rarity === 'épico' || a.rarity === 'lendário' || 
              a.rarity === 'mítico' || a.rarity === 'divino'
            ).length}
          </span>
          <span className={styles.statLabel}>Raras</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{categories.length - 1}</span>
          <span className={styles.statLabel}>Categorias</span>
        </div>
      </div>
    </div>
  );
}
