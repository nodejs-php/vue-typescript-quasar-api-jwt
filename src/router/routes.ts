import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'projects.list',
        path: '',
        component: import('pages/projects/ProjectIndex.vue'),
        meta: {
          middleware: 'auth',
          title: 'Список проектов',
        },
      },
      {
        path: 'projects/new',
        name: 'projects.create',
        component: () => import('pages/projects/ProjectCreate.vue'),
        meta: {
          middleware: 'auth',
          title: 'Новый проект',
        },
      },
      {
        path: 'projects/:id',
        name: 'projects.show',
        component: () => import('pages/projects/ProjectShow.vue'),
        meta: {
          middleware: 'auth',
          title: 'Проект',
        },
      },
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
    component: import('pages/auth/LoginForm.vue'),
    meta: {
      middleware: 'guest',
      title: 'Login',
    },
  },

];

export default routes;
