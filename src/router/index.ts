import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import home_layout from '@/layouts/home.layout.vue';
import blank_layout from '@/layouts/blank.layout.vue';
import LoginView from '@/views/LoginView.vue';
import { User } from '@/store/modules/account';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        name: 'AuthLayout',
        component: blank_layout,
        children: [
            {
                path: '/auth/login',
                name: 'LoginPage',
                component: LoginView
            }
        ]
    },
    {
        path: '/',
        name: 'HomeLayout',
        component: home_layout,
        children: [
            {
                path: '/',
                name: 'HomePage',
                component: HomeView
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('../views/AboutView.vue')
            },
            {
                path: '/journal',
                name: 'JournalPage',
                component: () => import('../views/JournalView.vue')
            },
            {
                path: '/profile',
                name: 'ProfilePage',
                component: () => import('../views/ProfileView.vue')
            },
            {
                path: '/admin/panel',
                name: 'AdminPanel',
                component: () => import('../views/AdminPaneView.vue')
            }
        ]
    },
    {
        path: '/',
        name: 'errors',
        component: blank_layout,
        children: [
            {
                path: ':catchAll(.*)',
                name: '404',
                component: () => import('../errors/404.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active', // active class for non-exact links.
    linkExactActiveClass: 'active' // active class for *exact* links.
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/auth/login', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/auth/login');
    }

    if (loggedIn) {
        const adminPages = ['/admin/panel'];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const user: User = JSON.parse(loggedIn!).user;

        if (
            adminPages.includes(to.path) &&
            !user.roles.some((role) => role.title == 'ADMIN')
        ) {
            return next('/');
        }
    }

    next();
});

export default router;
