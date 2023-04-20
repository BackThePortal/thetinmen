export default {
	404: {
		page: {
			title: () => "Couldn't find the page you were looking for.",
		},
		post: {
			title: (id) => `Couldn't find the post with ID ${id}`,
		},
		topic: {
			title: (id) => `Couldn't find the topic with ID ${id}`,
		},
	},
};
