import Http from '@/plugins/Http'
import Store from '@/imports/vuex'

class Service {
    constructor () {
        this.name = this.constructor.name
    }

    list () {
        const url = `${this.name}/list`

        Store.commit('toogleLoading', url)

        return Http.get(url)
            .then(resp => {
                Store.commit('toogleLoading', url)

                return resp.data
            })
            .catch(e => {
                Store.commit('toogleLoading', url)

                return Promise.reject(e)
            })
    }

    get (_id) {
        const url = `${this.name}/read/${_id}`

        Store.commit('toogleLoading', url)

        return Http.get(url)
            .then(resp => {
                Store.commit('toogleLoading', url)

                return resp.data
            })
            .catch(e => {
                Store.commit('toogleLoading', url)

                return Promise.reject(e)
            })
    }

    other (_name) {
        const url = `${this.name}/${_name}`

        Store.commit('toogleLoading', url)

        return Http.get(url)
            .then(resp => {
                Store.commit('toogleLoading', url)

                return resp.data
            })
            .catch(e => {
                Store.commit('toogleLoading', url)

                return Promise.reject(e)
            })
    }
}

export default Service