<template>
    <div class="login__box">
        <div class="login__head_box">
            realmetric
        </div>
        <div class="logo__box">
            <img src="https://avatars2.githubusercontent.com/u/16989772?s=200&v=4"/>
        </div>
        <div class="info info--error" v-if="infoError">Login failed</div>
        <div class="form__row">
            <div class="row">
                <div class="row">
                    <div class="input-field col s12">
                        <input placeholder="Login" type="text" v-model="username" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="password" name="password" placeholder="Password" v-model="password"
                               required/>
                    </div>
                </div>
                <button v-on:click="login()" type="submit" id="login__button">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import router from '@/router';
  import store from '@/store';
  import {apiPath, createAuthToken} from '@/lib/helpers'

  export default {
    name: 'index',
    data() {
      return {
        infoError: false,
        username: '',
        password: '',
      }
    },
    beforeCreate() {
      /** If user loggined redirect to main page **/
      if (store.state.isLogged) {
        router.push('/');
      }
    },
    methods: {
      login() {
        const token = createAuthToken(this.username, this.password);

        /** Set global basic auth headers **/
        Vue.http.interceptors.push(function (request, next) {
          request.headers.set('Authorization', `Basic ${token}`);
          next()
        });

        /** Load slices set auth token to local storage  **/
        this.$http.get('slices').then((response) => {
          localStorage.setItem('token', token);
          store.commit('LOGIN_USER');
          router.push('/');
        }, () => {
          this.infoError = true;
          this.password = '';
        });
      }
    }
  }
</script>
