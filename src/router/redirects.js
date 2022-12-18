export default [
	{ path: '/', redirect: '/home' },
	{ path: '/topic', redirect: '/home' },
	{ path: '/topics', redirect: '/home/topics' },
	{ path: '/list', redirect: '/home/list' },
	{ path: '/posts', redirect: '/home/list' },
	{ path: '/home/posts', redirect: '/home/list' },
	{ path: '/time', redirect: '/home/timeline' },
	{ path: '/timeline', redirect: '/home/timeline' },
	{ path: '/history', redirect: '/home/timeline' },
]