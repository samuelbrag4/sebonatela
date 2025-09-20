import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './aside.module.css';
import { FaHome, FaBook, FaHeart, FaInfoCircle } from 'react-icons/fa';

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
            <Link href="/apiInfo" className={styles.navbarLink}>
              <FaInfoCircle className={styles.navbarIcon} />
              <span className={styles.navbarText}>API Info</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}