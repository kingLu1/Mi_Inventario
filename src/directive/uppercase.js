
Vue.directive('uppercase', {
  update (el) {
    el.value = el.value.toUpperCase()
  },
})
