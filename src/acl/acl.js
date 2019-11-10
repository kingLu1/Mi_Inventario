import Vue from "vue"
import { AclInstaller, AclCreate, AclRule } from "vue-acl"
import router from "@/router"
import store from "../store/store"

Vue.use(AclInstaller)

let initialRole = "public"

let userInfo = store.state.AppActiveUser
if(userInfo && userInfo.role) initialRole = userInfo.role

console.log(initialRole)

export default new AclCreate({
  initial: initialRole,
  notfound: "/not-authorised",
  router,
  acceptLocalRules: true,
  globalRules: {
    superAdmin: new AclRule("super").generate(),
    admin: new AclRule("Admin").or('SuperAdmin').generate(),
    staff: new AclRule("Staff").or("admin").or("superAdmin").generate(),
    public: new AclRule("public").or("admin").or("superAdmin").or("staff").generate(),
  }
})
