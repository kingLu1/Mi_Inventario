<template>
  <div class="vs-con-loading__container" id="table-loader">
    <vs-row>
      <vs-col vs-lg="2" vs-sm="4" vs-xs="12">
        <add :isSidebarActive="addUser" @closeSidebar="addUser= false" class=" sidebarX"/>
        <edit :isSidebarActive="editUser" :selected="selected" @closeSidebar="editUser= false" class=" sidebarX"/>
      </vs-col>

    </vs-row>
    <vx-card>
      <vs-table :data="users" hoverFlat max-items="10" noDataText="No User Available" pagination search stripe>
        <div class="flex flex-wrap-reverse items-center flex-grow justify-between" slot="header">
          <div class="flex flex-wrap-reverse items-center">
            <!-- ADD NEW -->
            <div
              @click="addUser = true"
              class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4"/>

              <span class="ml-2 text-base text-primary">Add New</span>
            </div>
          </div>
        </div>

        <template slot="thead">
          <vs-th sort-key="email">Name</vs-th>
          <vs-th sort-key="name">Position</vs-th>
          <vs-th sort-key="website">User Role</vs-th>
          <vs-th sort-key="website">Created By</vs-th>
          <vs-th sort-key="website">Created On</vs-th>
          <vs-th sort-key="website">Actions</vs-th>

        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].first_name ">
              {{ data[indextr].first_name + " " + data[indextr].last_name}}
            </vs-td>

            <vs-td :data="data[indextr].post">
              {{ data[indextr].post }}
            </vs-td>

            <vs-td :data="data[indextr].role">
              {{ data[indextr].role }}
            </vs-td>
            <vs-td :data="data[indextr].created_by">
              {{ data[indextr].created_by }}
            </vs-td>
            <vs-td :data="data[indextr].created_at">
              {{ data[indextr].created_at }}
            </vs-td>
            <vs-td>
              <div class="flex">
                <vx-tooltip position="top" text="Edit User">
                  <vs-button @click="EditUser(tr)" class="mr-2" color="dark"
                             icon="icon-edit-2"
                             icon-pack="feather" type="border">
                  </vs-button>
                </vx-tooltip>
                <!--                <vx-tooltip position="top" text="Deactivate User" v-if="$acl.check('superAdmin')" v-show="tr.active">-->
                <!--                  <vs-button @click="disableUser(tr)" class="mr-2"-->
                <!--                             color="warning"-->
                <!--                             icon="icon-shield-off" icon-pack="feather">-->
                <!--                  </vs-button>-->
                <!--                </vx-tooltip>-->
                <!--                <vx-tooltip position="top" text="Activate User" v-if="$acl.check('superAdmin')" v-show="!tr.active">-->
                <!--                  <vs-button @click="" class="mr-2"-->
                <!--                             color="success"-->
                <!--                             icon="icon-shield" icon-pack="feather">-->
                <!--                  </vs-button>-->
                <!--                </vx-tooltip>-->
                <!--                <vx-tooltip position="top" text="Delete User" v-if="$acl.check('superAdmin')">-->
                <!--                  <vs-button @click="openConfirm(tr)" color="danger"-->
                <!--                             icon="icon-trash" icon-pack="feather">-->
                <!--                  </vs-button>-->
                <!--                </vx-tooltip>-->
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
  import add from './UserAdd';
  import edit from './UserEdit';
  import {getAllUsers} from '../../../stitch/api/user'
  import {getClient} from "../../../stitch/app";

  export default {
    name: "User",
    data: () => ({
      users: [],
      user: [],
      addUser: false,
      editUser: false,
      selected: {}
    }),
    components: {
      add, edit
    },
    computed: {
      isSidebarActiveLocal: {
        get() {
          return this.isSidebarActive
        },
        set(val) {
          if (!val) {
            this.$emit('closeSidebar');
          }
        }
      }
    },
    methods: {
      getAllUsers() {
        this.$vs.loading({
          container: '#table-loader',
          type: 'sound',
          scale: 1
        });
        this.axios.get(getAllUsers).then((res) => {
          this.users = res.data;
          this.$vs.loading.close('#table-loader > .con-vs-loading');
        }).catch((err) => {
          this.notify({text: err.message, title: 'Error', color: 'danger'});
          this.$vs.loading.close('#table-loader  > .con-vs-loading')

        });
      },
      EditUser(tr) {
        this.editUser = true;
        this.selected = tr
      },
      openConfirm(tr) {
        this.user = tr;
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Confirm`,
          text: `Are you sure  you want to delete User ${tr.first_name + ' ' + tr.last_name}?`,
          accept: this.acceptDelete
        });
      },
      // acceptDelete() {
      //   let data = [{date: this.selected.date}];
      //   this.$vs.loading({
      //     container: '#table-loader',
      //     type: 'sound',
      //     scale: 1
      //   });
      // getClient().callFunction('PurchaseDelete', data).then(() => {
      //     this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
      //     this.getPurchases()
      //   }
      // ).catch(
      //   (err) => {
      //     this.$vs.loading.close('#table-loader > .con-vs-loading');
      //     console.log(err)
      //   }
      // )
      // },
      // disableUser(tr) {
      // let url = ` https://stitch.mongodb.com/api/admin/v3.0/groups/self/apps/Whatelse/users/${tr.user_id}/disable`
      // this.axios.put(url)
      // }

    },
    created() {

    },
    mounted() {
      this.getAllUsers()
    }
  }
</script>
<style lang="scss" scoped>
  #data-list-list-view {
    .vs-con-table {
      .vs-table--header {
        .vs-table--search {
          padding-top: 0;
          width: 100%;

          .vs-table--search-input {
            padding: 0.9rem 2.5rem;
            font-size: 1rem;

            & + i {
              left: 1rem;
            }

            &:focus + i {
              left: 1rem;
            }
          }
        }
      }

      .vs-table--pagination {
        justify-content: left;
      }
    }
  }
</style>
