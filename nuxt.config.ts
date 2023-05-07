// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    dirs: ["stores"],
  },
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  plugins: ["@/plugins/fontawesome.ts"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  ssr: false,
  app: {
    pageTransition: { name: "layout", mode: "out-in" },
    head: {
      title: "Nuxt 3 basic",
      meta: [{ name: "description", content: "Nuxt 3 for beginners" }],
      link: [
        { rel: "icon", href: "/icon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@200&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital@1&display=swap",
        },
      ],
    },
  },
});
