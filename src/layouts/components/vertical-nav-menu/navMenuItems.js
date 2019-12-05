/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
  }, {
    url: "/dashboard",
    name: "Dashboard",
    slug: "home",
    icon: "ImageIcon",
  },
  {
    url: "/expense",
    name: "Expense",
    slug: "expense",
    icon: "DollarSignIcon",
  },
  {
    url: "null",
    name: "Inventory",
    slug: "inventory",
    icon: "FolderIcon",
    submenu: [
      {
        url: '/inventory/category',
        name: "Category",
        slug: "category",
      },
      {
        url: '/inventory/product',
        name: "Product",
        slug: "product",
      },

      {
        url: '/inventory/vendor',
        name: "Vendor",
        slug: "vendor"
      }
    ]
  },
  {
    url: "null",
    name: "Purchasing",
    slug: "purchase",
    icon: "TruckIcon",
    submenu: [
      {
        url: '/purchase/bar',
        name: "Bar",
        slug: "purchase_bar",
      },
      // {
      //   url: '/purchase/barbeque',
      //   name: "Barbeque",
      //   slug: "purchase_barbeque",
      // },
      // {
      //   url: '/purchase/kitchen',
      //   name: "Kitchen",
      //   slug: "purchase_kitchen",
      // },
      // {
      //   url: '/purchase/pool',
      //   name: "Pool",
      //   slug: "purchase_pool",
      // },
    ]
  },
  {
    url: "/report",
    name: "Report",
    slug: "report",
    icon: "ArchiveIcon",
  },
  {
    url: "null",
    name: "Sales",
    slug: "report",
    icon: "TrendingUpIcon",
    submenu: [
      {
        url: '/sales/bar',
        name: "Bar",
        slug: "sales_bar",
      },
      // {
      //   url: '/sales/barbeque',
      //   name: "Barbeque",
      //   slug: "sales_barbecue",
      // }, {
      //   url: '/sales/kitchen',
      //   name: "Kitchen",
      //   slug: "sales_kitchen",
      // }, {
      //   url: '/sales/pool',
      //   name: "Pool",
      //   slug: "sales_pool",
      // },
    ]
  },
  {
    url: "/users",
    name: "Users",
    slug: "users",
    icon: "UsersIcon",
  },

]
