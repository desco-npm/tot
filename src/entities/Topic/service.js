import Service from '@/plugins/Service'

class Topic extends Service {
    async listTree () {
        return this.other('tree')
    }
}

export default new Topic()