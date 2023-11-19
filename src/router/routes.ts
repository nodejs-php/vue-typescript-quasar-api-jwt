import { RouteRecordRaw } from 'vue-router';
import Dashboard from 'components/DashboardComponent.vue';
import Login from 'components/LoginForm.vue';

const routes: RouteRecordRaw[] = [
  {
    name: 'main-layout',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: {
      middleware: 'auth',
      title: 'Login',
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      middleware: 'guest',
      title: 'Login',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      middleware: 'guest',
      title: 'Login',
    },
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: {
      middleware: 'auth',
      title: 'Dashboard',
    },
  },
];

export default routes;
