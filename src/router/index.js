import { createRouter, createWebHashHistory } from 'vue-router';
import Redirects from '@/router/redirects';
import TopicsIndex from '!/home/topics/Index.vue';
import ListIndex from '!/home/list/Index.vue';
import TimelineIndex from '!/home/timeline/Index.vue';
import SearchIndex from '!/home/search/Index.vue';

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
				component: TopicsIndex,
			},
			{
				path: 'list',
				name: 'List',
				component: ListIndex,
			},
			{
				path: 'timeline',
				name: 'Timeline',
				component: TimelineIndex,
			},
			{
				path: 'search',
				name: 'Search',
				component: SearchIndex,
			},
		],
	},
	{
		path: '/topic/:id',
		component: () => import('!/topic/Index.vue'),
		children: [
			{
				path: '',
				name: 'Topic',
			},
			{
				path: 'post/:id',
				name: 'Post',
				component: () => import('!/topic/post/Index.vue'),
			},
		],
	},

	...Redirects,
];

const router = createRouter({
	history: createWebHashHistory('/thetinmen/'),
	routes,
});

export default router;
