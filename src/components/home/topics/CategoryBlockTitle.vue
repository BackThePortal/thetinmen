<template>
	<div
		class="flex place-items-center gap-2 px-2 mb-4 rounded-xl select-none group text-slate-900 hover:text-gray-800 dark:hover:text-gray-200 dark:text-white"
	>
		<h3 class="transition text-lg shrink">
			{{ props.title }}
		</h3>
		<hr />
		<button
			class="transition-all action-link w-fit"
			@click="categoriesStore.toggleCategory(props.reference)"
		>
			{{ categoriesStore.getData[props.reference] ? 'Hide' : 'Show' }}
		</button>
	</div>
</template>
<script setup>
import { useCategoriesShowStore } from '@/stores/categoriesShow.js';

const props = defineProps(['title', 'reference']);
const categoriesStore = useCategoriesShowStore();
</script>
<style scoped>
hr {
	@apply transition grow border-gray-700/60 group-hover:border-gray-800 dark:group-hover:border-gray-200 dark:border-white;
}
</style>
