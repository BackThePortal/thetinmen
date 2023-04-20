// Image sources management

/**
 * Gets the path of an image in the posts folder using an ID. Doesn't guarantee the existence of the file.
 *
 * @param {number} id - Number to use as filename.
 * @returns {string} - Path to the image.
 */
export function getImagePath(id) {
	return `/thetinmen/${id}.jpg`;
}

export class DateUtils {
	/**
	 * Converts DD/MM/YYYY to JavaScript Date object.
	 * @param {string} date - Date in DD/MM/YY to convert.
	 * @returns {Date} - Date object.
	 */
	static dateToObject(date) {
		const dateParts = date.split('/');
		return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
	}
	/**
	 * Converts JavaScript Date object to DD/MM/YY.
	 * @param {Date|string} date - Date object to convert.
	 * @returns {string|null} - Date in DD/MM/YYYY.
	 */
	static objectToDate(date = new Date()) {
		if (date === '' || date === null) return null;
		let month = String(date.getMonth() + 1);
		let day = String(date.getDate());
		const year = String(date.getFullYear());

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return `${day}/${month}/${year}`;
	}
}

export function prettifyURL(url = 'https://instagram.com') {
	url = url.replace(/https:\/\/www./, '').split('');
	if (url[url.length - 1] === '/') {
		url.pop();
	}
	return url.join('');
}
