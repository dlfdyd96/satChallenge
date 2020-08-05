<template>
  <v-footer padless>
    <v-container>
      <v-row>
        <v-col cols="2">
          <strong class="grey--text text--darken-1">NAVGATION</strong>
        </v-col>
        <v-col>
          <a class="mx-2 black--text" href="/">Home</a>|
          <a class="mx-2 black--text" href="/about">About</a>|
          <a class="mx-2 black--text" href="/faq">FAQ</a>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <strong class="grey--text text--darken-1">LEGAL</strong>    
        </v-col>
        <v-col>
          <span class="mx-2">이용약관</span>|
          <span class="mx-2">개인정보취급방침</span>|
          <span class="mx-2">이메일무단수집거부</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <strong class="grey--text text--darken-1">CONTACT</strong>
        </v-col>
        <v-col cols="1" class="text-center"><a href="mailto:1yongs_@naver.com?subject=Feedback&body=Message">
          <v-icon size="20">fas fa-paper-plane</v-icon></a></v-col>
        <v-col cols="1" class="text-center"><a href="https://www.instagram.com/1.yong_/" target="_blank">
          <v-icon size="20">fab fa-instagram</v-icon></a></v-col>
        <v-col cols="1" class="text-center"><a href="https://github.com/dlfdyd96" target="_blank">
          <v-icon size="20">fab fa-github</v-icon></a></v-col>
      </v-row>

      <v-row class="my-5">
        <v-divider></v-divider>
      </v-row>

      <v-row>
        <v-col cols="12" class="pb-1 text-center">
          <strong>SAT Algorithm Challenge</strong>&nbsp;by il yong.
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="py-1 text-center">
          <strong>&copy; 2020 - {{ new Date().getFullYear()}} SAT.</strong> All rights reserved.
        </v-col>  
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style>

</style>