const fs = require('fs-extra')
const Version = require('./Version')

class Topic extends global.GenericEntity {
    async list ({ headers, }) {
        const addrs = (
            global.pathJoin(global.rootDir, 'src',  'articles', headers.version, 'topics.json')
        )

        if (!fs.existsSync(addrs)) {
            const prevVersion = await Version.getPrev(headers.version)
    
            return this.list({ headers: { ...headers, version: prevVersion.number, }, })
        }

        return this.readJson(addrs)
    }

    async read () {
        return []
    }
}

module.exports = new Topic()