<template lang="pug">
  el-breadcrumb#ArticleBreadcrumb(separator-class="el-icon-arrow-right")
    el-breadcrumb-item(
      v-for="article in article.breadcrumb" :key="article.id"
      :class="article.article !== false ? 'click' : ''"
      @click.native="click(article)"
    )
      | {{article.label}}
    el-breadcrumb-item(:key="article.id")
      | {{article.label}}
</template>

<script>
  import ArticleMixin from '@/mixins/Article'

  export default {
    name: 'ArticleBreadcrumb',
    mixins: [ ArticleMixin, ],
    props: {
      article: Object,
    },
    methods: {
      click (_article) {
        if (_article.article === false) return

        this.toArticle(_article.id)
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/collors";

  #ArticleBreadcrumb {
    background-color: $contentBreadcrumbBackbgroudCollor;
    border: 1px solid $contentBreadcrumbBorderCollor;
    padding: .75rem;

    .el-breadcrumb__item {
      span {
        color: $contentBreadcrumbItemTextCollor;
      }

      &.click {
        span {
          cursor: pointer;
        }
      }

      &:last-child {
        span {
          color: $contentBreadcrumbItemLastTextCollor;
        }
      }
    }
  }

</style>