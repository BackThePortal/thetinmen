import {createRouter, createWebHistory} from 'vue-router';
import Redirects from "@/router/redirects";

const routes = [
	// Pages
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/home.vue'),
		children: [
			{
				path: '',
				name: 'Topics redirect', // Not specifying name throws warning for some reason.
				redirect: 'topics',
			},
			{
				path: 'topics',
				name: 'Topics',
				component: () => import('@/components/home/topics.vue')
			},
			{
				path: 'list',
				name: 'List',
				component: () => import('@/components/home/list.vue'),
			},
			{
				path: 'timeline',
				name: 'Timeline',
				component: () => import('@/components/home/timeline.vue')
			},
		]
	},
	{
		path: '/topic/:id',
		name: 'Topic',
		component: () => import('@/topic.vue')
	},

	...Redirects
]

const router = createRouter({
	history: createWebHistory(),
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