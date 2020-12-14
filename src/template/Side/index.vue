<template lang="pug">
  div.side
    div.side-top
      FrontConfig(@configured="fetch" @change="fetch")
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
          | {{data.label[laguageInitials()]}}
</template>

<script>
  import clone from 'clone'
  import toArticle from '../../toArticle'
  import ConfigMixin from '@/mixins/Config'
  import TopicService from '@/entities/Topic/service'
  import FrontConfig from './Config'

  export default {
    name: 'Side',
    mixins: [ ConfigMixin, ],
    components: { FrontConfig, },
    props: {
      scrollConfig: Object,
    },
    computed: {
      searchTopicsPlaceholder () {
        return JSON.parse(process.env.VUE_APP_TOPIC_SEARCH_PLACEHOLDER)[this.laguageInitials()]
      },
    },
    data () {
      return {
        configured: false,
        search: '',
        title: process.env.VUE_APP_TITULO,
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
          _data.label[this.laguageInitials()].toLowerCase().indexOf(_value.toLowerCase()) !== -1
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
      async listTopics () {
        return this.topics = await TopicService.listTree()
      },
      expandTreeNode (_id, _reset) {
        if (_reset) {
          this.resetTree()

          this.defaultExpandedTreeKeys = []
        }

        this.defaultExpandedTreeKeys.push(_id)
      },
      async fetch (_config) {
        await toArticle(this.$route.params.id, this.$router)

        this.topics = await this.listTopics(_config)

        if (!this.$route.params.id) {
          this.onTopicClick(this.topics[0])
        }

        this.$emit('configured')
      }
    },
    watch: {
      search () {
        this.$refs.Topics.filter(this.search)
      },
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
