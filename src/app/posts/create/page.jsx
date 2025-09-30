'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaHome, FaSave, FaSpinner, FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postsAPI, usersAPI } from '@/lib/api';

export default function CreatePostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const usersData = await usersAPI.getAll();
      setUsers(usersData);
      
      // Definir o primeiro usuário como padrão
      if (usersData.length > 0) {
        setFormData(prev => ({ ...prev, userId: usersData[0].id.toString() }));
      }
    } catch (error) {
      toast.error('Erro ao carregar usuários');
      console.error('Erro:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Título deve ter pelo menos 5 caracteres';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Conteúdo é obrigatório';
    } else if (formData.body.trim().length < 10) {
      newErrors.body = 'Conteúdo deve ter pelo menos 10 caracteres';
    }

    if (!formData.userId) {
      newErrors.userId = 'Selecione um autor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);
    
    try {
      const postData = {
        title: formData.title.trim(),
        body: formData.body.trim(),
        userId: parseInt(formData.userId)
      };

      const newPost = await postsAPI.create(postData);
      
      // Salvar no localStorage para persistência
      const existingPosts = JSON.parse(localStorage.getItem('posts_cache') || '[]');
      const updatedPosts = [newPost, ...existingPosts];
      localStorage.setItem('posts_cache', JSON.stringify(updatedPosts));
      
      toast.success('Post criado com sucesso!');
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/posts');
      }, 2000);
      
    } catch (error) {
      toast.error('Erro ao criar post');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      body: '',
      userId: users.length > 0 ? users[0].id.toString() : ''
    });
    setErrors({});
  };

  if (loadingUsers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-blue-600 text-4xl animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando formulário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navegação */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaArrowLeft /> Voltar aos Posts
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaHome /> Início
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">✍️ Criar Novo Post</h1>
            <p className="text-xl text-gray-600">
              Compartilhe suas ideias criando um novo post
            </p>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Seleção de Autor */}
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  Autor *
                </label>
                <select
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.userId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Selecione um autor</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} (@{user.username})
                    </option>
                  ))}
                </select>
                {errors.userId && (
                  <p className="mt-1 text-sm text-red-600">{errors.userId}</p>
                )}
              </div>

              {/* Título */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título do seu post..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.title.length}/255 caracteres
                </p>
              </div>

              {/* Conteúdo */}
              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                  Conteúdo *
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  placeholder="Escreva o conteúdo do seu post aqui..."
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                    errors.body ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.body && (
                  <p className="mt-1 text-sm text-red-600">{errors.body}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.body.length} caracteres
                </p>
              </div>

              {/* Preview */}
              {(formData.title || formData.body) && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {formData.title && (
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        {formData.title}
                      </h4>
                    )}
                    {formData.body && (
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {formData.body}
                      </p>
                    )}
                    {formData.userId && (
                      <p className="text-sm text-gray-500 mt-2">
                        Por: {users.find(u => u.id.toString() === formData.userId)?.name}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 min-w-[200px] bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Criar Post
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Limpar
                </button>
              </div>
            </form>
          </div>

          {/* Dicas */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Dicas para um bom post:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Use um título claro e descritivo
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Escreva conteúdo original e interessante
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Revise o texto antes de publicar
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Use o preview para ver como ficará
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}