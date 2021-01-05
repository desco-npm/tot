<template lang="pug">
  div#Topics(v-bar="scrollConfig" ref="TopicsArea")
    el-tree(
      ref="Topics"
      :data="topics"
      accordion
      node-key="id"
      :default-expanded-keys="defaultExpandedTreeKeys"
      @node-click="onTopicClick"
      @node-expand="toogleNodeTree"
      @node-collapse="toogleNodeTree"
    )
      span(slot-scope="{ data, }" tabindex="-1" @keyup="contentKeyUp")
        i(v-if="data.icon" :class="data.icon")
        | {{data.label[laguageInitials()] || data.label[defaultLaguageInitials()]}}
</template>

<script>
  import clone from 'clone'
  import ArticleMixin from '@/mixins/Article'
  import TopicService from '@/entities/Topic/service'
  import ConfigMixin from '@/mixins/Config'

  export default {
    name: 'Topics',
    mixins: [ ConfigMixin, ArticleMixin, ],
    props: {
      scrollConfig: Object,
      configured: Boolean,
    },
    data () {
      return {
        topics: [],
        defaultExpandedTreeKeys: this.routedArticleId() ? [ this.routedArticleId() ] : [],
      }
    },
    methods: {
      contentKeyUp (e) {
        e.preventDefault()
      },
      resetTree () {
        this.topics = clone(this.topics)
      },
      async onTopicClick (_topic) {
        if (_topic.article === false) return

        this.toArticle(_topic.id)
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
      async fetch () {
        this.topics = await this.listTopics()
      },
    },
    watch: {
      configured () {
        if (!this.configured) return

        this.fetch()
      },
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/colors";

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
        color: $sideTreeNoItemsTextColor;
      }
    }

  }
</style>
