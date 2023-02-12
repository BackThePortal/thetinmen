<template>
	<router-link :to="props.path"
							 :class="[route.path === props.path ? 'font-bold scale-110 shadow-xl text-black hover:text-slate-900' : 'font-normal text-slate-800/70 contrast-more:text-slate-800 hover:text-slate-900/90']"
							 class="transition no-underline border border-slate-300 bg-slate-500 hover:bg-slate-300 btn-slate active:ring-0 rounded-none first:rounded-l-xl last:rounded-r-xl px-4 py-1"
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
