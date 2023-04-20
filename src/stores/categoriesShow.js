import { defineStore } from 'pinia';

export const useCategoriesShowStore = defineStore('categoriesShow', {
	state: () => {
		const local = localStorage.getItem('categoriesShow');
		let [normal, special] = [null, null];
		if (local) {
			({ normal, special } = JSON.parse(local));
		} else {
			[normal, special] = [true, true];
		}
		return {
			normal,
			special,
		};
	},
	getters: {
		getData() {
			return {
				normal: this.normal,
				special: this.special,
			};
		},
	},
	actions: {
		updateStorage() {
			localStorage.setItem('categoriesShow', JSON.stringify(this.getData));
		},
		toggleCategory(category) {
			this[category] = !this[category];
			this.updateStorage();
		},
	},
});
