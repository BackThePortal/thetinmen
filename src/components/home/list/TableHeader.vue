<template>
	<th
		class="text-slate-800 dark:text-slate-200 transition select-none px-2 border border-slate-700 bg-slate-300/80 dark:bg-slate-600/90 hover:bg-slate-400/50 dark:hover:bg-slate-600/40"
	>
		{{ props.text }}
	</th>
</template>

<script setup>
const props = defineProps(['text']);
</script>

<style scoped></style>
