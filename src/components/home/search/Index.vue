<template>
	<h3 class="max-sm:text-center text-2xl text-slate-800 dark:text-slate-200">
		You are looking for <i>{{ $route.query.q }}</i>
	</h3>
	<span
		class="w-full max-sm:text-center text-slate-700 dark:text-slate-300"
		v-if="$route.query.q.length < 3"
		>Keep typing to show results</span
	>
	<h4 class="text-slate-800 dark:text-slate-200" v-else>Results</h4>
</template>

<script setup></script>

<style scoped></style>
