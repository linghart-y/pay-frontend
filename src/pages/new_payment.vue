<template>
  <q-page padding>
    <p>New payment</p>

	<q-chips-input class="q-my-form" v-model="chips1" stack-label="List of recipients" @duplicate="duplicate">
		<q-autocomplete @search="search" @selected="selected" />
	</q-chips-input>

	<q-input class="q-my-form" @input="changeTransferAmount" type="number" suffix="PW" v-model="transfer_amount" stack-label="Transfer amount"/>
	
	<q-btn color="primary" class="q-my-form float-right" label="send" @click="submit" icon="mdi-send"></q-btn>
	<!-- <q-search v-model="recipient" placeholder="Start typing a country name">
    	<q-autocomplete @search="search" @selected="selected" />
    </q-search> -->

  </q-page>
</template>

<script>
import { uid, filter } from 'quasar'
import { mapMutations } from 'vuex'

export default {
	props: ['id'],
	name: 'new_payment',
	data () {
		return {
			terms: '',
			chips1: [],
			recipients: [],
			transfer_amount: 0,
			balance: this.$store.state.auth.User.balance
		}
	},
	mounted(){
		this.init();
	},
	computed: {
		userName(){
			return this.$store.state.auth.User.firstName + ' ' + this.$store.state.auth.User.lastName;
		}
	},
	methods: {
		fromTemplate(id){
			let url = 'from_template';
			let data = {id: id}
			this.axios
	            .post(url, data)
	            .then((response)=>{
	            	if(response.data.value <= this.balance){
	            		console.log(this.userName)
		            	this.transfer_amount = response.data.value;
		            	if(response.data.recipient != this.userName){
	            			this.chips1 = [response.data.recipient];
		            	}
		            	if(response.data.sender != this.userName){
	            			this.chips1 = [response.data.sender];
		            	}	            		
	            	}
	            })
	            .catch((error)=>{
	                console.log(error);
	            })
		},
		...mapMutations('auth', [
      		'LOGIN_OK'
    	]),
		submit(){
			console.log(this.balance);
			if(this.chips1.length != 1){
				this.$q.notify(`You must select a recipient`)
				return;
			}
			if(this.transfer_amount > this.balance){
				this.$q.notify("The amount of transfer can not be more than your balance")
				return;
			}
			if(this.transfer_amount < 0){
				this.$q.notify("Transfer amount can not be less than zero")
				return;
			}
			let url = 'add-remittance';
			let data = {
				'recipient_name': this.chips1[0],
				'value': this.transfer_amount,
			};
			this.axios
	            .post(url, data)
	            .then((response)=>{
	            	console.log(response);
	            	this.$q.notify({
	            		message: "Transfer success",
	            		type: "positive"
	            	});
					this.$auth.fetch({})
					.then(response => {
						this.LOGIN_OK(response)
					})
	            	this.$router.push({name: 'home'})
	            })
	            .catch((error)=>{
	                console.log(error);
	                this.$q.notify("Transfer failed");
	            })
		},
		init(){
			let url = 'get-persons';
	        this.axios
	            .get(url)
	            .then((response)=>{
	            	console.log(response);
	            	this.recipients = response.data;
	            	if(this.id){
						this.fromTemplate(this.id);
					}
	            })
	            .catch((error)=>{
	                console.log(error);
	            })
		},
		parseRecipients () {
		  return this.recipients.map(person => {
		    return {
		      label: person['name'],
		      value: person['name']
		    }
		  })
		},
		search (terms, done) {
	      setTimeout(() => {
	        done(filter(terms, {field: 'label', list: this.parseRecipients()}))
	      }, 500)
	    },
	    selected (item) {
	    	if(this.chips1.length > 1){
	    		this.chips1.pop();
	    		this.$q.notify(`Currently sending money to multiple recipients is not allowed.`)
	    	}
	    },
	    duplicate (label) {
	      this.$q.notify(`"${label}" already in list`)
	    },
	    changeTransferAmount(newVal)
	    {
	    	console.log(newVal);
	    	if(newVal > this.balance){
	    		this.transfer_amount = 0;
	    		this.$q.notify("The amount of transfer can not be more than your balance")
	    	}
	    	if(newVal < 0){
		    	this.transfer_amount = 0;
		    	this.$q.notify("Transfer amount can not be less than zero")
	    	}
	    }
	},
 
}
</script>

<style>
</style>
