<template>
	<h2>Post number {{ route.params.id }}</h2>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped></style>
