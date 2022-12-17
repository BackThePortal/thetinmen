import {createRouter, createWebHistory} from 'vue-router';


const routes = [
	// Pages
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/home.vue'),
		children: [
			{
				path: '',
				name: 'Topics',
				component: () => import('@/components/home/topics.vue')
			},
			{
				path: 'list',
				name: 'List',
				component: () => import('@/components/home/list.vue'),
			}
		]
	},
	{
		path: '/topic/:id',
		name: 'Topic',
		component: () => import('@/topic.vue')
	},

	// Redirects
	{ path: '/',          redirect: '/home'},
	{ path: '/home',      redirect: '/home/topics'},
	{ path: '/list',      redirect: '/home/list'},
	{ path: '/posts',     redirect: '/home/list'}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;