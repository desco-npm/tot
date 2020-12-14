import Http from '@/plugins/Http'

export default {
  methods: {
    laguageInitials () {
      return Http.defaults.headers.common['lang']
    },
    versionNumber () {
      return Http.defaults.headers.common['version']
    },
    defaultLaguageInitials () {
      return process.env.VUE_APP_DEFAULT_LANGUAGE
    },
  }
}