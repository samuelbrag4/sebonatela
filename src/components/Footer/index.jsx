import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Sebo na Tela</h3>
            <p>Sua plataforma favorita para descobrir livros incríveis</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>Navegação</h4>
              <a href="/">Início</a>
              <a href="/livros">Livros</a>
              <a href="/favoritos">Favoritos</a>
              <a href="/apiInfo">Sobre a API</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>Desenvolvedor</h4>
              <a href="https://github.com/samuelbrag4" target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>
            Feito com <FaHeart className={styles.heart} /> por Samuel Braga • 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
