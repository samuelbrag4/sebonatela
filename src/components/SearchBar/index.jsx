"use client";

import React, { useState } from "react";
import styles from "./searchBar.module.css";

export default function SearchBar({ onSearch, onCategorySelect, onSort }) {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // NOVO

  const categories = [
    "Administração, Negócios e Economia",
    "Arte, Cinema e Fotografia",
    "Artesanato, Casa e Estilo de Vida",
    "Autoajuda",
    "Biografias e Histórias Reais",
    "Ciências",
    "Computação, Informática e Mídias Digitais",
    "Crônicas, Humor e Entretenimento",
    "Direito",
    "Educação, Referência e Didáticos",
    "Engenharia e Transporte",
    "Esportes e Lazer",
    "Fantasia, Horror e Ficção Científica",
    "Gastronomia e Culinária",
    "História",
    "HQs, Mangás e Graphic Novels",
    "Infantil",
    "LGBTQ+",
    "Literatura e Ficção",
    "Medicina",
    "Policial, Suspense e Mistério",
    "Política, Filosofia e Ciências Sociais",
    "Religião e Espiritualidade",
    "Romance",
    "Saúde e Família",
    "Turismo e Guias de Viagem",
    "Livros Internacionais",
    "Jovens e Adolescentes",
  ];

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // NOVO
    onCategorySelect(category);
    setIsDropdownOpen(false);
  };

  const handleSortChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Digite o título, autor ou gênero"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Destaque da categoria selecionada */}
      <div className={styles.selectedCategoryContainer}>
        <span
          className={`${styles.selectedCategory} ${
            selectedCategory ? styles.selectedCategoryActive : ""
          }`}
        >
          Categoria: {selectedCategory || "Nenhuma"}
        </span>
      </div>

      <div className={styles.optionsContainer}>
        <div className={styles.categoriesDropdown}>
          <button
            className={styles.dropdownButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Categorias
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {categories.map((category) => (
                <div
                  key={category}
                  className={styles.dropdownItem}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.sortContainer}>
          <label htmlFor="sort" className={styles.order}>Ordenar:</label>
          <select
            id="sort"
            className={styles.sortSelect}
            onChange={handleSortChange}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
}