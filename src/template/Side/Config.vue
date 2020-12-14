<template lang="pug">
  div#FrontConfig
    el-dropdown(trigger="click" placement="bottom" @command="changeVersion")
      el-button#Version(round icon="fas fa-code-branch" size="mini")
        span(v-if="version.number") v{{version.number}}
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(
          v-for="(version, k) in versions" :key="k"
          :command="version"
        )
          |v{{version.number}}
    el-dropdown(trigger="click" placement="bottom" @command="changeLanguage")
      el-button#Language(round icon="fas fa-globe-americas" size="mini") {{language.name}}
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(
          v-for="(language, k) in languages" :key="k"
          :command="language"
        )
          |{{language.name}}
</template>

<script>
  import Http from '@/plugins/Http'

  import VersionService from '@/entities/Version/service'
  import LanguageService from '@/entities/Language/service'

  export default {
    name: 'Config',
    computed: {
      config () {
        return { version: this.version.number, language: this.language.initials, }
      },
    },
    data () {
      return {
        versions: [],
        version: {},
        languages: [],
        language: {},
      }
    },
    methods: {
      changeVersion (_version) {
        this.version = _version
      },
      changeLanguage (_lang) {
        this.language = _lang
      },
    },
    async mounted () {
      this.versions = await VersionService.list()
      this.languages = await LanguageService.list()

      this.version = this.$route.params.version
        ? { number: this.$route.params.version, }
        : this.versions.reverse()[0]

      this.language = this.languages.filter(i => {
        return i.initials === (this.$route.params.lang || process.env.VUE_APP_DEFAULT_LANGUAGE)
      })[0]

      this.$emit('configured', this.config)
    },
    watch: {
      version: {
        deep: true,
        async handler () {
          Http.defaults.headers.common['version'] = this.version.number
          
          this.$emit('change', this.config)
        }
      },
      language: {
        deep: true,
        async handler () {
          Http.defaults.headers.common['lang'] = this.language.initials

          this.$emit('change', this.config)
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/collors";

  #FrontConfig {
    display: flex;
    justify-content: space-around;

    #Version,
    #Language {
      background: $sideTopFrontConfigComboBackgroundCollor;
      align-self: center;
      color: $sideTopFrontConfigComboTextCollor;
      border: $sideTopFrontConfigComboBorderCollor;

      svg {
        margin-right: .25rem;
      }
    }
  }
</style>
