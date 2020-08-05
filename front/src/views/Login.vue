<template>
  <div class="login__root d-flex align-center justify-center">
    <div class="login__container my-5 pa-5 rounded-lg">
      <v-form>
        <v-container>
          <v-row>
            <v-col>
              <div>
                Email Address
              </div>
            </v-col>
          </v-row>
        </v-container>


        
        <v-text-field 
          outlined class="mt-3" 
          v-model="email" 
          :rules="[ rules.required, rules.email ]"
          background-color="white"></v-text-field>
        <div>
          Password
        </div>
        <v-text-field 
          outlined class="mt-3" 
          v-model="password" 
          type="password"
          :rules="[rules.required]"
          background-color="white"></v-text-field>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn 
                width="100%" 
                color="orange" 
                class="white--text"
                @click="onSubmit(email, password)"
              >Log in</v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn width="100%" to="/join">Join</v-btn>
            </v-col>
          </v-row>
          <v-divider class="my-5"></v-divider>
          <v-row>
            <v-col cols="12">
              <v-btn width="100%" color="light-green" class="white--text" disabled>
                <span class="green font-weight-bold mr-5 pa-1">
                  N
                </span>
                Naver Login
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn width="100%" color="yellow" class="brown--text text--darken-1" disabled>
                <span class="brown darken-1 white--text font-weight-bold mr-5 pa-1">
                  K
                </span>
                KAKAO Login
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return{
      email: '',
      password : '',
      rules : {
        required: value => !!value || 'Required.',
        email : value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || "Invalid e-mail."
        }
      }
    }
  },
  methods: {
    onSubmit(email, password) {
      this.$store.dispatch('LOGIN', {email, password})
        .then(() => this.redirect())
        // .catch((err) => console.dir(err))
        .catch((err) => {
          // console.dir(err)
          window.alert(`${err.response.data.message}`)
        })
    },
    redirect() {
      this.$router.push({name: 'Home'})
    }
  },
}
</script>

<style scoped>
.login__root {
  height: 100%;
  width: 100%;
}
.login__container {
  width: 90%;
  max-width: 700px;
  background-color: rgb(245, 245, 245);
}
</style>