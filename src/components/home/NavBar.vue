<template>
	<div
		class="transition-all xs:sticky xs:top-0 xs:left-0 xs:right-0 z-50"
		:class="[scroll > scrollGoal ? 'p-0' : 'sm:px-5']"
	>
		<header
			class="transition-all bg-slate-300/40 dark:bg-slate-500/40 contrast-more:bg-slate-400 dark:contrast-more:bg-slate-700 contrast-more:backdrop-blur-0 backdrop-blur-lg p-4 text-center z-50 shadow-lg"
			:class="[
				scroll > scrollGoal
					? 'xs:bg-slate-200/60 xs:dark:bg-slate-600/40 m-0 xs:shadow-2xl'
					: 'max-w-7xl mx-auto sm:rounded-b-xl',
			]"
		>
			<div class="flex items-center mb-2 justify-center">
				<div
					class="transition px-4 py-1 bg-slate-700/60 dark:bg-gray-800/60 hover:bg-slate-600/50 dark:hover:bg-slate-800/20 rounded-lg active:opacity-40"
					:class="[
						scroll > scrollGoal
							? 'bg-slate-700/0 dark:bg-slate-gray-800/0'
							: '',
					]"
				>
					<h1
						class="select-none bg-clip-text text-transparent bg-gradient-to-r"
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
				class="mt-2 sm:mt-4 flex flex-initial max-xs:flex-col-reverse max-xs:gap-2 xs:justify-around items-center place-content-center"
			>
				<span class="text-black dark:text-slate-200 basis-1/3">
					<b>{{ counts.posts }}</b> post{{ counts.posts > 1 ? 's' : ''
					}}<span
						class="before:content-[',_'] sm:before:content-['_in_']"
					></span>
					<b>{{ counts.topics }}</b> topic{{ counts.topics > 1 ? 's' : '' }}
				</span>

				<span
					class="text-black dark:text-slate-200 max-md:hidden basis-1/3 min-w-fit"
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
					class="text-black dark:text-slate-200 max-sm:hidden md:hidden basis-1/3"
					>Visit
					<a target="_blank" class="link" href="https://instagram.com/thetinmen"
						>@thetinmen</a
					>
					on IG</span
				>

				<!-- xs -->
				<span class="sm:hidden basis-1/3">
					<a class="link" href="https://instagram.com/thetinmen">@thetinmen</a>
				</span>

				<span class="text-black dark:text-slate-200 basis-1/3"
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
