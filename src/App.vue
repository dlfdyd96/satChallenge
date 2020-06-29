<template>
  <v-app>
    <div>
      <app-bar></app-bar>
    </div>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar'

export default {
  name: 'App',

  components: {
    'app-bar' : Appbar,
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
</style>