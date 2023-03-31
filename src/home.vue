<template>
	<div>
		<div
			class="mt-2 flex max-xs:flex-col-reverse max-xs:gap-2 xs:justify-between"
		>
			<span
				class="text-center text-black dark:text-slate-200"
				v-html="
					`<b>${count.posts}</b> post${count.posts > 1 ? 's' : ''} in <b>${
						count.topics
					}</b> topic${count.topics > 1 ? 's' : ''}`
				"
			></span>
			<span class="text-center text-slate-700 dark:text-slate-300"
				>Theme:
				<button @click="handleThemeSwitch" class="action-link">
					{{ themeButtonLabel }}
				</button></span
			>
		</div>

		<div
			class="mt-2 sm:mt-4 w-full py-4 sm:py-8 border-y border-gray-700 dark:border-slate-300 space-y-4 xl:space-y-8"
		>
			<div
				class="w-full flex max-sm:flex-col-reverse max-sm:gap-4 justify-center xl:px-8"
			>
				<div class="basis-full max-sm:hidden"></div>
				<div class="flex justify-center">
					<MenuButton
						v-for="menu in menus"
						:key="menu.name"
						:name="menu.name"
						:path="menu.path"
					/>
				</div>
				<div class="basis-full flex sm:max-xl:justify-end justify-center">
					<div class="flex flex-row-reverse justify-start gap-0">
						<input
							@input="handleSearch"
							v-model.trim="query"
							ref="search"
							id="search"
							type="text"
							placeholder="Search..."
							class="peer transition no-underline border border-slate-300 bg-slate-450 dark:bg-slate-600 text-slate-800/70 dark:text-slate-200/70 contrast-more:text-slate-800 dark:contrast-more:text-slate-200 placeholder-slate-800/70 dark:placeholder-slate-200/70 hover:text-slate-900/90 btn-slate active:ring-0 outline-0 focus:bg-slate-500 focus:border-slate-100 focus:text-slate-900/90 rounded-xl w-56 sm:w-36 md:w-52 lg:w-56 lg:rounded-l-none px-2 py-1"
						/>
						<button
							@click="handleSearchIcon"
							class="hidden lg:block stroke-slate-800/70 dark:stroke-slate-200/70 peer-hover:border-slate-100 peer-focus:bg-slate-500 peer-focus:border-slate-100 peer-focus:stroke-slate-900/90 active:stroke-slate-300 transition no-underline border border-slate-300 bg-slate-450 dark:bg-slate-600 btn-slate rounded-none rounded-l-xl px-4 py-1"
						>
							<svg
								v-if="query === ''"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>

							<svg
								v-else
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<router-view></router-view>
		</div>
		<div class="p-4 text-center">
			<a
				href="https://github.com/BackThePortal/thetinmen"
				class="btn-slate"
				target="_blank"
				>GitHub</a
			>
		</div>
	</div>
</template>

<script setup>
import MenuButton from '@/components/home/menuButton.vue';
import { getPostsList } from '@/js/utils';
import parsedPosts from '@/js/parse';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import updateTheme from './js/theme.js';

const router = useRouter();
const route = useRoute();
const search = ref(null);
const theme = ref(null);
const themeButtonLabel = ref(setThemeLabel());
let previousPath = '';

const query = ref('');

const count = {
	topics: parsedPosts.flat().length,
	posts: getPostsList(parsedPosts).length,
};

const menus = [
	{
		name: 'Topics',
		path: '/home/topics',
	},
	{
		name: 'List',
		path: '/home/list',
	},
	{
		name: 'Timeline',
		path: '/home/timeline',
	},
];

function handleSearch() {
	if (query.value === '') {
		router.push(previousPath);
		previousPath = '';
		return;
	}
	if (route.name !== 'Search') previousPath = route.path;
	router.push({ path: '/home/search', query: { q: query.value } });
}

function handleSearchIcon() {
	if (query.value === '') {
		search.value.focus();
	} else {
		query.value = '';
		handleSearch();
	}
}

onBeforeRouteUpdate((to, from) => {
	if (from.name === 'Search' && to.name !== 'Search') {
		query.value = '';
	}
});
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
</script>

<style scoped></style>
