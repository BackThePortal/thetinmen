<template>
	<router-link
		:class="[small ? 'w-32 h-40' : 'w-64 h-80']"
		class="transition duration-500 relative group hover:scale-110 cursor-pointer rounded-lg z-0 hover:z-10"
		:to="`/topic/${id}`"
	>
		<article>
			<div class="z-50 absolute w-full h-full flex items-center justify-center">
				<h3
					class="w-full transition-all duration-500 relative text-center contrast-more:bg-slate-700/60 mx-4 group-hover:mx-0 text-slate-200 select-none rounded-lg group-hover:rounded-b-none group-hover:-translate-y-[9.25rem] group-hover:bg-slate-500/80 contrast-more:group-hover:bg-gray-900/90"
				>
					{{ data.name }}
				</h3>
			</div>
			<div class="z-50 absolute w-full h-full flex items-center justify-center">
				<span
					class="w-full transition duration-500 relative text-center text-slate-200 opacity-0 group-hover:opacity-100 select-none rounded-b-none group-hover:rounded-b-lg group-hover:translate-y-[9.25rem] group-hover:bg-slate-500/80 contrast-more:group-hover:bg-gray-900/90"
					>{{
						`${data.posts.length} post${data.posts.length > 1 ? 's' : ''}`
					}}</span
				>
			</div>
			<img
				:alt="data?.alt ?? ''"
				ref="thumbnail"
				:src="getImagePath(data?.thumbnail ?? data.posts[0].source)"
				:class="[small ? 'w-32 h-40' : 'w-64 h-80']"
				class="select-none rounded-lg transition duration-500 z-0 brightness-50 group-hover:brightness-90 blur-md group-hover:blur-none shadow-none group-hover:shadow-2xl shadow"
			/>
		</article>
	</router-link>
</template>

<script setup>
import { ref } from 'vue';
import { getImagePath } from '@/js/utils';

const props = defineProps(['data', 'id', 'small']);

const thumbnail = ref(null);
</script>

<style scoped></style>
