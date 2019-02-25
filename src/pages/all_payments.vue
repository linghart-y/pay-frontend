<template>
  <q-page padding>
    <q-table
	    :pagination.sync="pagination"
    	title="Last account activity"
    	:data="tableData"
    	:columns="columns"
    	row-key="id"
    >
    <q-tr slot="body" slot-scope="props" :props="props"  class="cursor-pointer">
    <q-td v-for="col in props.cols" :key="col.name" :props="props">
    	<template v-if="col.name != 'action'">
    		{{ col.value }}		
    	</template>
    	<template v-else>
    		<q-btn label="new as this" @click="newAsThis(props.row)"></q-btn>
    	</template>
      
    </q-td>
  </q-tr>
	</q-table>
    
  </q-page>
</template>

<script>
export default {
  name: 'all_payments',
  data(){
  	return {
  		pagination: {
			sortBy: 'created_at',
			descending: true,
			page: 1,
			rowsPerPage: 25 // current rows per page being displayed
    	},
  		tableData: [],
  		columns: [
  			{
		        name: 'action',
		        label: 'Action',
		        align: 'center',
	      	},
  			{
		        name: 'type',
		        required: true,
		        label: 'Type',
		        align: 'left',
		        field: 'type',
		        sortable: false,
	      	},
	  		{
		        name: 'value',
		        required: true,
		        label: 'Transfer amount',
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
  methods: {
  	newAsThis(value){
  		this.$router.push({name: 'new_payment_with_template', params: {'id': value.id}});
  	},
  	init(){
  		let url = 'get_all_remittances';
  		let data = {};
		this.axios
        .post(url, data)
        .then((response)=>{
        	this.tableData = response.data;
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
