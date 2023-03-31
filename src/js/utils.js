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

// Data management

/**
 * Gets the list of all the posts from the raw data.
 *
 * @param {array} data - Raw data from the posts.json file.
 * @returns {array} - List of all the posts found in the given data.
 */
export function getPostsList(data) {
    return data.flat().map(topic => {
        const topicPosts = topic.posts.slice();
        topicPosts.map(post => {
            post.topic = topic.name;
            post.topicID = topic.id;
        });
        return topicPosts;
    }).flat();
}

// String utilities
/**
 * Converts DD/MM/YYYY to JavaScript Date object.
 * @param {string} date - Date in DD/MM/YY to convert.
 * @returns {Date} - Date object.
 */
export function dateToObject(date) {
    const dateParts = date.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}

/**
 * Converts JavaScript Date object to DD/MM/YY.
 * @param {Date} date - Date object to convert.
 * @returns {string|null} - Date in DD/MM/YYYY.
 */
export function objectToDate(date = new Date) {
    if (date === "" || date === null) return null;
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
}

export function prettifyURL(url = 'https://instagram.com') {
    url = url.replace(/https:\/\/www./, '').split('');
    if (url[url.length-1] === '/') { url.pop(); }
    return url.join('');
}