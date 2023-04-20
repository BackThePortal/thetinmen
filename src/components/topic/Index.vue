<template>
	<div>
		<div class="mt-12 mb-4 w-full text-center">
			<router-link to="/home/topics" class="btn-slate"
				>&larr; Back to topics</router-link
			>
		</div>
		<div class="container mx-auto border border-slate-300 rounded-2xl p-3">
			<h2
				class="font-bold border-b border-slate-300 mb-1 text-black dark:text-slate-100"
			>
				{{ topicData.name }}
			</h2>
			<p
				v-if="topicData.description !== '' && topicData.description"
				class="font-normal text-slate-800 dark:text-slate-200 border-b border-slate-300 pb-1"
			>
				{{ data.description }}
			</p>
			<div class="flex justify-stretch items-center mt-2 mb-4 w-full px-4">
				<div class="basis-full"></div>
				<span class="text-center text-slate-700 dark:text-slate-300 min-w-fit">
					Sorted by
					<span class="text-slate-800 dark:text-slate-200">Date</span>,
					<button
						@click="
							sortConfig.order =
								sortConfig.order === 'ascending' ? 'descending' : 'ascending'
						"
						class="action-link"
					>
						{{
							sortConfig.order.replace(/(^\w|\s\w)/g, (a) => a.toUpperCase())
						}}
					</button>
				</span>
				<div class="basis-full"></div>
			</div>

			<div
				class="flex flex-row flex-wrap gap-4 select-none justify-center my-4"
			>
				<Post
					@mouseover="setHover(true, post.id)"
					@mousemove="setHover()"
					@mouseleave="setHover()"
					v-for="post in posts"
					:id="post.id"
					:data="post"
					:key="post.id"
				></Post>
			</div>
			<div class="flex justify-center">
				<button
					class="action-link md:text-xl"
					v-show="unloadedPosts"
					@click="loadMore"
				>
					Load more
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import Post from '@/components/post.vue';

import parsedPosts from '@/js/parse';

const route = useRoute();

const sortConfig = reactive({ type: 0, order: 'descending' });
const id = ref(route.params.id);

const hoverPost = ref(null);

function setHover(state = false, id) {
	if (state) {
		let el = document.activeElement;
		el.blur();
		hoverPost.value = id;
	} else {
		hoverPost.value = null;
	}
}

const sortTypes = [
	{
		name: 'Date',
		functions: {
			ascending: (a, b) => a.date - b.date,
			descending: (a, b) => b.date - a.date,
		},
	},
	{
		name: 'Name',
		functions: {
			ascending: (a, b) => a.title - b.title,
			descending: (a, b) => b.title - a.title,
		},
	},
];

const topicData = ref(null);
const posts = ref(null);
const lastChunk = ref(1);
const unloadedPosts = ref(null);
const chunkSize = 24;

function fetchPosts() {
	id.value = route.params.id;
	topicData.value = postsStore.getTopicById(id.value);
	unloadedPosts.value =
		topicData.value.posts.length - lastChunk.value * chunkSize;
	if (unloadedPosts.value <= 0) unloadedPosts.value = undefined;
	posts.value = topicData.value.posts
		.slice()
		.sort(sortTypes[sortConfig.type].functions[sortConfig.order])
		.slice(
			0,
			unloadedPosts.value === undefined
				? undefined
				: lastChunk.value * chunkSize
		);
}

function loadMore() {
	if (unloadedPosts) lastChunk.value++;
}

watch(
	[() => route.params, lastChunk],
	() => {
		console.log();
		if (route.name === 'Topic') {
			fetchPosts();
		} else if (postsStore.topicExists(route.params?.id)) {
		}
	},
	{ immediate: true }
);

onMounted(() => {
	window.scrollTo(0, 0);
});
</script>

<style scoped></style>
