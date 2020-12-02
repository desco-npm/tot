import Http from '@/plugins/Http'

export default async (_id, $router) => {
  $router.push({
    name: 'Article',
    params: {
      version: Http.defaults.headers.common['version'],
      id: _id,
      lang: Http.defaults.headers.common['lang'],
    },
  })
}