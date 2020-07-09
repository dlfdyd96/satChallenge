<template>
  <div class="d-flex align-center justify-center">
    <div class="login__container my-5 pa-5 rounded-lg">
      <div class="d-flex justify-center text-h3 mb-15 mt-7">
        JOIN
      </div>
      <v-form
        ref="form"
        v-model="valid"
      >
        <div>
          * Email Address
        </div>
        <v-text-field 
          outlined class="mt-3" 
          v-model="email" 
          :rules="[ rules.required, rules.email ]"
          background-color="white"></v-text-field>
        <div>
          * Password
        </div>
        <v-text-field 
          outlined class="mt-3" 
          v-model="password"
          :rules="[ rules.required ]"
          type="password"
          background-color="white"></v-text-field>
        <div>
          * Password Validation
        </div>
        <v-text-field 
          outlined class="mt-3" 
          v-model="password2" 
          :rules="[ rules.required ]"
          type="password"
          background-color="white"></v-text-field>
        <div>
          * Name
        </div>
        <v-text-field 
          outlined class="mt-3" 
          v-model="name" 
          :rules="[ rules.required ]"
          background-color="white"></v-text-field>
        <div>
          백준 id <a href="http://acmicpc.net">사이트</a>
        </div>
        <v-text-field 
          outlined class="mt-3" 
          v-model="baekjoon" 
          
          background-color="white"></v-text-field>
        <div>
          Language (주로 쓰는 언어)
        </div>


        <v-item-group
          v-model="selected"
        >
          <v-container>
            <v-row
              justify="space-between"
            >
              <v-col
                v-for="(item, index) in icons"
                :key=index
                class="d-flex justify-center"
              >
                <v-item v-slot:default="{active, toggle}">
                  <v-btn
                    class="pa-0"
                    fab
                    depressed
                    x-large
                    :color="active ? 'orange' : ''"
                    @click="toggle"
                  >
                    <v-avatar >
                      <v-img :src="require(`../assets/${item.name}.png`)" :alt="item.name"></v-img>
                    </v-avatar>
                  </v-btn>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>



        <div 
          class="d-flex justify-center mt-10"
        >
          <v-btn
            width="200px"
            color="orange"
            class="white--text"
            @click="handleSubmit"
          >
            Submit
          </v-btn>
        </div>

      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dotenv from 'dotenv'

export default {
  methods: {
    handleSubmit() {
      // this.selected.sort(); // 정렬해주고

      // let selectedLanguage = [];

      // this.selected.forEach(element => {
      //   let elementName = this.icons[parseInt(element)].name;
      //   selectedLanguage.push(elementName);
      // });
      
      // console.log(selectedLanguage);
      // console.log(this.icons[this.selected].name)

      // console.log(process.env.VUE_APP_SERVER_DOMAIN);
      this.$refs.form.validate()
      
      if(!this.valid) {
        return;
      }
      const user = {
        email : this.email,
        password : this.password,
        password2 : this.password2,
        username : this.name,
        baekjoon : this.baekjoon,
        representLang : this.icons[this.selected].name
      }

      axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/join`, user)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  data() {
    return{
      icons : [
        {
          name : 'cpp',
          icon : '../assets/cpp.png'
        },
        {
          name : 'c',
          icon : '../assets/c.png'
        },
        {
          name : 'python',
          icon : '../assets/python.png'
        },
        {
          name : 'java',
          icon : '../assets/java.png'
        },
        {
          name : 'js',
          icon : '../assets/js.png'
        },
        // {
        //   name : 'etc',
        //   icon : '../assets/etc'
        // }
      ],
      valid:true,
      email: '',
      selected: '',
      password : '',
      password2 : '',
      name : '',
      baekjoon : '',
      rules : {
        required: value => !!value || 'Required.',
        email : value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || "Invalid e-mail."
        }
      }
    }
  },
  created () {
    dotenv.config();
  },

}
</script>

<style scoped>
.login__container {
  width: 90%;
  max-width: 700px;
  background-color: rgb(245, 245, 245);
}
i {
  font-style: normal;
}
</style>