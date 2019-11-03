/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

import {app} from './stitch/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'dashboard',
          component: () => import('./views/pages/dashboard/Index.vue'),
          meta: {
            requiresAuth: true
          }
        },

        // Inventory

        {
          path: '/inventory/category',
          name: 'category',
          component: () => import('./views/pages/inventory/category/Category.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Categories', active: true},
            ],
            pageTitle: 'Inventory',
            requiresAuth: true
          }
        },
        {
          path: '/inventory/product',
          name: 'product',
          component: () => import('./views/pages/inventory/product/ProductIndex.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Products', active: true},
            ],
            pageTitle: 'Inventory',
            requiresAuth: true
          }
        }
        ,
        {
          path: '/inventory/vendor',
          name: 'vendor',
          component: () => import('./views/pages/inventory/vendor/Vendor.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Vendors', active: true},
            ],
            pageTitle: 'Inventory',
            requiresAuth: true
          }
        },

        // Sales

        {
          path: '/sales/bar',
          name: 'sales_bar',
          component: () => import('./views/pages/sale/bar/Bar.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Bar', active: true},
            ],
            pageTitle: 'Sales',
            requiresAuth: true
          }
        },
        {
          path: '/sales/barbeque',
          name: 'sales_barbecue',
          component: () => import('./views/pages/sale/barbeque/Barbeque.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Barbeque', active: true},
            ],
            pageTitle: 'Sales',
            requiresAuth: true
          }
        },
        {
          path: '/sales/kitchen',
          name: 'sales_kitchen',
          component: () => import('./views/pages/sale/kitchen/Kitchen.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Kitchen', active: true},
            ],
            pageTitle: 'Sales',
            requiresAuth: true
          }
        },
        {
          path: '/sales/pool',
          name: 'sales_pool',
          component: () => import('./views/pages/sale/pool/Pool.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Pool', active: true},
            ],
            pageTitle: 'Sales',
            requiresAuth: true
          }
        },

        // Report
        {
          path: '/report',
          name: 'report',
          component: () => import('./views/pages/report/Report.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'All', active: true},
            ],
            pageTitle: 'Report',
            requiresAuth: true
          }
        },

        // Expense
        {
          path: '/expense',
          name: 'expense',
          component: () => import('./views/pages/expense/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'All', active: true},
            ],
            pageTitle: 'Expense',
            requiresAuth: true
          }
        },

        //purchases

        {
          path: '/purchase/bar',
          name: 'purchase_bar',
          component: () => import('./views/pages/purchase/bar/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Bar', active: true},
            ],
            pageTitle: 'Purchase',
            requiresAuth: true
          }
        }, {
          path: '/purchase/barbeque',
          name: 'purchase_barbeque',
          component: () => import('./views/pages/purchase/barbeque/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Barbeque', active: true},
            ],
            pageTitle: 'Purchase',
            requiresAuth: true
          }
        }, {
          path: '/purchase/kitchen',
          name: 'purchase_kitchen',
          component: () => import('./views/pages/purchase/kitchen/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'Kitchen', active: true},
            ],
            pageTitle: 'Purchase',
            requiresAuth: true
          }
        },
        // {
        //   path: '/purchase/pool',
        //   name: 'purchase_pool',
        //   component: () => import('./views/pages/purchase/pool/Index.vue'),
        //   meta: {
        //     breadcrumb: [
        //       {title: 'Dashboard', url: '/'},
        //       {title: 'Pool', active: true},
        //     ],
        //     pageTitle: 'Purchase',
        //     requiresAuth: true
        //   }
        // },

      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/login',
          name: 'page-login',
          component: () => import('./views/auth/Login.vue')
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('./views/error/Error404.vue')
        },
        {
          path: '/not-authorised',
          name: 'notAuthorised',
          component: () => import('./views/error/NotAuthorized.vue')
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: () => import('./views/auth/ForgotPassword')
        }, {
          path: '/reset-password',
          name: 'resetPassword',
          component: () => import('./views/auth/ResetPassword')
        }, {
          path: '/confirm-email',
          name: 'confirmEmail',
          component: () => import('./views/auth/ConfirmEmail')
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

router.beforeEach((to, from, next) => {
  const currentUser = app.auth.isLoggedIn;


  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // const appLoading = document.getElementById('loading-bg')
  // if (appLoading) {
  //     appLoading.style.display = "none";
  // }
  if (requiresAuth && !currentUser) next('/login');
  else if (requiresAuth && currentUser) next();
  else if (!requiresAuth && currentUser) next();
  else next()

});

export default router
