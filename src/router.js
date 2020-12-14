import Article from '@/template/Article'

export default [
    {
        path: '/a/:lang/:version/:id',
        name: 'Article',
        component: Article,
    }
]