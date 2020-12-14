import Http from '@/plugins/Http'

export default async (_id, $router) => {
  window.setTimeout(() => {
    document.querySelectorAll('#Content .vb-content')[0].scrollTop = 0
  })
  
  const params = {
    name: 'Article',
    params: {
      version: Http.defaults.headers.common['version'],
      id: _id,
      lang: Http.defaults.headers.common['lang'],
    },
  }

  console.log(params)

  $router.push(params)
}