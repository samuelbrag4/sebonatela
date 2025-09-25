"use client";

import React, { useState, useEffect } from 'react';
import styles from './livros.module.css';
import Aside from '@/components/Aside';
import SearchBar from '@/components/SearchBar';
import BookList from '@/components/BookList';
import Footer from '@/components/Footer';
import { useBooks } from '@/contexts/FavoritesContext';
import { 
  FaBook, FaStar, FaSearch, FaHistory, FaFire, FaChartLine,
  FaFilter, FaGlobe, FaClock, FaHeart, FaBolt, FaTrophy
} from 'react-icons/fa';

export default function Page() {
  const { readBooksCount, favoritesCount } = useBooks();
  
  // Estados existentes
  const [books, setBooks] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [query, setQuery] = useState(""); 
  
  // Novos estados para funcionalidades avançadas
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    language: '',
    publishedAfter: '',
    orderBy: 'relevance'
  });

  // Carregar dados salvos no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('sebonatela-search-history');
      const savedDarkMode = localStorage.getItem('sebonatela-dark-mode');
      
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
      if (savedDarkMode) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    }
  }, []);

  // Função aprimorada para buscar livros
  const fetchBooks = async (query, page = 1) => {
    const maxResults = 15;
    const startIndex = (page - 1) * maxResults;
    setLoading(true);

    try {
      let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`;
      
      // Adicionar filtros à URL
      if (filters.language) {
        apiUrl += `&langRestrict=${filters.language}`;
      }
      if (filters.orderBy) {
        apiUrl += `&orderBy=${filters.orderBy}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      const booksData = data.items || [];
      setBooks(booksData);
      setTotalPages(Math.ceil((data.totalItems || 0) / maxResults));
      setTotalResults(data.totalItems || 0);
      
      // Adicionar ao histórico de pesquisas
      addToSearchHistory(query);
      
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };



  // Adicionar ao histórico de pesquisas
  const addToSearchHistory = (searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') return;
    
    setSearchHistory(prev => {
      const newHistory = [searchQuery, ...prev.filter(q => q !== searchQuery)].slice(0, 5);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sebonatela-search-history', JSON.stringify(newHistory));
      }
      return newHistory;
    });
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    fetchBooks(searchQuery);
  };

  const handleCategorySelect = (category) => {
    setQuery(category);
    setCurrentPage(1);
    fetchBooks(category);
  };

  const handleSort = (order) => {
    const sortedBooks = [...books].sort((a, b) => {
      const titleA = a.volumeInfo.title?.toLowerCase() || '';
      const titleB = b.volumeInfo.title?.toLowerCase() || '';

      if (order === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    setBooks(sortedBooks);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchBooks(query, newPage);
  };

  // Função para alternar tema
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sebonatela-dark-mode', JSON.stringify(newMode));
    }
  };

  // Função para pesquisa rápida do histórico
  const searchFromHistory = (historyQuery) => {
    setQuery(historyQuery);
    setCurrentPage(1);
    fetchBooks(historyQuery);
  };

  // Função para limpar histórico
  const clearSearchHistory = () => {
    setSearchHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sebonatela-search-history');
    }
  };

  return (
    <div className={`${styles.pageWrapper} ${darkMode ? styles.darkMode : ''}`}>
      <main className={styles.mainContainer}>
        {/* Aside */}
        <Aside />

        {/* Sessão principal aprimorada */}
        <section className={styles.mainSection}>
          {/* Header com estatísticas */}
          <header className={styles.header}>
            <div className={styles.headerTop}>
              <h1 className={styles.pageTitle}>📚 Biblioteca Digital</h1>
              <button className={styles.themeToggle} onClick={toggleDarkMode}>
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
            <hr className={styles.lineTitle} />
            <p className={styles.pageSubtitle}>
              Descubra, explore e colecione seus livros favoritos
            </p>

            {/* Dashboard de Estatísticas */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <FaBook className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>{readBooksCount}</span>
                  <span className={styles.statLabel}>Livros Lidos</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaHeart className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>{favoritesCount}</span>
                  <span className={styles.statLabel}>Favoritos</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaSearch className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>{totalResults.toLocaleString()}</span>
                  <span className={styles.statLabel}>Resultados</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaBolt className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>{searchHistory.length}</span>
                  <span className={styles.statLabel}>Pesquisas</span>
                </div>
              </div>
            </div>
          </header>

          {/* Histórico de Pesquisas */}
          {searchHistory.length > 0 && (
            <div className={styles.searchHistory}>
              <div className={styles.historyHeader}>
                <h3 className={styles.historyTitle}>
                  <FaHistory className={styles.historyIcon} />
                  Pesquisas Recentes
                </h3>
                <button className={styles.clearHistory} onClick={clearSearchHistory}>
                  Limpar
                </button>
              </div>
              <div className={styles.historyTags}>
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    className={styles.historyTag}
                    onClick={() => searchFromHistory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}



          {/* Barra de Pesquisa Destacada */}
          <div className={styles.searchSection}>
            <div className={styles.searchHighlight}>
              <div className={styles.searchHeader}>
                <h2 className={styles.searchTitle}>
                  <FaSearch className={styles.searchTitleIcon} />
                  Explore Milhares de Livros
                </h2>
                <p className={styles.searchSubtitle}>
                  Descubra seu próximo livro favorito com nossa busca inteligente
                </p>
              </div>
              
              <div className={styles.searchWrapper}>
                <SearchBar
                  onSearch={handleSearch}
                  onCategorySelect={handleCategorySelect}
                  onSort={handleSort}
                  loading={loading}
                />
              </div>
              
              {books.length === 0 && !loading && (
                <div className={styles.searchPrompts}>
                  <p className={styles.promptsTitle}>💡 Sugestões de pesquisa:</p>
                  <div className={styles.promptsGrid}>
                    <button 
                      className={styles.promptButton}
                      onClick={() => handleSearch('romance')}
                    >
                      💕 Romance
                    </button>
                    <button 
                      className={styles.promptButton}
                      onClick={() => handleSearch('ficção científica')}
                    >
                      🚀 Ficção Científica
                    </button>
                    <button 
                      className={styles.promptButton}
                      onClick={() => handleSearch('filosofia')}
                    >
                      🤔 Filosofia
                    </button>
                    <button 
                      className={styles.promptButton}
                      onClick={() => handleSearch('autoajuda')}
                    >
                      💪 Autoajuda
                    </button>
                    <button 
                      className={styles.promptButton}
                      onClick={() => handleSearch('história')}
                    >
                      📜 História
                    </button>
                    <button 
                      className={styles.promptButton}
                      onClick={() => handleSearch('mistério')}
                    >
                      🔍 Mistério
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Indicador de Loading */}
          {loading && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>Buscando livros incríveis...</p>
            </div>
          )}

          {/* Lista de Livros */}
          <BookList
            books={books}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
          />

          {/* Estatísticas da Pesquisa */}
          {books.length > 0 && (
            <div className={styles.searchStats}>
              <div className={styles.searchStatsContent}>
                <FaChartLine className={styles.searchStatsIcon} />
                <span className={styles.searchStatsText}>
                  Mostrando {books.length} de {totalResults.toLocaleString()} resultados para "{query}"
                </span>
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}