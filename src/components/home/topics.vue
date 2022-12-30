<template>
	<div>
		<div class="text-center space-x-2 mb-8">
			<p class="text-slate-700" @click="">
				Sort by
							<span @click="cycleSort()" class="action-link">
								{{ sortTypes[sortBy.type].name }}
							</span>,
							<span @click="sortBy.order = sortBy.order === 'ascending' ? 'descending' : 'ascending'" class="action-link">
								{{ sortBy.order.replace(/(^\w|\s\w)/g, a => a.toUpperCase()) }}
							</span>
			</p>

		</div>

		<article class="flex flex-wrap gap-5 justify-center w-full">
			<Topic v-for="topic in sortedPosts" :data="topic" :id="topic.id" :key="topic.id" />
		</article>
	</div>

</template>

<script setup>
import Topic from './topics/topic.vue';

import {computed, reactive} from 'vue';
import parsedPosts from "@/js/parse";

const sortTypes = [
	{
		name: 'Posts count',
		functions: {
			ascending: (a, b) => a.posts.length - b.posts.length,
			descending: (a, b) => b.posts.length - a.posts.length,
		}
	},
	{
		name: 'Topic name',
		functions: {
			ascending: (a, b) => a.name.localeCompare(b.name),
			descending: (a, b) => b.name.localeCompare(a.name),
		}
	},
	{
		name: "Last new post",
		functions: {
			ascending: (a, b) => a.lastUpdated - b.lastUpdated,
			descending: (a, b) => b.lastUpdated - a.lastUpdated,
		}
	}
]

const sortBy = reactive({ type: 0, order: 'descending' });

function cycleSort() {
	if (sortBy.type === sortTypes.length-1) {
		sortBy.type = 0;
	} else {
		sortBy.type++;
	}
}

// Do NOT touch this
const sortedPosts = computed(() =>
	parsedPosts.slice().sort(sortTypes[sortBy.type].functions[sortBy.order])
);
</script>

<style scoped>

</style>