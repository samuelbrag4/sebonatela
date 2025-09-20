import React from 'react'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Página não encontrada</h2>
        <p className={styles.description}>
          A página que você está procurando não existe ou foi movida.
        </p>
        <a href="/" className={styles.homeButton}>
          Voltar ao início
        </a>
      </div>
    </div>
  )
}
