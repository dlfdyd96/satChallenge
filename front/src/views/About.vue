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
          exy
        </span>
        <span class="title__sat">A</span>
        <span class="title__challenge">
          lgorithm
        </span>
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
            <span v-for="style in divider_style" :key="style" class="mx-2 mt-15 mb-10" :style="style"></span>
          </div>
        </v-col>
      </v-row>
      <!-- 설명 -->
      <v-row class="mt-10">
        <!-- 이렇게 공부합니다. -->
        <v-col cols="12">
          <div class="d-flex justify-center text-h4 font-weight-bold">
            이렇게 공부합니다
          </div>
        </v-col>
      </v-row>
      <!-- items -->
      <v-row>
        <v-col cols="12" sm="4">
          <div class="d-flex justify-center ma-5">
            <v-icon class="green pa-2 rounded-lg white--text" size="40">
              far fa-calendar
            </v-icon>
          </div>
          <div class="d-flex justify-center">
            진도표
            <!-- 100% 완주를 위한 진도표를 보면서 강의를 시청합니다 -->
          </div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="d-flex justify-center ma-5">
            <v-icon class="green pa-2 rounded-lg white--text" size="40">
              fas fa-comment
            </v-icon>
          </div>
          <div class="d-flex justify-center">매일 아침 6시 카톡</div>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="d-flex justify-center ma-5">
            <v-icon class="green pa-2 rounded-lg white--text" size="40">
              fas fa-check-square
            </v-icon>
          </div>
          <div class="d-flex justify-center">코딩 챌린지</div>
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
          width : '20px'
        },
        {
          backgroundColor : '#aad76d',
          width : '80px'
        },
        {
          backgroundColor : 'rgb(238, 95, 120)',
          width : '30px'
        },
        {
          backgroundColor : 'rgb(69, 197, 207)',
          width : '30px'
        },
        {
          backgroundColor : 'rgb(64, 62, 65)',
          width : '30px'
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
</style>