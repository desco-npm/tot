import Http from '@/plugins/Http'
import Store from '@/imports/vuex'

class Service {
    constructor () {
        this.name = this.constructor.name
    }

    list (_options = {}) {
        const url = `${this.name}/list`

        if (!_options.noLoader) {
            Store.commit('toogleLoading', url)
        }

        return Http.get(url)
            .then(resp => {
                if (!_options.noLoader) {
                    Store.commit('toogleLoading', url)
                }

                return resp.data
            })
            .catch(e => {
                if (!_options.noLoader) {
                    Store.commit('toogleLoading', url)
                }

                return Promise.reject(e)
            })
    }

    get (_id, _options = {}) {
        const url = `${this.name}/read/${_id}`

        if (!_options.noLoader) {
            Store.commit('toogleLoading', url)
        }

        return Http.get(url)
            .then(resp => {
                if (!_options.noLoader) {
                    Store.commit('toogleLoading', url)
                }

                return resp.data
            })
            .catch(e => {
                if (!_options.noLoader) {
                    Store.commit('toogleLoading', url)
                }

                return Promise.reject(e)
            })
    }

    other (_name, _params = {}, _options = {}) {
        const url = `${this.name}/${_name}`

        if (!_options.noLoader) {
            Store.commit('toogleLoading', url)
        }

        return Http.get(url, _params)
            .then(resp => {
                if (!_options.noLoader) {
                    Store.commit('toogleLoading', url)
                }

                return resp.data
            })
            .catch(e => {
                if (!_options.noLoader) {
                    Store.commit('toogleLoading', url)
                }

                return Promise.reject(e)
            })
    }
}

export default Service