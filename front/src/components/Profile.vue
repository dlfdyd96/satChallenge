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
          color="black"
          size="62"
        >
          <v-icon color="yellow" x-large>
            fab fa-js
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{name}}
          </v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-1">
            @{{email}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <router-link to="#">Edit Profile</router-link>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: 'Hwang Il Yong',
      email : '1yongs_@naver.com'
    }
  },
}
</script>

<style>

</style>