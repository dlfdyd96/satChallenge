<template>
  <div>
    <!-- title -->
    <div class="challenge__title d-flex justify-center align-center white--text">
      <!-- main title -->
      <div class="mx-5">
        <!-- <span class="title__sat">
          SAT
        </span>
        <span class="title__challenge">
          Challenge
        </span> -->
        <span class="title__sat">
          S
        </span>
        <span class="title__challenge">
          pecial
        </span>
        <br class="d-sm d-md-none">
        <span class="title__sat">A</span>
        <span class="title__challenge">
          lgorithm
        </span>
        <br class="d-sm d-md-none">
        <span class="title__sat">
          T
        </span>
        <span class="title__challenge">
          eam
        </span>
        <!-- sub title -->
        <div class="title__sub">
          S.A.T는 Special Algorithm Team의 약자로<br class="d-sm d-md-none"> SW 분야 취업에 필요한 알고리즘을 공부하는 동아리입니다.
        </div>
      </div>
      
    </div>
    <v-container>
      <!-- About -->
      <v-row class="mt-10">
        <v-col>
          <div class="text-h4 mb-5">
            알고리즘을 공부하는 당신...
          </div>
          <div>
            <span class="text-h2 font-weight-medium orange--text">SAT Challenge</span>
            <span class="text-h3"> 와 함께 할래요?</span>
          </div>
        </v-col>
      </v-row>

      <!-- divider -->
      <v-row>
        <v-col>
          <div class="d-flex justify-center mt-15 mb-10 about__divider">
            <span v-for="(style, index) in divider_style" :key="index" class="mx-2 mt-15 mb-10" :style="style"></span>
          </div>
        </v-col>
      </v-row>

      <!-- 설명 -->
      <v-row class="mb-5">
        <!-- 이렇게 공부합니다. -->
        <v-col cols="12">
          <div class="d-flex justify-center text-h4 font-weight-bold">
            이렇게 공부합니다
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center section1__subtitle grey--text text--darken-1">
            꾸준한 알고리즘 실력 상승을 위해, 첼린지 사이트가 함께합니다.
          </div>
        </v-col>
      </v-row>
      
      <!-- items -->
      <v-row v-for="(item, index) in howToList" :key="index">
        <v-col cols="12">
          <v-card 
            flat
          >
            <div class="d-flex flex-no-wrap ">
              <div class="d-flex align-center mx-10">
                <v-icon class="pa-3 rounded-lg orange white--text" large>{{item.icon}}</v-icon>
              </div>  
              <div>
                <v-card-title
                  class="headline my-5"
                >{{item.title}}</v-card-title>
                <v-card-subtitle class="text-subtitle-1 mb-5">
                  {{item.text}}
                </v-card-subtitle>
              </div>

            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- divider -->
      <v-row>
        <v-col>
          <div class="d-flex justify-center mt-15 mb-10 about__divider">
            <span v-for="(style, index) in divider_style" :key="index" class="mx-2 mt-15 mb-10" :style="style"></span>
          </div>
        </v-col>
      </v-row>

      <!-- 운영진 -->
      <v-row class="mb-5">
        <!-- 이렇게 공부합니다. -->
        <v-col cols="12">
          <div class="d-flex justify-center text-h4 font-weight-bold">
            SAT Staff
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center section1__subtitle grey--text text--darken-1">
            2020, SAT Staff
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>

        </v-col>
      </v-row>


    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title : "SAT Challenge",
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
      divider_style : [
        {
          backgroundColor : 'rgb(255, 218, 97)',
          width : '40px'
        },
        {
          backgroundColor : '#aad76d',
          width : '80px'
        },
        {
          backgroundColor : 'rgb(238, 95, 120)',
          width : '20px'
        },
        {
          backgroundColor : 'rgb(69, 197, 207)',
          width : '50px'
        },
        {
          backgroundColor : 'rgb(64, 62, 65)',
          width : '30px'
        },
      ],
      howToList : [
        {
          icon : 'fas fa-users',
          title : '혼자가 아닌 여러명이 함께 도전',
          text : '당신은 혼자가 아닙니다. 같이 도전을 함께하는 사람들이 있습니다. 질문이 있으시다면 동아리 카톡방에 부담없이 올리시면 도움을 받으실 수 있을꺼에요!'
        },
        {
          icon : 'fas fa-clipboard-list',
          title : '수준별 첼린지 참가',
          text : '자료구조 기초부터 알고리즘 대회 및 IT 기업 코딩테스트 첼린지까지 다양한 첼린지들이 기다리고 있습니다!'
        },
        {
          icon : 'fab fa-discord',
          title : 'Discord를 통한 세미나 발표',
          text : '매주 알고리즘 문제 해결 과정과 다양한 토론을 진행하고 있습니다. 동아리 진행에 많은 도움 부탁드립니다!'
        },
      ]
    }
  },
  created () {
    console.log(this.$route.params.id);
  },
}
</script>

<style scoped>
.challenge__title {
  height: 500px;
  width: 100%;
  background:  linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../assets/about1.jpg') no-repeat center center;
  background-size: cover;
}
@media screen and (max-width: 600px) {
  .title__sat {
    letter-spacing: 5px;
    font-size: 60px;
  }
  .title__challenge {
    font-size: 40px;
  }
  .title__sub {
    font-size: 17px;
  }
}
@media screen and (min-width: 601px) {
  .title__sat {
    font-size: 80px;
    letter-spacing: -10px;
  }
  .title__challenge {
    font-size: 50px;
    margin-right: 15px;
  }
  .title__sub {
    font-size: 20px;
  }
}
.about__divider > span {
  height: 8px;
  border-radius: 10px;
  /* background-color: ; */
}
.section1__subtitle {
  font-size: 20px;
}
</style>