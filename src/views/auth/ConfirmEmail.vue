<template>
    <!--    TODO: more styling-->
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-2/4 xl:w-2/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col  sm:w-full md:w-full lg:w-full   d-theme-dark-bg">
                            <div class="p-16">
                                <div class="vx-card__title mb-6 ">
                                    <h4 class="mb-4 text-center">Confirm Your Email Address</h4>
                                    <p>Hi there,</p>
                                    <p>Tap the button below to confirm your email address.</p>
                                    <p>If you didn't create an account with Whatelse Bar, You can safely delete this
                                        email.</p>

                                </div>

                                <div class="flex w-full justify-center  ">
                                    <vs-button size="large" class="w-full sm:w-auto self-center "
                                               id="resetLoadableButton"
                                               ref="reset" @click="confirmEmail"
                                    >Verify My Email
                                    </vs-button>
                                </div>
<!--                                <div class="vx-card__title mt-6 ">-->
<!--                                    <p>If that doesn't work, copy and paste this link in your browser: <a-->
<!--                                            href="https://working">https://workin</a></p>-->

<!--                                </div>-->
                                <div class="vx-card__title mt-6 ">
                                    <h6>WhatElse Team</h6>

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
        name: "ConfirmEmail",
        data() {
            return {
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
            confirmEmail() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.$vs.loading({
                            background: this.backgroundLoading,
                            color: this.colorLoading,
                            container: "#resetLoadableButton",
                            scale: 0.45
                        });
                        emailPassClient.confirmUser(this.token, this.tokenId).then((res) => {
                            console.log(res)
                            this.$vs.loading.close('#resetLoadableButton > .con-vs-loading');
                            this.$router.push('/login')
                            this.$vs.notify({
                                time: 2500,
                                title:'Successful',
                                text: 'Sign In Now!',
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

            },
            resend() {
                emailPassClient.resendConfirmationEmail('kingm4159@gmail.com').then(() => {
                    this.$vs.loading.close('#resetLoadableButton > .con-vs-loading');
                    this.$vs.notify({
                        time: 2500,
                        title: '',
                        text: 'Successfully Confirmed Email!',
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
                })

            }

        },
        created() {
            this.getParams()
            // this.resend()
        }
    }
</script>

<style scoped>

</style>
