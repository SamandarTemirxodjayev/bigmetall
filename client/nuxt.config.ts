// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/ui", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
	colorMode: {
		preference: "light",
	},
	ui: {
		safelistColors: ["blue"],
	},
	routeRules: {
		"/**": {
			ssr: true,
		},
	},
	devtools: {enabled: false},
});
