import {createRouter, createWebHistory} from 'vue-router';


const routes = [
	// Pages
	{ path: '/',              name: 'home', component: () => import('../home.vue') },

	// Redirects
	{ path: '/home',            redirect: '/'},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;