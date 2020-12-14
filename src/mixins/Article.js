import Http from '@/plugins/Http'

export default {
  methods: {
    async toArticle (_id, $router) {
      const router = $router || this.$router

      window.setTimeout(() => {
        (document.querySelectorAll('#Content .vb-content')[0] || {}).scrollTop = 0
      })
      
      const params = {
        name: 'Article',
        params: {
          version: Http.defaults.headers.common['version'],
          id: _id,
          lang: Http.defaults.headers.common['lang'],
        },
      }

      router.push(params)
    }
  }
}