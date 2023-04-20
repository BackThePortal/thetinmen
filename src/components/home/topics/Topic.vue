<template>
	<router-link
		:class="[small ? 'w-32 h-40' : 'w-64 h-80']"
		class="transition duration-500 relative group not-touch:hover:scale-110 cursor-pointer rounded-lg z-0 not-touch:hover:z-10"
		:to="`/topic/${data.id}`"
	>
		<article>
			<div
				class="z-50 absolute w-full h-full flex flex-col items-center justify-center"
			>
				<h3
					class="w-full transition-all duration-500 relative text-center touch:text-xl contrast-more:bg-slate-700/60 mx-4 not-touch:group-hover:mx-0 text-slate-200 select-none rounded-lg not-touch:group-hover:rounded-b-none not-touch:group-hover:-translate-y-[9.25rem] not-touch:group-hover:bg-slate-500/80 contrast-more:not-touch:group-hover:bg-gray-900/90"
				>
					{{ data.name }}
				</h3>
				<span class="not-touch:hidden text-slate-200">
					{{ `${data.posts.length} post${data.posts.length > 1 ? 's' : ''}` }}
				</span>
			</div>
			<div class="z-50 absolute w-full h-full flex items-center justify-center">
				<span
					class="w-full transition-all duration-500 relative text-center text-slate-200 opacity-0 not-touch:group-hover:opacity-100 select-none rounded-b-none not-touch:group-hover:rounded-b-lg not-touch:group-hover:translate-y-[9.25rem] not-touch:group-hover:bg-slate-500/80 contrast-more:not-touch:group-hover:bg-gray-900/90"
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
