<template>
  <div class="home">
    <!-- 맨 윗  부분 (설명) -->
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h5 font-weight-bold blue-grey--text text--darken-2">
            🧙‍♂️ Profile
          </div>
        </v-col>
      </v-row>
      <v-row align="stretch">
        <v-col cols="12" md="8">
          <profile :userInfo="userInfo ? userInfo: null"/>
        </v-col>
        
        <v-col  v-if="languageComplete" cols="4">
            <language/>
        </v-col>
      </v-row>
    </v-container>
    <!-- Challenge 부분 -->
    <v-container>
      <v-row>
        <v-col cols="8">
          <div class="text-h5 font-weight-bold blue-grey--text text--darken-2">
            🏋️‍♂️ Challenges
          </div>
        </v-col>
        
        <!-- create challenge 버튼 -->
        <v-col v-if="isAdmin" cols="4">
          <div class="d-flex justify-end">
            <v-btn 
              rounded color="light-green lighten-2" class="white--text text-md-h5 text-sm-h6 text-h6"
              to="/create-challenge"
            >
              <v-icon class="mr-2" small>
                fas fa-plus
              </v-icon>
              <span>
                create
              </span>
            </v-btn>
          </div>
          
        </v-col>
      </v-row>
      <v-row>
        <!-- 
        <v-col cols="12" sm="6" md="4">
          <challenge 
            :startTime='new Date("2020-10-18T00:00:00")'
            :title='"2020 여름방학 스터디"'
            :weeks='4'
            :problems='38'
            :users='5'
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <challenge 
            :startTime="new Date('2021-02-04T00:00:00')"
            :title="`2021 '신재영'씨 생일`"
            :weeks='4'
            :problems='23'
            :users='1'
          />
        </v-col> -->
        <v-col cols="12" sm="6" md="4"
          v-for="(item, index) in challenges"
          :key="index"
        >
          <challenge 
            :startTime="new Date(item.startedAt)"
            :title="item.title"
            :weeks='item.weeks'
            :problems='item.problems'
            :users='item.challengers.length'
            :id='item._id'
            :_isJoin="isJoinedChallenge(item._id)"
            :isAdmin="isAdmin"
            @onRemoveDialog="onRemoveDialog"
            @endTime="endTime"
            @onJoin="onJoin"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '../components/Profile';
import Language from '../components/Language';
import Challenge from '../components/ChallengeItem';
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    'profile' : Profile,
    'language' : Language,
    'challenge' : Challenge,
  },
  data() {
    return {
      languageComplete: false,
      challenges : [],
      userInfo : null,
      isAdmin : false,
    }
  },
  created () {
    
    axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/user/me`)
    .then(({data : {userInfo}}) => {
      console.log(userInfo)
      this.userInfo = userInfo
      this.isAdmin = userInfo.admin
      /*
        this.name = userInfo.username;
        this.email = userInfo.email;
        this.representLang = userInfo.representLang;
      */

    })
    .catch((err) => console.log(err))

    
    axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/challenge`)
    .then(({data : {challenges}}) => {
      // console.log('all challenge', challenges)
      this.challenges = [...challenges]
    })
    .catch((err) => {
      console.dir(err)
      let msg = err.response.data.err.errors
      if(msg)
        window.alert(msg)
    })
  },
  computed: {
    getChallengers(item) {
      return item.challengers.length
    }
  },
  methods: {
    endTime() {
      // TODO : endTime 발생하면 무엇을 하실 겁니까
    },
    isJoinedChallenge(id) {
      if(this.userInfo === null)
        return false
      return this.userInfo.joinedChallenge.includes(id+'')
    },
    onRemoveDialog(challengeId) {
      const filter = this.challenges.filter((element) => {
        return element._id !== challengeId
      })
      this.challenges = filter


      axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/challenge/${challengeId}/delete`)
      .then((/*res*/) => {
        // console.log(res)
      })
      .catch((err) => {
        console.dir(err) 
      })

      // console.log(this.challenges)
    },
    onJoin(id) {
      // console.log('click Join!', id)
      this.userInfo.joinedChallenge.push(id)


      // axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/user/edit-profile`, { ...this.userInfo })
      // .then(res => {
      //   console.log(res)
      //   this.$router.push(`/challenge/${id}`)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
      axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/challenge/${id}/join`)
      .then((/*res*/) => {
        // console.log(res)
        this.$router.push(`/challenge/${id}`)
      })
      .catch(err => console.dir(err));
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