<template lang="html">
  <vx-card title="Activity Timeline">
    <VuePerfectScrollbar class="scroll-area pt-6 px-6" :settings="settings">
      <vx-timeline :data="timelineData"/>
    </VuePerfectScrollbar>
  </vx-card>
</template>

<script>
    import VxTimeline from "@/components/timeline/VxTimeline"
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'


    export default {
        components: {
            VxTimeline,
            VuePerfectScrollbar
        },
        data() {
            return {
                settings: {
                    // perfectScrollbar settings
                    maxScrollbarLength: 30,
                    wheelSpeed: .60,
                },
                timelineData: [
                    {
                        color: "primary",
                        icon: "PlusIcon",
                        title: "Client Meeting",
                        desc: "Bonbon macaroon jelly beans gummi bears jelly lollipop apple",
                        time: "25 mins Ago"
                    },
                    {
                        color: "warning",
                        icon: "MailIcon",
                        title: "Email Newsletter",
                        desc: "Cupcake gummi bears soufflé caramels candy",
                        time: "15 Days Ago"
                    },
                    {
                        color: "danger",
                        icon: "UsersIcon",
                        title: "Plan Webinar",
                        desc: "Candy ice cream cake. Halvah gummi bears",
                        time: "20 days ago"
                    },
                    {
                        color: "success",
                        icon: "LayoutIcon",
                        title: "Launch Website",
                        desc: "Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.",
                        time: "25 days ago"
                    },
                    {
                        color: "primary",
                        icon: "TvIcon",
                        title: "Marketing",
                        desc: "Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.",
                        time: "28 days ago"
                    },
                    {
                        color: "primary",
                        icon: "TvIcon",
                        title: "Story",
                        desc: "Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.",
                        time: "28 days ago"
                    },
                    {
                        color: "primary",
                        icon: "TvIcon",
                        title: "Hell",
                        desc: "Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.",
                        time: "28 days ago"
                    },
                    {
                        color: "primary",
                        icon: "TvIcon",
                        title: "New",
                        desc: "Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.",
                        time: "28 days ago"
                    }
                ],
            }
        }
    }
</script>
<style lang="scss" scoped>
  .scroll-area {
    position: relative;
    margin: auto;
    /*width: 400px;*/
    height: 465px;
  }
</style>
