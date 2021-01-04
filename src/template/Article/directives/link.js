export default {
  link: {
    update: function (_el, _binding, _vnode) {
      _el.querySelectorAll('a').forEach(a => {
        const href = a.href.replace('http://', '').replace('https://', '')

        if (href.indexOf(document.location.host) === -1) {
          a.target = '_blank'
        }
        else {
          a.addEventListener('click', async e => {
            e.preventDefault()

            this.toArticle(href.split('#')[1], _vnode.context.$router)
          })
        }
      })
    }
  },
}