<template>
	<th class="transition select-none px-2 border border-slate-700">
		{{ props.text }}
	</th>
</template>

<script setup>
const props = defineProps(['text']);
</script>

<style scoped>

</style>