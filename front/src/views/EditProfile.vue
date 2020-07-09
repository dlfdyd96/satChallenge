<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <div class="my-2 text-h5 font-weight-bold blue-grey--text text--darken-2">
            Account Information
          </div>
        </v-col>
      </v-row>
      <v-row class="white rounded-lg"
        align="center"
      >
        <v-col
          cols="12"
          sm="6"
          v-for="(item, key) in accountInformation"
          :key="key"
        >
          <div class="text-h6 font-weight-bold blue-grey--text text--darken-2">{{item.title}}</div>
          <div>
            <v-text-field
              solo
              flat
              outlined
              :value="user"
              v-model="item.value"
            ></v-text-field>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <div class="d-flex justify-center">
            <v-btn v-text="'Change Password'" @click="onClickChangePW"></v-btn>
            <!-- Change Password Dialog -->
            <change-password :dialog.sync="changePWDialog"/>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="text-h6 font-weight-bold blue-grey--text text--darken-2">Language</div>
        </v-col>
        <v-col cols="12">
          <language :initSelected="representLang"  @select="onSelect"/>
        </v-col>
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="6">
              <div class="d-flex justify-center ">
                <v-btn width="100%" color="orange" class="white--text" @click.prevent="onEditProfile">Edit Profile</v-btn>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="d-flex justify-center">
                <v-btn width="100%" @click.prevent="onReset">reset</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      
      <v-row>
        <v-col>
          <div class="my-2 text-h5 font-weight-bold blue-grey--text text--darken-2">
            Joined Challenges
          </div>
        </v-col>
      </v-row>
      <v-row class="white rounded-lg"
        align="center"
      >
        <v-col>gd</v-col>
      </v-row>


    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Language from '../components/Language'
import ChangePassword from '../components/ChangePasswordDialog'

export default {
  data() {
    return {
      accountInformation: {
        username : {
          title : "Username",
          value : ""
        },
        email : {
          title : "Email",
          value : ""
        },
        baekjoon : {
          title : "Baekjoon Id",
          value : ""
        },
      },
      user : {},
      representLang : '',
      changePWDialog : false,
    }
  },
  created () {
    axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/user/me`)
    .then(({data : {userInfo}}) => {
      console.log(userInfo)
      this.user = userInfo;
      this.accountInformation.username.value = this.user.username
      this.accountInformation.email.value = this.user.email
      this.accountInformation.baekjoon.value = this.user.baekjoon
      this.representLang = this.user.representLang
    })
    .catch((err) => console.log(err))
  },
  components: {
    'language' : Language,
    'change-password' : ChangePassword,
  },
  methods: {
    onSelect(data) {
      this.representLang = data;
      console.log(`this is parent : ${typeof data}`);
    },
    onReset() {
      this.accountInformation.username.value = this.user.username
      this.accountInformation.email.value = this.user.email
      this.accountInformation.baekjoon.value = this.user.baekjoon
      this.representLang = this.user.representLang
    },
    async onEditProfile() {
      const user = {
        username : this.accountInformation.username.value,
        email : this.accountInformation.email.value,
        baekjoon : this.accountInformation.baekjoon.value,
        representLang : this.representLang,
      }
      await axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/user/edit-profile`, user)
      .then(res => {
        console.log(res)
        
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
    },
    onClickChangePW() {
      this.changePWDialog = true;
    },
    onCloseDialog() {
      this.changePWDialog = false;
    }
  },
}
</script>

<style scoped>
.home {
  margin : auto;
  max-width: 1200px;
}
</style>