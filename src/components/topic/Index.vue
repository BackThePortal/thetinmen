<template>
	<div>
		<div
			class="my-4 flex w-full text-center max-md:flex-col max-md:gap-2 md:relative"
		>
			<div class="grow">
				<router-link to="/home/topics" class="btn-slate"
					>&larr; Back to topics</router-link
				>
			</div>
			<button
				class="action-link md:absolute md:right-0"
				@click="infiniteScroll = !infiniteScroll"
				v-if="lastChunk !== 1 || unloadedPosts"
			>
				{{ infiniteScroll ? 'Disable' : 'Enable' }} infinite scrolling
			</button>
		</div>
		<div
			class="container mx-auto rounded-2xl bg-slate-300/30 p-4 dark:bg-slate-600/60"
		>
			<h2
				class="mb-1 border-b border-slate-600 font-bold text-black dark:border-slate-200 dark:text-slate-100"
			>
				{{ topicData.name }}
			</h2>
			<p
				v-if="topicData.description !== '' && topicData.description"
				class="border-b border-slate-600 pb-1 font-normal text-slate-800 dark:border-slate-200 dark:text-slate-200"
			>
				{{ topicData.description }}
			</p>
			<div
				class="justify-stretch mt-2 mb-4 flex w-full items-center px-4"
				v-if="!topicData.meta?.hideSort"
			>
				<div class="basis-full"></div>
				<span class="min-w-fit text-center text-slate-700 dark:text-slate-300">
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

			<div class="m-4 flex select-none flex-row flex-wrap justify-center gap-4">
				<Post
					@mouseover="setHover(true, post.id)"
					@mouseleave="setHover()"
					v-for="post in posts"
					:id="post.id"
					:topic="id"
					:key="post.id"
				></Post>
			</div>
			<div class="flex justify-center">
				<button
					class="action-link md:text-xl"
					v-show="unloadedPosts"
					@click="loadMore"
				>
					{{
						infiniteScroll
							? arrivedState.bottom
								? 'Loading...'
								: 'Scroll down to load'
							: 'Load more'
					}}
				</button>
			</div>
		</div>
		<p
			class="mx-5 mb-4 border-b border-slate-300 py-4 text-center text-sm text-slate-800 touch:hidden dark:text-slate-200"
		>
			<b>Tip</b>: Shift-click a post link to copy it to the clipboard.
		</p>
	</div>
</template>

<script setup>
import {
	computed,
	onBeforeUpdate,
	onMounted,
	onUpdated,
	reactive,
	ref,
	watch,
	watchEffect,
} from 'vue';
import { useRoute } from 'vue-router';
import Post from './Post.vue';
import { usePostsStore } from '@/stores/posts.js';
import { useScroll } from '@vueuse/core';

const route = useRoute();
const postsStore = usePostsStore();

const { arrivedState } = useScroll(document);

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
let lastLoad = 0;

const infiniteScroll = ref(!!localStorage.getItem('infiniteScroll'));

watchEffect(() => {
	localStorage.setItem('infiniteScroll', infiniteScroll.value.toString());
});

function fetchPosts() {
	id.value = route.params.id;
	topicData.value = postsStore.getTopicById(id.value);
	unloadedPosts.value =
		topicData.value.posts.length - lastChunk.value * chunkSize;
	if (unloadedPosts.value <= 0) unloadedPosts.value = undefined;
	console.log(sortConfig);
	posts.value = topicData.value.posts
		.slice()
		.sort(sortTypes[sortConfig.type].functions[sortConfig.order])
		.slice(
			0,
			unloadedPosts.value === undefined
				? undefined
				: lastChunk.value * chunkSize,
		);
}

function loadMore() {
	if (unloadedPosts && (lastLoad === 0 || Date.now() - lastLoad > 200))
		lastChunk.value++;
	lastLoad = Date.now();
}

watchEffect(() => {
	if (arrivedState.bottom && unloadedPosts.value && infiniteScroll.value) {
		loadMore();
	}
});

watch(
	[() => route.params, lastChunk, sortConfig],
	async () => {
		console.log();
		if (route.name === 'Topic') {
			await fetchPosts();
		} else if (postsStore.topicExists(route.params?.id)) {
		}
	},
	{ immediate: true },
);

onMounted(() => {
	window.scrollTo(0, 0);
});
</script>

<style scoped></style>
