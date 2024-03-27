import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/qa',
    component: () => import('../views/QaView.vue')
  },
  {
    path: '/user',
    component: () => import('../views/UserView.vue'),
    children: [
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'pay',
        name: 'pay',
        component: () => import('../views/PayView.vue')
      },
      {
        path: 'trade/:orderId',
        name: 'trade',
        component: () => import('../views/TradeView.vue')
      }
    ]
  },
  {
    path: '/products/:categoryName',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/product/:productId',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'noFound',
    component: () => import('../views/NoFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior () {
    return { top: 0 }
  }
})

export default router
