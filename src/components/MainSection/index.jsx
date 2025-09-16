"use client";

import React, { useState } from "react";
import SearchBar from "../SearchBar";
import BookList from "../BookList";
import styles from "./mainSection.module.css";

export default function MainSection() {
  const [books, setBooks] = useState([]); // Estado para armazenar os livros
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [query, setQuery] = useState(""); // Estado para armazenar a query de busca

  const fetchBooks = async (query, page = 1) => {
    const maxResults = 15; // Exibir 15 livros por página
    const startIndex = (page - 1) * maxResults;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      const data = await response.json();

      setBooks(data.items || []);
      setTotalPages(Math.ceil((data.totalItems || 0) / maxResults));
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery); // Atualiza o estado com a nova query
    setCurrentPage(1);
    fetchBooks(searchQuery);
  };

  const handleCategorySelect = (category) => {
    setQuery(category); // Atualiza o estado com a categoria selecionada
    setCurrentPage(1);
    fetchBooks(category);
  };

  const handleSort = (order) => {
    const sortedBooks = [...books].sort((a, b) => {
      const titleA = a.volumeInfo.title.toLowerCase();
      const titleB = b.volumeInfo.title.toLowerCase();

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
    fetchBooks(query, newPage); // Usa o estado `query` para buscar os livros
  };

  return (
    <section className={styles.mainSection}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Sebo na Tela</h1>
        <hr className={styles.lineTitle} />
        <p className={styles.pageSubtitle}>
          Uma plataforma para amantes de livros
        </p>
      </header>

      <SearchBar
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        onSort={handleSort}
      />

      {/* Usando o componente BookList */}
      <BookList
        books={books}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}