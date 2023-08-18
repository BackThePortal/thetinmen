<template>
	<div
		class="z-50 transition-all xs:sticky xs:top-0 xs:left-0 xs:right-0"
		:class="[scroll > scrollGoal ? 'p-0' : 'sm:px-5']"
	>
		<header
			class="z-50 bg-slate-300/40 p-4 text-center shadow-lg backdrop-blur-lg transition-all contrast-more:bg-slate-400/80 contrast-more:backdrop-blur-xl dark:bg-slate-500/40 dark:contrast-more:!bg-slate-700/80"
			:class="[
				scroll > scrollGoal
					? 'm-0 xs:bg-slate-200/60 xs:shadow-2xl xs:dark:bg-slate-600/40'
					: 'mx-auto max-w-7xl sm:rounded-b-xl',
			]"
		>
			<div class="mb-2 flex items-center justify-center">
				<div
					class="rounded-lg bg-slate-700/60 px-4 py-1 transition hover:bg-slate-600/50 active:opacity-40 dark:bg-gray-800/60 dark:hover:bg-slate-800/20"
					:class="[
						scroll > scrollGoal
							? 'dark:bg-slate-gray-800/0 bg-slate-700/0'
							: '',
					]"
				>
					<h1
						class="select-none bg-gradient-to-r bg-clip-text text-transparent"
						:class="[
							backo
								? 'from-sky-500 to-teal-600'
								: 'from-theme-primary to-theme-secondary',
						]"
						@click="handleTitleClick"
					>
						{{ backo ? 'Created by Backo' : 'TheTinMen' }}
					</h1>
				</div>
			</div>

			<nav
				class="mt-2 flex flex-initial place-content-center items-center max-xs:flex-col-reverse max-xs:gap-2 xs:justify-around sm:mt-4"
			>
				<span class="basis-1/3 text-slate-800 dark:text-slate-200">
					<b class="text-black dark:text-slate-200">{{ counts.posts }}</b>
					post{{ counts.posts > 1 ? 's' : ''
					}}<span
						class="before:content-[',_'] sm:before:content-['_in_']"
					></span>
					<b class="text-black dark:text-slate-200">{{ counts.topics }}</b>
					topic{{ counts.topics > 1 ? 's' : '' }}
				</span>

				<span
					class="min-w-fit basis-1/3 text-slate-800 dark:text-slate-200 max-md:hidden"
					>Visit
					<a
						target="_blank"
						class="action-link"
						href="https://instagram.com/thetinmen"
						>@thetinmen</a
					>
					on Instagram</span
				>

				<!-- md -->
				<span
					class="basis-1/3 text-slate-800 dark:text-slate-200 max-sm:hidden md:hidden"
					>Visit
					<a target="_blank" class="link" href="https://instagram.com/thetinmen"
						>@thetinmen</a
					>
					on IG</span
				>

				<!-- xs -->
				<span class="basis-1/3 sm:hidden">
					<a class="link" href="https://instagram.com/thetinmen">@thetinmen</a>
				</span>

				<span class="basis-1/3 text-slate-800 dark:text-slate-200"
					>Theme:
					<button @click="handleThemeSwitch" class="action-link">
						{{ themeButtonLabel }}
					</button></span
				>
			</nav>
		</header>
	</div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { usePostsStore } from '@/stores/posts.js';
import updateTheme from '@/js/theme.js';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps(['hide']);
const emit = defineEmits(['scrollState', 'margin']);

const postsStore = usePostsStore();
const route = useRoute();
const router = useRouter();

const backo = ref(false);

const counts = computed(() => ({
	topics: postsStore.parsedPosts.length,
	posts: postsStore.getPostsList.length,
}));

const themeButtonLabel = ref(setThemeLabel());

const scrollGoal = 0;

function setThemeLabel() {
	return localStorage.getItem('theme') === 'light'
		? 'Light'
		: localStorage.getItem('theme')
		? 'Dark'
		: 'System';
}
function handleThemeSwitch() {
	if (localStorage.getItem('theme') === 'light') {
		localStorage.setItem('theme', 'dark');
	} else if (localStorage.getItem('theme') === 'dark') {
		localStorage.removeItem('theme');
	} else {
		localStorage.setItem('theme', 'light');
	}
	themeButtonLabel.value = setThemeLabel();
	updateTheme();
}

function handleTitleClick() {
	if (route.fullPath === '/') {
		backo.value = !backo.value;
		if (backo.value === true) {
			setTimeout(() => {
				backo.value = false;
			}, 3000);
		}
	} else {
		router.push({ name: 'Topics' });
	}
}
const scroll = ref(0);
function calcScroll() {
	scroll.value = window.pageYOffset;
}

window.onscroll = function () {
	calcScroll();
};

onMounted(() => {
	calcScroll();
});
</script>
