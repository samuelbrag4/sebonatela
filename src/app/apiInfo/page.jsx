'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaBook, 
  FaCode, 
  FaGlobe, 
  FaInfoCircle, 
  FaExternalLinkAlt, 
  FaSearch, 
  FaFilter, 
  FaImage,
  FaHome,
  FaPlus,
  FaEdit,
  FaTrash,
  FaDatabase,
  FaList
} from 'react-icons/fa';
import styles from './apiInfo.module.css';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaInfoCircle className="text-blue-600 text-4xl" />
            <h1 className="text-4xl font-bold text-gray-800">Documentação da API</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça a JSONPlaceholder API - A solução completa para desenvolvimento e testes
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaHome /> Voltar ao Início
          </Link>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Card Principal da API */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaDatabase className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">JSONPlaceholder API</h2>
                <p className="text-gray-600">API REST gratuita para testes e prototipação</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              A <strong>JSONPlaceholder</strong> é uma API REST gratuita que fornece dados fictícios 
              para desenvolvimento e testes. Oferece endpoints completos para posts, comentários, 
              álbuns, fotos, tarefas e usuários, suportando todas as operações CRUD (Create, Read, Update, Delete).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaGlobe className="text-green-600" />
                  URL Base
                </h4>
                <code className="text-sm bg-gray-200 px-2 py-1 rounded">
                  https://jsonplaceholder.typicode.com
                </code>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaExternalLinkAlt className="text-blue-600" />
                  Documentação Oficial
                </h4>
                <a 
                  href="https://jsonplaceholder.typicode.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  jsonplaceholder.typicode.com
                </a>
              </div>
            </div>
          </div>

          {/* Endpoints Utilizados */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaCode className="text-purple-600" />
              Endpoints e Métodos HTTP
            </h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                  <code className="text-sm">/posts</code>
                </div>
                <p className="text-sm text-gray-600">Buscar todos os posts</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                  <code className="text-sm">/posts/:id</code>
                </div>
                <p className="text-sm text-gray-600">Buscar post específico</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">POST</span>
                  <code className="text-sm">/posts</code>
                </div>
                <p className="text-sm text-gray-600">Criar novo post</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-mono">PUT</span>
                  <code className="text-sm">/posts/:id</code>
                </div>
                <p className="text-sm text-gray-600">Atualizar post completo</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono">DELETE</span>
                  <code className="text-sm">/posts/:id</code>
                </div>
                <p className="text-sm text-gray-600">Excluir post</p>
              </div>
            </div>
          </div>

          {/* Atributos da Resposta */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaList className="text-indigo-600" />
              Atributos dos Posts
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm text-purple-600">id</span>
                <span className="text-sm text-gray-600">Identificador único (number)</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm text-purple-600">userId</span>
                <span className="text-sm text-gray-600">ID do autor (number)</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm text-purple-600">title</span>
                <span className="text-sm text-gray-600">Título do post (string)</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm text-purple-600">body</span>
                <span className="text-sm text-gray-600">Conteúdo do post (string)</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Exemplo de Resposta:</h4>
              <pre className="text-xs text-blue-700 overflow-x-auto">
{`{
  "id": 1,
  "userId": 1,
  "title": "Exemplo de Post",
  "body": "Conteúdo do post..."
}`}
              </pre>
            </div>
          </div>

          {/* Funcionalidades Implementadas */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaBook className="text-green-600" />
              Funcionalidades Implementadas no Projeto
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <FaList className="text-green-600 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-green-800">Listagem</h4>
                <p className="text-sm text-green-600 mt-1">Visualizar todos os posts</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <FaPlus className="text-blue-600 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800">Criação</h4>
                <p className="text-sm text-blue-600 mt-1">Adicionar novos posts</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <FaEdit className="text-orange-600 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800">Edição</h4>
                <p className="text-sm text-orange-600 mt-1">Modificar posts existentes</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <FaTrash className="text-red-600 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-red-800">Exclusão</h4>
                <p className="text-sm text-red-600 mt-1">Remover posts desnecessários</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <FaBook />
                Explorar Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
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
