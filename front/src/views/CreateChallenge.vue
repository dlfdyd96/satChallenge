<template>
  <div class="home">
    <v-container>
      <v-row class="white rounded-lg"
        align="center"
      >
        <v-col cols="12">
          <div class="pa-2">
            <span class="text-h2 font-weight-medium">C</span>
            <span class="text-h3">reate challenge</span>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="my-2 text-h5 font-weight-bold blue-grey--text text--darken-2">
            🚩 Title
          </div>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            placeholder="제목을 입력하세요"
            class="py-0 my-0"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <div class="my-2 text-h5 font-weight-bold blue-grey--text text--darken-2">
            📅 Schedule
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <!-- 달력 -->
            <v-date-picker
              color="red"
              v-model="picker"
              full-width
              show-current
              @click:date="clickDate"
              :events="functionEvents"
              next-icon="fas fa-chevron-right"
              prev-icon="fas fa-chevron-left"
            >
            </v-date-picker>
            <!-- Dialog -->
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


      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          return 'red'
        else
          return 'red'
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
.home {
  margin : auto;
  max-width: 1200px;
}
</style>