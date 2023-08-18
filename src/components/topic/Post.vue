<template>
	<div
		class="group relative overflow-hidden rounded-lg border-2 border-transparent transition sm:duration-500 sm:focus-within:scale-105 sm:focus-within:border-slate-300 sm:hover:scale-105 sm:hover:border-slate-300"
		@mouseenter="toggleHover('image', true)"
		@mouseleave="toggleHover('image', false)"
	>
		<div>
			<img
				:alt="data?.alt ?? data.title"
				ref="image"
				:src="getImagePath(data.source)"
				class="post-height post-width z-0 select-none rounded-lg shadow-md transition duration-500 sm:group-hover:blur-md sm:group-hover:brightness-50 sm:group-hover:saturate-50 contrast-more:sm:group-hover:brightness-[.15]"
			/>
			<div
				class="post-width absolute bottom-1/2 z-40 transform-gpu px-3 text-center text-xs font-semibold text-slate-200 subpixel-antialiased opacity-0 transition-all duration-500 sm:text-xs sm:group-hover:opacity-80 md:text-sm lg:text-base xl:text-lg"
			>
				<span v-if="data.date" class="font-light">{{
					DateUtils.objectToDate(data.date)
				}}</span>
				<br />
				<span>{{ data.title }}</span>
			</div>
			<div
				class="post-width absolute bottom-0 z-40 flex w-full transform-gpu flex-col content-start items-center gap-1 bg-gray-600/30 text-center align-bottom text-sm subpixel-antialiased backdrop-blur-xl transition-all duration-500 sm:opacity-0"
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
				class="post-width absolute bottom-0 z-40 flex transform-gpu flex-col content-start items-center gap-1 text-center align-bottom text-sm subpixel-antialiased opacity-0 transition-all duration-500 sm:bottom-1/2 sm:translate-y-16 sm:align-top sm:group-hover:opacity-80 lg:text-base"
				@mouseenter="toggleHover('links', true)"
				@mouseleave="toggleHover('links', false)"
			>
				<template v-if="showTopic">
					<Transition>
						<router-link
							v-if="isHovering"
							:to="`/topic/${data.topicID}`"
							class="link"
							>Go to topic</router-link
						>
					</Transition>
				</template>
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
						v-if="!showTopic && data.blog && isHovering"
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

const props = defineProps(['topic', 'id', 'showTopic']);
const data = postsStore.getPostById(props.topic, props.id);
const link = ref(prettifyURL(data.link));

const hover = reactive({
	image: false,
	links: false,
});

const isHovering = computed(() => Object.values(hover).includes(true));

function handleShiftClick(e) {
	navigator.clipboard.writeText(e.target.href);
	const previousText = e.target.innerHTML;
	e.target.innerHTML = 'Copied!';
	setTimeout(() => {
		e.target.innerHTML = previousText;
	}, 1000);
}

function toggleHover(prop, value) {
	setTimeout(() => {
		hover[prop] = value;
	}, 200);
}
</script>

<style scoped>
.link {
	@apply w-fit px-2 pb-1 text-slate-100 underline underline-offset-2 backdrop-brightness-100 transition-all max-md:active:decoration-2 max-md:active:backdrop-brightness-125 max-sm:w-full sm:rounded sm:text-slate-200 sm:hover:bg-slate-300/30 sm:hover:font-semibold sm:hover:decoration-2 sm:active:bg-slate-300/60;
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
