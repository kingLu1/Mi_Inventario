<template>
  <div class="vx-row flex ">
    <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/2  xl:w-1/2 mt-5">
      <div class="vx-row flex">
        <div class="vx-col w-1/2 sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-2/3">
          <div class="mb-2">
            <p>Select Products<span class="text-danger ml-1">*</span></p>
          </div>
          <v-select label="name" name="Product" v-model="product" v-validate="'required'" :options="allProducts"
                    class="w-full"/>
          <span class="text-danger text-sm"
                v-show="errors.has('Product')">{{ errors.first(' Vendor') }}</span>
        </div>
        <div class="vx-col actions w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3">
          <vs-button @click="addProductToChips" color="success" type="filled" icon-pack="feather" icon="icon-plus"
                     class="mr-2">
            Add
          </vs-button>
        </div>
      </div>
    </div>
    <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mt-5">
      <div class="mb-1">
        <p>Selected Products({{chips.length}})</p>
      </div>
      <vs-chips color="rgb(145, 32, 159)" placeholder="No Products" v-model="chips"
                remove-icon="delete_forever">
        <vs-chip
          :key="chip.name"
          @click="remove(chip)"
          v-for="chip in chips"
          closable
          close-icon="cancel">
          {{ chip.name | capitalize }}
        </vs-chip>
      </vs-chips>
    </div>
  </div>

</template>

<script>
  import vSelect from "vue-select";
  import {getProducts} from '../../../../stitch/api/inventory';


  export default {
    name: "SelectProducts",
    props: {
      chips: {
        required: true
      }
    },
    data: () => ({
      product: '',
      allProducts: [],
      trash: [],
    }),
    components: {
      vSelect,

    },
    methods: {
      addProductToChips() {
        this.$validator.validateAll().then(result => {
            if (result) {
              let product = this.product;
              if (!this.checkInChips(product)) {
                this.chips.unshift(product);
                this.product = "";
                this.removeFromAllProducts(product);
              } else {
                this.notify({
                  title: 'Warning',
                  text: 'Already in Cart',
                  color: 'warning'
                });
              }
            } else {
              // form have errors
            }
          }
        ).catch(err => {
          console.log(err)
        })
      }

      ,
      remove(item) {
        this.chips.splice(this.chips.indexOf(item), 1);
        this.recycle(item)

      }
      ,
      getProducts() {
        this.axios.get(getProducts).then((res) => {
          this.allProducts = res.data
          console.log(res.data)
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      }
      ,
      removeFromAllProducts(p) {
        let product = this.allProducts.find(item => item.name === p.name);
        this.allProducts.splice((this.allProducts.indexOf(product)), 1);
        this.sendToTrash(product)

      }
      ,
      sendToTrash(p) {
        this.trash.push(p)
      }
      ,
      recycle(p) {
        let product = this.trash.find(item => item.name === p.name);
        this.allProducts.push(product)
      }
      ,
      checkInChips(p) {
        let product = this.chips.find(item => item.name === p.name);
        return !!product;

      }
    },
    created() {
      this.getProducts()
    }

  }
</script>

<style scoped>
  .actions {
    align-self: flex-end;
  }
</style>
