const fs = require('fs-extra')
const clone = require('clone')

const Version = require('./Version')

class Topic extends global.GenericEntity {
    constructor () {
        super()

        global.Express.get('/' + this.name + '/tree', async (req, res) => {
            res.json(await this.list(req, true))
        })

        global.Express.get('/' + this.name + '/first', async (req, res) => {
            res.json((await this.list(req, true))[0])
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

    async listObject ({ headers, }, _tree = false, _list) {
        const list = _list || (await this.list({ headers, }, _tree))

        const mount = _list => {
            let obj = {}

            _list.map(i => {
                obj[i.id] = clone(i)
    
                if (i.children) {
                    delete obj[i.id].children
                    
                    obj = { ...obj, ...mount(i.children)}
                }
            })

            return obj
        }

        
        return mount(list)
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

    preview ({ headers, }, _id) {
        return this.sequence({ headers, }, _id, -1)
    }

    next ({ headers, }, _id) {
        return this.sequence({ headers, }, _id, 1)
    }

    async sequence ({ headers, }, _id, _sequence) {
        const topics = await this.listObject({ headers, }, true)
        const idTopics = Object.keys(topics)
        const currentTopicPos = idTopics.indexOf(_id)
        
        if (currentTopicPos === -1) return false

        let topic = false

        for (let sequence = _sequence, tpc ; !topic ; sequence += _sequence) {
            const idSequenceTopic = idTopics[currentTopicPos + sequence]
            
            tpc = topics[idSequenceTopic]

            if (!tpc) {
                break
            }
            else if (tpc && tpc.article !== false) {
                topic = tpc

                break
            }
        }

        return topic
    }

    async read () {
        return []
    }
}

module.exports = new Topic()