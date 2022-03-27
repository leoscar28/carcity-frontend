export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'sp-frontend',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Низкие цены. Гарантия качества. Отличный сервис.  Более 50 миллионов позиций - запчасти, масла, автохимия, электроника, аксессуары' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:description', content: 'Низкие цены. Гарантия качества. Отличный сервис.  Более 50 миллионов позиций - запчасти, масла, автохимия, электроника, аксессуары' },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://carcity.kz' },
      { property: 'og:site_name', content: 'CarCity.kz' },
      { property: 'og:image:type', content: 'jpg' },
      { property: 'og:image', content: '/site-preview.jpg' }
    ],
    link: [
      { rel: 'image_src', href: '/site-preview.jpg' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~assets/global.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/repository.js', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400, 500],
        ital: [100]
      },
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-vuex-localstorage','@nuxtjs/toast','@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  env: {
    baseUrl: 'http://127.0.0.1:8000'
  },
  axios: {
    baseURL: 'http://127.0.0.1:8000',
  },
  router: {

  },
}
