<template lang="pug">
  el-steps#ArticlePaginate(align-center)
    el-step(:title="article.preview.label")
      template(slot="icon")
        span.preview(@click="preview")
          i.fas.fa-circle
    el-step(:title="article.label")
      template(slot="icon")
          i.fas.fa-circle
    el-step(:title="article.next.label")
      template(slot="icon")
        span.next(@click="next")
          i.fas.fa-circle
</template>

<script>
  import ArticleMixin from '@/mixins/Article'
  
  export default {
    name: 'ArticlePaginate',
    mixins: [ ArticleMixin, ],
    props: {
      article: Object,
    },
    methods: {
      paginate (_article) {
        if (!_article.id) return

        this.toArticle(_article.id)
      },
      preview () {
        this.paginate(this.article.preview)
      },
      next () {
        this.paginate(this.article.next)
      }
    },
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/colors";

  #ArticlePaginate {
    background-color: $contentPaginateBackgroundColor;
    border: 2px groove $contentPaginateBorderColor;
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
          background-color: $contentPaginateLineColor;
          top: 17px
        }

        .el-step__icon {
          $size: 36px;

          background: $contentPaginateCircleBackgroundColor;
          width: $size;
          height: $size;
          border-radius: 100%;
          border: 2px solid $contentPaginateCircleBorderColor;

          span {
            i,
            svg {
              color: $contentPaginateCircleIconColor;
            }
          }
        }
      }

      .el-step__main {
        .el-step__title {
          color: $contentPaginateTitleColor;
        }
      }
    }
  }
</style>