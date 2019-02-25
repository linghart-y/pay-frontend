<template>
  <div class="fixed fixed-center bg-grey-1">
   <form v-on:submit.prevent="onSubmit()">
      <q-card square  class="flex-center text-center" style="width: 400px; padding:50px">
        <q-card-title color="primary">
          Login
        </q-card-title>
        <div class="text-left" >
            <q-input class="q-my-form" id="email" type="text" v-model.trim="form.email" float-label="Email" required autofocus/>
            <q-input class="q-my-form" id="password" type="password" v-model="form.password" float-label="Password" required/><br>
        </div>
        <q-card-actions>
          <q-btn type="submit" class="fit" color="primary">Login</q-btn>
          <q-btn @click="$router.push({name: 'register'})" label="Register" flat color="white" text-color="black" class="fit register"/>
        </q-card-actions>
      </q-card>
    </form>
  </div>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      drawerState: true,
      rememberMe: true,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$auth.login({
        data: this.form,
        rememberMe: true,
        fetchUser: true,
      })
        .then((response)=>{
            console.log('response', response);
            this.$router.push({name: 'home'})
        })
        .catch((error)=>{
          if(error.response.data.error != undefined){
            if(error.response.data.error == 'User banned'){
              this.$q.notify({
                message: 'User banned',
                type: 'negative',
                icon: 'mdi-alert-circle',
                position: 'top'  
              });
            } else {
              this.$q.notify({
                message: 'Login failed, check email and password',
                type: 'negative',
                icon: 'mdi-alert-circle',
                position: 'top'  
              });
            }
          }
        });
    }
  }
}
</script>
