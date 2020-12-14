<template lang="pug">
  div.side
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
    div#Topics(v-bar="scrollConfig" ref="TopicsArea")
      el-tree(
        ref="Topics"
        :data="topics"
        accordion
        node-key="id"
        :default-expanded-keys="defaultExpandedTreeKeys"
        :filter-node-method="filterTopics"
        @node-click="onTopicClick"
        @node-expand="toogleNodeTree"
        @node-collapse="toogleNodeTree"
      )
        span(slot-scope="{ data, }")
          i(v-if="data.icon" :class="data.icon")
          | {{data.label[language.initials]}}
</template>

<script>
  import clone from 'clone'

  import Http from '@/plugins/Http'

  import VersionService from '@/entities/Version/service'
  import LanguageService from '@/entities/Language/service'
  import TopicService from '@/entities/Topic/service'

  import toArticle from '../../toArticle'

  export default {
    name: 'App',
    components: {},
    props: {
      scrollConfig: Object,
    },
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
        defaultExpandedTreeKeys: [],
      }
    },
    methods: {
      resetTree () {
        this.topics = clone(this.topics)
      },
      filterTopics(_value, _data) {
        if (!_value) {

          this.resetTree()

          return true
        }

        return (
          _data.label[this.language.initials].toLowerCase().indexOf(_value.toLowerCase()) !== -1
        )
      },
      async onTopicClick (_topic) {
        if (_topic.article === false) return

        toArticle(_topic.id, this.$router)
      },
      toogleNodeTree () {
        window.setTimeout(() => {
          this.$vuebar.refreshScrollbar(this.$refs.TopicsArea)
        }, 500)
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
      },
      expandTreeNode (_id, _reset) {
        if (_reset) {
          this.resetTree()

          this.defaultExpandedTreeKeys = []
        }

        this.defaultExpandedTreeKeys.push(_id)
      },
    },
    async mounted () {
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
      },
      configured () {
        if (this.configured === true) {
          this.$emit('configured')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/collors";
  @import "~@/assets/scss/scroll";
  @import "~@/assets/scss/fonts/index";

  .side {
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

    #Topics {
      flex: 1;
      padding-bottom: 1rem;

      .el-tree {
        background-color: transparent;

        .el-tree-node {
          .el-tree-node__content {
            &,
            .el-tree-node__label,
            .el-tree-node__expand-icon {
              color: $sideTreeItemTextColor;

              i,
              svg {
                margin-right: .25rem;
              }
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
              background-color: transparent;
            }
          }
        }

        .el-tree__empty-block .el-tree__empty-text{
          color: $sideTreeNoItemsTextCollor;
        }
      }

    }
  }
</style>
