import Service from '@/plugins/Service'

class Topic extends Service {
    async listTree () {
        return this.other('tree')
    }

    async first () {
        return this.other('first')
    }
}

export default new Topic()