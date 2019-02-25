<template>
  <q-page padding>
    <q-table
	    :filter="terms"
	    :filter-method="myFilter"
	    :pagination.sync="pagination"
    	title="Payments list"
    	:data="payments"
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
    		<q-btn @click="edit(props.row)" label="edit" color="primary"></q-btn>
    		<q-btn @click="view(props.row)" label="view" color="primary"></q-btn>
    	</template>
      
    </q-td>
  </q-tr>
	</q-table>
  </q-page>
</template>

<script>
export default {
  name: 'paymentList',
  data(){
  	return {
  		payments: [],
  		terms: '',
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
		        name: 'value',
		        required: true,
		        label: 'Value',
		        align: 'left',
		        field: 'value',
		        sortable: true,
	      	},
	      	{
		        name: 'sender',
		        required: true,
		        label: 'Sender',
		        align: 'left',
		        field: 'sender',
		        sortable: true,
	      	},
	      	{
		        name: 'recipient',
		        required: true,
		        label: 'Recipient',
		        align: 'left',
		        field: 'recipient',
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
  	edit(val){
  		this.$router.push({name: 'admin.edit_payment', params: {'id': val.id}})
  	},
  	view(val){
	  	this.$router.push({name: 'admin.view_payment', params: {'id': val.id}})	
  	},
  	init(){
  		let url = 'admin/remittances-index';
  		let data = {};
  		this.axios
	        .post(url, data)
	        .then((response)=>{
	        	this.payments = response.data;
	        	console.log(response);
	        })
	        .catch((error)=>{
	            console.log(error);
	        })
  	},
  	myFilter (rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    },
  }
}
</script>

<style>
</style>
