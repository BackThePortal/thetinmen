<template>
	<div
		class="transition sm:duration-500 relative group overflow-hidden rounded-lg border-2 border-transparent sm:hover:border-slate-300 sm:hover:scale-105 sm:focus-within:border-slate-300 sm:focus-within:scale-105"
		@mouseenter="toggleHover('image', true)"
		@mouseleave="toggleHover('image', false)"
	>
		<div>
			<img
				:alt="data?.alt ?? data.title"
				ref="image"
				:src="getImagePath(data.source)"
				class="select-none z-0 transition duration-500 rounded-lg post-height post-width shadow-md sm:group-hover:brightness-50 contrast-more:sm:group-hover:brightness-[.15] sm:group-hover:blur-md sm:group-hover:saturate-50"
			/>
			<div
				class="transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-1/2 font-semibold px-3 post-width text-center text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg z-40 text-slate-200 opacity-0 sm:group-hover:opacity-80"
			>
				<span v-if="data.date" class="font-light">{{
					DateUtils.objectToDate(data.date)
				}}</span>
				<br />
				<span>{{ data.title }}</span>
			</div>
			<div
				class="transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-0 bg-gray-600/30 backdrop-blur-xl text-sm w-full post-width text-center z-40 sm:opacity-0 flex flex-col items-center align-bottom content-start gap-1"
				@mouseenter="toggleHover('links', true)"
				@mouseleave="toggleHover('links', false)"
			>
				<Transition>
					<a
						v-if="data.link"
						:href="data.link"
						target="_blank"
						class="link"
						@click.shift.prevent="handleShiftClick"
						>See post</a
					>
				</Transition>
				<Transition>
					<a
						v-if="data.blog"
						:href="data.blog"
						target="_blank"
						class="link max-sm:hidden"
						@click.shift.prevent="handleShiftClick"
						>See blog entry</a
					>
				</Transition>
			</div>
			<div
				class="transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-0 sm:bottom-1/2 text-sm lg:text-base sm:translate-y-16 post-width text-center z-40 opacity-0 sm:group-hover:opacity-80 flex flex-col items-center align-bottom sm:align-top content-start gap-1"
				@mouseenter="toggleHover('links', true)"
				@mouseleave="toggleHover('links', false)"
			>
				<Transition>
					<a
						v-if="data.link && isHovering"
						:href="data.link"
						target="_blank"
						class="link"
						@click.shift.prevent="handleShiftClick"
						>See post</a
					>
				</Transition>
				<Transition>
					<a
						v-if="data.blog && isHovering"
						:href="data.blog"
						target="_blank"
						class="link max-sm:hidden"
						@click.shift.prevent="handleShiftClick"
						>See blog entry</a
					>
				</Transition>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getImagePath, prettifyURL, DateUtils } from '@/js/utils';
import { computed, reactive, ref } from 'vue';
import { usePostsStore } from '@/stores/posts.js';

const postsStore = usePostsStore();

const props = defineProps(['topic', 'id']);
const data = postsStore.getPostById(props.topic, props.id);
const link = ref(prettifyURL(data.link));

const hover = reactive({
	image: false,
	links: false,
});

const isHovering = computed(() => Object.values(hover).includes(true));

function handleShiftClick(e) {
	navigator.clipboard.writeText(e.target.href);
}

function toggleHover(prop, value) {
	setTimeout(() => {
		hover[prop] = value;
	}, 200);
}
</script>

<style scoped>
.link {
	@apply transition-all text-slate-100 sm:text-slate-200 sm:hover:font-semibold underline underline-offset-2 sm:hover:decoration-2 max-md:active:decoration-2 sm:hover:bg-slate-300/30 backdrop-brightness-100 max-md:active:backdrop-brightness-125 max-sm:w-full sm:active:bg-slate-300/60 pb-1 px-2 sm:rounded w-fit;
}

.post-width {
	@apply w-[8.5rem] xs:w-[11.5rem] sm:w-[9.85rem] md:w-[12.5rem] lg:w-[13.1rem] xl:w-[17.1rem];
}
/*
width = height * 1.25 = height / 0.8
*/
.post-height {
	@apply h-[10.625rem] xs:h-[14.375rem] sm:h-[12.25rem] md:h-[15.625rem] lg:h-[16.375rem] xl:h-[21.375rem];
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
