<template lang="pug">
  el-input(
    prefix-icon="el-icon-search"
    v-model="search"
    :placeholder="searchTopicsPlaceholder"
  )
</template>

<script>
  import ConfigMixin from '@/mixins/Config'

  export default {
    name: 'Search',
    mixins: [ ConfigMixin, ],
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
    watch: {
      search () {
        this.$emit('change', this.search)
      },
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/collors";

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
</style>
