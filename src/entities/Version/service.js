import Service from '@/plugins/Service'

class Version extends Service {
    async last () {
        return (await this.list()).reverse()[0]
    }
}

export default new Version()