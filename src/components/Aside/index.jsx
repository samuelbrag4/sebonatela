import React from 'react';
import Image from 'next/image';
import styles from './aside.module.css';
import { FaCog, FaBook, FaHeart, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';

export default function Aside() {
  return (
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
            <a href="/livros" className={styles.navbarLink}>
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
        </ul>
      </nav>
    </aside>
  );
}