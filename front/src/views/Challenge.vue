<template>
  <div>
    <!-- title -->
    <div class="challenge__title d-flex align-end grey--text text--lighten-2">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="text-h4 font-weight-bold ml-4">{{title}}</div>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="4"
            v-for="(item, index) in descriptionItems"
            :key="index"
          >
            <v-list-item>
              <v-list-item-icon class="mx-1">
                <v-icon color="grey lighten-2">
                  {{item.icon}}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text" class=" grey--text text--lighten-2"></v-list-item-title>
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
          <v-col v-if="false">
            <div>😉 오늘은 할일이 없어요!</div>
            <div>공부에도 휴식이 필요해요 ㅎㅎ</div>
          </v-col>
          <v-col v-else>
            Quiz 1. A+B
            <div class="ml-2">
              - Stack 을 이용한 문제 (참고: http://이정철멍청이.com)
            </div>
            <div class="ml-2">
              - 난이도 쉬움
            </div>
            <div class="d-flex ">
              <v-text-field outlined class="pa-2">
              </v-text-field>
              <v-btn>
                submit
              </v-btn>
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
        <!-- calendar -->
        <v-row>
          <v-col>
            <div class="text-h5 font-weight-bold blue-grey--text text--darken-2 mt-5">
              📅 Calendar
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <!-- 달력 -->
              <v-date-picker
                v-model="picker"
                full-width
                show-current
                @click:date="clickDate"
                :events="functionEvents"
                next-icon="fas fa-chevron-right"
                prev-icon="fas fa-chevron-left"
              >
              </v-date-picker>

              <!-- dialog -->
              <v-dialog
                v-model="dialog"
                persistent
                max-width="50%"
              >
                <v-card
                  rounded
                >
                  <v-card-title class="text-h4"> Day {{selectedItem.day}} | Challenge</v-card-title>
                  <v-card-subtitle class="d-flex justify-end">{{picker}}</v-card-subtitle>
                  <v-card-text>
                    <div class="d-flex flex-column">
                      <div
                        class="mb-5"
                        v-for="(item, index) in selectedItem.quizzes"
                        :key="index"
                      >
                        <!-- title -->
                        <div class="text-h6">
                          Quiz {{index + 1}}. 
                          <a :href="item.url" class="black--text">{{item.title}}</a>
                        </div>
                        <!-- 문제 설명 -->
                        <div>

                        </div>
                        <!-- input, submit -->
                        <div>
                          <v-text-field
                            outlined
                            placeholder="Github URL"
                          >
                          </v-text-field>
                        </div>
                        <div class="d-flex justify-end">
                          <v-btn >
                            submit
                          </v-btn>
                        </div>
                      </div>
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary darken-1"
                      class="text-h6"
                      text
                      @click="dialog = false"
                    >
                      닫기
                    </v-btn>
                  </v-card-actions>

                </v-card>
              </v-dialog>
            </div>
          </v-col>
          <v-col cols="12">
            <div>
              
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title : "2020 여름방학 스터디",
      problems : 3,
      weeks : 3,
      users : 20,
      descriptionItems : [
        {
          icon : 'far fa-calendar-alt',
          text : '3 weeks',
          subTitle : '기간',
        },
        {
          icon : 'fas fa-puzzle-piece',
          text : '20 problems',
          subTitle : '문제 개수',
        },
        {
          icon : 'fas fa-users',
          text : '8 challengers',
          subTitle : '참여자',
        },
      ],

      // 달력
      picker : new Date().toISOString().substr(0, 10),
      schedule : {
        date : [
          2, 3, 6, 7, 9, 10, 13, 14, 16, 17,
        ],
        complete : [
          2,
        ],
      },
      
      // dialog
      dialog : false,
      selectedItem : {
        day : -1,
        quizzes : [
          {
            title : 'A+B',
            url : 'https://www.acmicpc.net/problem/1000',
          },
          {
            title : 'A-B',
            url : 'https://www.acmicpc.net/problem/1001',
          },
        ]
      },


    }
  },
  created () {
    console.log(this.$route.params.id);
  },
  computed: {
    functionEvents () {
      return this.dateFunctionEvents;
    }
  },
  methods: {
    dateFunctionEvents (date) { // 날짜 하나하나 다 검사하는 거네...
      const [,, day] = date.split('-')
      // console.log(date)
      if (this.schedule.date.includes(parseInt(day, 10))) 
        if (this.schedule.complete.includes(parseInt(day, 10)))
          return 'green'
        else
          return 'yellow'
      // if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
      return false

    },
    clickDate(date) {
      // console.log(`클릭 했다. ${date}`);
      const [,, day] = date.split('-');
      this.selectedItem.day = this.schedule.date.indexOf(parseInt(day, 10)) + 1;
      if(this.schedule.date.includes(parseInt(day, 10)))  // 일정 된 날만 dialog On
        this.dialog = true;
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