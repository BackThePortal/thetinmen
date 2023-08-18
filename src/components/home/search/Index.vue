<template>
	<h3
		class="inline-block text-2xl text-slate-800 transition dark:text-slate-200 max-sm:text-center"
		:class="{ '!text-opacity-30': !options.show }"
	>
		Search options
	</h3>
	<button
		class="action-link ml-3 text-slate-700 contrast-more:text-slate-800 dark:text-slate-400 contrast-more:dark:text-slate-300"
		@click="options.show = !options.show"
	>
		{{ options.show ? 'Hide' : 'Show' }}
	</button>
	<div
		v-show="options.show"
		class="my-2 space-y-2 rounded-xl border border-slate-700 bg-slate-200 p-2 dark:border-slate-300 dark:bg-slate-800/30"
	>
		<div>
			<input v-model="options.pollsExclude" id="pollsExclude" type="checkbox" />
			<label class="ml-3 text-slate-800 dark:text-slate-200" for="pollsExclude"
				>Exclude Polls</label
			><span class="ml-2 text-sm italic text-slate-600 dark:text-slate-400"
				>Recommended</span
			>
		</div>
		<div>
			<input
				v-model="options.topicsExclude"
				id="topicsExclude"
				type="checkbox"
			/>
			<label class="ml-3 text-slate-800 dark:text-slate-200" for="topicsExclude"
				>Exclude topics</label
			>
		</div>
		<p class="text-sm text-slate-700 dark:text-slate-400">
			Search options are persistent across sessions.
		</p>
	</div>

	<h3 class="text-2xl text-slate-800 dark:text-slate-200 max-sm:text-center">
		Search results
	</h3>
	<span
		class="mb-4 w-full text-slate-700 dark:text-slate-300 max-sm:text-center"
		v-if="!showResults"
		>Keep typing to show results</span
	>
	<template v-else>
		<template v-if="!options.topicsExclude">
			<h4 class="text-xl text-slate-800 dark:text-slate-200">Topics</h4>
			<div
				:class="[results.topics.length > 0 ? 'mb-8 p-4' : 'p-2']"
				class="my-4 flex w-full flex-wrap justify-start gap-5"
			>
				<TransitionGroup v-if="results.topics.length > 0" name="transition">
					<Topic
						class=""
						v-for="topic in results.topics"
						:data="topic"
						:key="topic.id"
						:small="results.topics.length > 3"
						:preview="false"
					/>
				</TransitionGroup>

				<span v-else class="italic text-slate-800 dark:text-slate-200"
					>No results</span
				>
			</div>
		</template>

		<h4 class="text-xl text-slate-800 dark:text-slate-200">Posts</h4>
		<div
			:class="[results.posts.length > 0 ? 'mb-8 p-4' : 'p-2']"
			class="my-4 flex w-full flex-wrap justify-start gap-5"
		>
			<TransitionGroup v-if="results.posts.length > 0" name="transition">
				<Post
					class="absolute"
					v-for="post in results.posts"
					:id="post.id"
					:topic="post.topicID"
					:key="post.globalID"
					show-topic="true"
				/>
			</TransitionGroup>

			<span v-else class="italic text-slate-800 dark:text-slate-200"
				>No results</span
			>
		</div>
	</template>
</template>

<script setup>
import { usePostsStore } from '@/stores/posts.js';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Topic from '!/home/topics/Topic.vue';
import Post from '!/topic/Post.vue';
const posts = usePostsStore();
const route = useRoute();

const showResults = computed(() => route.query.q && route.query.q?.length > 2);

const options = reactive(
	((local) =>
		local
			? JSON.parse(local)
			: { topicsExclude: false, pollsExclude: true, show: true })(
		localStorage.getItem('searchOptions'),
	),
);

watchEffect(() =>
	localStorage.setItem('searchOptions', JSON.stringify(options)),
);

// TODO Switch to Fuse
const results = reactive({
	topics: computed(() =>
		showResults.value && !options.topicsExclude
			? [
					...new Set([
						...posts.getParsedData.filter((value) =>
							value.name.toLowerCase().includes(route.query.q.toLowerCase()),
						),
						...posts.getParsedData.filter(
							(value) =>
								value.tags
									?.map((tag) => tag.toLowerCase())
									.includes(route.query.q.toLowerCase()) ?? false,
						),
					]),
			  ]
			: [],
	),
	posts: computed(() =>
		showResults.value
			? [
					...new Set([
						...posts.getPostsList.filter((value) =>
							value.title.toLowerCase().includes(route.query.q.toLowerCase()),
						),
						...posts.getPostsList.filter((value) =>
							value.tags?.some((tag) =>
								tag.toLowerCase().includes(route.query.q.toLowerCase()),
							),
						),
					]),
			  ].filter((value) => !(options.pollsExclude && value.topic === 'Polls'))
			: [],
	),
});
</script>

<style scoped>
.transition-move, /* apply transition to moving elements */
.transition-enter-active,
.transition-leave-active {
	@media (prefers-reduced-motion: no-preference) {
		transition: all 0.5s ease;
	}
}

.transition-enter-from,
.transition-leave-to {
	@media (prefers-reduced-motion: no-preference) {
		opacity: 0;
	}
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.transition-leave-active {
	@media (prefers-reduced-motion: no-preference) {
		position: absolute;
	}
}
</style>
