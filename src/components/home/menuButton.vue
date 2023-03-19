<template>
	<router-link :to="props.path"
							 :class="[route.path === props.path ? 'font-bold scale-110 shadow-xl text-black dark:text-white hover:text-slate-900 dark:hover:text-slate-100' : 'font-normal text-slate-800/70 dark:text-slate-200/70 contrast-more:text-slate-800 dark:contrast-more:text-slate-200 hover:text-slate-900/90']"
							 class="transition no-underline border border-slate-300 dark:border-slate-400 bg-slate-500 contrast-more:bg-slate-500/60 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-400 btn-slate active:ring-0 rounded-none first:rounded-l-xl last:rounded-r-xl px-4 py-1"
	>
		{{props.name}}
	</router-link>
</template>
<script setup>
import {onMounted} from "vue";

const props = defineProps(['name', 'path']);
import {useRoute} from "vue-router";

const route = useRoute();
</script>
