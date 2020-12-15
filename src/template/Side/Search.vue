<template lang="pug">
  span#TopicSearch
    el-autocomplete(
      prefix-icon="el-icon-search"
      v-model="search"
      :placeholder="searchTopicsPlaceholder"
      :fetch-suggestions="querySearch"
      @select="onSelect"
    )
</template>

<script>
  import ConfigMixin from '@/mixins/Config'
  import ArticleMixin from '@/mixins/Article'
  import ArticleService from '@/entities/Article/service'

  export default {
    name: 'Search',
    mixins: [ ConfigMixin, ArticleMixin, ],
    computed: {
      searchTopicsPlaceholder () {
        return JSON.parse(process.env.VUE_APP_TOPIC_SEARCH_PLACEHOLDER)[this.laguageInitials()]
      },
    },
    data () {
      return {
        search: '',
      }
    },
    methods: {
      async querySearch (_query, cb) {
        const result = await ArticleService.search(_query)

        cb(result.map(i => ({ ...i, value: i.label, })));
      },
      onSelect (_article) {
        this.toArticle(_article.id)
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/colors";

  #TopicSearch {
    .el-autocomplete {
      width: 100%;

      .el-input {
        input {
          border: 0;
          border-radius: 0;
          background-color: $sideSearchTopicsBackgroundColor;
        }

        input,
        i {
          color: $sideSearchTopicsTextColor;
        }
      }
    }
  }

</style>
