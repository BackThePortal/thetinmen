<template>
	<div
		class="flex flex-row-reverse justify-start gap-0 transition focus-within:shadow-xl"
	>
		<input
			@input="handleSearch"
			v-model.trim="query"
			ref="search"
			id="search"
			type="text"
			placeholder="Search..."
			class="btn-slate peer w-56 rounded-xl border border-slate-300 bg-slate-450 px-2 py-1 text-slate-800/70 no-underline placeholder-slate-800/70 outline-0 transition hover:text-slate-900/90 focus:border-slate-100 focus:bg-slate-300 focus:text-slate-900/90 focus:ring-0 active:ring-0 contrast-more:text-slate-800 dark:bg-slate-600 dark:text-slate-200/70 dark:placeholder-slate-200/70 dark:focus:bg-slate-500 dark:focus:text-slate-300 dark:contrast-more:text-slate-200 sm:w-36 md:w-52 lg:w-56 lg:rounded-l-none"
		/>
		<button
			@click="handleSearchIcon"
			class="btn-slate rounded-none rounded-l-xl border border-slate-300 bg-slate-450 stroke-slate-800/70 px-4 py-1 no-underline transition active:bg-slate-450 active:stroke-slate-800/70 active:stroke-slate-300 peer-hover:border-slate-100 peer-hover:stroke-slate-900/90 peer-focus:border-slate-100 peer-focus:bg-slate-300 peer-focus:stroke-slate-900/90 dark:bg-slate-600 dark:stroke-slate-200/70 dark:peer-hover:stroke-slate-100 dark:peer-focus:bg-slate-500 dark:peer-focus:stroke-slate-300 dark:peer-focus:stroke-slate-300 max-lg:hidden"
		>
			<svg
				v-if="query === ''"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="h-6 w-6"
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
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	</div>
</template>
<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
const search = ref(null);
let previousPath = '';

const query = ref(route.query.q ?? '');

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
</script>
