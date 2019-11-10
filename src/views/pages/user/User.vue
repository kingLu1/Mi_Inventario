<template>
  <div id="table-loader" class="vs-con-loading__container">
    <vs-row>
      <vs-col vs-lg="2" vs-sm="4" vs-xs="12">
        <add :isSidebarActive="addUser" @closeSidebar="addUser= false" class=" sidebarX"/>
      </vs-col>

    </vs-row>
    <!--        class="theme-dark-->
    <vx-card>
      <vs-table max-items="10" stripe hoverFlat noDataText="No User Available" pagination :data="users" search>
        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
          <div class="flex flex-wrap-reverse items-center">
            <!-- ADD NEW -->
            <div
              class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
              @click="addUser = true">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4"/>

              <span class="ml-2 text-base text-primary">Add New</span>
            </div>
          </div>
        </div>

        <template slot="thead">
<!--          <vs-th sort-key="id">Id</vs-th>-->
          <vs-th sort-key="email">Name</vs-th>
          <vs-th sort-key="name">Position</vs-th>
          <vs-th sort-key="website">User Role</vs-th>
          <vs-th sort-key="website">Created By</vs-th>
          <vs-th sort-key="website">Created On</vs-th>
          <vs-th sort-key="website">Actions</vs-th>

        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
<!--            <vs-td :data="data[indextr].id">-->
<!--              {{ data[indextr].id }}-->
<!--            </vs-td>-->
            <vs-td :data="data[indextr].first_name ">
              {{ data[indextr].first_name + " " + data[indextr].last_name}}
            </vs-td>

            <vs-td :data="data[indextr].post">
              {{ data[indextr].post }}
            </vs-td>

            <vs-td :data="data[indextr].role">
              {{ data[indextr].role }}
            </vs-td> <vs-td :data="data[indextr].created_by">
              {{ data[indextr].created_by }}
            </vs-td>
            <vs-td :data="data[indextr].created_at">
              {{ data[indextr].created_at }}
            </vs-td>
            <vs-td>
              <div class="flex">
                <vx-tooltip text="View" position="top">
                  <vs-button type="border" icon-pack="feather" icon="icon-eye"
                             color="primary"
                             class="mr-2" @click="">
                  </vs-button>
                </vx-tooltip>
                <vx-tooltip text="Edit" position="top">
                  <vs-button type="border" icon-pack="feather" icon="icon-edit-2"
                             color="dark"
                             class="mr-2" @click="">
                  </vs-button>
                </vx-tooltip>

                <vx-tooltip text="Delete" position="top">
                  <vs-button  icon-pack="feather" icon="icon-trash"
                             color="danger" @click="">
                  </vs-button>
                </vx-tooltip>
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
    // import {db} from "../../../firebase/firebaseConfig";

    import {getAllUsers} from '../../../stitch/api/user'

    export default {
        name: "User",
        data: () => ({
            users: [
                // {
                //     id: 1,
                //     "name": "Leanne Graham",
                //     "username": "Bret",
                //     "email": "Sincere@april.biz",
                //     "website": "hildegard.org",
                // },
                // {
                //     "id": 2,
                //     "name": "Ervin Howell",
                //     "username": "Antonette",
                //     "email": "Shanna@melissa.tv",
                //     "website": "anastasia.net",
                // },
                // {
                //     "id": 3,
                //     "name": "Clementine Bauch",
                //     "username": "Samantha",
                //     "email": "Nathan@yesenia.net",
                //     "website": "ramiro.info",
                // },
                // {
                //     "id": 4,
                //     "name": "Patricia Lebsack",
                //     "username": "Karianne",
                //     "email": "Julianne.OConner@kory.org",
                //     "website": "kale.biz",
                // },
                // {
                //     "id": 5,
                //     "name": "Chelsey Dietrich",
                //     "username": "Kamren",
                //     "email": "Lucio_Hettinger@annie.ca",
                //     "website": "demarco.info",
                // },
                // {
                //     "id": 6,
                //     "name": "Mrs. Dennis Schulist",
                //     "username": "Leopoldo_Corkery",
                //     "email": "Karley_Dach@jasper.info",
                //     "website": "ola.org",
                // },
                // {
                //     "id": 7,
                //     "name": "Kurtis Weissnat",
                //     "username": "Elwyn.Skiles",
                //     "email": "Telly.Hoeger@billy.biz",
                //     "website": "elvis.io",
                // },
                // {
                //     "id": 8,
                //     "name": "Nicholas Runolfsdottir V",
                //     "username": "Maxime_Nienow",
                //     "email": "Sherwood@rosamond.me",
                //     "website": "jacynthe.com",
                // },
                // {
                //     "id": 9,
                //     "name": "Glenna Reichert",
                //     "username": "Delphine",
                //     "email": "Chaim_McDermott@dana.io",
                //     "website": "conrad.com",
                // },
                // {
                //     "id": 10,
                //     "name": "Clementina DuBuque",
                //     "username": "Moriah.Stanton",
                //     "email": "Rey.Padberg@karina.biz",
                //     "website": "ambrose.net",
                // }
            ],
            user: [],
            addUser: false
        }),
        components: {
            add
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
            }
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
