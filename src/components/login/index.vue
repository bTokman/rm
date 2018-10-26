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
            if (store.state.isLogged) {
                router.push('/');
            }
        },
        methods: {
            login() {
                const token = createAuthToken(this.username, this.password);

                Vue.http.interceptors.push(function (request, next) {
                    request.headers.set('Authorization', `Basic ${token}`);
                    next()
                });

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

<style scoped>
    .login__box {
        background: #fff;
        width: 80%;
        margin: 0 auto;
        margin-top: 100px;
        position: relative;
    }

    .login__box .form__row {
        width: 100%;
        margin-top: 60px;
    }

    .login__box #login__button {
        height: 45px;
        background: #458cc9;
        cursor: pointer;
        outline: 0;
        margin: 0 auto;
        display: block;
        color: #fff;
        margin-top: 45px;
        text-transform: uppercase;
        width: 100%;
        font-size: 18px;
    }

    .login__box input {
        border: 2px solid #458cc9;
        height: 30px;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 15px;
        display: block;
        text-align: center;
        outline: 0;
    }

    .login__box .login__head_box {
        background: #458cc9;
        color: #fff;
        text-align: left;
        text-transform: uppercase;
        font-size: 18px;
        padding-left: 35px;
        height: 40px;
        line-height: 40px;
        width: 45%;
    }

    .info--error {
        text-align: left;
        top: 0px;
        background: #e24a4a;
        color: #fff;
        text-transform: uppercase;
        position: absolute;
        padding-left: 35px;
        height: 40px;
        line-height: 40px;
        width: 45%;
    }

    .logo__box > img {
        position: absolute;
        width: 35px;
        right: 15px;
        top: 5px;
    }

    @media (min-width: 1000px) {
        .login__box {
            width: 450px;
            margin-top: 10%;
        }
    }

</style>
