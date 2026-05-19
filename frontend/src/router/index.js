import { createRouter, createWebHistory } from 'vue-router'

// Import de páginas
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'
import Cadastro from '../pages/Cadastro.vue'
import RecuperarSenha from '../pages/RecuperarSenha.vue'
import Obras from '../pages/Obras.vue'
import Checklists from '../pages/Checklists.vue'
import ObraDetail from '../pages/ObraDetail.vue'
import ResponderChecklist from '../pages/ResponderChecklist.vue'
import Relatorio from '../pages/Relatorio.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  // Rotas públicas (sem autenticação)
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false, layout: 'blank' }
  },
  {
    path: '/cadastro',
    component: Cadastro,
    meta: { requiresAuth: false, layout: 'blank' }
  },
  {
    path: '/recuperar-senha',
    component: RecuperarSenha,
    meta: { requiresAuth: false, layout: 'blank' }
  },

  // Rotas protegidas (requer autenticação)
  {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/obras',
    component: Obras,
    meta: { requiresAuth: true }
  },
  {
    path: '/checklists',
    component: Checklists,
    meta: { requiresAuth: true }
  },
  {
    path: '/obras/:id',
    component: ObraDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/obras/:obraId/checklist/:checklistId/responder',
    component: ResponderChecklist,
    meta: { requiresAuth: true }
  },
  {
    path: '/relatorio/:id',
    name: 'relatorio',
    component: Relatorio,
    meta: { requiresAuth: true }
  },
  {
    path: '/obras/:obraId/checklist/:checklistId/confirm',
    component: () => import('../pages/ConfirmStart.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/obras/:obraId/apos-vincular',
    component: () => import('../pages/AposVincular.vue'),
    meta: { requiresAuth: true }
  },

  // Fallback
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global de autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('session')

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Rota protegida + não autenticado → login
    next('/login')
  } else if (!to.meta.requiresAuth && isAuthenticated && to.path === '/login') {
    // Tentando acessar login estando logado → dashboard
    next('/')
  } else {
    // Permitir acesso
    next()
  }
})

export default router
