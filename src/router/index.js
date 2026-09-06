import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'landing', component: () => import('../views/LandingView.vue') },

  { path: '/login', name: 'login', component: () => import('../views/auth/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/auth/RegisterView.vue') },

  // Feeds
  { path: '/feed', name: 'feed', component: () => import('../views/FeedView.vue'), meta: { requiresAuth: true } },
  { path: '/seguindo', name: 'following-feed', component: () => import('../views/FollowingFeedView.vue'), meta: { requiresAuth: true } },

  // Preferências
  { path: '/preferencias/categorias', name: 'categories-preference', component: () => import('../views/CategoriesPreferenceView.vue'), meta: { requiresAuth: true } },

  // Notícias
  { path: '/noticias/criar', name: 'news-upload', component: () => import('../views/UploadNewsView.vue'), meta: { requiresAuth: true } },
  { path: '/noticias/:id', name: 'news-detail', component: () => import('../views/NewsDetailView.vue') },
  { path: '/noticias/:id/editar', name: 'news-edit', component: () => import('../views/EditNewsView.vue'), meta: { requiresAuth: true } },
  { path: '/minhas-noticias', name: 'my-news', component: () => import('../views/MyNewsView.vue'), meta: { requiresAuth: true } },

  // Perfil
  { path: '/profile/me', name: 'my-profile', component: () => import('../views/profile/MyProfileView.vue'), meta: { requiresAuth: true } },
  { path: '/profile/:username', name: 'public-profile', component: () => import('../views/profile/PublicProfileView.vue') },

  // Busca e Notificações
  { path: '/search', name: 'search', component: () => import('../views/SearchView.vue') },
  { path: '/notifications', name: 'notifications', component: () => import('../views/NotificationsView.vue'), meta: { requiresAuth: true } },

  // Admin
  { path: '/admin/dashboard', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboardView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/reports', name: 'admin-reports', component: () => import('../views/admin/AdminReportsView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/users', name: 'admin-users', component: () => import('../views/admin/AdminUsersView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/noticias', name: 'admin-news', component: () => import('../views/admin/AdminNewsView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/categorias', name: 'admin-categories', component: () => import('../views/admin/AdminCategoriesView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },

  // Rota não encontrada (404)
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router