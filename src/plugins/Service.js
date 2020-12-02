import Http from '@/plugins/Http'

class Service {
    constructor () {
        this.name = this.constructor.name
    }

    list () {
        return Http.get(`${this.name}`).then(resp => {
            return resp.data
        })
    }

    get (_id) {
        return Http.get(`${this.name}/${_id}`).then(resp => {
            return resp.data
        })
    }
}

export default Service