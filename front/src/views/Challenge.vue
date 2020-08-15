<template>
  <div>
    <!-- title -->
    <div class="challenge__title d-flex align-end grey--text text--lighten-2">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="text-h4 font-weight-bold ml-4">{{selectedChallenge.title}}</div>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="4"
            v-for="(item, key) in descriptionItems"
            :key="key"
          >
            <v-list-item>
              <v-list-item-icon class="mx-1">
                <v-icon color="grey lighten-2">
                  {{item.icon}}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="key === 'challengers' ? selectedChallenge[key].length + ` ${key}` : selectedChallenge[key] + ` ${key}`" class=" grey--text text--lighten-2"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- today -->
    <div class="challenge__body d-flex justify-center">
      <v-container class="white ma-5 mb-0 rounded-lg">
        <!-- Today -->
        <v-row>
          <v-col>
            <div class="text-h5 font-weight-bold blue-grey--text text--darken-2">
              📆 Today
            </div>
          </v-col>
        </v-row>
        <v-row>
          <!-- true -->
          <v-col v-if="todayAssignment.length === 0">
            <div>😉 오늘은 할일이 없어요!</div>
            <div>공부에도 휴식이 필요해요 ㅎㅎ</div>
          </v-col>

          <!-- false -->
          <v-col v-else
            cols="12"
            v-for="(item, index) in todayAssignment"
            :key="index"
          >
            <div class="ml-2 mb-2">
              <strong>문제 {{index + 1}}.</strong>  {{item.title}}
            </div>
            <div class="ml-2">
              <strong>설명</strong>
              <br>
              {{item.description}}
            </div>
            
            <div class="d-flex">
              <v-form>
                <v-text-field outlined class="pa-2" v-model="item.submit">
                </v-text-field>
                <v-btn class="my-5" @click="onSubmit(index)">
                  submit
                </v-btn>
              </v-form>
            </div>

            <div>
              <v-divider 
                v-if="index + 1 !== todayAssignment.length"
                class="my-2"></v-divider>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- Body -->
    <div class="challenge__body d-flex justify-center">
      <v-container class="white ma-5 mb-15 rounded-lg">
        <!-- progress bar -->
        <v-row>
          <v-col>
            <div class="text-h5 font-weight-bold blue-grey--text text--darken-2">
              🧾 Progress
            </div>
            <!-- <v-subheader>10%</v-subheader> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <v-progress-linear
                rounded
                value="10"
                striped
                height="15"
              >
              </v-progress-linear>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      // Challenge Info
      selectedChallenge : {
        challengers : [],
        weeks : 1,
        problems : 2,
      },
      // Header item
      descriptionItems : {
        weeks : {
          icon : 'far fa-calendar-alt',
        },
        problems : {
          icon : 'fas fa-puzzle-piece',
        },
        challengers : {
          icon : 'fas fa-users',
        },
      },

      // Quiz info
      selectedQuizzes : [ ],

      // today 
      todayAssignment : [ ],

    }
  },
  created () {
    let challengeId = this.$route.params.id
    
    axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/challenge/${challengeId}`)
    .then((
      {
        data : { 
          selectedChallenge, 
          selectedQuizzes
        }
      }
    ) => {
      this.selectedChallenge = selectedChallenge;
      this.selectedQuizzes = selectedQuizzes;

      // init
      this.selectedQuizzes.sort((a, b) => {
        return new Date(a.startAt) - new Date(b.startAt);
      })

      // todayAssignment 에 넣기
      this.selectedQuizzes.sort
      let todayDate = new Date();
      this.selectedQuizzes.some((quiz) => {
        // 시작날짜가 오늘 보다 더 앞선 경우 종료
        if(new Date(quiz.startAt) > todayDate) {
          return;
        }
        // endAt이 오늘 보다 큰 경우 push
        if(new Date(quiz.endAt) > todayDate) {
          this.todayAssignment.push({...quiz, submit: ''})
        }
      })
    })
    .catch((err) => {
      console.dir(err);
    })


    
  },
  computed: {
  },
  methods: {
    onSubmit(index) {
      // this.todayAssignment[index].submit
      console.log(this.todayAssignment[index])
      axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/submit-quiz/create`, 
      { // body
        content : this.todayAssignment[index].submit,
        quiz : this.todayAssignment[index]._id,
      })
      .then((res) => {
        window.alert('제출 성공!');
        console.dir(res);
      })
      .catch((err) => {
        window.alert('에러 발생!');
        console.dir(err);
      })
    }
  },
}
</script>

<style scoped>
.challenge__title {
  height: 300px;
  width: 100%;
  background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/summer.jpg') no-repeat center ;
  background-size: cover;
  /* background-color: white; */
}
.items__container {
  margin-top: -50px;
}

.challenge__body{
  background-color: rgb(240, 240, 240);
  
}
</style>