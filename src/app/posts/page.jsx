'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaEye, FaEdit, FaTrash, FaHome, FaSpinner, FaSearch, FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postsAPI, usersAPI } from '@/lib/api';

const PostCard = ({ post, user, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await postsAPI.delete(post.id);
      toast.success('Post excluído com sucesso!');
      onDelete(post.id);
    } catch (error) {
      toast.error('Erro ao excluir post');
      console.error('Erro:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header do Card */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <FaUser className="text-blue-600 w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Por: {user?.name || 'Carregando...'}</p>
            <p className="text-xs text-gray-400">ID: {post.id}</p>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
          Post #{post.id}
        </span>
      </div>

      {/* Conteúdo */}
      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {post.body}
      </p>

      {/* Botões */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Link
          href={`/posts/${post.id}`}
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
        >
          <FaEye className="w-3 h-3" />
          Ver Detalhes
        </Link>
        <Link
          href={`/posts/edit/${post.id}`}
          className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <FaEdit className="w-3 h-3" />
          Editar
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
        >
          {isDeleting ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaTrash className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar posts baseado no termo de busca
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postsData, usersData] = await Promise.all([
        postsAPI.getAll(),
        usersAPI.getAll()
      ]);
      
      setPosts(postsData);
      setUsers(usersData);
      
      // Salvar no localStorage para cache
      localStorage.setItem('posts_cache', JSON.stringify(postsData));
      localStorage.setItem('users_cache', JSON.stringify(usersData));
      
    } catch (error) {
      toast.error('Erro ao carregar posts');
      console.error('Erro:', error);
      
      // Tentar carregar do cache em caso de erro
      const cachedPosts = localStorage.getItem('posts_cache');
      const cachedUsers = localStorage.getItem('users_cache');
      
      if (cachedPosts && cachedUsers) {
        setPosts(JSON.parse(cachedPosts));
        setUsers(JSON.parse(cachedUsers));
        toast.info('Dados carregados do cache local');
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    localStorage.setItem('posts_cache', JSON.stringify(posts.filter(post => post.id !== postId)));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-blue-600 text-4xl animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📝 Lista de Posts</h1>
          <p className="text-xl text-gray-600 mb-6">
            Explore todos os posts disponíveis na plataforma
          </p>
          
          {/* Botões de navegação */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaHome /> Início
            </Link>
            <Link
              href="/posts/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaPlus /> Novo Post
            </Link>
            <Link
              href="/apiInfo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              📚 API Info
            </Link>
          </div>

          {/* Barra de busca */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{posts.length}</h3>
            <p className="text-gray-600">Total de Posts</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h3 className="text-2xl font-bold text-green-600">{filteredPosts.length}</h3>
            <p className="text-gray-600">Posts Filtrados</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{users.length}</h3>
            <p className="text-gray-600">Usuários</p>
          </div>
        </div>

        {/* Lista de Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Nenhum post encontrado para sua busca.' : 'Nenhum post disponível.'}
            </p>
            {!searchTerm && (
              <Link
                href="/posts/create"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlus /> Criar Primeiro Post
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                user={getUserById(post.userId)}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        )}
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