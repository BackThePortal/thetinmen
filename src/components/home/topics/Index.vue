<template>
	<div>
		<div class="text-center space-x-2 mb-4 xl:mb-8">
			<span class="text-slate-700 dark:text-slate-300" @click="">
				Sort by
				<button @click="cycleSort()" class="action-link">
					{{ sortTypes.getSortName(sortConfig) }}</button
				>,
				<button
					@click="
						sortConfig.order =
							sortConfig.order === 'ascending' ? 'descending' : 'ascending'
					"
					class="action-link"
				>
					{{ sortConfig.order.replace(/(^\w|\s\w)/g, (a) => a.toUpperCase()) }}
				</button>
			</span>
		</div>
		<article v-for="category in categories">
			<CategoryBlockTitle :title="category.title" v-model="category.shown" />
			<TopicsList :topics="posts[category.reference]" />
		</article>
	</div>
</template>

<script setup>
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import CategoryBlockTitle from './CategoryBlockTitle.vue';
import { usePostsStore } from '@/stores/posts.js';
import { useCategoriesShowStore } from '@/stores/categoriesShow.js';
import { useRouter, useRoute } from 'vue-router';
import Topic from '!/home/topics/Topic.vue';

const postsStore = usePostsStore();
const categoriesStore = useCategoriesShowStore();
const router = useRouter();
const route = useRoute();

const categories = [
	{
		title: 'Special categories',
		reference: 'special',
	},
	{
		title: 'Topics',
		reference: 'normal',
	},
];

class SortType {
	name;
	queryName;
	functions;

	/**
	 *
	 * @param {string} name
	 * @param {string} queryName
	 * @param {Object} functions
	 * @param {function} functions.ascending
	 * @param {function} functions.descending
	 */
	constructor(name, queryName, functions) {
		this.name = name;
		this.queryName = queryName;
		this.functions = functions;
	}
}

const sortTypes = {
	/** Get the sort function of a SortType object
	 *
	 * @param {SortType} sortConfig
	 * @return {function}
	 */
	getSort: function (sortConfig) {
		return this.typesArray[sortConfig.type].functions[sortConfig.order];
	},
	getSortName: function (sortConfig) {
		return this.typesArray[sortConfig.type].name;
	},
	findSortType: function (query) {
		return this.typesArray.findIndex((item) => query === item.queryName);
	},
	typesArray: [
		new SortType('Posts count', 'posts', {
			ascending: (a, b) => a.posts.length - b.posts.length,
			descending: (a, b) => b.posts.length - a.posts.length,
		}),
		new SortType('Topic name', 'topic', {
			ascending: (a, b) => a.name.localeCompare(b.name),
			descending: (a, b) => b.name.localeCompare(a.name),
		}),
		new SortType('Last new post', 'last', {
			ascending: (a, b) => a.lastUpdated - b.lastUpdated,
			descending: (a, b) => b.lastUpdated - a.lastUpdated,
		}),
	],
};

const sortConfig = reactive(
	sortTypes.findSortType(route.query.sortType) === -1 ||
		!['descending', 'ascending'].includes(route.query?.sortOrder.toLowerCase())
		? { type: 0, order: 'descending' }
		: {
				type: sortTypes.findSortType(route.query.sortType),
				order: route.query.sortOrder,
		  }
);

watch(
	sortConfig,
	() => {
		router.push({
			path: '/home/topics',
			query: {
				sortType: sortTypes.typesArray[sortConfig.type].queryName,
				sortOrder: sortConfig.order,
			},
		});
		console.log(sortConfig);
	},
	{ immediate: true }
);
function cycleSort() {
	if (sortConfig.type === sortTypes.typesArray.length - 1) {
		sortConfig.type = 0;
	} else {
		sortConfig.type++;
	}
}

const sortedTopics = computed(() =>
	postsStore.getParsedData.slice().sort(sortTypes.getSort(sortConfig))
);

const posts = computed(() => {
	return {
		normal: sortedTopics.value.filter((topic) => !topic.special),
		special: sortedTopics.value.filter((topic) => topic.special),
	};
});
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
