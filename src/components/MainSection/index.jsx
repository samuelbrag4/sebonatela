"use client";

import React from "react";
import AboutSection from "../AboutSection";
import styles from "./mainSection.module.css";

export default function MainSection() {
  return (
    <section className={styles.mainSection}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Sebo na Tela</h1>
        <hr className={styles.lineTitle} />
        <p className={styles.pageSubtitle}>
          Uma plataforma para amantes de livros
        </p>
      </header>

      <AboutSection />
    </section>
  );
}