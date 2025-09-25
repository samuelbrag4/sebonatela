'use client';

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Importando ícones do React Icons
import { FaCog, FaBook, FaHeart, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import Aside from '@/components/Aside';
import MainSection from '@/components/MainSection';
import Dashboard from '@/components/Dashboard';
import FeaturedBooks from '@/components/FeaturedBooks';
import Achievements from '@/components/Achievements';
import Recommendations from '@/components/Recommendations';
import RandomBook from '@/components/RandomBook';
import ReadingCalendar from '@/components/ReadingCalendar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        {/* Aside */}
        <Aside />

        {/* Sessão principal com TUDO DE INCRÍVEL */}
        <div className={styles.contentArea}>
          <MainSection />
          <Dashboard />
          <ReadingCalendar />
          <FeaturedBooks />
          <RandomBook />
          <Recommendations />
          <Achievements />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}