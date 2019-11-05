<template>
  <div id="table-loader" class="vs-con-loading__container">
    <!--        <network/>-->
    <div id="data-list-list-view " class="data-list-container ">
      <vs-row>
        <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
          <add :isSidebarActive="addCategory" @closeSidebar="addCategory= false" @newCategory="newCategory"
               class=" sidebarX"/>
          <edit :isSidebarActive="editCategory" :selected="selected" @closeSidebar="editCategory= false"
                class=" sidebarX"/>
        </vs-col>

      </vs-row>
      <!--        class="theme-dark-->
      <vx-card>
        <vs-table max-items="10" pagination stripe hoverFlat noDataText="No Category Available"
                  :data="categories" search>
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
            <div class="flex flex-wrap-reverse items-center">
              <!-- ADD NEW -->
              <div
                class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
                @click="addCategory = true">
                <feather-icon icon="PlusIcon" svgClasses="h-4 w-4"/>
                <span class="ml-2 text-base text-primary">Add New</span>
              </div>
            </div>
          </div>

          <template slot="thead">
            <vs-th>#</vs-th>
            <vs-th sort-key="name">Name</vs-th>
            <vs-th sort-key="created_by">Created By</vs-th>
            <vs-th sort-key="created_on">Created On</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr]">
                {{ indextr + 1 }}
              </vs-td>
              <vs-td :data="data[indextr].name">
                {{ data[indextr].name }}
              </vs-td>
              <vs-td :data="data[indextr].created_by">
                {{ data[indextr].created_by }}
              </vs-td>
              <vs-td :data="data[indextr].created_on">
                {{ data[indextr].created_on }}
              </vs-td>
              <vs-td>
                <div class="flex">
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
    import Add from './CategoryAdd'
    import Edit from './CategoryEdit'
    import {category} from '../../../../stitch/api/category'
    import {getClient} from '../../../../stitch/app'

    export default {
        name: "Category",
        data: () => ({
            categories: [],
            addCategory: false,
            editCategory: false,
            selected: {},
            hide: false
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
                this.editCategory = true;
                this.selected = tr
            },
            openConfirm(tr) {
                this.selected = tr;
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Confirm`,
                    text: `Are you sure  you want to delete ${tr.name} category?`,
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
                getClient().callFunction('CategoryDelete', data).then(() => {
                        this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
                        this.getCategories()
                    }
                ).catch(
                    (err) => {
                        this.$vs.loading.close('#table-loader > .con-vs-loading');
                        console.log(err)
                    }
                )
            },
            getCategories() {
                this.$vs.loading({
                    container: '#table-loader',
                    type: 'sound',
                    scale: 1
                });
                this.axios.get(category).then((res) => {
                    console.log(res.data);
                    this.categories = res.data;
                    this.$vs.loading.close('#table-loader > .con-vs-loading');
                }).catch((err) => {
                    this.$vs.notify({
                        time: 2500,
                        title: 'Error',
                        text: err.message,
                        position: 'top-right',
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    });
                    console.log(err.message);
                    this.$vs.loading.close('#table-loader  > .con-vs-loading')

                });
            },
            newCategory() {
                this.getCategories()
            }
        },
        mounted() {
            this.getCategories()
        }
    }
</script>

<style scoped>
  body {
    background: black;
  }
</style>
