<template>
	<div
		class="transition duration-500 relative group overflow-hidden rounded-lg border-2 border-transparent sm:hover:border-slate-300 sm:hover:scale-105 sm:focus-within:border-slate-300 sm:focus-within:scale-105"
	>
		<div>
			<img
				:alt="data?.alt ?? data.title"
				ref="image"
				:src="getImagePath(data.source)"
				class="select-none z-0 transition duration-500 rounded-lg w-32 h-40 sm:w-48 sm:h-60 md:w-64 md:h-80 xl:w-96 xl:h-120 shadow-md sm:group-hover:brightness-50 contrast-more:sm:group-hover:brightness-[.15] sm:group-hover:blur-md sm:group-hover:saturate-50"
			/>
			<div
				class="transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-1/2 font-semibold px-3 w-32 sm:w-48 md:w-64 xl:w-96 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl z-50 text-slate-200 opacity-0 sm:group-hover:opacity-80"
			>
				<span v-if="data.date" class="font-light">{{
					objectToDate(data.date)
				}}</span>
				<br />
				<span>{{ data.title }}</span>
			</div>
			<div
				class="transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-0 max-sm:bg-gray-600/30 max-sm:backdrop-blur-xl sm:bottom-1/2 text-sm sm:text-xs md:text-sm lg:text-base sm:translate-y-16 max-sm:w-full sm:w-48 md:w-64 xl:w-96 text-center z-50 sm:opacity-0 sm:group-hover:opacity-80 flex flex-col items-center align-bottom sm:align-top content-start gap-1"
			>
				<a
					v-if="data.link"
					:href="data.link"
					target="_blank"
					class="link"
					@click.shift.prevent="handleShiftClick"
					>See post</a
				>
				<a
					v-if="data.blog"
					:href="data.blog"
					target="_blank"
					class="link max-sm:hidden"
					>See blog entry</a
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getImagePath, objectToDate, prettifyURL } from '@/js/utils';
import { ref } from 'vue';

const props = defineProps(['data', 'id']);
const link = ref(prettifyURL(props.data.link));

function handleShiftClick(e) {
	navigator.clipboard.writeText(e.target.href);
}
</script>

<style scoped>
.link {
	@apply transition-all text-slate-100 sm:text-slate-200 sm:hover:font-semibold underline underline-offset-2 sm:hover:decoration-2 max-md:active:decoration-2 sm:hover:bg-slate-300/30 backdrop-brightness-100 max-md:active:backdrop-brightness-125 max-sm:w-full sm:active:bg-slate-300/60 pb-1 px-2 sm:rounded w-fit;
}
</style>
