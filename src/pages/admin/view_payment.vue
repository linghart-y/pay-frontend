<template>
  <q-page padding>
    <table class="table" v-if="payment">
      
      <tr>
        <td>Sender id</td>
        <td>{{payment.sender_id}}</td>
      </tr>

      <tr>
        <td>Sender name</td>
        <td>{{payment.sender_name}}</td>
      </tr>

      <tr>
        <td>Recipient id</td>
        <td>{{payment.recipient_id}}</td>
      </tr>

      <tr>
        <td>Sender name</td>
        <td>{{payment.recipient_name}}</td>
      </tr>

      <tr>
        <td>Value</td>
        <td>{{payment.value}}</td>
      </tr>

      <tr>
        <td>Created at</td>
        <td>{{payment.created_at}}</td>
      </tr>

    </table>
  </q-page>
</template>

<script>
export default {
  props: ['id'],
  name: 'ViewPayment',
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
    }
  },
  mounted(){
    this.init()
  },
}
</script>

<style>
</style>
