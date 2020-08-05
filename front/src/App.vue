<template>
  <v-app>
    <app-bar></app-bar>

    <v-content class="root">
      <router-view></router-view>
    </v-content>
    <my-footer/>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    'app-bar' : Appbar,
    'my-footer' : Footer,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
a {
  text-decoration : none;
}
.root {
  background-color: rgb(240, 240, 240);
}
</style>