global.GenericEntity = class GenericEntity {
    constructor () {
        this.name = this.constructor.name

        this.defaultRouter()
    }

    defaultRouter () {
        global.Express.get('/' + this.name, async (req, res) => {
            res.json(await this.list(req))
        })

        global.Express.get('/' + this.name + '/:id', async (req, res) => {
            this.read(req.params.id, req)
                .then(resp => {
                    return res.json(resp)
                })
                .catch(e => {
                    res.status(e.errorCode || 500)

                    res.json(e)
                })
        })
    }

    listEnvArray (_name) {
        return eval(process.env[_name])
    }

    readJson (_addrs) {
        return global.loadJson(_addrs)
    }
}

require('./Version')
require('./Article')
require('./Language')
require('./Topic')