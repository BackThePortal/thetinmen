<template>
	<div>
		<span class="text-center mt-8"
					v-html="`<b>${count.posts}</b> post${count.posts > 1 ? 's' : ''} in <b>${count.topics}</b> topic${count.topics > 1 ? 's' : ''}`"></span>
		<div class="mt-4 w-full py-4 sm:py-8 border-y border-slate-300 space-y-8">
			<div class="w-full flex max-sm:flex-col-reverse max-sm:gap-4 justify-center md:px-8">
				<div class="basis-full max-sm:hidden">

				</div>
				<div class="flex justify-center">
					<MenuButton v-for="menu in menus" :key="menu.name" :name="menu.name" :path="menu.path"/>
				</div>
				<div class="basis-full flex justify-center">
					<div class="flex flex-row-reverse justify-start gap-0">
						<input @input="handleSearch" v-model.trim="query" ref="search" id="search" type="text" placeholder="Search..."
									 class="peer transition no-underline border border-slate-300 bg-slate-500 text-slate-800/70 placeholder-slate-800/70 hover:text-slate-900/90 btn-slate active:ring-0 outline-0 focus:bg-slate-500 focus:border-slate-100 focus:text-slate-900/90 rounded-xl w-32 sm:w-40 lg:w-52 lg:rounded-l-none px-2 py-1">
						<button @click="handleSearchIcon"
										class="hidden lg:block stroke-slate-800/70 peer-hover:border-slate-100 peer-focus:bg-slate-500 peer-focus:border-slate-100 peer-focus:stroke-slate-900/90 active:stroke-slate-300 transition no-underline border border-slate-300 bg-slate-500 btn-slate rounded-none rounded-l-xl px-4 py-1">

							<svg v-if="query === ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
									 class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round"
											d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
							</svg>

							<svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>


						</button>
					</div>
				</div>
			</div>
			<router-view></router-view>
		</div>
		<div class="p-4 text-center">
			<a href="https://github.com/BackThePortal/thetinmen" class="btn-slate" target=_blank>GitHub</a>
		</div>

	</div>
</template>

<script setup>
import MenuButton from "@/components/home/menuButton.vue";
import { getPostsList } from "@/js/utils";
import parsedPosts from "@/js/parse";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const route = useRoute();
const search = ref(null);
let previousPath = '';

const query = ref('');

const count = {
	topics: parsedPosts.flat().length,
	posts:  getPostsList(parsedPosts).length
}

const menus = [
	{
		name: 'Topics',
		path: '/home/topics'
	},
	{
		name: 'Posts',
		path: '/home/list'
	},
	{
		name: 'Timeline',
		path: '/home/timeline'
	}
]

function handleSearch() {
	if (query.value === '') {
		router.push(previousPath);
		previousPath = '';
		return;
	}
	if (route.name !== 'Search') previousPath = route.path;
	router.push({ path: '/home/search', query: { q: query.value }})
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
	if (from.name === 'Search' && to.name !== 'Search' ) {
		query.value = '';
	}
});
</script>

<style scoped>

</style>