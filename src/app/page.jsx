import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Importando ícones do React Icons
import { FaCog, FaBook, FaHeart, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import Aside from '@/components/Aside';
import MainSection from '@/components/MainSection';

export default function Page() {
  return (
    <main className={styles.mainContainer}>
      {/* Aside */}
      <Aside />

      {/* Sessão principal */}
      <MainSection />
    </main>
  );
}