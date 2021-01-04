<template lang="pug">
  div#Article
    ArticleBreadcrumb(:article="article")
    span(v-html="article.content" v-link v-example-code)
    ArticlePaginate(ref="Paginate" :article="article")
</template>

<script>
  import ArticleService from '@/entities/Article/service'
  import ArticlePaginate from './Paginate'
  import ArticleBreadcrumb from './Breadcrumb'
  import ArticleMixin from '@/mixins/Article'

  import linkDirective from './directives/link'
  import exampleCodeDirective from './directives/exampleCode'
  
  export default {
    name: 'Article',
    mixins: [ ArticleMixin, ],
    components: { ArticlePaginate, ArticleBreadcrumb, },
    data () {
      return {
        article: {
          preview: {},
          next: {},
        },
      }
    },
    async mounted () {
      this.fetch()
    },
    methods: {
      async fetch () {
        ArticleService.get(this.routedArticleId())
          .then(resp => {
            this.article = resp
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
          })
      },
    },
    directives: {
      ...linkDirective,
      ...exampleCodeDirective,

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
  @import "~@/assets/scss/colors";
  @import "~@/assets/scss/fonts";

  #Article {
    $defaultSpace: 1rem;

    padding-top: $defaultSpace;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    #ArticleBreadcrumb,
    p,
    ul,
    blockquote,
    table {
      margin-bottom: $defaultSpace;
    }

    .desco-vue-component-dom {
      width: 100%;
    }

    pre,
    code {
      font-family: "Roboto Mono";
    }

    p,
    ul li,
    table tr {
      line-height: $defaultSpace * 1.5;
    }

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 1rem;
      font-weight: bold;
    }

    ul {
      list-style: disc;
      margin-left: $defaultSpace * 1.25;
    }

    a {
      color: unset;
    }

    blockquote {
      border-left: 7px solid $contentBlockquoteBorderColor;
      padding: $defaultSpace * .5;
      background: $contentBlockquoteBackgroundColor;
      color: $contentBlockquoteTextColor;
      font-style: italic;

      p {
        margin: 0;
      }

      code {
        background: transparent;
      }

      a code {
        color: inherit;
      }
    }

    code {
      background: $contentCodeBackgroundColor;
      color: $contentCodeTextColor;
      padding: 0 .25rem;
      border: 1px solid $contentCodeBorderColor;
      border-radius: 5px;
    }

    .example-code {
      .el-tabs--border-card {
        &,
        .el-tabs__header {
          border-color: $contentExampleBorderColor;
        }

        & >.el-tabs__header .el-tabs__item {
          &.is-active {
            border-left-color: $contentExampleBorderColor;
            border-right-color: $contentExampleBorderColor;

            &:not(:last-child) {
              border-right-width: 2px;
            }
          }
        }

        .el-tabs__nav-wrap {
          background-color: $contentExampleTabAreaBackgroundColor;

          .el-tabs__item {
            background-color: $contentExampleTabBackgroundColor;
            color: $contentExampleTabTextColor;

            &.is-active {
              text-decoration: underline;
              color: $contentExampleActiveTabTextColor;
              background: $contentExampleActiveTabBackgroundColor;
            }
          }
        }
      }

      .el-tabs__content {
        background-color: $contentExampleBackgroundColor;
        color: $contentExampleTextColor;
      }
    }

    table {
      th,
      td {
        padding: .5rem;
      }

      th {
        font-weight: bold;
        background-color: $contentTableHeaderBackgroundColor;
        color: $contentTableHeaderTextColor;
      }

      tr:nth-child(odd) {
        background-color: $contentTableOddLineBackgroundColor;
        color: $contentTableOddLineTextColor;
      }

      tr:nth-child(even) {
        background-color: $contentTableEvenLineBackgroundColor;
        color: $contentTableEvenLineTextColor;
      }
    }

    tr {
      code {
        background: inherit;
        border: none;
        padding: 0;
        color: inherit;
      }
    }
  }


  // #Article {
  //   .vb-content {
  //     table,
  //     pre,
  //     blockquote,
  //     #ArticlePaginate {
  //       margin-right: 1.5rem;
  //     }
  //   }

  //   .desco-vue-component-dom {
  //     width: 100%;
  //   }

  //   p,
  //   h1, h2, h3, h4, h5, h6,
  //   blockquote,
  //   ul {
  //     margin-bottom: 1rem;
  //     line-height: 1.5rem;
  //   }

  //   #ArticleBreadcrumb {
  //     margin: 1rem 0;
  //   }

  //   ul ul {
  //     margin: 0;
  //   }

  //   $titleBase: 2.25rem;

  //   h1 {
  //     border-bottom: 2px solid $contentTitleUnderlineColor;
  //     font-size: $titleBase - (.25 * 0);
  //     margin-bottom: 2rem;
  //   }

  //   h2,
  //   h3,
  //   h4,
  //   h5,
  //   h6,
  //   h7 {
  //     margin-top: 2rem;
  //   }

  //   h2 {
  //     font-size: $titleBase - (.25 * 1);
  //   }

  //   h3 {
  //     font-size: $titleBase - (.25 * 3);
  //   }

  //   h4 {
  //     font-size: $titleBase - (.25 * 4);
  //     font-weight: bold;
  //   }

  //   h5 {
  //     font-size: $titleBase - (.25 * 5);
  //   }

  //   h6 {
  //     font-size: $titleBase - (.25 * 6);
  //   }

  //   a {
  //     color: $contenLinkTextColor;
  //     text-decoration: none;
  //   }

  //   pre,
  //   code,
  //   .desco-vue-component-dom {
  //     font-family: $FONT_CODE;
  //   }

  //   pre,
  //   table,
  //   ul {
  //     margin: 2rem 0;
  //   }

  //   pre {
  //     background-color: $contentPreBackgroundColor;
  //     color: $contentPreTextColor;
  //     overflow: hidden;
  //     padding: .5rem;
  //     overflow-x: auto;

  //     code {
  //       background-color: transparent;
  //       color: unset;
  //       padding: unset;
  //       line-height: 1.25rem;
  //     }
  //   }

  //   code {
  //     background-color: $contentCodeBackgroundColor;
  //     color: $contentCodeTextColor;
  //     padding: 0 .25rem;
  //   }

  //   blockquote {
  //     border-left: .2rem solid $contentBlockquoteBorderColor;
  //     padding: .5rem;
  //     font-style: italic;
  //     font-weight: bold;
  //     margin: 2rem unset 2rem 0;
  //     background-color: $contentBlockquoteBackgroundColor;
  //     color: $contentBlockquoteTextColor;

  //     p {
  //       margin: 0;
  //     }
  //   }

  //   table {
  //     th,
  //     td {
  //       padding: .5rem;
  //     }

  //     th {
  //       font-weight: bold;
  //       background-color: $contentTableHeaderBackgoundColor;
  //       color: $contentTableHeaderTextColor;
  //     }

  //     tr:nth-child(odd) {
  //       background-color: $contentTableRowOddBackgoundColor;
  //       color: $contentTableRowOddTextColor;
  //     }

  //     tr:nth-child(even) {
  //       background-color: $contentTableRowEvenBackgoundColor;
  //       color: $contentTableRowEvenTextColor;
  //     }
  //   }

  //   ul {
  //     list-style: disc;

  //     li {
  //       margin: .75rem 1rem;
  //     }
  //   }

  //   em {
  //     font-style: italic;
  //   }
  // }
</style>