<template>
  <div>
    <v-card>
      <v-card-title class="font-weight-bold d-flex justify-center">{{title}}</v-card-title>
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
          <v-list-item-title class="text-h6 font-weight-regular">{{weeks}} weeks</v-list-item-title>
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
          <v-list-item-title class="text-h6 font-weight-regular">{{problems}} problems</v-list-item-title>
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
          <v-list-item-title class="text-h6 font-weight-regular">{{users}} challengers</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-text>
        <div class="text-subtitle-1">Status in : 
        </div>
        <div v-if="!endTime" class="black--text text-h5">{{day}}d {{hour}}h {{min}}m {{sec}}s</div>
        <div v-else class="black--text text-h5">
          진행중
        </div>
        <div>

        </div>
        <div class="mt-5">
          <v-btn 
            width="100%"
            :to='`/challenge/${id}`'
            :disabled="endTime"
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
    startTime: {
      type: Date,
      default: new Date()
    },
    title : {
      type: String,
      default: 'this is title'
    },
    weeks : {
      type: Number,
      default: 0
    },
    problems : {
      type: Number,
      default: 0
    },
    users : {
      type: Number,
      default: 0
    },
    negative : {
      type: Boolean,
      default: false,
    },
    id : {
      type: String,
      default: '1',
    }
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
      now : Date.now(),
      timer : null,
      endTime : false,
    }
  },
  created () {
    // this.startTime = new Date('2021-02-04T00:00:00');
  },
  watch : {
    startTime : {
      immediate : true,
      handler(newVal){
        if(this.timer){
          clearInterval(this.timer);
        }

        this.timer = setInterval(()=>{
          this.now = new Date();
          // console.log('작동중')
          if(this.negative) {
            return;
          }

          if(this.now > newVal){
            this.now = newVal;
            this.endTime = true;
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