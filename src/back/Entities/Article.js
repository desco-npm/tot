const fs = require('fs-extra')

const Version = require('./Version')
const Topic = require('./Topic')

class Article extends global.GenericEntity {
  constructor () {
    super()

    global.Express.get('/' + this.name + '/search', async (req, res) => {
      res.json(await this.search(req))
    })
  }

  async list () {
    return []
  }

  getArticle (_topics, _id) {
    const ids = _id.split('.')
    const id = ids.shift()

    const topic = _topics.filter(topic => {
      return topic.id.split('.').reverse()[0] === id
    })[0]

    if (ids.length > 0) {
      return this.getArticle(topic.children, ids.join('.'))
    }
    else {
      return topic
    }
  }

  async read (_id, { headers, }) {
    const mountAddrs = (_version, _lang) => {
      const addrsBase = global.pathJoin(global.rootDir, 'src', 'articles', _version)
      const addrsArticle = global.pathJoin(addrsBase, _id.split('.').join(global.pathSep))
      const addrs = global.pathJoin(addrsArticle, _lang + '.md')

      return { base: addrsBase, id: addrsArticle, full: addrs, }
    }

    const formatContent = (_content, _addrs) => {
      const getExampleCodes = _content => {
        const tags = []
        let content = _content

        for (; ;) {
          const openPos = content.indexOf('{<')
          const closePos = content.indexOf('>}') + 2

          if (openPos === -1 || closePos === -1) break

          const tag = content.slice(openPos, closePos)

          content = content.replace(tag, '')

          tags.push(tag)
        }

        return tags
      }

      let content = _content
        .split('{&lt;').join('{<')
        .split('&gt;}').join('>}')

      const exampleCodes = getExampleCodes(content)
      
      exampleCodes.map(i => {
        const defs = JSON.stringify(
          require(global.pathJoin(_addrs, i.slice(2, -2) + '.js'))
          )
          .split('"').join("&quot;")
          .split('$').join('&dollar;')

          content = content.replace(i, `<ExampleCode :code="${defs}" />`)
      })

      return content
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

    const content = formatContent(
      await global.markdownToHtml({ path: addrs.full, }),
      addrs.id
    )

    const article = await this.getArticle(topics, _id)
    const breadcrumb = (await Topic.breadcrumb({ headers, }, _id)).reverse()
    const preview = await Topic.preview({ headers, }, _id)
    const next = await Topic.next({ headers, }, _id)

    const toReturn = {
      breadcrumb,
      ...article,
      label: article.label[headers.lang],
      icon: article.icon || 'el-icon-news',
      preview: preview
        ?
          {
            ...preview,
            label: preview.label[headers.lang],
            icon: preview.icon || 'el-icon-arrow-left'
          }
        :
        {
          icon: 'fas fa-flag'
        },
      next: next
          ?
            {
              ...next,
              label: next.label[headers.lang],
              icon: next.icon || 'el-icon-arrow-right'
            }
          :
          {
            icon: 'fas fa-times'
          },
      content,
    }

    return toReturn
  }

  async search ({ headers, query }) {
    const dir = global.pathJoin(global.rootDir, 'src', 'articles',  headers.version)
    const lang = headers.lang + '.md'
    const topics = require(global.pathJoin(dir, 'topics.json'))

    const result = await global.findInFiles(query.query, dir, lang)
    const formatedResult = []
    
    global.objectMap(result, (i, k) => {
      const id = k.split(dir)[1].split(lang)[0].slice(1, -1).split(global.pathSep).join('.')
      const article = this.getArticle(topics, id)

      formatedResult.push({ id, label: article.label[headers.lang], })
    })

    return formatedResult
  }
}

module.exports = new Article()