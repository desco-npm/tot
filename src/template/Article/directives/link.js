export default {
  link: {
    update: function (_el) {
      _el.querySelectorAll('a').forEach(a => {
        const href = a.href.replace('http://', '').replace('https://', '')

        if (href.indexOf(document.location.host) === -1) {
          a.target = '_blank'
        }
        else {
          a.addEventListener('click', async e => {
            e.preventDefault()
          })
        }
      })
    }
  },
}