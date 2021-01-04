<template lang="pug">
  div#app(v-loading="$store.state.loadingStatus")
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
        router-view(ref="Content")
</template>

<script>
  import Side from './Side'

  export default {
    name: 'Template',
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
          // Left
          case 37: this.$refs.Content.$refs.Paginate.preview()
            break
          // Right
          case 39: this.$refs.Content.$refs.Paginate.next()
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
  @import "~@/assets/scss/colors";
  @import "~@/assets/scss/fonts";

  body {
    &,
    #Side .side,
    #Content {
      overflow: hidden;
    }
    
    #app {
      font-family: $FONT_DEFAULT;
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
          background-color: $sideBackgroundColor;

          &,
          .side {
            display: flex;
            flex-direction: column;
          }
        }

        #Content {
          background-color: $contentBackgroundColor;
          $color: $contentTextColor;
          padding: 0rem 2rem 1rem 1rem;
        }
      }
    }
  }

  .vb-content {
    overflow: hidden !important;
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: $hoverScrollBackgroundColor;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    background-color: $normalScrollBackgroundColor
    
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler { 
    background-color: $selectedScrollBackgroundColor;
  }
</style>
