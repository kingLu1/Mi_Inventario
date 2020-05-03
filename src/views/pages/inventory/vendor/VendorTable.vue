<template>
  <div id="table-loader" class="vs-con-loading__container">
    <!--        <network/>-->
    <div id="data-list-list-view " class="data-list-container ">
      <vs-row>
        <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
          <add :isSidebarActive="addVendor" @closeSidebar="addVendor= false" @newVendor="newVendor"
               class=" sidebarX"/>
          <edit :isSidebarActive="editVendor" :selected="selected" @newVendor="newVendor"
                @closeSidebar="editVendor= false"
                class=" sidebarX"/>
        </vs-col>

      </vs-row>
      <!--        class="theme-dark-->
      <vx-card>


        <vs-table max-items="10" pagination stripe hoverFlat noDataText="No Vendor Available"
                  :data="vendors" search>
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
            <div class="flex flex-wrap-reverse items-center">
              <!-- ADD NEW -->
              <div
                class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
                @click="addVendor = true">
                <feather-icon icon="PlusIcon" svgClasses="h-4 w-4"/>
                <span class="ml-2 text-base text-primary">Add New</span>
              </div>
            </div>
          </div>

          <template slot="thead">
            <vs-th sort-key="name">Name</vs-th>
            <vs-th sort-key="contact">Contact</vs-th>
            <vs-th sort-key="phone">Phone</vs-th>
            <vs-th sort-key="created_by">Created By</vs-th>
            <vs-th sort-key="created_on">Created On</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].name">
                {{ data[indextr].name }}
              </vs-td>
              <vs-td :data="data[indextr].contact">
                {{ data[indextr].contact }}
              </vs-td>
              <vs-td :data="data[indextr].phone">
                {{ data[indextr].phone }}
              </vs-td>
              <vs-td :data="data[indextr].created_by">
                {{ data[indextr].created_by }}
              </vs-td>
              <vs-td :data="data[indextr].created_on">
                {{ data[indextr].created_on }}
              </vs-td>
              <vs-td>
                <div class="flex">
                  <vx-tooltip text="See More" position="top">
                    <vs-button type="border" icon-pack="feather" icon="icon-eye"
                               color="primary"
                               class="mr-2" @click="viewMore(tr)">
                    </vs-button>
                  </vx-tooltip>
                  <vx-tooltip text="Edit" position="top">
                    <vs-button type="border" icon-pack="feather" icon="icon-edit-2"
                               color="dark"
                               class="mr-2" @click="edit(tr)">
                    </vs-button>
                  </vx-tooltip>
                  <vx-tooltip text="Delete" position="top">
                    <vs-button s icon-pack="feather" icon="icon-trash"
                               color="danger" @click="openConfirm(tr)">
                    </vs-button>
                  </vx-tooltip>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>

<script>
    import Add from './VendorAdd'
    import Edit from './VendorEdit'
    import {getVendors} from '../../../../stitch/api/inventory'
    import {getClient} from '../../../../stitch/app'

    export default {
        name: "TableVendor",
        data: () => ({
            vendors: [],
            addVendor: false,
            editVendor: false,
            selected: {},
            hide: false,
        }),
        components: {
            Add,
            Edit
        },
        methods: {
            cancel() {
                this.selected = {}
            },
            edit(tr) {
                this.editVendor = true
                this.selected = tr
            },
            openConfirm(tr) {
                this.selected = tr;
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: `Are you sure  you want to delete ${tr.name} vendor?`,
                    accept: this.acceptDelete
                });
            },
            acceptDelete() {
                let data = [{name: this.selected.name}];
                this.$vs.loading({
                    container: '#table-loader',
                    type: 'sound',
                    scale: 1
                });
                getClient().callFunction('VendorDelete', data).then(() => {
                        this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
                        this.getVendors()
                    }
                ).catch(
                    (err) => {
                        this.$vs.loading.close('#table-loader > .con-vs-loading');
                        // console.log(err)
                    }
                )
            },
            getVendors() {
                this.$vs.loading({
                    container: '#table-loader',
                    type: 'sound',
                    scale: 1
                });
                this.axios.get(getVendors).then((res) => {
                    this.vendors = res.data;
                    // console.log(res.data)
                    this.$vs.loading.close('#table-loader > .con-vs-loading');
                }).catch((err) => {
                    this.notify({text: err.message, title: 'Error', color: 'danger'});
                    // console.log(err.message);
                    this.$vs.loading.close('#table-loader  > .con-vs-loading')

                });
            },
            newVendor() {
                this.getVendors()
            },
            viewMore(tr) {
                this.$emit('view', tr)
            }
        },
        mounted() {
            this.getVendors()
        }
    }
</script>

<style scoped>

  .selectExample {
    margin: 10px;
  }

  .con-select-example {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .con-select .vs-select {
    width: 100%
  }

  @media (max-width: 550px) {
    .con-select {
      flex-direction: column;
    }

    .con-select .vs-select {
      width: 100%
    }
  }

</style>
