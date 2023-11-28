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
          title: 'Просмотр проекта',
        },
      },
      {
        name: 'tasks.list',
        path: 'tasks',
        component: import('pages/tasks/TaskIndex.vue'),
        meta: {
          middleware: 'auth',
          title: 'Список Задач',
        },
      },
      {
        path: 'tasks/new',
        name: 'tasks.create',
        component: () => import('pages/tasks/TaskCreate.vue'),
        meta: {
          middleware: 'auth',
          title: 'Новая задача',
        },
      },
      {
        path: 'tasks/:id',
        name: 'tasks.show',
        component: () => import('pages/tasks/TaskShow.vue'),
        meta: {
          middleware: 'auth',
          title: 'Просмотр задачи',
        },
      },
    ],

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
