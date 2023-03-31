<template>
	<div
		class="border border-slate-300 bg-slate-500/60 w-full text-sm overflow-x-auto inline-block whitespace-nowrap max-sm:text-sm"
	>
		<table class="table-auto border-collapse w-full">
			<thead class="text-left">
				<tr
					class="border border-slate-700 bg-gradient-to-r from-theme-primary/10 to-theme-secondary/10"
				>
					<TableHeader
						v-for="header in tableHeaders"
						:text="header.title"
						:class="header.class"
					></TableHeader>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="post in postsList"
					:key="post.globalId"
					class="group even:bg-slate-500/80"
				>
					<TableCell class="text-right font-mono">
						{{ post.globalId }}
					</TableCell>
					<TableCell>
						<Popper class="w-full" offset-distance="2">
							<button
								class="w-full transition text-left underline decoration-1 underline-offset-2 decoration-dashed hover:text-slate-800 discreet-link"
							>
								{{ post.title }}
							</button>
							<template #content>
								<img
									class="transition w-48 h-60 rounded-sm opacity-80 hover:brightness-105 hover:opacity-100"
									:alt="post?.alt ?? post.title"
									ref="image"
									:src="getImagePath(post.source)"
								/>
							</template>
						</Popper>
					</TableCell>
					<TableCell>
						<router-link class="discreet-link" :to="`/topic/${post.topicID}`">
							{{ post.topic }}
						</router-link>
					</TableCell>
					<TableCell>
						<a class="discreet-link" :href="post.link" target="_blank">
							{{ prettifyURL(post.link) }}
						</a>
					</TableCell>
					<TableCell class="font-mono">
						{{ objectToDate(post.date) }}
					</TableCell>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import {
	getPostsList,
	objectToDate,
	prettifyURL,
	getImagePath,
} from '@/js/utils';
import parsedPosts from '@/js/parse';
import TableHeader from '@/components/home/list/tableHeader.vue';
import TableCell from '@/components/home/list/tableCell.vue';

const tableHeaders = [
	{ title: 'ID', class: 'w-12' },
	{ title: 'Name' },
	{ title: 'Topic' },
	{ title: 'Link' },
	{ title: 'Date' },
];

const postsList = getPostsList(parsedPosts).sort(
	(a, b) => a.globalId - b.globalId
);
</script>

<style scoped>
:deep(.popper) {
	@apply bg-slate-800/20 p-3 backdrop-blur-sm hover:bg-slate-800/20 rounded-md border-2 border-slate-200;
}
</style>
