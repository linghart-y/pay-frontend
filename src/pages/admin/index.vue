<template>
  <q-page>
    <q-tabs>
    	<q-tab default slot="title" name="users" icon="mdi-account-multiple" />
    	<q-tab slot="title" name="payments" icon="mdi-credit-card" />
    	<q-tab-pane name="users"><user-list /></q-tab-pane>
    	<q-tab-pane name="payments"><payment-list /></q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
import userList from "./user_list.vue"
import paymentList from "./payment_list.vue"
export default {
  // name: 'PageName',
  components:{
  	"user-list": userList,
  	"payment-list": paymentList,
  }
}
</script>

<style>
</style>
