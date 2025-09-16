"use client";

import React from 'react';
import styles from './livros.module.css';
import Aside from '@/components/Aside';
import MainSection from '@/components/MainSection';

export default function Page() {
  return (
    <main className={styles.mainContainer}>
      {/* Aside */}
      <Aside />

      {/* MainSection que já contém a lógica de busca e exibição */}
      <MainSection />
    </main>
  );
}