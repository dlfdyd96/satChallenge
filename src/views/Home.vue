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
        <v-col cols="12" sm="8">
          <profile/>
        </v-col>
        
        <v-col  v-if="languageComplete" cols="4">
            <language/>
        </v-col>
      </v-row>
    </v-container>
    <!-- Challenge 부분 -->
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h5 font-weight-bold blue-grey--text text--darken-2">
            🏋️‍♂️ Challenges
          </div>
        </v-col>
      </v-row>
      <v-row>
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