class Version extends global.GenericEntity {
    async list () {
        return this.listEnvArray('VERSIONS')
    }

    async read () {
        return []
    }

    async getPrev (_version) {
        return this.getSequence(_version, -1)
    }

    async getNext (_version) {
        return this.getSequence(_version, 1)
    }

    async getSequence (_version, _sequence) {
        const versions = await this.list()
        const posVersion = versions.map(i => i.number).indexOf(_version)

        if (posVersion === 0) {
            return false
        }
        else {
            return versions[posVersion + _sequence]
        }
    }
}

module.exports = new Version()