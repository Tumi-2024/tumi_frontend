/**
 * path: 'route-path' <- with hyphen for: SEO purpose
 * component: pages/RouteComponent/Index.vue <- PascalCase for: best practice/uniform
 * name: route_name <- snake_case
 */

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/HomePage/Index.vue"),
        name: "home"
      },
      {
        path: "sign-up",
        component: () => import("pages/SignUp/Index.vue"),
        name: "signUp"
      }
    ]
  },
  {
    path: "/sign-in",
    component: () => import("pages/SignIn/Index.vue"),
    name: "signIn"
  },
  // {s,
  {
    path: "/my-page",
    component: () => import("layouts/MyPageLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/MyPage/Index"),
        name: "my_page"
      },
      {
        path: "area",
        component: () => import("pages/AreaPage/Index.vue"),
        name: "area"
      },
      {
        path: "property-interest",
        component: () => import("pages/PropertyInterestPage/Index.vue"),
        name: "property_interest"
      },
      {
        path: "property-contacted",
        component: () => import("pages/PropertyContactedPage/Index.vue"),
        name: "property_contacted"
      },
      {
        path: "recently-seen",
        component: () => import("pages/RecentlySeenPage/Index.vue"),
        name: "recently_seen"
      }
    ]
  },
  {
    path: "/insights/",
    component: () => import("layouts/MyPageLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/InsightPage/Index.vue"),
        name: "insights"
      },
      {
        path: ":id",
        component: () => import("pages/InsightPage/Content/Index.vue"),
        name: "insight_content"
      }
    ]
  },
  {
    path: "/map/",
    component: () => import("layouts/MapLayout.vue"),
    children: [
      { path: "", redirect: "/map/city" },
      {
        path: "city",
        component: () => import("pages/MapCity/Index.vue"),
        name: "map_city"
      },
      {
        path: "city/area",
        component: () => import("pages/MapCity/Area/Index.vue"),
        name: "map_city_area"
      }
      // 재개발구역
      // { path: 'areas', component: () => import('pages/MapAreaPage/Index.vue'), name: 'listHouses' }
    ]
  },
  {
    path: "/list/",
    component: () => import("layouts/MapLayout.vue"),
    children: [
      {
        path: "houses",
        component: () => import("src/pages/ListHouses/Index.vue"),
        name: "listHouses"
      },
      {
        path: "transactions",
        component: () => import("src/pages/ListTransactions/Index.vue"),
        name: "listTransactions"
      }
    ]
  },
  {
    path: "/map/view-search",
    component: () => import("pages/MapViewSearch/Index.vue"),
    name: "map_view_search"
  },
  {
    path: "/for-sale/",
    component: () => import("layouts/ForSaleLayout.vue"),
    children: [
      {
        path: "land",
        component: () => import("pages/MapForSale/Land/Index.vue"),
        name: "for_sale_land"
      },
      {
        path: "apartment",
        component: () => import("pages/MapForSale/Apartment/Index.vue"),
        name: "for_sale_apartment"
      },
      {
        path: "redevelop-estate",
        component: () => import("pages/MapForSale/RedevelopEstate/Index.vue"),
        name: "for_sale_redevelop_estate"
      },
      {
        path: "no-redevelop-estate",
        component: () => import("pages/MapForSale/NoRedevelopEstate/Index.vue"),
        name: "for_sale_no_redevelop_estate"
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
