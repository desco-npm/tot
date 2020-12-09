const fs = require('fs-extra')

const Version = require('./Version')

class Article extends global.GenericEntity {
    async list () {
        return []
    }

    async read (_id, { headers, }) {
        const mountAddrs = (_version, _lang) => {
            const addrsBase = global.pathJoin(global.rootDir, 'src', 'articles', _version)
            const addrsArticle = global.pathJoin(addrsBase, _id.split('.').join(global.pathSep))
            const addrs = global.pathJoin(addrsArticle, _lang + '.md')

            return { base: addrsBase, full: addrs, }
        }

        const getTitle = (_topics, _id) => {
            const ids = _id.split('.')
            const id = ids.shift()

            const topic = _topics.filter(topic => {
                return topic.id.split('.').reverse()[0] === id
            })[0]

            if (ids.length > 0) {
                return getTitle(topic.children, ids.join('.'))
            }
            else {
                return topic.label[headers.lang]
            }
        }

        let addrs = mountAddrs(headers.version, headers.lang)

        if (!fs.existsSync(addrs.full)) {
            addrs = mountAddrs(headers.version, process.env.VUE_APP_DEFAULT_LANGUAGE)
        }

        if (!fs.existsSync(addrs.full)) {
            const prevVersion = await  Version.getPrev(headers.version)
            
            if (prevVersion) {
                return this.read(_id, { headers: { ...headers, version: prevVersion.number, }, })
            }
            else {
                return Promise.reject({ error: 'Article not found', errorCode: 404, })
            }
        }

        const topics = require(global.pathJoin(addrs.base, 'topics.json'))

        return {
            id: _id,
            label: getTitle(topics, _id),
            content: await global.markdownToHtml({ path: addrs.full, }),
        }
    }
}

module.exports = new Article()