<template>
  <v-app-bar
    id="appbar__root"
    color="blue-grey darken-2"
    height="90px"
  >
    <!-- <v-btn icon color="white" x-large>
      <v-icon>
        fas fa-bars
      </v-icon>
    </v-btn> -->

    <v-toolbar-title class="white--text text-h4 py-2">
      <router-link to="/">
        <span class="white--text text-h4 font-weight-medium">SAT</span>
      </router-link>
      <span class="hidden-sm-and-down">
        <span class="mx-5">|</span>
        <span>
          Algorithm Challenges
        </span>
      </span>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <v-btn text class="white--text mx-2 text-md-h5 text-sm-h6 text-h6" large>
      FAQ
    </v-btn>

    <v-btn 
      rounded color="orange" class="white--text text-md-h5 text-sm-h6 text-h6" large
      to="login"
    >
      <v-icon class="mr-2">
        fas fa-sign-in-alt
      </v-icon>
      <span>
        Login
      </span>
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {

}
</script>

<style scoped>
#appbar__root {
  padding: 0 80px 0 80px;
}

@media screen and (max-width: 960px) {
  #appbar__root {
    padding : 0 30px 0 30px;
  }
}

a {
  text-decoration : none;
}
</style>