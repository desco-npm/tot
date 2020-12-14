<template lang="pug">
  el-steps#ArticlePaginate(align-center)
    el-step(:title="article.preview.label")
      template(slot="icon")
        span.preview(@click="paginate(article.preview)")
          i(:class="article.preview.icon")
    el-step(:title="article.label")
      template(slot="icon")
          i(:class="article.icon")
    el-step(:title="article.next.label")
      template(slot="icon")
        span.next(@click="paginate(article.next)")
          i(:class="article.next.icon")
</template>

<script>
  import toArticle from '@/toArticle'
  
  export default {
    name: 'ArticlePaginate',
    props: {
      article: Object,
    },
    methods: {
      paginate (_article) {
        if (!_article.id) return

        toArticle(_article.id, this.$router)

        this.$vuebar.refreshScrollbar(this.$parent.$el)
      }
    },
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/collors";

  #ArticlePaginate {
    background-color: $contentPaginateBackgroundCollor;
    border: 2px groove $contentPaginateBorderCollor;
    padding: .5rem;

    .el-step {
      .preview,
      .next {
        i,
        svg {
          &:not(.fa-flag):not(.fa-times) {
            cursor: pointer;
          }
        }
      }

      .el-step__head {
        .el-step__line {
          background-color: $contentPaginateLineCollor;
          top: 17px
        }

        .el-step__icon {
          $size: 36px;

          background: $contentPaginateCircleBackgroundCollor;
          width: $size;
          height: $size;
          border-radius: 100%;
          border: 2px solid $contentPaginateCircleBorderCollor;

          span {
            i,
            svg {
              color: $contentPaginateCircleIconCollor;
            }
          }
        }
      }

      .el-step__main {
        .el-step__title {
          color: $contentPaginateTitleCollor;
        }
      }
    }
  }
</style>