<template>
  <div>
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <v-list>
        <!-- 몇 주 -->
        <v-list-item>
          <v-list-item-avatar 
            tile
            color="blue-grey lighten-1"
            class="rounded-lg"
          >
            <v-icon color="white">
              far fa-calendar-alt
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{weeks}} weeks</v-list-item-title>
        </v-list-item>
        <!-- 몇 문제 -->
        <v-list-item>
          <v-list-item-avatar 
            tile
            color="blue-grey lighten-1"
            class="rounded-lg"
          >
            <v-icon color="white">
              fas fa-puzzle-piece
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{problems}} problems</v-list-item-title>
        </v-list-item>
        <!-- 몇 명 -->
        <v-list-item>
          <v-list-item-avatar 
            tile
            color="blue-grey lighten-1"
            class="rounded-lg"
          >
            <v-icon color="white">
              fas fa-users
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{users}} challengers</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-text>
        <div>Status in : {{day}}d {{hour}}h {{min}}m {{sec}}s</div>
        <div class="mt-5">
          <v-btn 
            width="100%"
          >
            Join
          </v-btn>
        </div>
      </v-card-text>

    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    propName: {
      type: Number,
      default: 
    },
  },
  computed: {
    day() {
      let d = Math.trunc((this.startTime - this.now) / 1000 / 3600 / 24);
      return d;
    },
    hour(){
      let h = Math.trunc((this.startTime - this.now) / 1000 / 3600) % 24;
      return h>9?h:'0'+h;
    },
    min(){
      let m = Math.trunc((this.startTime - this.now) / 1000 / 60) % 60;
      return m>9?m:'0'+m;
    },
    sec(){
      let s = Math.trunc((this.startTime - this.now)/1000) % 60
      return s>9?s:'0'+s;
    }
  },
  data() {
    return {
      title: '2020 여름방학 스터디',
      weeks : 4,
      problems : 30,
      users : 5,
      now : Date.now(),
      startTime : null,
      timer : null,
    }
  },
  created () {
    this.startTime = new Date('2021-02-04T00:00:00');
  },
  watch : {
    endDate : {
      immediate : true,
      handler(newVal){
        if(this.timer){
          clearInterval(this.timer);
        }

        this.timer = setInterval(()=>{
          this.now = new Date();
          if(this.negative)
            return;

          if(this.now > newVal){
            this.now = newVal;
            this.$emit('endTime');
            clearInterval(this.timer);
          }
        }, 1000)
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style>

</style>