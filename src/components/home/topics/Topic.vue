<template>
	<router-link
		:class="[small ? 'h-40 w-32' : 'h-80 w-64', { group: preview }]"
		class="relative z-0 cursor-pointer rounded-lg transition duration-500 not-touch:hover:z-10 not-touch:hover:scale-110 not-touch:hover:brightness-125"
		:to="`/topic/${data.id}`"
	>
		<article>
			<div
				class="absolute z-50 flex h-full w-full flex-col items-center justify-center"
			>
				<div
					class="mx-4 flex w-full select-none content-center justify-center text-center text-slate-200 transition-all duration-500 touch:text-xl not-touch:group-hover:mx-0"
					:class="[small ? '' : 'not-touch:group-hover:-translate-y-[9.3rem]']"
				>
					<h3
						class="w-auto rounded-lg bg-gray-300/10 px-2 text-xl font-medium backdrop-blur transition-all duration-500 not-touch:group-hover:grow not-touch:group-hover:rounded-b-none not-touch:group-hover:bg-slate-500/50 not-touch:group-hover:px-0 not-touch:group-hover:text-base contrast-more:bg-slate-700/60 contrast-more:not-touch:group-hover:bg-gray-900/90 dark:not-touch:group-hover:bg-slate-800/50"
						:class="[data]"
					>
						{{ data.name }}
					</h3>
				</div>
				<span class="text-slate-200 not-touch:hidden">
					{{ `${data.posts.length} post${data.posts.length > 1 ? 's' : ''}` }}
				</span>
			</div>
			<div class="absolute z-50 flex h-full w-full items-center justify-center">
				<span
					class="relative w-full select-none rounded-b-none text-center text-slate-200 opacity-0 backdrop-blur transition-all duration-500 not-touch:group-hover:rounded-b-lg not-touch:group-hover:bg-slate-500/50 not-touch:group-hover:opacity-100 contrast-more:not-touch:group-hover:bg-gray-900/90 dark:not-touch:group-hover:bg-slate-800/50"
					:class="[
						small
							? 'not-touch:group-hover:translate-y-[4.3rem]'
							: 'not-touch:group-hover:translate-y-[9.25rem]',
					]"
					>{{
						`${data.posts.length} post${data.posts.length > 1 ? 's' : ''}`
					}}</span
				>
			</div>
			<img
				:alt="data?.alt ?? ''"
				ref="thumbnail"
				:src="getImagePath(data?.thumbnail ?? data.posts[0].source)"
				:class="[small ? 'h-40 w-32' : 'h-80 w-64']"
				class="z-0 select-none rounded-lg shadow blur-md brightness-50 transition duration-500 touch:blur-sm touch:saturate-50 not-touch:group-hover:blur-none not-touch:group-hover:brightness-90"
			/>
			<img
				alt=""
				ref="thumbnailGlow"
				:src="getImagePath(data?.thumbnail ?? data.posts[0].source)"
				:class="[small ? 'h-40 w-32' : 'h-80 w-64']"
				class="absolute top-0 -z-50 select-none rounded-lg opacity-0 transition duration-500"
			/>
		</article>
	</router-link>
</template>

<script setup>
import { ref } from 'vue';
import { getImagePath } from '@/js/utils';

const props = defineProps({
	data: Object,
	small: Boolean,
	preview: { type: Boolean, default: true },
});
const thumbnail = ref(null);
</script>

<style scoped></style>
