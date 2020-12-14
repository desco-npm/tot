import Http from '@/plugins/Http'

export default {
  methods: {
    laguageInitials () {
      return Http.defaults.headers.common['lang']
    },
    versionNumber () {
      return Http.defaults.headers.common['version']
    },
  }
}