import { createRouter, createWebHashHistory } from 'vue-router';
import Redirects from '@/router/redirects';

const routes = [
	// Pages
	{
		path: '/home',
		name: 'Home',
		component: () => import('!/home/Index.vue'),
		children: [
			{
				path: '',
				name: 'Topics redirect', // Not specifying name throws warning for some reason.
				redirect: 'topics',
			},
			{
				path: 'topics',
				name: 'Topics',
				component: () => import('!/home/topics/Index.vue'),
			},
			{
				path: 'list',
				name: 'List',
				component: () => import('!/home/list/Index.vue'),
			},
			{
				path: 'timeline',
				name: 'Timeline',
				component: () => import('!/home/timeline/Index.vue'),
			},
			{
				path: 'search',
				name: 'Search',
				component: () => import('!/home/search/Index.vue'),
			},
		],
	},
	{
		path: '/topic/:id',
		name: 'Topic',
		component: () => import('@/topic.vue')
	},

	...Redirects,
];

const router = createRouter({
	history: createWebHashHistory('/thetinmen/'),
	routes,
	scrollBehavior (to) {
		if (to.path.includes('topic/')) {
			return { top: 0 }
		} else {
			return false;
		}
	}
});

export default router;
