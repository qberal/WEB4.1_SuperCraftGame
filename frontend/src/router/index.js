import {createRouter, createWebHistory} from 'vue-router';
import FormView from '../views/FormView.vue';
import Login from '../components/forms/LoginForm.vue';
import Register from '../components/forms/RegisterForm.vue';
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm.vue";
import GameView from "@/views/GameView.vue";

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/guest', component: GameView},
    {path: '/logout', redirect: '/login'},
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

export default router;