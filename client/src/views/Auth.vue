<template>
  <v-layout justify-center align-center>
    <v-flex xs11 md6>

      <v-card color="basil">

        <v-card-title class="text-center justify-center py-6">
          <p class="font-weight-bold basil--text" >Authorization</p>
        </v-card-title>

        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>

          <v-tab>SignUp</v-tab>

          <v-tab>LogIn</v-tab>

        </v-tabs>

        <v-tabs-items v-model="tab">

          <v-tab-item>

            <v-card flat class="mb-3 mt-3 basil">
              <div class="mb-4 mt-4 ml-4 mr-4">
                <br>
                <v-form ref="form" v-model="svalid" lazy-validation>
                  <v-text-field v-model="susername" :counter="10" :rules="nameRules" label="Username" required outlined rounded></v-text-field>
                  <v-text-field v-model="email" :rules="emailRules" label="Email" required outlined rounded></v-text-field>
                  <v-text-field v-model="spassword" :rules="passwordRules" label="Password" required outlined rounded type="password"></v-text-field>
                  <br>
                  <v-btn :disabled="!svalid" color="success" @click="svalidate">SignUp</v-btn>&ensp;
                  <v-btn color="error" @click="reset">Reset</v-btn><br><br>
                  <br><br>
                </v-form>
              </div>
            </v-card>

          </v-tab-item>

          <v-tab-item>

            <v-card flat class="mb-3 mt-3 basil">
              <div class="mb-4 mt-4 ml-4 mr-4">
                <br>
                <v-form ref="loginform" v-model="lvalid" lazy-validation>
                  <v-text-field v-model="lusername" :counter="10" :rules="nameRules" label="Username" required outlined rounded></v-text-field>
                  <v-text-field v-model="lpassword" :rules="passwordRules" label="Password" required outlined rounded type="password"></v-text-field>
                  <br>
                  <v-btn :disabled="!lvalid" color="success" @click="lvalidate">LogIn</v-btn>&ensp;
                  <v-btn color="error" @click="lreset">Reset</v-btn>
                  <br><br>
                </v-form>
              </div>
            </v-card>

          </v-tab-item>

        </v-tabs-items>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthServices from '@/services/AuthServices'
export default {
  data () {
    return {
      tab: null,
      svalid: true,
      lvalid: true,
      susername: '',
      spassword: '',
      lusername: '',
      lpassword: '',
      email: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required', 
        v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v) || 'Passwords should contain atleast one number and one special character one uppercase character one lowercase character and must be between 6 to 16 characters long'
      ]
    }
  },
  methods: {
    svalidate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.signin()
      }
    },
    async signin () {
      const user = await AuthServices.register({
        username: this.susername,
        email: this.email,
        password: this.spassword
      })
      if(user.status == 200) {
        this.$store.dispatch('setIsLoggedIn',true)
        this.$store.dispatch('setUser',user.data.user.username)
        this.$store.dispatch('setToken',user.data.token)
        this.$store.dispatch('setCookie')
        this.$router.go(-1)
      }
    },
    lvalidate () {
      if (this.$refs.loginform.validate()) {
        this.snackbar = true
        this.login()
      }
    },
    async login () {
      const user = await AuthServices.login({
        username: this.lusername,
        password: this.lpassword
      })
      if(user.status == 200) {
        this.$store.dispatch('setIsLoggedIn',true)
        this.$store.dispatch('setUser',user.data.user.username)
        this.$store.dispatch('setToken',user.data.token)
        this.$store.dispatch('setCookie')
        this.$router.go(-1)
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    lreset () {
      this.$refs.loginform.reset()
    }
  }
}
</script>

<style scoped>
  .basil--text {
    color: #356859 !important;
    font-size: 2em; 
  }
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }
</style>