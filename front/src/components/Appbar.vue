<template>
  <nav>
    <v-app-bar
      id="appbar__root"
      color="blue-grey darken-2"
      height="90px"
    >
      <v-app-bar-nav-icon 
        class="d-md-none"
        @click.stop="drawer = !drawer"
      >
        <v-icon color="white">
          fas fa-bars
        </v-icon>
      </v-app-bar-nav-icon>


      <v-toolbar-title class="white--text text-h4 py-2">
        <router-link to="/">
          <span class="white--text text-h4 font-weight-medium">SAT</span>
        </router-link>
        <span class="d-none d-sm-inline">
          <span class="mx-5">|</span>
          <span>
            Algorithm Challenges
          </span>
        </span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down">
        <v-btn text class="white--text mx-2 text-md-h5 text-sm-h6 text-h6" large to="/faq">
          FAQ
        </v-btn>
        <!-- Login -->
        <v-btn 
          rounded color="orange" class="white--text text-md-h5 text-sm-h6 text-h6" large
          to="/login"
          v-if="!isAuthenticated"
        >
          <v-icon class="mr-2">
            fas fa-sign-in-alt
          </v-icon>
          <span>
            Login
          </span>
        </v-btn>
        <!-- Logout -->
        <v-btn
          v-else
          rounded color="orange" class="white--text text-md-h5 text-sm-h6 text-h6" large
          @click.prevent="onClickLogout"
        >
          <v-icon class="mr-2">
            fas fa-sign-out-alt
          </v-icon>
          <span>
            LOGOUT
          </span>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Drawer -->
    <v-navigation-drawer
      app
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="mt-3">
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in drawerItems"
            :key="index"
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      drawerItems : [
        {
          icon : 'fas fa-home',
          title : 'HOME',
          route : '/',
        },
        {
          icon : 'fas fa-sign-in-alt',
          title : 'LOGIN',
          route : '/login',
        },
        {
          icon : 'fas fa-info-circle',
          title : 'ABOUT',
          route : '/about',
        },
        {
          icon : 'fas fa-question-circle',
          title : 'FAQ',
          route : '/faq',
        },  
      ],
    }
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['LOGOUT']),
    onClickLogout() {
      this.LOGOUT();
      this.$router.push('/login')
    }
  },
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