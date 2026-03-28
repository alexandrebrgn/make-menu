// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	devServer: { port: 8000 },
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			apiBaseUrl: "http://localhost:8080/api",
			fakeAuth: true,
		},
	},
	modules: [
		"@nuxtjs/i18n",
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@vite-pwa/nuxt",
		"@nuxt/icon",
	],
	compatibilityDate: "2025-07-15",
	css: ["@/assets/css/tailwind.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	i18n: {
		defaultLocale: "fr",
		restructureDir: "./app",
		strategy: "prefix_except_default",
		locales: [
			{ code: "fr", name: "Français", file: "fr.json" },
			{ code: "en", name: "English", file: "en.json" },
		],
	},
	pinia: {
		storesDirs: ["./app/stores"],
	},
	pwa: {
		devOptions: {
			enabled: true,
		},
		registerType: "autoUpdate",
		manifest: {
			name: "Sapientia",
			short_name: "Sapientia",
			description: "Sapientia Application",
			theme_color: "#ffffff",
			background_color: "#ffffff",
			display: "standalone",
			lang: "fr",
			icons: [
				{
					src: "/images/icons/icon-192x192.png",
					sizes: "192x192",
					type: "image/png",
				},
				{
					src: "/images/icons/icon-512x512.png",
					sizes: "512x512",
					type: "image/png",
				},
			],
			screenshots: [
				{
					src: "/images/screenshots/home-desktop.png",
					sizes: "1280x720",
					type: "image/png",
					form_factor: "wide",
				},
				{
					src: "/images/screenshots/home-mobile.png",
					sizes: "720x1280",
					type: "image/png",
				},
			],
		},
	},
});
