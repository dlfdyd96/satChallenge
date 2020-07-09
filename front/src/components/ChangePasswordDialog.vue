<template>
  <v-dialog
    v-model="dialog"
    max-width="800px"
    persistent
  >
    <v-card
      rounded
    >
      <v-form
        v-model="valid"
        ref="form"
      >
        <v-container>
          <!-- title -->
          <v-row>
            <v-col>
              <div class="my-2 text-h5 font-weight-bold blue-grey--text text--darken-2">
                Change Password
              </div>
            </v-col>
          </v-row>
          <!-- text field -->
          <v-row v-for="(item, key) in items" :key="key">
            <v-col cols="12" sm="4">
              {{item.title}}
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field
                outlined
                v-model="item.value"
                :rules="rules.required"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn
            text
            color="grey darken-2"
            @click="onClickReset"
          >reset</v-btn>
          <v-btn
            text
            color="grey darken-2"
            @click="onClickCancel"
          >cancel</v-btn>
          <v-btn
            text
            color="primary darken-2"
            :disabled="!valid"
            @click="onClickChange"
          >change</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

      
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      items : {
        oldPassword : {
          title: 'Old Password',
          value : ''
        },
        newPassword : {
          title: 'New Password',
          value : ''
        },
        newPassword2 : {
          title: 'New Password Validation',
          value : ''
        },
      },
      rules : {
        required : [
          v => !!v || 'this field is required.'],
      }
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    onClickReset () {
      this.reset();
    },
    onClickCancel () {
      this.reset();
      // this.dialog = false;
      this.$emit('update:dialog', !this.dialog)
    },
    onClickChange () {
      this.validate();
      
      if(!this.valid)
        return;
        
      const body = {
        oldPassword : this.items.oldPassword.value, 
        newPassword : this.items.newPassword.value, 
        newPassword2 : this.items.newPassword2.value
      }
      
      axios.post(`${process.env.VUE_APP_SERVER_DOMAIN}/user/change-password`, body)
      .then(res => {
        console.log(res)
        this.onClickCancel();
      })
      .catch(err => {
        console.dir(err)
        window.alert(err.response.data.error)
        this.onClickReset();
      })
    },
  },
}
</script>

<style>

</style>