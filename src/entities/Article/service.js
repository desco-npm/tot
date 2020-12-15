import Service from '@/plugins/Service'

class Article extends Service {
    search (_query) {
        return this.other('search', { params: { query: _query, }, }, { noLoader: true, })
    }
}

export default new Article()