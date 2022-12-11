import {createRouter, createWebHistory} from 'vue-router';


const routes = [
	// Pages
	{ path: '/home',              name: 'home',         component: () => import('@/home.vue') },
	{ path: '/topic/:id',         name: 'topic',        component: () => import('@/topic.vue') },

	// Redirects
	{ path: '/',                  redirect: '/home'},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;