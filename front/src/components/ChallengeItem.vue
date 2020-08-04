<template>
  <div>
    <v-card>

      <!-- Auth Menu -->
      <v-menu v-if="isAdmin">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            absolute
            right
            top
            icon
            x-small

            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              fas fa-ellipsis-v
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="onEditBtn"
          >
            <v-list-item-title class="grey--text text--darken-1">
              수정
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="onDelBtn"
          >
            <v-list-item-title class="red--text">
              삭제
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Dialog -->
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-container >
            <v-row>
              <v-col>
                <div class="d-flex justify-center text-h6">
                  정말로 삭제하시겠습니까?
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-end">
                  <v-btn
                    text
                    color="grey darken-1"
                    @click="onCancelDialog"
                  >
                    취소
                  </v-btn>
                  <v-btn
                    text
                    color="red"
                    @click="onRemoveDialog"
                  >
                    삭제
                  </v-btn>
                </div>
              </v-col>

            </v-row>
          </v-container>
        </v-card>
        
      </v-dialog>
        
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
            v-if="_isJoin"
            width="100%"
            @click="onEnter"
            :disabled="endTime && !_isJoin"
          >
            Enter class
          </v-btn>
          <v-btn 
            v-else
            width="100%"
            @click="onJoin"
            :disabled="endTime && !_isJoin"
          >
            {{endTime ? 'Expired' : 'Join Class'}}
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
    },
    _isJoin : {
      type: Boolean,
      default : false,
    },
    isAdmin : {
      type : Boolean,
      default: false,
    }
  },
  computed: {
    day() {
      let d = Math.trunc((this.startTime - this.now) / 1000 / 3600 / 24);
      return d < 0 ? 0 : d;
    },
    hour(){
      let h = Math.trunc((this.startTime - this.now) / 1000 / 3600) % 24;
      return h < 0 ? 0 : ( h>9?h:'0'+h );
    },
    min(){
      let m = Math.trunc((this.startTime - this.now) / 1000 / 60) % 60;
      return m < 0 ? 0 : (m>9?m:'0'+m);
    },
    sec(){
      let s = Math.trunc((this.startTime - this.now)/1000) % 60
      return s < 0 ? 0 : (s>9?s:'0'+s);
    }
  },
  data() {
    return {
      now : Date.now(),
      timer : null,
      endTime : false,
      isJoin : false,

      //dialog
      dialog : false,
      // join / Enter 
    }
  },
  created () {
    // this.startTime = new Date('2021-02-04T00:00:00');
    this.isJoin = this._isJoin
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
    // console.log('Destory Challenge Item');
  },
  methods: {
    onEditBtn() {
      // CreateChallenge 로 Route
      // 1. params 다 넘기기
      this.$router.push({name : 'EditChallenge', params : {challengeId : this.id}})
    },
    onDelBtn() {
      this.dialog = true;
    },
    onCancelDialog(){
      this.dialog = false;
    },
    onRemoveDialog(){
      this.$emit('onRemoveDialog', this.id);
      this.dialog = false;
    },
    onJoin() {
      // console.log('Child onJoin()')
      this.$emit('onJoin', this.id)
    },
    onEnter() {
      // console.log('Child onEnter()')
      this.$router.push(`/challenge/${this.id}`)
    }
  },
}
</script>

<style scoped>
.item__edit {
  background: rgba(0, 0, 0, 0.1);
}
</style>