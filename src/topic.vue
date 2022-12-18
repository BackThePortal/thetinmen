<template>
	<div>
		<div class="mt-12 mb-4 w-full text-center">
			<router-link to="/home/topics" class="btn-slate">&larr; Back to topics</router-link>
		</div>
		<div class="container mx-auto border border-slate-300 rounded-2xl p-3">
			<h2 class="font-bold border-b border-slate-300 mb-1">{{data.name}}</h2>
			<p v-if="data.description !== '' && data.description" class="font-normal border-b border-slate-300 pb-1">{{data.description}}</p>
			<p class="text-center text-slate-700 mt-4">
				Sorted by
				<span class="">Date</span>,
				<span class="action-link">
					Descending
				</span>
			</p>
			<div class="flex flex-row flex-wrap gap-4 select-none justify-center my-4">
				<Post v-for="(post, index) in data.posts" :id="post.id" :data="post" :key="post.id"></Post>
			</div>

		</div>
	</div>
</template>

<script setup>
import Posts from "@/../posts.json";
import { ref } from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import Post from "@/components/post.vue";
import { dateToObject } from "@/js/utils";

import parsedPosts from "@/js/parse";

const route = useRoute();
const data = ref();
fetchData(route.params.id);

function fetchData(id) {
	data.value = parsedPosts.slice()[id-1];
	console.log(parsedPosts)
	data.value.posts.sort((a, b) =>
		b.date - a.date
	);
	console.log(data.value.posts)
}
onBeforeRouteUpdate((to, from) => {
	if (to.params.id !== from.params.id && typeof to.params.id === 'number') {
		console.log(to.params.id)
		fetchData(to.params.id);
	}
})
</script>

<style scoped>

</style>