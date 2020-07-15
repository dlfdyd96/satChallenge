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
              v-if="userInfo"
            :src="require(`../assets/${userInfo.representLang}.png`)" :alt="userInfo.representLang"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{userInfo ? userInfo.username : ''}}
          </v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-1">
            {{userInfo ? userInfo.email : ''}}
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
export default {
  props: {
    userInfo: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style>

</style>