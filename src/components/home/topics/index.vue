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
import { computed, reactive, ref } from 'vue';
import parsedPosts from '@/js/parse';
import CategoryBlockTitle from './categoryBlockTitle.vue';
import TopicsList from '@/components/home/topics/topicsList.vue';

const categories = [
	{
		title: 'Special categories',
		reference: 'special',
		shown: ref(true),
	},
	{
		title: 'Topics',
		reference: 'normal',
		shown: ref(true),
	},
];

categories.forEach((category) => {
	category.shown.value = localStorage.getItem('categoriesVisibility')?.[
		category.reference
	];
});

const sortTypes = {
	getSort: function (sortConfig) {
		return this.typesArray[sortConfig.type].functions[sortConfig.order];
	},
	getSortName: function (sortConfig) {
		return this.typesArray[sortConfig.type].name;
	},
	typesArray: [
		{
			name: 'Posts count',
			functions: {
				ascending: (a, b) => a.posts.length - b.posts.length,
				descending: (a, b) => b.posts.length - a.posts.length,
			},
		},
		{
			name: 'Topic name',
			functions: {
				ascending: (a, b) => a.name.localeCompare(b.name),
				descending: (a, b) => b.name.localeCompare(a.name),
			},
		},
		{
			name: 'Last new post',
			functions: {
				ascending: (a, b) => a.lastUpdated - b.lastUpdated,
				descending: (a, b) => b.lastUpdated - a.lastUpdated,
			},
		},
	],
};

const sortConfig = reactive({ type: 0, order: 'descending' });

function cycleSort() {
	if (sortConfig.type === sortTypes.length - 1) {
		sortConfig.type = 0;
	} else {
		sortConfig.type++;
	}
}

const sortedTopics = computed(() =>
	parsedPosts.slice().sort(sortTypes.getSort(sortConfig))
);

const posts = {
	normal: sortedTopics.value.filter((topic) => !topic.special),
	special: sortedTopics.value.filter((topic) => topic.special),
};
</script>
