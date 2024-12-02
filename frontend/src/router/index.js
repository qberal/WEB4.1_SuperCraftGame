import {createRouter, createWebHistory} from 'vue-router';
import FormView from '../views/FormView.vue';
import Login from '../components/forms/LoginForm.vue';
import Register from '../components/forms/RegisterForm.vue';
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm.vue";
import GameView from "@/views/GameView.vue";
import axios from "axios";

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/normal', component: GameView, props: {gameMode: 'normal'}, meta: {requiresAuth: true}},
    {path: '/guest', component: GameView, props: {gameMode: 'guest'}},
    {path: '/infinity', component: GameView, props: {gameMode: 'infinity'}, meta: {requiresAuth: true}},
    {path: '/logout', redirect: '/login', meta: {requiresAuth: true}},
    {
        path: '/',
        component: FormView,
        children: [
            {path: 'login', component: Login},
            {path: 'register', component: Register},
            {path: 'forgot-password', component: ForgotPasswordForm},
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        try {
            const response = await axios.get('/api/getSession');
            if (response.data.authenticated) {
                next();
            } else {
                next('/login');
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de la session :", error);
            next('/login');
        }
    } else {
        next(); // Pas besoin d'authentification, continue
    }
});

export default router;