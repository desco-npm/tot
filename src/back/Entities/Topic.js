const fs = require('fs-extra')
const Version = require('./Version')

class Topic extends global.GenericEntity {
    constructor () {
        super()

        global.Express.get('/' + this.name + '/tree', async (req, res) => {
            res.json(await this.list(req, true))
        })
    }
    async list ({ headers, }, _tree = false) {
        const addrs = (
            global.pathJoin(global.rootDir, 'src',  'articles', headers.version, 'topics.json')
        )

        if (!fs.existsSync(addrs)) {
            const prevVersion = await Version.getPrev(headers.version)

            return this.list({ headers: { ...headers, version: prevVersion.number, }, })
        }

        const json = this.readJson(addrs)

        return _tree ? this.filterTree(json) : json
    }

    filterTree (_tree) {
        return _tree
            .filter(i => i.tree !== false)
            .map(i => {
                if (!i.children) return i

                i.children = this.filterTree(i.children)

                return i
            })
    }

    async read () {
        return []
    }
}

module.exports = new Topic()