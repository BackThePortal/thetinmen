<template>
	<div
		class="flex place-items-center gap-2 px-2 rounded-xl select-none group text-gray-700 hover:text-gray-800 dark:hover:text-gray-200 dark:text-white"
	>
		<h3 class="transition text-lg shrink">
			{{ props.title }}
		</h3>
		<hr
			class="transition grow border-gray-700/60 group-hover:border-gray-800 dark:group-hover:border-gray-200 dark:border-white"
		/>
		<button ref="button" class="action-link" @click="emitValue">
			{{ props.modelValue === true ? 'Hide' : 'Show' }}
		</button>
	</div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps(['title', 'modelValue']);
const emit = defineEmits(['toggleShow', 'update:modelValue']);

const button = ref(null);

function emitValue(e) {
	console.log(button.value.textContent);
}
</script>
