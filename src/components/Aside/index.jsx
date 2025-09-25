'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './aside.module.css';
import { FaHome, FaBook, FaHeart, FaInfoCircle, FaCog, FaQuoteLeft, FaStar, FaBookOpen } from 'react-icons/fa';
import { useBooks } from '@/contexts/FavoritesContext';

export default function Aside() {
  const { readBooksCount, favoritesCount } = useBooks();
  
  return (
    <aside className={styles.asideContainer}>
      {/* Foto e saudação */}
      <div className={styles.profileContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/eu.jpg"
            alt="Minha foto"
            width={100}
            height={100}
            className={styles.profileImage}
          />
          <div className={styles.statusIndicator}></div>
        </div>
        <h2 className={styles.greeting}>Olá, Samuel</h2>
        <p className={styles.subtitle}>Leitor apaixonado</p>
      </div>

      {/* Estatísticas */}
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <FaBookOpen className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{readBooksCount}</span>
            <span className={styles.statLabel}>Lidos</span>
          </div>
        </div>
        <div className={styles.statItem}>
          <FaStar className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{favoritesCount}</span>
            <span className={styles.statLabel}>Favoritos</span>
          </div>
        </div>
      </div>

      {/* Navbar em coluna */}
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <Link href="/" className={styles.navbarLink}>
              <FaHome className={styles.navbarIcon} />
              <span className={styles.navbarText}>Home</span>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link href="/livros" className={styles.navbarLink}>
              <FaBook className={styles.navbarIcon} />
              <span className={styles.navbarText}>Livros</span>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link href="/favoritos" className={styles.navbarLink}>
              <FaHeart className={styles.navbarIcon} />
              <span className={styles.navbarText}>Favoritos</span>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link href="/lidos" className={styles.navbarLink}>
              <FaBookOpen className={styles.navbarIcon} />
              <span className={styles.navbarText}>Lidos</span>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link href="/apiInfo" className={styles.navbarLink}>
              <FaInfoCircle className={styles.navbarIcon} />
              <span className={styles.navbarText}>API Info</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Citação motivacional */}
      <div className={styles.quoteContainer}>
        <FaQuoteLeft className={styles.quoteIcon} />
        <p className={styles.quoteText}>
          "Um livro é um sonho que você segura em suas mãos."
        </p>
        <span className={styles.quoteAuthor}>— Neil Gaiman</span>
      </div>

      {/* Configurações */}
      <div className={styles.settingsContainer}>
        <button className={styles.settingsButton}>
          <FaCog className={styles.settingsIcon} />
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
}