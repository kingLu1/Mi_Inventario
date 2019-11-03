export default {
  methods: {
    notify(value) {
      this.$vs.notify({
        time: 2500,
        title: value.title,
        text: value.text,
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: value.color
      });
    }
  }
};
