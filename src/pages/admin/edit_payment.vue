<template>
  <q-page padding v-if="payment">

<q-input class="q-my-form" id="value" type="text" v-model="payment.value" float-label="Value" required autofocus/>
<q-input class="q-my-form" id="sender_id" type="text" v-model="payment.sender_id" float-label="Sender id" required/>
<q-input class="q-my-form" id="recipient_id" type="text" v-model="payment.recipient_id" float-label="Recipient id" required/>
<q-btn @click="save" color="primary" label="save" class="float-right"/>

  </q-page>
</template>

<script>
export default {
  props: ['id'],
  name: 'EditPayment',
  data(){
	return {
  		payment: null,
  	}
  },
  methods: {
	init(){
      let url = 'admin/get-payment';
      let data = {id: this.id};
      this.axios
          .post(url, data)
          .then((response)=>{
            console.log('payment', response);
            this.payment = response.data;
          })
          .catch((error)=>{
              console.log(error);
          })
    },
    save(){
      let url = 'admin/save-payment';
      let data = {payment: this.payment};
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
  	this.init();
  },
}
</script>

<style>
</style>
