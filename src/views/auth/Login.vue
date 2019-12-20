<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img .vs-con-loading__container" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col sm:w-full md:w-full lg:w-full mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">WhatElse</h4>
                                    <p>Welcome back, please login to your account.</p>
                                </div>
                                <vs-input
                                        name="email"
                                        icon="icon icon-user"
                                        icon-pack="feather"
                                        label-placeholder="Email"
                                        v-model="email"
                                        v-validate="'required|email'"
                                        data-vv-validate-on="blur"
                                        class="w-full no-icon-border"/>
                                <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                                <vs-input
                                        type="password"
                                        name="password"
                                        icon="icon icon-lock"
                                        icon-pack="feather"
                                        label-placeholder="Password"
                                        v-model="password"
                                        v-validate="'required'"
                                        data-vv-validate-on="blur"
                                        class="w-full mt-6 no-icon-border"/>
                                <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>


                                <div class="flex flex-wrap justify-between my-5">
                                    <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                                    <router-link to="/forgot-password">Forgot Password?</router-link>
                                </div>
                                <vs-button class="float-right downButton" @click="login" ref="loadableButton"
                                           id="button-with-loading">Login
                                </vs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                email: '',
                password: '',
                checkbox_remember_me: false,
                backgroundLoading: '#7367F0',
                colorLoading: 'white',
            }
        },
        methods: {
            login() {
                const payload = {
                    checkbox_remember_me: this.checkbox_remember_me,
                    userDetails: {
                        email: this.email,
                        password: this.password
                    },
                    notify: this.$vs.notify,
                    loading: this.$vs.loading
                };
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.$vs.loading({
                            background: this.backgroundLoading,
                            color: this.colorLoading,
                            container: "#button-with-loading",
                            scale: 0.45
                        });
                        this.$store.dispatch('loginAttempt', payload);
                    } else {
                        // steps have errors
                    }
                })
            },
            checkForRememberMe() {
                const remember_me = localStorage.getItem('remember_me');
                const last_email = localStorage.getItem('lastEmail');
                if (remember_me) {
                    this.email = last_email;
                    this.checkbox_remember_me = remember_me
                } else {
                    this.email = '';
                    this.checkbox_remember_me = false
                }

            }
        },
        created() {
            this.checkForRememberMe()
        }
    }
</script>

<style lang="scss">
    #page-login {
        .downButton {
            margin-bottom: 20px;
        }
    }
</style>
