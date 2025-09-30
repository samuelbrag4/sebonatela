'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { 
  FaArrowLeft, 
  FaHome, 
  FaEdit, 
  FaTrash, 
  FaUser, 
  FaCalendarAlt, 
  FaSpinner,
  FaComments,
  FaEnvelope,
  FaGlobe,
  FaPhone
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postsAPI, usersAPI, commentsAPI } from '@/lib/api';

export default function PostDetailsPage() {
  const params = useParams();
  const postId = params.id;
  
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const postData = await postsAPI.getById(postId);
      setPost(postData);
      
      // Buscar dados do usuário
      const userData = await usersAPI.getById(postData.userId);
      setUser(userData);
      
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      setError('Post não encontrado');
      toast.error('Erro ao carregar detalhes do post');
      notFound();
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const commentsData = await commentsAPI.getByPost(postId);
      setComments(commentsData);
      setShowComments(true);
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      toast.error('Erro ao carregar comentários');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) {
      return;
    }

    try {
      await postsAPI.delete(postId);
      toast.success('Post excluído com sucesso!');
      // Redirecionar para lista de posts após 2 segundos
      setTimeout(() => {
        window.location.href = '/posts';
      }, 2000);
    } catch (error) {
      toast.error('Erro ao excluir post');
      console.error('Erro:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-blue-600 text-4xl animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando detalhes do post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post não encontrado</h1>
          <p className="text-gray-600 mb-6">O post que você está procurando não existe.</p>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft /> Voltar aos Posts
          </Link>
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

        <div className="max-w-4xl mx-auto">
          {/* Card Principal do Post */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUser className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user?.name || 'Carregando...'}
                  </h2>
                  <p className="text-gray-600">@{user?.username || 'carregando'}</p>
                  <p className="text-sm text-gray-500">Post #{post.id}</p>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                Post
              </span>
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Conteúdo */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {post.body}
              </p>
            </div>

            {/* Ações */}
            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/posts/edit/${post.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FaEdit /> Editar Post
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaTrash /> Excluir Post
              </button>
              <button
                onClick={fetchComments}
                disabled={loadingComments}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loadingComments ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaComments />
                )}
                {showComments ? 'Comentários Carregados' : 'Carregar Comentários'}
              </button>
            </div>
          </div>

          {/* Informações do Autor */}
          {user && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaUser className="text-blue-600" />
                Sobre o Autor
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-gray-500 w-4 h-4" />
                    <div>
                      <p className="text-sm text-gray-600">Nome Completo</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-500 w-4 h-4" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-gray-500 w-4 h-4" />
                    <div>
                      <p className="text-sm text-gray-600">Telefone</p>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaGlobe className="text-gray-500 w-4 h-4" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a 
                        href={`http://${user.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {user.website}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-gray-500 w-4 h-4 flex items-center justify-center">🏢</div>
                    <div>
                      <p className="text-sm text-gray-600">Empresa</p>
                      <p className="font-semibold">{user.company?.name}</p>
                      <p className="text-sm text-gray-500">{user.company?.catchPhrase}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comentários */}
          {showComments && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaComments className="text-green-600" />
                Comentários ({comments.length})
              </h3>
              
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Nenhum comentário encontrado para este post.
                </p>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-blue-500 pl-6 py-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{comment.name}</h4>
                          <p className="text-sm text-gray-600">{comment.email}</p>
                        </div>
                        <span className="text-xs text-gray-400">#{comment.id}</span>
                      </div>
                      <p className="text-gray-700">{comment.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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