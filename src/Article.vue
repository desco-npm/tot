<template lang="pug">
  div
    h1 {{article.label}}
    span(v-html="article.content" v-link)
    el-steps#ArticlePaginate(align-center)
      el-step.preview(
        v-if="article.preview"
        :title="article.preview.label"
        icon="el-icon-arrow-left"
        @click.native="paginate(article.preview)"
      )
      el-step(:title="article.label" icon="el-icon-news")
      el-step.next(
        v-if="article.next"
        :title="article.next.label"
        icon="el-icon-arrow-right"
        @click.native="paginate(article.next)"
      )
</template>

<script>
  import ArticleService from '@/entities/Article/service'

  import toArticle from './toArticle'
  
  export default {
    name: 'Article',
    data () {
      return {
        article: {},
      }
    },
    async mounted () {
      this.fetch()
    },
    methods: {
      async fetch () {
        ArticleService.get(this.$route.params.id)
          .then(resp => {
            this.article = resp

            this.$emit('load', this.article)
          })
          .catch(e => {
            let label
            let content

            if (e.response.data.errorCode === 404) {
              label = JSON.parse(process.env.VUE_APP_ARTICLE_NOT_FOUND_TITLE)
              content = JSON.parse(process.env.VUE_APP_ARTICLE_NOT_FOUND_CONTENT)
            }
            else {
              label = JSON.parse(process.env.VUE_APP_ARTICLE_ERROR_TITLE)
              content = JSON.parse(process.env.VUE_APP_ARTICLE_ERROR_CONTENT)
            }

            this.article = {
              label: label[process.env.VUE_APP_DEFAULT_LANGUAGE],
              content: content[process.env.VUE_APP_DEFAULT_LANGUAGE],
            }

            this.$emit('load', this.article)
          })
      },
      paginate (_article) {
        toArticle(_article.id, this.$router)

        this.$vuebar.refreshScrollbar(this.$parent.$el)
      }
    },
    directives: {
      link: {
        update: function (_el, _binding, _vnode) {
          _el.querySelectorAll('a').forEach(a => {
            const href = a.href.replace('http://', '').replace('https://', '')

            if (href.indexOf(document.location.host) === -1) {
              a.target = '_blank'
            }
            else {
              a.addEventListener('click', async e => {
                e.preventDefault()

                toArticle(href.split('#')[1], _vnode.context.$router)
              })
            }
          })
        }
      }
    },
    watch: {
      '$route.params': {
        deep: true,
        handler () {
          this.fetch()
        }
      }
    }
  }
</script>