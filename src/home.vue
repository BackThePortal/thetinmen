<template>
<div>
	<span class="text-center mt-8" v-html="`<b>${count.posts}</b> post${count.posts > 1 ? 's' : ''} in <b>${count.topics}</b> topic${count.topics > 1 ? 's' : ''}`"></span>
	<div class="mt-4 w-full py-8 border-y border-slate-300 ">
		<div class="w-full flex justify-center mb-6">
			<router-link to="/home" :class="[route.path === '/home' ? 'outline z-20' : 'outline-0 z-0']" class="outline-slate-600 basis-1/2 ml-[40%] transition text-center border border-slate-300 bg-slate-500 hover:bg-slate-300 active:bg-slate-800 active:text-slate-200 rounded-l-2xl px-2 py-1">Topics</router-link>
			<router-link to="/home/list" :class="[route.path === '/home/list' ? 'outline z-20' : 'outline-0 z-0']" class="outline-slate-600 basis-1/2 mr-[40%] transition text-center border border-slate-300 bg-slate-500 hover:bg-slate-300 active:bg-slate-800 active:text-slate-200 rounded-r-2xl px-2 py-1">List</router-link>
		</div>
		<router-view></router-view>
	</div>
	<div class="p-4 text-center">
		<a href="https://github.com/BackThePortal/thetinmen" class="btn-slate" target=_blank>GitHub</a>
	</div>

</div>
</template>

<script setup>
import Posts from "@/../posts.json"
import {useRoute} from "vue-router";

const count = {
	topics: Posts.flat().length,
	posts: Posts.flat().map(a => a.posts).flat().length
}
const route = useRoute()


</script>

<style scoped>

</style>