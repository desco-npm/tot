<template lang="pug">
  div#app
    el-row#Template
      el-col#Side(:span="parseInt(sizeSide)")
        div.side-top
          div#FrontConfig
            el-dropdown(trigger="click" placement="bottom" @command="changeVersion")
              el-button#Version(round icon="fas fa-code-branch" size="mini")
                span(v-if="version.number") v{{version.number}}
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(
                  v-for="(version, k) in versions" :key="k"
                  :command="version"
                )
                  |v{{version.number}}
            el-dropdown(trigger="click" placement="bottom" @command="changeLanguage")
              el-button#Language(round icon="fas fa-globe-americas" size="mini") {{language.name}}
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(
                  v-for="(language, k) in languages" :key="k"
                  :command="language"
                )
                  |{{language.name}}
          span#Avatar
            img(src="@/assets/images/logo.png")
          label {{title}}
        span#TopicSearch
          el-input(
            prefix-icon="el-icon-search"
            v-model="search"
            :placeholder="searchTopicsPlaceholder"
          )
        el-tree#Topics(
          ref="Topics"
          :data="topics"
          accordion
          node-key="id"
          :default-expanded-keys="defaultExpandedTreeKeys"
          :filter-node-method="filterTopics"
          @node-click="onTopicClick"
          v-scrollbar="scrollConfig"
        )
          span(slot-scope="{ data, }")
            | {{data.label[language.initials]}}
      el-col#Content(v-if="configured" :span="parseInt(24 - sizeSide)" v-scrollbar="scrollConfig")
        router-view(@load="loadArticle")
</template>

<script>
  import Http from '@/plugins/Http'

  import VersionService from '@/entities/Version/service'
  import LanguageService from '@/entities/Language/service'
  import TopicService from '@/entities/Topic/service'

  import toArticle from './toArticle'

  export default {
    name: 'App',
    components: {},
    computed: {
      searchTopicsPlaceholder () {
        return JSON.parse(process.env.VUE_APP_TOPIC_SEARCH_PLACEHOLDER)[this.language.initials]
      }
    },
    data () {
      return {
        configured: false,
        search: '',
        title: process.env.VUE_APP_TITULO,
        versions: [],
        version: {},
        languages: [],
        language: {},
        topics: [],
        article: { content: '', },
        sizeSide: process.env.VUE_APP_SIZE_SIDE || 4,
        scrollConfig: { x: false, },
        defaultExpandedTreeKeys: [],
      }
    },
    methods: {
      loadArticle (_article) {
        this.defaultExpandedTreeKeys = [ _article.id, ]
      },
      filterTopics(_value, _data) {
        if (!_value) return true

        return (
          _data.label[this.language.initials].toLowerCase().indexOf(_value.toLowerCase()) !== -1
        )
      },
      async onTopicClick (_topic) {
        if (_topic.article === false) return

        toArticle(_topic.id, this.$router)
      },
      changeVersion (_version) {
        this.version = _version
      },
      changeLanguage (_lang) {
        this.language = _lang
      },
      async listTopics () {
        if (!this.version.number || !this.language.initials) return 

        return this.topics = await TopicService.listTree()
      }
    },
    async mounted () {
      document.title = process.env.VUE_APP_TITULO

      this.versions = await VersionService.list()
      this.version = this.$route.params.version
        ? { number: this.$route.params.version, }
        : this.versions.reverse()[0]

      this.languages = await LanguageService.list()

      this.language = this.languages.filter(i => {
        return i.initials === (this.$route.params.lang || process.env.VUE_APP_DEFAULT_LANGUAGE)
      })[0]

      this.configured = true

      this.topics = await this.listTopics()
      
      if (!this.$route.params.id) {
        this.onTopicClick(this.topics[0])
      }
    },
    watch: {
      version: {
        deep: true,
        async handler () {
          Http.defaults.headers.common['version'] = this.version.number

          if (!this.configured) return

          await this.listTopics()

          toArticle(this.$route.params.id, this.$router)
        }
      },
      language: {
        deep: true,
        async handler () {
          Http.defaults.headers.common['lang'] = this.language.initials

          if (!this.configured) return

          await this.listTopics()

          toArticle(this.$route.params.id, this.$router)
        }
      },
      search () {
        this.$refs.Topics.filter(this.search)
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/collors";
  @import "~@/assets/scss/fonts/index";

  body {
    &,
    #Content,
    #Side {
      overflow: hidden !important;
    }
    
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

          .sliderY {
            background-color: $scrollBackgroundCollor;

            .skidwayY {
              background-color: $scrollSliderBackgroundCollor;
            }
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
          flex: 1 !important;

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

          ul ul {
            margin: 0;
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
            font-weight: bold;
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
