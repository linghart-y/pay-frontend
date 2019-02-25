<template>
  <q-layout view="lHh Lpr lFf" v-if="this.$store.state.auth.loggedIn">

    <q-layout-header>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen">
          <q-icon name="mdi-menu" />
        </q-btn>
        <q-toolbar-title class="gt-sm hidden-sm">
          Payment system
          <div slot="subtitle">Test task for Sharp developers</div>
        </q-toolbar-title>
        <q-toolbar-title v-if="hasUserInfo">
          <div class="text-center">{{userName}}</div>
          <div class="text-center" slot="subtitle"><b>{{userBalance}} PW</b></div>
        </q-toolbar-title>
<!--         <div v-if="hasUserInfo">
          <div>{{userName}}</div>
          <div><b>{{userBalance}} PW</b></div>
        </div> -->
        <q-tabs class="float-right">
          <q-route-tab slot="title" to="/" icon="mdi-home"/>
          <q-route-tab slot="title" to="account" icon="mdi-face"/>
          <q-tab slot="title" v-on:click="logout()" icon="mdi-logout-variant"/>
        </q-tabs>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-item @click.native="$router.push({'name': 'home'})">
          <q-item-side icon="mdi-home"/>
          <q-item-main label="Home"/>
        </q-item>

        <q-item v-if="this.$store.state.auth.User.role == 'admin'" @click.native="$router.push({'name': 'admin'})">
          <q-item-side icon="mdi-tune"/>
          <q-item-main label="Admin"/>
        </q-item>
        
        <q-item @click.native="$router.push({'name': 'new_payment'})">
          <q-item-side color="green-9" icon="mdi-plus"/>
          <q-item-main class="text-green-9" label="New payment"/>
        </q-item>

        <q-item @click.native="$router.push({'name': 'all_payments'})">
          <q-item-side icon="mdi-inbox-multiple"/>
          <q-item-main label="Last account activity"/>
        </q-item>
        
      </q-list>
    </q-layout-drawer>

    <q-page-container style="padding-top:54px">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapMutations } from 'vuex'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: true,
      leftOverlay: false,
      leftBreakpoint: 992,
      hasUserInfo: false,
    }
  },
  computed:{
    userName(){
      return this.$store.state.auth.User.firstName + ' ' + this.$store.state.auth.User.lastName;
    },
    userBalance(){
      return this.$store.state.auth.User.balance
    }
  },
  methods: {
    ...mapMutations('auth', [
      'LOGIN_OK'
    ]),
    openURL,
    logout () {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/login',
        success () {
          console.log('success ')
        },
        error () {
          console.log('error ')
        }
      })
    }
  },
  mounted: function () {
    this.$auth.fetch({})
      .then(response => {
        this.hasUserInfo = true;
        this.LOGIN_OK(response)
        this.$auth.user().role = this.$store.state.auth.User.role; 
      })
  }
}
</script>

<style>
</style>
