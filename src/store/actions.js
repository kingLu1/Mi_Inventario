/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
// Auth
import {app} from "../stitch/app";
import {UserPasswordCredential} from "mongodb-stitch-browser-sdk";
import router from '@/router'
// Auth


const actions = {

  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({commit}, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage({commit}, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited({commit}, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({commit}, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({commit}) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme({commit}, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({commit}, payload) {
    commit('UPDATE_USER_INFO', payload)
  },

  ////////////////////// Auth //////////////////////////////////
  loginAttempt({dispatch}, payload) {
    if (!payload.checkbox_remember_me) {
      localStorage.removeItem('remember_me');
      localStorage.removeItem('lastEmail')
      if (app.auth.isLoggedIn) {
        payload.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-right',
          color: 'warning'
        });
        router.push('/')

      } else {
        dispatch('login', payload)
      }

    } else {
      localStorage.setItem('remember_me', true);
      localStorage.setItem('lastEmail', payload.userDetails.email)
      dispatch('login', payload)
    }
  },

  login({commit, state}, payload) {
    const credential = new UserPasswordCredential(payload.userDetails.email, payload.userDetails.password);
    app.auth.loginWithCredential(credential)
      .then(() => {
        payload.loading.close("#button-with-loading > .con-vs-loading");
        router.push('/');
        payload.notify({
          time: 2500,
          title: 'Welcome Back',
          text: 'Successfully Logged In.',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        });

      }).catch((err) => {
      payload.loading.close("#button-with-loading > .con-vs-loading");
      payload.notify({
        time: 2500,
        title: 'Error',
        text: err.message,
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    })
  },
  logoutCurrentUser({commit, state}, payload) {
    // Logout the currently logged in user (if there is one)
    if (app.auth.isLoggedIn) {
      return app.auth.logoutUserWithId(app.auth.user.id).then(() => {
          router.push('/login');
          payload.notify({
            time: 2500,
            title: 'Goodbye',
            text: 'Successfully Logged Out.',
            position: 'top-right',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          });
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
    }
  }
  ////////////////////// Auth //////////////////////////////////

}

export default actions
