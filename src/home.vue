<template>
<div>
	<span class="text-center w-full">2 posts</span>
	<div class="mt-12 flex justify-center w-full gap-5 flex-wrap py-8 border-y border-slate-300">
		<Category v-for="(topic, index) in Posts" :data="topic" :id="index" />
	</div>
	<div class="p-4 text-center">
		<a href="https://github.com/BackThePortal/thetinmen" class="btn-slate" target=_blank>GitHub</a>
	</div>

</div>
</template>

<script setup>
import Posts from "@/../posts.json"
import Category from "@/components/category.vue";


</script>

<style scoped>

</style>