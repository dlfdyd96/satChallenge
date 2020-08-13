<template>
  <div class="home my-10">
    <v-form
      ref="bodyForm"
      v-model="bodyForm"
    >
      <v-container>
        <v-row 
          class="white rounded-lg"
          align="center"
        >
          <v-col cols="12">
            <div class="d-flex pa-2">
              <span class="text-h2 font-weight-normal">E</span>
              <div class="d-flex align-end">
                <span class="text-h3">dit challenge</span>
              </div>
              <v-spacer></v-spacer>
              <v-btn 
                rounded color="light-green lighten-1" 
                class="white--text text-md-h5 text-sm-h6 text-h6"
                :disabled="!bodyForm"
                @click="onEditChallenge"
              >
                <v-icon class="mr-2" small>
                  fas fa-edit
                </v-icon>
                <span>
                  Edit
                </span>
              </v-btn>
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
              v-model="challengeTitle"
              :rules="[rules.required]"
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
                color="light-green lighten-1"
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
                max-width="70%"
              >
                <v-card
                  rounded
                >
                  <v-card-title>
                    <span class="text-md-h5 text-h6">{{selectedDay}}</span>
                    <span class="grey--text mx-4">~</span>
                    <!-- dropdown -->
                    <span>
                      <v-select
                        v-model="selectedItem.endAt"
                        :items="dropDownItems"
                        full-width
                        append-icon="fas fa-caret-down"
                        label="기간"
                        item-text="text"
                        item-value="value"
                        :rules="[rules.required]"
                      ></v-select>
                    </span>
                  </v-card-title>
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
                              v-model="selectedItem.url"
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
                v-if="item.startAt === picker"
              >
                <v-card>
                  <v-card-title>
                    Quiz {{index + 1 }}. {{item.title}}
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="onEdit(index)"
                      text
                    >
                      수정
                    </v-btn>
                    <v-btn
                      color="red"
                      @click="onDelete(index)"
                      text
                    >
                      삭제
                    </v-btn>
                  </v-card-title>
                  <v-card-subtitle>
                    Link : {{item.url}}
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
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      // challenge
      challengeId : '',
      challengeTitle : '',

      // 달력
      picker : new Date().toISOString().substr(0, 10),
      quizzes : [
      ],

      // dialog
      dialog : false,
      selectedItem : {
        startAt : '',
        endAt : 1,
        title : '',
        url : '',
        description : '',
      },
        //form
      form : false,
      rules : {
        required : v => !!v || 'This field is required',
      },
        //edit
      editFlag : false,
        // drodwon
      dropDownItems : [{ text : '당일(23:59 종료)', value : 1}],

      // createChallenge
      bodyForm : false,

      // onEditBTn Click
      updateList : [],
      addList : [],
      deleteList : [],
    }
  },
  computed: {
    functionEvents () {
      return this.dateFunctionEvents;
    },
    selectedDay() {
      const [,month,day] = this.selectedItem.startAt.split('-');
      return `${month}월 ${day}일`
    }
  },
  methods: {
    ...mapActions(['ME']),
    
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
        let [yearItem, monthItem, dayItem] = quiz.startAt.split('-');
        if(yearItem === year && monthItem === month && dayItem === day){
          // return ['red']
          flag = 'pink';
        }
      });
      return flag;
    },
    clickDate(date) {
      // console.log(`클릭 했다. ${date}`);
      this.dialog = true;
      this.selectedItem.startAt = date;
      // const [,, day] = date.split('-');
    },
    onSubmit() {
      this.quizzes.push({...this.selectedItem});
      this.quizzes.sort((a, b) => {
        return new Date(a.startAt) - new Date(b.startAt)
      });
      this.addList.push({...this.selectedItem});
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
      console.log(this.selectedItem);
      this.quizzes[this.editFlag] = {...this.selectedItem};
      this.updateList.push({...this.selectedItem});
      this.editFlag = false;
      this.onClose();
    },
    async onEditChallenge () {
      /*
        1. Challenge Model을 만들고
        2. 등록했던 quizzes 들을 만들었던 challnge model 의 _id를 참조하여 넣는다.
      */  
      // 1
      
      let diff = Math.abs(new Date(this.quizzes[0].startAt).getTime() - new Date(this.quizzes[this.quizzes.length - 1].startAt).getTime())
      const weeks = Math.ceil( ( Math.ceil(diff/(1000*3600*24) ) ) / 7)
      const problems = this.quizzes.length

      const challenge = {
        title : this.challengeTitle,
        startedAt : new Date(this.quizzes[0].startAt),
        img : '',
        weeks,
        problems,
      };

      let challengeId = ''
      await axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/challenge/${this.challengeId}/update`, challenge)
      .then((res) => {
        console.log(res);
        challengeId = res.data.newChallenge._id;
        console.log(challengeId)
      })
      .catch((err) => {
        console.dir(err);
        return;
      })

      console.log(this.addList, this.challengeId)
      await Promise.all(
        [ 
          // 1. 새롭게 추가된 quiz array
          axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/quiz/create`, 
            {
              quizzes : this.addList, 
              challengeId : this.challengeId
            })
            .then(() => { console.log('1. 새롭게 추가된 quiz array 성공')})
            .catch(err => err), 
          // 2. 수정된 quiz array
          ...this.updateList.map(item => {
            return axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/quiz/update`, 
              {
                quiz : item, 
              })
              .then(() => { console.log('2. 수정된 quiz array 성공')})
              .catch(err => err)
          }),
          // 3. 삭제된 quiz array
          ...this.deleteList.map(item => {
            return axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/quiz/${item.id}/delete`)
              .then(() => { console.log('3. 삭제된 quiz array 성공')})
              .catch(err => err)
          })
        ]
      ).then(res => {
        console.log(`sucess ${res}`)
      }).catch(err => {
        console.dir(`fail ${err}`)
        return;
      }) 
      // home 으로 이동
      this.$router.push('/');
    },
    onDelete(index) {
      if(this.quizzes[index]._id !== undefined){
        this.deleteList.push({id : this.quizzes[index]._id});
      }
      this.quizzes.splice(index, 1);
    }
  },
  created () {
    this.selectedItem.startAt = this.picker;
    for(let i = 1 ; i < 51 ; i++) {
      this.dropDownItems.push({text : `+ ${i} Day`, value : i + 1})
      // { text : '당일(23:59 종료)', value : 0}
    }
    // console.log(this.$route.params.challengeId)
    this.challengeId = this.$route.params.challengeId;

    // 수정할 challenge 정보 받아오기
    axios.get(`${process.env.VUE_APP_SERVER_DOMAIN}/challenge/${this.challengeId}`)
    .then(({data : {selectedChallenge, selectedQuizzes}}) => {
      // console.log(`selectedChallenge : ${selectedChallenge}\nselectedQuizzes : ${selectedQuizzes}`);
      // 제목
      this.challengeTitle = selectedChallenge.title
      
      // 퀴즈들
      this.quizzes = selectedQuizzes
      this.quizzes.forEach(item => {
        item.startAt = item.startAt.substr(0, 10);
        item.endAt = (new Date(item.startAt) - new Date(item.endAt.substr(0, 10))) / (1000*3600*24);
      })

      // sort
      
      this.quizzes.sort((a, b) => {
        return new Date(a.startAt) - new Date(b.startAt)
      });
    })
    .catch((err) => {
      console.dir(err.response);
      return;
    })
  },
  destroyed () {
    console.log('Life Cycle : "EditChallenge.vue" is detropyed');
  },
}
</script>

<style scoped>
.home {
  margin : auto;
  max-width: 1200px;
}
</style>