import Article from '@/Article'

export default [
    {
        path: '/a/:lang/:version/:id',
        name: 'Article',
        component: Article,
    }
]