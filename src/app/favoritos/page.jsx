"use client";

import React from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import Aside from '@/components/Aside';
import BookList from '@/components/BookList';
import Footer from '@/components/Footer';
import styles from './favoritos.module.css';

export default function Page() {
  const { favorites } = useFavorites();

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        {/* Aside */}
        <Aside />

        {/* Sessão principal */}
        <section className={styles.mainSection}>
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>Meus Favoritos</h1>
            <hr className={styles.lineTitle} />
            <p className={styles.pageSubtitle}>
              {favorites.length > 0 
                ? `${favorites.length} livro(s) favoritado(s)`
                : 'Nenhum livro favoritado ainda'
              }
            </p>
          </header>

          {favorites.length > 0 ? (
            <BookList
              books={favorites}
              onPageChange={() => {}} // Não precisa de paginação nos favoritos
              currentPage={1}
              totalPages={1}
            />
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💔</div>
              <h3>Nenhum livro favoritado</h3>
              <p>Que tal explorar alguns livros e adicionar aos seus favoritos?</p>
              <a href="/livros" className={styles.exploreButton}>
                Explorar Livros
              </a>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
