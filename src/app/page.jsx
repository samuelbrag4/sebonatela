import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Importando ícones do React Icons
import { FaCog, FaBook, FaHeart, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';

export default function Page() {
  return (
    <main className={styles.mainContainer}>
      {/* Aside */}
      <aside className={styles.asideContainer}>
        {/* Foto e saudação */}
        <div className={styles.profileContainer}>
          <Image
            src="/images/eu.jpg"
            alt="Minha foto"
            width={100}
            height={100}
            className={styles.profileImage}
          />
          <h2 className={styles.greeting}>Olá, Samuel</h2>
        </div>

        {/* Navbar em coluna */}
        <nav className={styles.navbar}>
          <ul className={styles.navbarList}>
            <li className={styles.navbarItem}>
              <a href="/api" className={styles.navbarLink}>
                <FaCog className={styles.navbarIcon} aria-label="Engrenagem" />
              </a>
            </li>
            <li className={styles.navbarItem}>
              <a href="/listagem" className={styles.navbarLink}>
                <FaBook className={styles.navbarIcon} aria-label="Livro" />
              </a>
            </li>
            <li className={styles.navbarItem}>
              <a href="/favoritos" className={styles.navbarLink}>
                <FaHeart className={styles.navbarIcon} aria-label="Coração" />
              </a>
            </li>
            <li className={styles.navbarItem}>
              <a href="/sobre" className={styles.navbarLink}>
                <FaInfoCircle className={styles.navbarIcon} aria-label="Exclamação" />
              </a>
            </li>
            <li className={styles.navbarItem}>
              <a href="/carrinho" className={styles.navbarLink}>
                <FaShoppingCart className={styles.navbarIcon} aria-label="Carrinho" />
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Sessão principal */}
      <section className={styles.mainSection}>
        {/* Barra de pesquisa */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Digite o título, autor ou gênero"
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>🔍</button>
        </div>

        {/* Título e subtítulo */}
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Sebo na Tela</h1>
          <p className={styles.pageSubtitle}>Uma plataforma para amantes de livros</p>
        </header>

        {/* Listagem de categorias */}
        <nav className={styles.categories}>
          <button className={styles.categoryButton}>Ficção</button>
          <button className={styles.categoryButton}>Romance</button>
          <button className={styles.categoryButton}>Terror</button>
          <button className={styles.categoryButton}>Fantasia</button>
          <button className={styles.categoryButton}>História</button>
          <button className={styles.categoryButton}>Biografia</button>
        </nav>

        {/* Listagem de livros populares */}
        <section className={styles.popularBooks}>
          <h2 className={styles.sectionTitle}>Livros Populares</h2>
          <div className={styles.booksContainer}>
            <button className={styles.arrowButton}>{'<'}</button>
            <div className={styles.booksList}>
              {/* Card de livro */}
              <div className={styles.bookCard}>
                <Image
                  src="/images/livro1.jpg"
                  alt="Livro 1"
                  width={100}
                  height={150}
                  className={styles.bookImage}
                />
                <h3 className={styles.bookTitle}>Título do Livro</h3>
                <p className={styles.bookPrice}>R$ 29,90</p>
                <button className={styles.favoriteButton}>❤️</button>
                <button className={styles.cartButton}>🛒</button>
              </div>
              {/* Adicione mais cards conforme necessário */}
            </div>
            <button className={styles.arrowButton}>{'>'}</button>
          </div>
        </section>

        {/* Sessão adicional */}
        <section className={styles.additionalSection}>
          <h2 className={styles.sectionTitle}>Outra Sessão</h2>
          <p className={styles.sectionContent}>Conteúdo a ser definido.</p>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>Footer - Estilizar depois</p>
        </footer>
      </section>
    </main>
  );
}