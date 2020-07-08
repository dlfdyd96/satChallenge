<template>
  <div class="home">
    <v-container>
      <v-row class="white rounded-lg"
        align="center"
      >
        <v-col cols="12">
          <div class="pa-2">
            <span class="text-h2">C</span>
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
                <v-card-title><span class="text-h4 ma-3">{{selectedDay}}</span></v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text class="black--text ">
                  <v-form
                    ref="form"
                    v-model="form"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <div>
                            제목 
                          </div>
                        </v-col>
                        <v-col cols="9" class="ma-0 pa-0">
                          <v-text-field
                            dense
                            v-model="selectedItem.title"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <div>
                            문제 링크 
                          </div>
                        </v-col>
                        <v-col cols="9" class="ma-0 pa-0">
                          <v-text-field
                            dense
                            v-model="selectedItem.link"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="mt-4">
                        <v-col cols="12">
                          설명
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            outlined
                            no-resize
                            v-model="selectedItem.description"
                            :rules="[rules.required]"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <!-- 밑에 버튼들 -->
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary darken-1"
                    class="text-h6 font-weight-bold"
                    text
                    :disabled="!form"
                    @click="editFlag !== false ? onSubmitEdit() : onSubmit()"
                  >
                    {{editFlag !== false ? '수정' : '추가'}}
                  </v-btn>
                  <v-btn
                    color="grey darken-1"
                    class="text-h6"
                    text
                    @click="onClose"
                  >
                    닫기
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog>
          </div>

        </v-col>
      </v-row>
      <!-- 밑에 목록 보여 주기 -->
      <v-row class="white rounded-lg mt-4"
        align="center"
      >
        <v-col
          v-for="(item, index) in quizzes"
          :key="index"
          cols="12"
        >
          <v-row>
            <v-col
              v-if="item.day === picker"
            >
              <v-card>
                <v-card-title>
                  Quiz {{index + 1 }}. {{item.title}}
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="onEdit(index)"
                  >
                    edit
                  </v-btn>
                </v-card-title>
                <v-card-subtitle>
                  Link : {{item.link}}
                </v-card-subtitle>
                <v-card-text>
                  <div>
                    설명
                  </div>
                  <div>
                    {{item.description}}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
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
      quizzes : [{
        day : '2020-07-08',
        title : 'A+B 문제',
        link : 'http://acmicpc.net',
        description : '산술 연산',
      },{
        day : '2020-07-08',
        title : 'A+B 문제',
        link : 'http://acmicpc.net',
        description : '산술 연산',
      },
      ],


      
      // dialog
      dialog : false,
      selectedItem : {
        day : '',
        title : '',
        link : '',
        description : '',
      },
        //form
      form : false,
      rules : {
        required : v => !!v || 'This field is required',
      },
        //edit
      editFlag : false,
    }
  },
  computed: {
    functionEvents () {
      return this.dateFunctionEvents;
    },
    selectedDay() {
      const [,month,day] = this.selectedItem.day.split('-');
      return `${month}월 ${day}일`
    }
  },
  methods: {
    dateFunctionEvents (date) { // 날짜 하나하나 다 검사하는 거네...
      const [year, month, day] = date.split('-')
      // console.log(date)
      /*
      if (this.schedule.date.includes(parseInt(day, 10))) 
        if (this.schedule.complete.includes(parseInt(day, 10)))
          return 'red'
        else
          return 'red'
      // if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
      return false*/

      let flag = false;

      this.quizzes.forEach(quiz => {
        let [yearItem, monthItem, dayItem] = quiz.day.split('-');
        if(yearItem === year && monthItem === month && dayItem === day){
          console.log('추가됨', date)
          // return ['red']
          flag = true;
        }
      });
      return flag;
    },
    clickDate(date) {
      // console.log(`클릭 했다. ${date}`);
      this.dialog = true;
      this.selectedItem.day = date;
      // const [,, day] = date.split('-');
    },
    onSubmit() {
      this.quizzes.push({...this.selectedItem})
      this.onClose();
    },
    onClose() {
      this.dialog = false;
      this.editFlag = false;
      this.$refs.form.reset();
    },
    onEdit(index) {
      this.dialog = true;
      this.editFlag = index;
      this.selectedItem = {...this.quizzes[index]};
    },
    onSubmitEdit() {
      console.log(this.selectedItem)
      this.quizzes[this.editFlag] = {...this.selectedItem}
      this.editFlag = false;
      this.onClose();
    }
  },
  created () {
    this.selectedItem.day = this.picker;
  },
}
</script>

<style scoped>
.home {
  margin : auto;
  max-width: 1200px;
}
</style>