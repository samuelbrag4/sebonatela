'use client';

import React from 'react';
import Aside from '@/components/Aside';
import Footer from '@/components/Footer';
import { FaBook, FaCode, FaGlobe, FaInfoCircle, FaExternalLinkAlt, FaSearch, FaFilter, FaImage } from 'react-icons/fa';
import styles from './apiInfo.module.css';

export default function Page() {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        {/* Aside */}
        <Aside />

        {/* Sessão principal */}
        <section className={styles.mainSection}>
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>
              <FaInfoCircle className={styles.titleIcon} />
              Sobre a API
            </h1>
            <hr className={styles.lineTitle} />
            <p className={styles.pageSubtitle}>
              Conheça a tecnologia por trás do Sebo na Tela
            </p>
          </header>

          <div className={styles.content}>
            <div className={styles.apiCard}>
              <div className={styles.cardHeader}>
                <FaBook className={styles.cardIcon} />
                <h2>Google Books API</h2>
              </div>
              
              <div className={styles.cardBody}>
                <p>
                  O <strong>Sebo na Tela</strong> utiliza a Google Books API para fornecer 
                  acesso a milhões de livros do catálogo do Google Books. Esta API permite 
                  buscar livros por título, autor, categoria e muito mais, oferecendo uma 
                  experiência rica e completa para os amantes da literatura.
                </p>
                
                <div className={styles.features}>
                  <h3><FaCode /> Funcionalidades da API:</h3>
                  <div className={styles.featureGrid}>
                    <div className={styles.featureItem}>
                      <FaSearch className={styles.featureIcon} />
                      <div>
                        <strong>Busca Avançada</strong>
                        <p>Pesquise por título, autor, ISBN ou palavra-chave</p>
                      </div>
                    </div>
                    <div className={styles.featureItem}>
                      <FaFilter className={styles.featureIcon} />
                      <div>
                        <strong>Filtros por Categoria</strong>
                        <p>Organize por gênero e categoria específica</p>
                      </div>
                    </div>
                    <div className={styles.featureItem}>
                      <FaBook className={styles.featureIcon} />
                      <div>
                        <strong>Informações Detalhadas</strong>
                        <p>Descrição, autores, ano de publicação e mais</p>
                      </div>
                    </div>
                    <div className={styles.featureItem}>
                      <FaImage className={styles.featureIcon} />
                      <div>
                        <strong>Capas em Alta Qualidade</strong>
                        <p>Imagens de capa dos livros em diferentes resoluções</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.technical}>
                  <h3>🔧 Detalhes Técnicos:</h3>
                  <div className={styles.techGrid}>
                    <div className={styles.techItem}>
                      <strong>Endpoint Base:</strong>
                      <code>https://www.googleapis.com/books/v1/volumes</code>
                    </div>
                    <div className={styles.techItem}>
                      <strong>Método HTTP:</strong>
                      <code>GET</code>
                    </div>
                    <div className={styles.techItem}>
                      <strong>Formato de Resposta:</strong>
                      <code>JSON</code>
                    </div>
                    <div className={styles.techItem}>
                      <strong>Resultados por Página:</strong>
                      <code>15 livros</code>
                    </div>
                    <div className={styles.techItem}>
                      <strong>Parâmetros Principais:</strong>
                      <code>q, startIndex, maxResults</code>
                    </div>
                    <div className={styles.techItem}>
                      <strong>Rate Limit:</strong>
                      <code>1000 requests/dia (gratuito)</code>
                    </div>
                  </div>
                </div>

                <div className={styles.example}>
                  <h3>📝 Exemplo de Uso:</h3>
                  <div className={styles.codeBlock}>
                    <code>
                      {`const response = await fetch(
  'https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=15'
);
const data = await response.json();
console.log(data.items); // Array de livros`}
                    </code>
                  </div>
                </div>

                <div className={styles.links}>
                  <a 
                    href="https://developers.google.com/books" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.apiLink}
                  >
                    <FaGlobe />
                    Documentação Oficial
                    <FaExternalLinkAlt />
                  </a>
                  
                  <a 
                    href="https://books.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.apiLink}
                  >
                    <FaBook />
                    Google Books
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.projectInfo}>
              <h2>💡 Sobre o Projeto</h2>
              <p>
                Este projeto foi desenvolvido como uma demonstração das possibilidades 
                oferecidas pela Google Books API, criando uma interface amigável e 
                intuitiva para explorar o vasto catálogo de livros disponível. O objetivo 
                é proporcionar uma experiência similar a um sebo virtual, onde você pode 
                descobrir, favoritar e organizar seus livros preferidos.
              </p>
              
              <div className={styles.technologies}>
                <h3>🚀 Tecnologias Utilizadas:</h3>
                <div className={styles.techBadges}>
                  <span className={styles.techBadge}>Next.js 15</span>
                  <span className={styles.techBadge}>React 19</span>
                  <span className={styles.techBadge}>CSS Modules</span>
                  <span className={styles.techBadge}>React Icons</span>
                  <span className={styles.techBadge}>Google Books API</span>
                  <span className={styles.techBadge}>LocalStorage</span>
                </div>
              </div>

              <div className={styles.features}>
                <h3>✨ Funcionalidades do Sebo na Tela:</h3>
                <ul className={styles.projectFeatures}>
                  <li>🔍 Busca inteligente de livros</li>
                  <li>📚 Organização por categorias</li>
                  <li>❤️ Sistema de favoritos</li>
                  <li>📱 Design responsivo</li>
                  <li>🎨 Interface moderna e intuitiva</li>
                  <li>⚡ Performance otimizada</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
