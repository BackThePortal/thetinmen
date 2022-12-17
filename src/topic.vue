<template>
	<div>
		<div class="mt-12 mb-4 w-full text-center">
			<router-link to="/home" class="btn-slate">&larr; Back to topics</router-link>
		</div>
		<div class="container mx-auto border border-slate-300 rounded-2xl p-3">
			<h2 class="font-bold border-b border-slate-300 mb-1">{{data.name}}</h2>
			<p v-if="data.description !== '' && data.description" class="font-normal border-b border-slate-300 pb-1">{{data.description}}</p>
			<div class="flex flex-row flex-wrap gap-4 select-none justify-center my-4">
				<Post v-for="(post, index) in data.posts" :id="index" :data="post"></Post>
			</div>
		</div>
	</div>
</template>

<script setup>
import Posts from "@/../posts.json";
import { ref, watch, reactive } from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import Post from "@/components/post.vue";

const route = useRoute();
const data = ref();
fetchData(route.params.id);

function fetchData(id) {
	data.value = Posts[id-1];
}
onBeforeRouteUpdate((to, from) => {
	if (to.params.id !== from.params.id) {
		fetchData(to.params.id);
	}
})
</script>

<style scoped>

</style>