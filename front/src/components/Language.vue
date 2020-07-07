<template>
  <v-item-group
    v-model="selected"
  >
    <v-container>
      <v-row
        justify="space-between"
      >
        <v-col
          v-for="(item, index) in icons"
          :key=index
          class="d-flex justify-center"
        >
          <v-item v-slot:default="{active, toggle}">
            <v-btn
              class="pa-0"
              fab
              depressed
              x-large
              :color="active ? 'orange' : ''"
              @click="onClick(toggle)"
            >
              <v-avatar >
                <v-img :src="require(`../assets/${item}.png`)" :alt="item"></v-img>
              </v-avatar>
            </v-btn>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  props: {
    initSelected: {
      type: String,
      default: 'js'
    },
  },
  data() {
    return {
      icons : ['cpp', 'c', 'python', 'java', 'js',],
      selected : 1, // string
    }
  },
  methods: {
    onClick(toggle) {
      toggle();
      this.$emit('select', this.icons[this.selected]);
    }
  },
  computed: {
    currentSelect(data) {
      return this.icons.indexOf(data);
    }
  },
  watch: {
    initSelected(newValue, oldValue) {
      console.log(`new value : ${newValue}, old Value : ${oldValue}`)
      this.selected = this.icons.indexOf(newValue)
    }
  },
}
</script>

<style>

</style>