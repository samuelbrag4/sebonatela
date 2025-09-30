import axios from 'axios';

// URL base da API JSONPlaceholder
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Instância do axios configurada
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções para operações CRUD com posts
export const postsAPI = {
  // GET - Buscar todos os posts
  getAll: async () => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      throw error;
    }
  },

  // GET - Buscar post por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar post ${id}:`, error);
      throw error;
    }
  },

  // POST - Criar novo post
  create: async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar post:', error);
      throw error;
    }
  },

  // PUT - Atualizar post completo
  update: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar post ${id}:`, error);
      throw error;
    }
  },

  // PATCH - Atualizar parcialmente
  patch: async (id, partialData) => {
    try {
      const response = await api.patch(`/posts/${id}`, partialData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar parcialmente post ${id}:`, error);
      throw error;
    }
  },

  // DELETE - Excluir post
  delete: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir post ${id}:`, error);
      throw error;
    }
  },

  // GET - Buscar posts por usuário
  getByUser: async (userId) => {
    try {
      const response = await api.get(`/posts?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar posts do usuário ${userId}:`, error);
      throw error;
    }
  },
};

// Funções para usuários (para complementar os dados)
export const usersAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error;
    }
  },
};

// Funções para comentários
export const commentsAPI = {
  getByPost: async (postId) => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar comentários do post ${postId}:`, error);
      throw error;
    }
  },
};

export default api;