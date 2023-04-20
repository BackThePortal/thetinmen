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
	<div>
		<div class="my-2">
			<h3 class="text-lg text-slate-800 dark:text-slate-200">
				Download the data
			</h3>
			<div class="text-slate-700 dark:text-slate-300 space-y-2">
				<p>
					Here, you can download the raw data (also available in the repository)
					and the parsed data. The provided JSON files are minified, since
					they're obtained directly from the original code.
				</p>
				<p>
					The raw data was typed manually and contains the basic data, such as
					dates in simple format and text descriptions. The parsed data contains
					other information which is generated on the fly for the website to
					work, which includes diferent kinds of IDs, dates as JavaScript
					objects, and other properties.
				</p>
				<p>
					You'll want to get the raw data if you'd just like to browse the
					database or if you want to process the data yourself; otherwise, if
					you want to get all the information you can at once, get the parsed
					data.
				</p>
			</div>
		</div>
		<div class="flex gap-2">
			<button
				v-for="button in downloads"
				@click="downloadFile(button.blob, button.filename)"
				class="btn-slate"
			>
				{{ button.title }}
			</button>
		</div>
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

const postsList = postsStore.getPostsList;

const downloads = [
	{
		title: 'Raw data',
		blob: new Blob([JSON.stringify(Posts)], { type: 'application/json' }),
		filename: 'posts.json',
	},
	{
		title: 'Parsed data',
		blob: new Blob([JSON.stringify(postsList)], { type: 'application/json' }),
		filename: 'parsedData.json',
	},
];
function downloadFile(blob, filename) {
	saveAs(blob, filename);
}
</script>

<style scoped>
:deep(.popper) {
	@apply bg-slate-800/20 p-3 backdrop-blur-sm hover:bg-slate-800/20 rounded-md border-2 border-slate-200;
}
</style>