<template>
  <div>
    <!-- title -->
    <div class="challenge__title d-flex justify-center align-center text-h3 white--text">
      {{title}}
    </div>
    <v-container class="items__container">
      <!-- 3 item -->
      <v-row>
        <v-col 
          cols="12"
          sm="4"
          v-for="(item, index) in descriptionItems"
          :key="index"
        >
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar 
                  tile
                  color="blue-grey lighten-1"
                  class="rounded-lg"
                >
                  <v-icon color="white">
                    {{item.icon}}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>{{item.subTitle}}</v-list-item-subtitle>
                  <v-list-item-title 
                    class="text-h6 font-weight-regular"
                  >
                    {{item.text}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <!-- 설명 -->
      <v-row class="mt-15">
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
  height: 250px;
  width: 100%;
  background-color: green;
}
.items__container {
  margin-top: -50px;
}
</style>