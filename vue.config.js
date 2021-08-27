module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				assets: "@/assets",
				common: "@/common",
				components: "@/components",
				network: "@/network",
				views: "@/views"
			}
		}
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "./src/assets/scss/base.scss";`
			}
		}
	}
};
