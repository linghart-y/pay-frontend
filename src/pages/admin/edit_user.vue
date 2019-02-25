<template>
  <q-page padding v-if="user">
    

    	<q-input class="q-my-form" id="first_name" type="text" v-model.trim="user.first_name" float-label="First name" required autofocus/>
    	<q-input class="q-my-form" id="last_name" type="text" v-model.trim="user.last_name" float-label="Last name" required/>
    	<q-input class="q-my-form" id="email" type="email" v-model.trim="user.email" float-label="Email" required/>
    	<q-input class="q-my-form" id="balance" type="text" v-model.trim="user.balance" float-label="Balance" required/>
    	<q-input class="q-my-form" id="role" type="text" v-model.trim="user.role" float-label="Role" required/>
    	<q-input class="q-my-form" id="password" type="password" v-model.trim="password" float-label="New password"/>
    	<q-btn color="primary" @click="save" label="save" class="float-right"/>

  </q-page>
</template>

<script>
export default {
  props: ['id'],
  name: 'EditUser',
  data(){
	return {
  		user: null,
  		password: '',
  	}
  },
  methods: {
	init(){
  		let url = 'admin/get-person';
  		let data = {id: this.id};
  		this.axios
	        .post(url, data)
	        .then((response)=>{
	        	console.log('user', response);
	        	this.user = response.data;
	        })
	        .catch((error)=>{
	            console.log(error);
	        })
  	},
  	save(){
      let url = 'admin/save-user';
      let data = {user: this.user, password: this.password};
      this.axios
          .post(url, data)
          .then((response)=>{
            this.init();
          	this.$q.notify({ message: 'Payment successfully saved ', color: 'positive' })
          })
          .catch((error)=>{
              console.log(error);
          })
    }
  },
  mounted(){
  	this.init()
  },
}
</script>

<style>
</style>
