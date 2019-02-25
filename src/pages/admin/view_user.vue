<template>
  <q-page padding>
    <table class="table" v-if="user">
    	
    	<tr>
    		<td>First name</td>
    		<td>{{user.first_name}}</td>
    	</tr>
    	
    	<tr>
    		<td>Last name</td>
    		<td>{{user.last_name}}</td>
    	</tr>

    	<tr>
    		<td>Email</td>
    		<td>{{user.email}}</td>
    	</tr>

    	<tr>
    		<td>Balance</td>
    		<td>{{user.balance}}</td>
    	</tr>

    	<tr>
    		<td>Role</td>
    		<td>{{user.role}}</td>
    	</tr>

    	<tr>
    		<td>Created at</td>
    		<td>{{user.created_at}}</td>
    	</tr>

    </table>
  </q-page>
</template>

<script>
export default {
  props: ['id'],
  name: 'ViewUser',
  data(){
  	return {
  		user: null,
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
  	}
  },
  mounted(){
  	this.init()
  },

}
</script>

<style>
</style>
