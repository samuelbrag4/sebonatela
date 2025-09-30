# 📝 Sebo na Tela - CRUD Next.js 15

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![TypeScript](https://img.shields.io/badge/API-JSONPlaceholder-green)

Um projeto completo desenvolvido em **Next.js 15** que demonstra operações CRUD (Create, Read, Update, Delete) utilizando a **JSONPlaceholder API**. Este projeto atende a todos os requisitos técnicos e funcionais solicitados.

## 🎯 Objetivos Alcançados

✅ **Projeto Next.js 15 com App Router**  
✅ **CRUD completo com API pública**  
✅ **Design responsivo e moderno**  
✅ **Todas as páginas solicitadas implementadas**  
✅ **Persistência local com localStorage**  
✅ **Sistema de notificações**  
✅ **Validação de formulários**  

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca JavaScript para interfaces
- **Tailwind CSS 4** - Framework CSS para estilização
- **Axios** - Cliente HTTP para requisições à API
- **React Toastify** - Sistema de notificações
- **React Icons** - Biblioteca de ícones
- **JSONPlaceholder API** - API pública para dados

## 📱 Estrutura de Páginas

### 1. 🏠 Home (`/`)
- ✅ Nome da turma, escola e aluno
- ✅ Foto do aluno usando `next/image`
- ✅ Frase inspiradora
- ✅ Design com Tailwind CSS
- ✅ Cards de navegação para outras seções

### 2. 📚 API Info (`/apiInfo`)
- ✅ Nome da API (JSONPlaceholder)
- ✅ Link para documentação oficial
- ✅ URL base da API
- ✅ Endpoints utilizados
- ✅ Lista de atributos recebidos
- ✅ Descrição da API
- ✅ Métodos HTTP suportados

### 3. 📋 Listagem de Posts (`/posts`)
- ✅ Busca todos os posts via GET
- ✅ Renderização em cards responsivos
- ✅ Botões para detalhes, edição e exclusão
- ✅ Barra de busca funcional
- ✅ Cache local com localStorage

### 4. 👁️ Detalhes do Post (`/posts/[id]`)
- ✅ Busca post específico por ID
- ✅ Exibição completa das informações
- ✅ Informações do autor
- ✅ Carregamento de comentários
- ✅ Tratamento de erros com Toastify
- ✅ Navegação para edição e exclusão

### 5. ❌ Página Not Found (`/not-found`)
- ✅ Título amigável com emoji
- ✅ Mensagem explicativa
- ✅ Botões de navegação
- ✅ Design atrativo com Tailwind

### 6. ➕ Criação de Post (`/posts/create`)
- ✅ Formulário completo com validação
- ✅ Seleção de autor
- ✅ Validação de campos obrigatórios
- ✅ Preview em tempo real
- ✅ Envio via POST para API
- ✅ Feedback com Toastify

### 7. ✏️ Edição de Post (`/posts/edit/[id]`)
- ✅ Formulário pré-preenchido
- ✅ Validação de campos
- ✅ Detecção de alterações
- ✅ Atualização via PUT
- ✅ Comparação com dados originais

### 8. 🗑️ Exclusão de Post
- ✅ Confirmação antes da exclusão
- ✅ Exclusão via DELETE
- ✅ Modal de confirmação
- ✅ Feedback de sucesso/erro

## 🔧 Funcionalidades Técnicas

### ✅ Requisitos Atendidos
- **Next.js 15 com App Router** ✅
- **Tailwind CSS** para estilização ✅
- **Alias de importação** (`@/components`, `@/lib`) ✅
- **Estrutura organizada** dentro de `src/` ✅
- **Consumo com Axios** ✅
- **Componentes separados** ✅
- **Props entre componentes** ✅
- **CSS Modules + Tailwind** ✅
- **next/link** para navegação ✅
- **next/image** para imagens otimizadas ✅
- **React Toastify** para feedbacks ✅
- **localStorage** para persistência ✅
- **Design responsivo** (320px a 1440px) ✅
- **UX/UI otimizada** ✅

### 🎨 Design & UX
- **Interface moderna** com gradientes e sombras
- **Cards interativos** com hover effects
- **Feedback visual** para todas as ações
- **Loading states** em todas as operações
- **Responsividade completa** em todos os dispositivos
- **Acessibilidade** com foco e navegação por teclado

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd sebonatela

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### 🌐 Acesso
O projeto estará disponível em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js 15
│   ├── page.jsx           # 🏠 Home
│   ├── not-found.jsx      # ❌ Página 404
│   ├── apiInfo/           # 📚 Informações da API
│   └── posts/             # 📝 Posts CRUD
│       ├── page.jsx       # 📋 Listagem
│       ├── [id]/          # 👁️ Detalhes
│       ├── create/        # ➕ Criação
│       └── edit/[id]/     # ✏️ Edição
├── components/            # 🧩 Componentes reutilizáveis
│   └── DeleteModal/       # 🗑️ Modal de exclusão
├── lib/                   # 📚 Utilitários
│   └── api.js            # 🔌 Configuração da API
└── contexts/              # 🔄 Contextos React
```

## 🔌 API Utilizada

**JSONPlaceholder** - https://jsonplaceholder.typicode.com

### Endpoints Implementados:
- `GET /posts` - Listar todos os posts
- `GET /posts/{id}` - Buscar post específico
- `POST /posts` - Criar novo post
- `PUT /posts/{id}` - Atualizar post
- `DELETE /posts/{id}` - Excluir post
- `GET /users` - Listar usuários
- `GET /posts/{id}/comments` - Comentários do post

## 📱 Responsividade

O projeto foi desenvolvido com **mobile-first** e funciona perfeitamente em:
- 📱 **Mobile**: 320px - 768px
- 📱 **Tablet**: 768px - 1024px
- 💻 **Desktop**: 1024px - 1440px+

## 🎨 Personalização

Para personalizar o projeto:

1. **Dados pessoais**: Edite `src/app/page.jsx`
2. **Cores**: Modifique `tailwind.config.js`
3. **API**: Altere configurações em `src/lib/api.js`

## 🤝 Contribuição

Este projeto foi desenvolvido como parte de um exercício acadêmico, demonstrando:
- Conhecimento em Next.js 15
- Integração com APIs externas
- Design responsivo
- Boas práticas de desenvolvimento
- UX/UI moderno

---

**Desenvolvido com ❤️ usando Next.js 15 e JSONPlaceholder API**