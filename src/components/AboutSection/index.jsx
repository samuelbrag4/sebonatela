import React from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaGraduationCap, FaUser } from 'react-icons/fa';
import styles from './aboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/eu.jpg"
              alt="Samuel Braga"
              width={200}
              height={200}
              className={styles.profileImage}
            />
          </div>
          
          <div className={styles.info}>
            <div className={styles.header}>
              <h2 className={styles.name}>
                <FaUser className={styles.icon} />
                Samuel Braga
              </h2>
              <p className={styles.classroom}>
                <FaGraduationCap className={styles.icon} />
                Sala: [Sua Sala Aqui]
              </p>
            </div>
            
            <div className={styles.description}>
              <p>
                Desenvolvedor apaixonado por tecnologia e literatura. Este projeto foi criado 
                para combinar essas duas paixões, oferecendo uma plataforma intuitiva para 
                descobrir e organizar livros incríveis.
              </p>
            </div>
            
            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/samuelbrag4" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
