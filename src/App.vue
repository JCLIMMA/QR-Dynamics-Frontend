<template>
  <div>
    <NavBar/>
    <div class="container mx-auto">
      <router-view/>
    </div>
    <Notification/>
  </div>
</template>

<script>
import NavBar from './components/Nav/NavBar'
import Notification from './components/Notification'

export default {
  components: { NavBar, Notification }
}
</script>

<style lang="sass">
    svg
        fill: currentColor
</style>

<style src="./sass/app.sass" lang="sass"></style>
