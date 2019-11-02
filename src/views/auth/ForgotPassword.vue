<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Recover your password</h4>
                                    <p>Please enter your email address and we'll send you instructions on how to reset
                                        your password.</p>
                                </div>
                                <div class="mb-8">
                                    <vs-input type="email"
                                              name="email"
                                              v-validate="'required|email'"
                                              data-vv-validate-on="blur"
                                              label-placeholder="Email"
                                              v-model="email"
                                              class="w-full "/>
                                    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>

                                </div>


                                <vs-button type="border" to="/login" class="px-4 w-full md:w-auto">Back To Login
                                </vs-button>
                                <vs-button @click="resetPassword"
                                           id="resetLoadableButton"
                                           ref="reset"
                                           class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">Recover
                                    Password
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
    import {getClient, userPasswordClient} from '../../stitch/app'

    const emailPassClient = getClient().auth.getProviderClient(userPasswordClient);

    export default {
        data() {
            return {
                email: '',
                backgroundLoading: '#7367F0',
                colorLoading: 'white',
            }
        },
        methods: {
            resetPassword() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.$vs.loading({
                            background: this.backgroundLoading,
                            color: this.colorLoading,
                            container: "#resetLoadableButton",
                            scale: 0.45
                        });
                        emailPassClient.sendResetPasswordEmail(this.email).then(() => {
                            this.$vs.loading.close('#resetLoadableButton > .con-vs-loading');
                            this.$vs.notify({
                                time: 2500,
                                title: '',
                                text: 'Successfully sent password reset email!',
                                position: 'top-right',
                                iconPack: 'feather',
                                icon: 'icon-alert-circle',
                                color: 'success'
                            });
                        }).catch(err => {
                            this.$vs.loading.close('#resetLoadableButton > .con-vs-loading');
                            this.$vs.notify({
                                time: 2500,
                                title: 'Error',
                                text: err.message,
                                position: 'top-right',
                                iconPack: 'feather',
                                icon: 'icon-alert-circle',
                                color: 'danger'
                            });
                            console.log("Error sending password reset email:", err);
                        });
                    }
                })
            }
        }
    }
</script>
