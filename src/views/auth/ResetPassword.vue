<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Reset Password</h4>
                                    <p>Please enter your new password.</p>
                                </div>
                                <vs-input type="email" label-placeholder="Email" class="w-full mb-6"/>
                                <div class="mb-6">
                                    <vs-input type="password"
                                              ref="password"
                                              name="password"
                                              v-model="newPassword"
                                              v-validate="'required|min:6'"
                                              data-vv-validate-on="blur"
                                              label-placeholder="Password"
                                              class="w-full"/>
                                    <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

                                </div>
                                <div class="mb-8">
                                    <vs-input
                                            type="password"
                                            name="confirm password"
                                            v-model="confirmPassword"
                                            v-validate="'required|confirmed:password'"
                                            data-vv-validate-on="blur"
                                            label-placeholder="Confirm Password"
                                            class="w-full"/>
                                    <span class="text-danger text-sm" v-show="errors.has('confirm password')">{{ errors.first('confirm password') }}</span>
                                </div>

                                <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                                    <vs-button type="border" to="/login"
                                               class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">Go Back To Login
                                    </vs-button>
                                    <vs-button class="w-full sm:w-auto" id="resetLoadableButton"
                                               ref="reset"
                                               @click="setNewPassword"
                                    >Reset
                                    </vs-button>
                                </div>

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
                params: '',
                tokenId: '',
                newPassword: '',
                confirmPassword: '',
                backgroundLoading: '#7367F0',
                colorLoading: 'white',

            }
        },
        methods: {
            getParams() {
                const url = window.location.search;
                const params = new URLSearchParams(url);
                this.token = params.get('token');
                this.tokenId = params.get('tokenId');
            },
            setNewPassword() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.$vs.loading({
                            background: this.backgroundLoading,
                            color: this.colorLoading,
                            container: "#resetLoadableButton",
                            scale: 0.45
                        });
                        emailPassClient.resetPassword(this.token, this.tokenId, this.newPassword).then(() => {
                            this.$vs.loading.close('#resetLoadableButton > .con-vs-loading');
                            this.$vs.notify({
                                time: 2500,
                                title: '',
                                text: 'Successfully Reset Password!',
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
                        });
                    } else {
                        // form have errors
                    }
                })

            }

        },
        created() {
            this.getParams()
        }

    }
</script>
