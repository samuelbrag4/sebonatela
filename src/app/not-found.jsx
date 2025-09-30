import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Ícone de erro */}
        <div className="mb-8">
          <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-4" />
          <div className="text-8xl font-bold text-gray-800 mb-2">404</div>
        </div>

        {/* Título e mensagem */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Página não encontrada 😢
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! A página que você está procurando não existe ou foi movida. 
          Que tal voltar ao início e explorar o que temos disponível?
        </p>

        {/* Botões de navegação */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 w-full justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaHome className="w-5 h-5" />
            Voltar ao Início
          </Link>
          
          <Link
            href="/posts"
            className="inline-flex items-center gap-3 w-full justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaSearch className="w-5 h-5" />
            Explorar Posts
          </Link>

          <Link
            href="/apiInfo"
            className="inline-flex items-center gap-3 w-full justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            📚 Documentação da API
          </Link>
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            O que você pode fazer:
          </h3>
          <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Verificar a URL digitada
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Navegar pelos posts disponíveis
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Criar um novo post
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Consultar a documentação da API
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Projeto Next.js 15 • CRUD com JSONPlaceholder API</p>
        </div>
      </div>
    </div>
  );
}
