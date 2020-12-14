<template lang="pug">
  div#app
    el-row#Template
      el-col#Side(:span="parseInt(sizeSide)")
        Side(:scroll-config="scrollConfig" @configured="configured = true")
      el-col#Content(
        tabindex="-1"
        :span="parseInt(24 - sizeSide)"
        v-if="configured"
        v-bar="scrollConfig"
        @keyup.native="contentKeyUp"
      )
        router-view
</template>

<script>
  import Side from './Side'

  export default {
    name: 'App',
    components: { Side, },
    data () {
      return {
        sizeSide: process.env.VUE_APP_SIZE_SIDE || 4,
        scrollConfig: { scrollThrottle: 30, },
        configured: false,
      }
    },
    methods: {
      contentKeyUp (e) {
        const Scroll = document.querySelectorAll('#Content .vb-content')[0]

        const arrowDistance = 25
        const pageDistance = window.innerHeight * 0.75

        switch (e.keyCode) {
          // PageUp
          case 33: Scroll.scrollTop -= pageDistance
            break
          // PageDown
          case 34: Scroll.scrollTop += pageDistance
            break
          // END
          case 35: Scroll.scrollTop = Scroll.scrollHeight
            break
          // HOME
          case 36: Scroll.scrollTop = 0
            break
          // Down
          case 40: Scroll.scrollTop += arrowDistance
            break
          // Up
          case 38: Scroll.scrollTop -= arrowDistance
            break
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/collors";

  body {
    &,
    #Side,
    #Content {
      overflow: hidden;
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

        #Side {
          background-color: $sideBackgroundCollor;
          display: flex;
          flex-direction: column;
        }

        #Content {
          background-color: $contentBackgroundCollor;
          $color: $contentTextCollor;
          padding: 1rem;
          padding-right: 2rem;

          .vb-content {
            padding-top: 1rem;

            table,
            pre,
            blockquote,
            #ArticlePaginate {
              margin-right: 1.5rem;
            }
          }

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
            overflow-x: auto;

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
            margin: 2rem unset 2rem 0;
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
        }
      }
    }
  }

  .vb-content {
    overflow: hidden !important;
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: $hoverScrollBackgroundCollor;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    background-color: $normalScrollBackgroundCollor
    
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler { 
    background-color: $selectedScrollBackgroundCollor;
  }
</style>
