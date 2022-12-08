<template>
<a class="transition duration-500 w-64 h-80 relative group hover:scale-110 cursor-pointer" href="posts.json">
	<div class="z-50 absolute w-full h-full flex items-center justify-center">
		<h3 class="w-full transition duration-500 relative text-center text-slate-200 group-hover:opacity-80 select-none group-hover:translate-y-[9.25rem] group-hover:bg-slate-400/40">{{props.data.name}}</h3>
	</div>
	<img :src="'./../../posts/' + props.data.posts[0].source + '.jpg'" class="transition duration-500 z-0 w-64 h-80 brightness-50 blur-md group-hover:blur-none">
</a>
</template>

<script setup>
const props = defineProps(['data'])

</script>

<style scoped>

</style>