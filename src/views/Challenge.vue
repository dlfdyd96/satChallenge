<template>
  <div>
    <!-- title -->
    <div class="challenge__title d-flex align-end">
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
                <v-icon>
                  {{item.icon}}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
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
              Progress
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
              Calendar
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <div class="d-flex justify-center">
                <!-- dialog -->
                <!-- 달력 -->
                <v-date-picker
                  v-model="picker"
                  landscape
                  full-width
                  show-current
                  @click:date="clickDate"
                  :events="functionEvents"
                  next-icon="fas fa-chevron-right"
                  prev-icon="fas fa-chevron-left"
                >
                </v-date-picker>
            </div>
          </v-col>
          <v-col cols="12" md="6">
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


      picker : new Date().toISOString().substr(0, 10),
      schedule : {
        date : [
          2, 3, 6, 7, 9, 10, 13, 14, 16, 17, 
        ],
        complete : [
          2,
        ],
      }
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
      console.log(`클릭 했다. ${date}`);
    }
  },
}
</script>

<style scoped>
.challenge__title {
  height: 250px;
  width: 100%;
  /* background-color: lightgrey; */
}
.items__container {
  margin-top: -50px;
}

.challenge__body{
  background-color: lightgrey;
  
}
</style>