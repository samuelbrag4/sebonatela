import React from 'react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <header className="w-full bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-center items-center space-x-12">
            <a href="/livros" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-all duration-300 font-bold text-lg">
              <span className="text-xl">📚</span>
              <span>Livros</span>
            </a>
            <a href="/sobre" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-all duration-300 font-bold text-lg">
              <span className="text-xl">ℹ️</span>
              <span>Sobre</span>
            </a>
            <a href="/api" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-all duration-300 font-bold text-lg">
              <span className="text-xl">⚙️</span>
              <span>API</span>
            </a>
            <a href="/autores" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-all duration-300 font-bold text-lg">
              <span className="text-xl">✍️</span>
              <span>Autores</span>
            </a>
            <a href="/editoras" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-all duration-300 font-bold text-lg">
              <span className="text-xl">🏢</span>
              <span>Editoras</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center px-8">
        
        <div className="w-full max-w-6xl mt-8 mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-8 text-center md:text-left">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">2TDS2</h2>
                <p className="text-lg text-gray-600 font-semibold">Turma</p>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">SENAI Valinhos-SP</h2>
                <p className="text-lg text-gray-600 font-semibold">Escola</p>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Samuel dos Santos Braga</h2>
                <p className="text-lg text-gray-600 font-semibold">Aluno</p>
              </div>
            </div>
          </div>
        </div>

        <section className="text-center mb-20">
          <h1 className="text-6xl font-black text-gray-900 tracking-tight mb-6">
            Sebo na Tela
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Bem-vindo ao nosso sebo de livros online! Descubra, explore e se apaixone pela literatura.
          </p>
        </section>

        <section className="mb-20">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white p-2 rounded-full shadow-xl">
                <Image
                  src="/path/to/image.jpg"
                  alt="Samuel dos Santos Braga"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex justify-center">
            <div className="relative max-w-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-2xl blur-sm"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-12 border border-gray-200">
                <div className="text-center space-y-4">
                  <div className="text-4xl text-gray-300">"</div>
                  <blockquote className="text-2xl font-bold text-gray-800 italic leading-relaxed">
                    Escrever é uma forma de sangrar
                  </blockquote>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <cite className="text-lg font-semibold text-gray-600 px-4">
                      Conceição Evaristo
                    </cite>
                    <div className="h-px bg-gray-300 flex-1"></div>
                  </div>
                  <div className="text-4xl text-gray-300 rotate-180">"</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="flex flex-wrap justify-center gap-8">
            <button className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>📚</span>
                <span>Explore livros</span>
              </span>
            </button>
            
            <button className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-2xl border-2 border-gray-200 hover:border-gray-300 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>🔧</span>
                <span>Conheça a API de livros</span>
              </span>
            </button>
            
            <button className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>👨‍💻</span>
                <span>Conheça o criador</span>
              </span>
            </button>
          </div>
        </section>

      </main>

      <footer className="w-full bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="text-center space-y-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
            <p className="text-gray-500 font-medium text-lg">
              Desenvolvido com ❤️ por Samuel dos Santos Braga
            </p>
            <p className="text-sm text-gray-400">
              © 2025 Sebo na Tela. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}