module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
		            ? '/thetinmen/' // note the trailing slash
		            : '/',
}