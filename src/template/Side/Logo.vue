<template lang="pug">
  div#Logo
    span#Avatar
      img(src="@/assets/images/logo.png")
    label {{title}}
</template>

<script>
  export default {
    name: 'Logo',
    data () {
      return {
        title: process.env.VUE_APP_TITULO,
      }
    },
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/colors";

  #Logo {
    display: flex;
    flex-direction: column;

    #Avatar {
      img {
        width: 150px;
        max-width: 100%;
        border-radius: 100%;
        margin: .5rem 0;
        border: 2px solid $sideTopAvatarBorderColor;
      }
    }

    label {
      font-weight: bold;
    }
  }
</style>
