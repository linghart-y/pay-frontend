<template>
  <div class="fixed fixed-center bg-grey-1">
   <form v-on:submit.prevent="onSubmit()">
      <q-card square  class="flex-center text-center" style="width: 400px; padding:50px">
        <q-card-title color="primary">
          Register
        </q-card-title>
        <div class="text-left">

            <q-input class="q-my-form" id="email" type="email" v-model.trim="form.email" float-label="Email" required autofocus/>
            <q-input class="q-my-form" id="first_name" type="text" v-model.trim="form.first_name" float-label="First name" required/>
            <q-input class="q-my-form" id="last_name" type="text" v-model.trim="form.last_name" float-label="Last name" required/>
            <q-input class="q-my-form" id="password" type="password" v-model="form.password" float-label="Password" required/>
            <q-input class="q-my-form" id="password_confirmation" type="password" v-model="form.password_confirmation" float-label="Password confirmation" required/>
        </div>
        <q-card-actions>
          <q-btn type="submit" class="fit" color="primary">Register</q-btn>
          <q-btn label="Login" @click="$router.push({name: 'login'})" flat color="white" text-color="black" class="fit register"/>
        </q-card-actions>
      </q-card>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PageName',
  data(){
  	return{
	  	form:{
	  		email: '',
	  		password: '',
	  		password_confirmation: '',
	  		first_name: '',
	  		last_name: '',
	  	}  		
  	}
  },
  methods: {
  	validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
	},
  	onSubmit(){
  		if(this.form.password != this.form.password_confirmation){
			this.$q.notify("Password must match password confirmation");
			return;
  		}
  		if(this.form.password.trim().length <= 6){
			this.$q.notify("Password must be 6 characters or more");
			return;
  		}
  		if(this.form.first_name.trim().length == 0 || this.form.last_name.trim().length == 0){
			this.$q.notify("First name and last name must be filled");
			return;
  		}
  		if(!this.validateEmail(this.form.email)){
  			this.$q.notify("Incorrect email field format");
  			return;
  		}
  		console.log(this.form);
  		let app = this
  		this.$auth.register({
            body: app.form,
            data: app.form,
            autoLogin: true,
            rememberMe: true,

            success: function () {
                console.log('success ' + this.context);
            },
            error: function (res) {
                console.log('error ' + this.context);
                this.error = res.data;
            }
        });
  	}
  }
}
</script>

<style>
</style>
