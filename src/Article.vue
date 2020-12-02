<template lang="pug">
  div
    h1 {{article.label}}
    span(v-html="article.content" v-link)
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
          .then(resp => this.article = resp)
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
          })
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

                document.getElementById('Content').scrollTop = 0

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

<style lang="scss">
  @import "~@/assets/scss/collors";
  @import "~@/assets/scss/fonts/index";

  body {
    overflow: hidden;
    
    #app {
      font-family: "Roboto Slab";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      #Template {
        &,
        #Side,
        #Content {
          height: 100%;
        }

        #Content,
        #Side {
          overflow-y: auto;
          }

        #Side {
          background-color: $sideBackgroundCollor;
          display: flex;
          flex-direction: column;

          .side-top {
            display: flex;
            flex-direction: column;
            text-align: center;
            background-color: $sideTopBackgroundCollor;
            padding: .5rem 0;
            color: $sideTextCollor;

            #FrontConfig {
              display: flex;
              justify-content: space-around;

              #Version,
              #Language {
                background: $sideTopFrontConfigComboBackgroundCollor;
                align-self: center;
                color: $sideTopFrontConfigComboTextCollor;
                border: $sideTopFrontConfigComboBorderCollor;

                svg {
                  margin-right: .25rem;
                }
              }
            }

            #Avatar {
              img {
                width: 150px;
                max-width: 100%;
                border-radius: 100%;
                margin: .5rem 0;
                border: 2px solid $sideTopAvatarBorderCollor;
              }
            }

            label {
              font-weight: bold;
            }
          }
        }

        #TopicSearch {
          input {
            border: 0;
            border-radius: 0;
            background-color: $sideSearchTopicsBackgroundCollor;
          }

          input,
          i {
            color: $sideSearchTopicsTextCollor;
          }
        }

        .el-tree#Topics {
          background-color: transparent;

          .el-tree-node {
            .el-tree-node__content {
              &,
              .el-tree-node__label,
              .el-tree-node__expand-icon {
                color: $sideTreeItemTextColor;
              }

              &:hover {
                background-color: $sideTreeItemHoverBackgroundColor;

                &,
                .el-tree-node__label,
                .el-tree-node__expand-icon {
                  color: $sideTreeItemHoverTextColor;
                }
              }
            }

            &:focus {
              .el-tree-node__content:not(:hover) {
                background-color: transparent !important;
              }
            }
          }

          .el-tree__empty-block .el-tree__empty-text{
            color: $sideTreeNoItemsTextCollor;
          }
        }

        #Content {
          background-color: $contentBackgroundCollor;
          padding: 1rem;
          $color: $contentTextCollor;

          p,
          h1, h2, h3, h4, h5, h6,
          blockquote,
          ul {
            margin-bottom: 1rem;
            line-height: 1.5rem;
          }

          $titleBase: 2.25rem;

          h1 {
            border-bottom: 2px solid $contentTitleUnderlineColor;
            font-size: $titleBase - (.25 * 0);
            margin-bottom: 2rem;
          }
          
          h2,
          h3,
          h4,
          h5,
          h6,
          h7 {
            margin-top: 2rem;
          }

          h2 {
            font-size: $titleBase - (.25 * 1);
          }

          h3 {
            font-size: $titleBase - (.25 * 3);
          }

          h4 {
            font-size: $titleBase - (.25 * 4);
          }

          h5 {
            font-size: $titleBase - (.25 * 5);
          }

          h6 {
            font-size: $titleBase - (.25 * 6);
          }

          a {
            color: $contenLinkTextCollor;
            text-decoration: none;
          }

          pre,
          code {
            font-family: "Roboto Mono";
          }

          pre,
          table,
          ul {
            margin: 2rem 0;
          }

          pre {
            background-color: $contentPreBackgroundCollor;
            color: $contentPreTextCollor;
            overflow: hidden;
            padding: .5rem;

            code {
              background-color: transparent;
              color: unset;
              padding: unset;
              line-height: 1.25rem;
            }
          }

          code {
            background-color: $contentCodeBsckgroundColor;
            color: $contentCodeTextColor;
            padding: 0 .25rem;
          }

          blockquote {
            border-left: .2rem solid $contentBlockquoteBorderColor;
            padding: .5rem;
            font-style: italic;
            font-weight: bold;
            margin: 2rem 1rem 2rem 0;
            background-color: $contentBlockquoteBackgroundColor;
            color: $contentBlockquoteTextColor;

            p {
              margin: 0;
            }
          }

          table {
            th,
            td {
              padding: .5rem;
            }

            th {
              font-weight: bold;
              background-color: $contentTableHeaderBackgoundCollor;
              color: $contentTableHeaderTextCollor;
            }

            tr:nth-child(odd) {
              background-color: $contentTableRowOddBackgoundCollor;
              color: $contentTableRowOddTextCollor;
            }

            tr:nth-child(even) {
              background-color: $contentTableRowEvenBackgoundCollor;
              color: $contentTableRowEvenTextCollor;
            }
          }

          ul {
            list-style: disc;

            li {
              margin: .75rem 1rem;
            }
          }

          em {
            font-style: italic;
          }
        }
      }
    }
  }
</style>
