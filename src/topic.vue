<template>
	<div>
		<div class="mt-12 mb-4 w-full text-center">
			<router-link to="/home/topics" class="btn-slate">&larr; Back to topics</router-link>
		</div>
		<div class="container mx-auto border border-slate-300 rounded-2xl p-3">
			<h2
				class="font-bold border-b border-slate-300 mb-1 text-black dark:text-slate-100"
			>
				{{ data.name }}
			</h2>
			<p
				v-if="data.description !== '' && data.description"
				class="font-normal text-slate-800 dark:text-slate-200 border-b border-slate-300 pb-1"
			>
				{{ data.description }}
			</p>
			<p class="text-center text-slate-700 dark:text-slate-300 mt-4">
				{{ hoverPost }} Sorted by
				<span class="text-slate-800 dark:text-slate-200">Date</span>,
				<button
					@click="
						sortBy.order =
							sortBy.order === 'ascending' ? 'descending' : 'ascending'
					"
					class="action-link"
				>
					{{ sortBy.order.replace(/(^\w|\s\w)/g, (a) => a.toUpperCase()) }}
				</button>
			</p>

			<div class="flex flex-row flex-wrap gap-4 select-none justify-center my-4">
				<Post @mouseover="setHover(true, post.id)" @mousemove="setHover()" @mouseleave="setHover()" v-for="post in posts" :id="post.id" :data="post" :key="post.id"></Post>
			</div>

		</div>
	</div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import Post from "@/components/post.vue";

import parsedPosts from "@/js/parse";

const route = useRoute();

const sortBy = reactive({ type: 0, order: 'descending' });
const id = ref(route.params.id);

const hoverPost = ref(null);

function setHover(state = false, id) {
	if (state) {
		let el = document.activeElement;
		el.blur();
		hoverPost.value = id;
	} else {
		hoverPost.value = null
	}

}

const sortTypes = [
	{
		name: 'Date',
		functions: {
			ascending: (a, b) => a.date - b.date,
			descending: (a, b) => b.date - a.date
		}
	},
	{
		name: 'Name',
		functions: {
			ascending: (a, b) => a.title - b.title,
			descending: (a, b) => b.title - a.title
		}
	}
];

const data = computed(() =>
		parsedPosts.slice()[id.value-1]
);
const posts = computed(() =>
		parsedPosts.slice()[id.value-1].posts.sort(sortTypes[sortBy.type].functions[sortBy.order])
);


onBeforeRouteUpdate((to, from) => {
	if (to.params.id !== from.params.id && typeof to.params.id === 'number') {
		id.value = to.params.id
	}
});
</script>

<style scoped>

</style>