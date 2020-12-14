<template lang="pug">
  div.side
    div.side-top
      FrontConfig(@configured="fetch" @change="fetch")
      Logo
      Search(@change="setFilter")
    Topics(ref="Topics" :scroll-config="scrollConfig" :configured="configured" :filter="filter")
</template>

<script>
  import toArticle from '../../toArticle'
  import ConfigMixin from '@/mixins/Config'
  import FrontConfig from './Config'
  import Logo from './Logo'
  import Search from './Search'
  import Topics from './Topics'

  export default {
    name: 'Side',
    mixins: [ ConfigMixin, ],
    components: { FrontConfig, Logo, Search, Topics, },
    props: {
      scrollConfig: Object,
    },
    data () {
      return {
        configured: false,
        filter: '',
      }
    },
    methods: {
      async fetch (_config) {
        await toArticle(this.$route.params.id, this.$router)

        _config

        if (!this.$route.params.id) {
          this.onTopicClick(this.topics[0])
        }

        this.configured = true

        this.$emit('configured')
      },
      setFilter (_query) {
        this.filter = _query
      },
    },
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
    }
  }
</style>
