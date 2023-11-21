import {route} from 'quasar/wrappers';
import {
    createMemoryHistory,
    createRouter,
    createWebHashHistory,
    createWebHistory, RouteLocationNormalized,
} from 'vue-router';

import routes from './routes';
import useUserStore from '../stores/user';
import axios from 'axios';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

    const Router = createRouter({
        scrollBehavior: () => ({left: 0, top: 0}),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    Router.beforeEach((to: RouteLocationNormalized, from, next) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.title = to.meta.title
        const store = useUserStore();

        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = store.access_token;
          return config;
        });

        store.authCheck().then(() => {
            if (to.meta.middleware) {
                if (to.meta.middleware == 'guest') {
                    if (store.isLoggedIn) {
                        next({name: 'main-layout'});
                    }
                    next();
                } else {
                    if (store.isLoggedIn) {
                        next();
                    } else {
                        next({name: 'login'});
                    }
                }
            } else {
            }
        });
    });

    return Router;
});
