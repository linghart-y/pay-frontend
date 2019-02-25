<template>
  <q-page padding>
    <q-table
	    :filter="terms"
	    :filter-method="myFilter"
	    :pagination.sync="pagination"
    	title="Users list"
    	:data="users"
    	:columns="columns"
    	row-key="id"
    >
    <template slot="top-right" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="terms"
          class="col-6"
        />
    </template>
    <q-tr slot="body" slot-scope="props" :props="props"  class="cursor-pointer">
    <q-td v-for="col in props.cols" :key="col.name" :props="props" :class="col.name + '-admin-col'">
    	<template v-if="col.name != 'action'">
    		{{ col.value }}		
    	</template>
    	<template v-else>
    		<q-btn label="edit" @click="edit(props.row)" color="primary"></q-btn>
    		<q-btn label="view" @click="view(props.row)" color="primary"></q-btn>
    		<q-btn :label="props.row.ban == true ? 'unban' : 'ban'" @click="toggleBan(props.row)" color="red-5"></q-btn>
    	</template>
      
    </q-td>
  </q-tr>
	</q-table>

  </q-page>
</template>

<script>
export default {
  name: 'userList',
  data(){
  	return{
  		terms: '',
  		users: [],
  		pagination: {
			sortBy: 'created_at',
			descending: true,
			page: 1,
			rowsPerPage: 25 // current rows per page being displayed
    	},
    	columns: [
  			{
		        name: 'action',
		        label: 'Action',
		        align: 'center',
	      	},
	      	{
		        name: 'first_name',
		        required: true,
		        label: 'First name',
		        align: 'left',
		        field: 'first_name',
		        sortable: true,
	      	},
	      	{
		        name: 'last_name',
		        required: true,
		        label: 'Last name',
		        align: 'left',
		        field: 'last_name',
		        sortable: true,
	      	},
	      	{
		        name: 'balance',
		        required: true,
		        label: 'Balance',
		        align: 'left',
		        field: 'balance',
		        sortable: true,
	      	},
	      	{
		        name: 'created_at',
		        required: true,
		        label: 'Created at',
		        align: 'left',
		        field: 'created_at',
		        sortable: true,
	      	},
      	],
  	}
  },
  mounted(){
  	this.init();
  },
  methods:{
  	toggleBan(value){
  		if(value.ban){
			this.unban(value);
  		} else {
			this.ban(value);
  		}
  	},
  	ban(val){
		let url = 'admin/ban';
  		let data = {id: val.id};
  		this.axios
	        .post(url, data)
	        .then((response)=>{
	        	this.$q.notify({ message: 'User successfully banned ', color: 'positive' })
	        	this.init();
	        })
	        .catch((error)=>{
	            console.log(error);
	        })
  	},
  	unban(val){
		let url = 'admin/unban';
  		let data = {id: val.id};
  		this.axios
	        .post(url, data)
	        .then((response)=>{
	        	this.$q.notify({ message: 'User successfully unbanned ', color: 'positive' })
	        	this.init();
	        })
	        .catch((error)=>{
	            console.log(error);
	        })
  	},
  	edit(val){
  		this.$router.push({name: 'admin.edit_user', params: {'id': val.id}})
  	},
  	view(val){
	  	this.$router.push({name: 'admin.view_user', params: {'id': val.id}})	
  	},
  	myFilter (rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    },
  	init(){
  		let url = 'admin/users-index';
  		let data = {};
  		this.axios
	        .post(url, data)
	        .then((response)=>{
	        	this.users = response.data;
	        	console.log(response);
	        })
	        .catch((error)=>{
	            console.log(error);
	        })
  	}
  }
}
</script>

<style>
</style>
