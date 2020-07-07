<template>
  <v-card
    outlined
  >
    <v-list
      avatar
    >
      <v-list-item
        inactive
      >
        <v-list-item-avatar
          size="62"
        >
            <v-img 
              v-if="representLang"
            :src="require(`../assets/${representLang}.png`)" :alt="representLang"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{name}}
          </v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-1">
            {{email}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <router-link to="/edit-profile">Edit Profile</router-link>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: undefined,
      email : undefined,
      representLang : null
    }
  },
  created () {
    axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/user/me`)
    .then(({data}) => {
      console.log(data)
      this.name = data.username;
      this.email = data.email;
      this.representLang = data.representLang;
    })
    .catch((err) => console.log(err))
  },
  methods: {

  },
}
</script>

<style>

</style>