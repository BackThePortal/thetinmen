<template>
	<div class="transition duration-500 relative group overflow-hidden rounded-lg border-2 border-transparent hover:border-slate-300 hover:scale-105 ">
		<div>
			<img :alt="data?.alt ?? data.title" ref="image" :src="getImagePath(data.source)" class="z-0 transition duration-500 rounded-lg w-32 h-40 sm:w-48 sm:h-60 md:w-64 md:h-80 xl:w-96 xl:h-120 shadow-md  group-hover:brightness-50 group-hover:blur-md group-hover:saturate-50">
			<span class="transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-1/2 font-semibold px-3 w-32 sm:w-48 md:w-64 xl:w-96 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl z-50 text-slate-200 opacity-0 sm:group-hover:opacity-80">{{data.title}}</span>
			<div class="transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-1/2 text-sm sm:text-xs md:text-sm lg:text-base sm:translate-y-16 w-32 sm:w-48 md:w-64 xl:w-96 text-center z-50 opacity-0 group-hover:opacity-80 flex flex-col items-center align-top content-start gap-1">
				<a :href="data.link" target="_blank" class="transition-all text-slate-200 hover:font-semibold underline underline-offset-2  hover:decoration-2 hover:bg-slate-300/30 active:bg-slate-300/60 pt-0-5 pb-1 px-2 rounded w-fit">See post</a>
				<a v-if="data.blog && data.blog !== ''" :href="data.blog" target="_blank" class="transition-all text-slate-200 hover:font-semibold underline underline-offset-2  hover:decoration-2 hover:bg-slate-300/30 active:bg-slate-300/60 pt-0-5 pb-1 px-2 rounded w-fit">See blog entry</a>
			</div>
		</div>

	</div>
</template>

<script setup>
import {getImagePath} from "@/utils";
import {ref} from "vue";

const props = defineProps(['data', 'id']);
let link = ref(props.data.link.replace(/https:\/\/www./, '').split(''));
link.value.pop();
link = link.value.join('')
</script>

<style scoped>

</style>