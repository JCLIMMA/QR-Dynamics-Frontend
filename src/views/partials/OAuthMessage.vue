<template>
  <div :class="styling">
    <p class="leading-normal mb-4">
      Due to technical limitations of dynamic QR codes, you'll need an account to create one. For your convenience, QR Dyanmics supports OAuth so here's a couple of buttons:
    </p>
    <a
      :href="`${backendUrl}/login/google`"
      class="button raised my-2 flex w-64 text-center google"
      @click="$store.commit('loading', true)">
      <Icon
        class="mr-4"
        name="google"
        size="16"/>
      Google
    </a>
     <a
      :href="`${backendUrl}/login/facebook`"
      class="button raised my-2 flex w-64 text-center facebook"
      @click="$store.commit('loading', true)">
      <Icon
        class="mr-4"
        name="facebook"
        size="16"/>
      Facebook
    </a>
    <a
      :href="`${backendUrl}/login/github`"
      class="button raised my-2 flex w-64 text-center github"
      @click="$store.commit('loading', true)">
      <Icon
        class="mr-4"
        name="github"
        size="16"/>
      Github
    </a>
    <loader :condition="$store.getters['loading']"/>
  </div>
</template>

<style lang="sass" scoped >
  .button.google
    background: #ea4335
    &:hover
      background: #BC352B
  .button.facebook
    background: #4267b2
    &:hover
      background: #34538E
  .button.github
    background: #24292e
    &:hover
      background: #505358
</style>

<script>
export default {
  data () {
    return {
      styling: ''
    }
  },
  mounted () {
    this.decideHowToRender()
    window.addEventListener('resize', this.decideHowToRender)
  },
  methods: {
    decideHowToRender () {
      if (window.innerWidth < 992) {
        // We're on a mobile device and the UI is stacked
        this.styling = 'small-modal'
        return
      }
      this.styling = 'regular'
    }
  }
}
</script>
