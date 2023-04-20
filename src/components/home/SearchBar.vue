<template>
	<div
		class="transition flex flex-row-reverse justify-start gap-0 focus-within:shadow-xl"
	>
		<input
			@input="handleSearch"
			v-model.trim="query"
			ref="search"
			id="search"
			type="text"
			placeholder="Search..."
			class="peer transition no-underline border border-slate-300 bg-slate-450 dark:bg-slate-600 text-slate-800/70 dark:text-slate-200/70 contrast-more:text-slate-800 dark:contrast-more:text-slate-200 placeholder-slate-800/70 dark:placeholder-slate-200/70 hover:text-slate-900/90 btn-slate active:ring-0 outline-0 focus:bg-slate-300 dark:focus:bg-slate-500 focus:border-slate-100 focus:text-slate-900/90 dark:focus:text-slate-300 rounded-xl w-56 sm:w-36 md:w-52 lg:w-56 lg:rounded-l-none px-2 py-1"
		/>
		<button
			@click="handleSearchIcon"
			class="max-lg:hidden stroke-slate-800/70 active:stroke-slate-800/70 dark:stroke-slate-200/70 peer-hover:border-slate-100 peer-focus:bg-slate-300 dark:peer-focus:bg-slate-500 dark:peer-focus:stroke-slate-300 peer-focus:border-slate-100 peer-focus:stroke-slate-900/90 peer-hover:stroke-slate-900/90 dark:peer-hover:stroke-slate-100 dark:peer-focus:stroke-slate-300 active:stroke-slate-300 transition no-underline border border-slate-300 bg-slate-450 active:bg-slate-450 dark:bg-slate-600 btn-slate rounded-none rounded-l-xl px-4 py-1"
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
</template>
<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
const search = ref(null);
let previousPath = '';

const query = ref('');

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
