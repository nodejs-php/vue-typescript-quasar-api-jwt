import { RouteRecordRaw } from 'vue-router';
import Login from 'components/LoginForm.vue';

const routes: RouteRecordRaw[] = [
  {
    name: 'project-list',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/projects/ProjectList.vue') },
    ],
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
];

export default routes;
