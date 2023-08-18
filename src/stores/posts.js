import { defineStore } from 'pinia';
import Posts from '@/../posts.json';
import { DateUtils } from '@/js/utils.js';

export const usePostsStore = defineStore('posts', {
	state: () => {
		let parsedPosts = Posts.slice().map((topic, index) => ({
			...topic,
			id: index + 1,
		}));
		parsedPosts.map((topic) => {
			topic.posts.forEach((post) => {
				post.date =
					post.date === '' ? null : DateUtils.dateToObject(String(post.date));
				post.id = topic.posts.indexOf(post) + 1;
				post.globalID = post.source;
			});
			topic.lastUpdated = new Date(
				Math.max(...topic.posts.map((b) => new Date(b.date))),
			);
		});

		console.log('parsed', parsedPosts);
		return {
			categories: ['special', 'normal'],
			parsedPosts,
		};
	},
	getters: {
		getParsedData: (state) => {
			return state.parsedPosts;
		},
		/**
		 * return {array}
		 */
		getPostsList() {
			return this.getParsedData
				.flat()
				.map((topic) => {
					const topicPosts = topic.posts.slice();
					topicPosts.map((post) => {
						post.topic = topic.name;
						post.topicID = topic.id;
					});
					return topicPosts;
				})
				.flat();
		},
		getTopic: (state) => {
			return (topicId) => state.parsedPosts[topicId - 1];
		},
		findPost: (state) => {
			return (query) => state.parsedPosts.find();
		},
	},
	actions: {
		getTopicById(id) {
			return this.getParsedData[id - 1];
		},
		topicExists(id) {
			return this.getParsedData?.[id - 1] !== undefined;
		},
		getPostById(topicId, id) {
			return this.getTopicById(topicId)?.posts?.[id - 1];
		},
		parseGroups(data) {
			const groups = data.map((post) => post.meta.group[0]);
		},
	},
});
