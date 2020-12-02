class Language extends global.GenericEntity {
    async list () {
        return this.listEnvArray('LANGUAGES')
    }

    async read () {
        return []
    }
}

module.exports = new Language()