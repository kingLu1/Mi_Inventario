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
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            requiresAuth: true,
            rule: 'public'
          },

        }, {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/pages/dashboard/Index.vue'),
          meta: {
            requiresAuth: true,
            rule: 'superAdmin'
          },

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
            requiresAuth: true,
            rule: 'staff'
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
            requiresAuth: true,
            rule: 'public'

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
            requiresAuth: true,
            rule: 'staff'

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
            requiresAuth: true,
            rule: 'admin'

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
            requiresAuth: true,
            rule: 'admin',

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
            requiresAuth: true,
            rule: 'admin'

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
            requiresAuth: true,
            rule: 'admin'

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
            requiresAuth: true,
            rule: 'admin'

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
            requiresAuth: true,
            rule: 'admin'

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
            requiresAuth: true,
            rule: 'admin'
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
            requiresAuth: true,
            rule: 'admin'
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
            requiresAuth: true,
            rule: 'admin'
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/pages/user/User'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/'},
              {title: 'All', active: true},
            ],
            pageTitle: 'Users',
            requiresAuth: true,
            rule: 'superAdmin'
          }
        },


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
          component: () => import('./views/auth/Login.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('./views/error/Error404.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/not-authorised',
          name: 'notAuthorised',
          component: () => import('./views/error/NotAuthorized.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: () => import('./views/auth/ForgotPassword'),
          meta: {
            rule: 'public'
          }
        }, {
          path: '/reset-password',
          name: 'resetPassword',
          component: () => import('./views/auth/ResetPassword'),
          meta: {
            rule: 'public'
          }
        }, {
          path: '/confirm-email',
          name: 'confirmEmail',
          component: () => import('./views/auth/ConfirmEmail'),
          meta: {
            rule: 'public'
          }
        },
      ]
    },
    {
      path: '',
      component: () => import('@/layouts/custom/NoNavBar'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/user/profile',
          name: 'profile',
          component: () => import('./views/pages/user/Profile'),
          meta: {
            requiresAuth: true,
            rule: 'public'
          }
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404',
      meta: {
        rule: 'public'
      }
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
