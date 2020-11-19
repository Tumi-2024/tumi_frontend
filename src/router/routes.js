/**
 * path: 'route-path' <- with hyphen for: SEO purpose
 * component: pages/RouteComponent/Index.vue <- PascalCase for: best practice/uniform
 * name: route_name <- snake_case
 */

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage/Index.vue') }
    ]
  },
  {
    path: '/my-page',
    component: () => import('pages/MyPage/Index'),
    name: 'my_page'
  },
  {
    path: '/my-page/',
    component: () => import('layouts/MyPageLayout.vue'),
    children: [
      { path: 'recently-seen', component: () => import('pages/RecentlySeenPage/Index.vue'), name: 'recently_seen' },
      { path: 'area', component: () => import('pages/AreaPage/Index.vue'), name: 'area' },
      { path: 'property-interest', component: () => import('pages/PropertyInterestPage/Index.vue'), name: 'property_interest' },
      { path: 'property-contacted', component: () => import('pages/PropertyContactedPage/Index.vue'), name: 'property_contacted' }
    ]
  },
  {
    path: '/map/',
    component: () => import('layouts/MapLayout.vue'),
    children: [
      { path: '', redirect: '/map/city' },
      { path: 'city', component: () => import('pages/MapCity/Index.vue'), name: 'map_city' }
    ]
  },
  {
    path: '/real-estate/',
    component: () => import('layouts/MyPageLayout.vue'),
    children: [
      { path: 'one', component: () => import('pages/RealEstatePage/Index.vue'), name: 'one' },
      { path: 'two', component: () => import('pages/RealEstatePage/Index.vue'), name: 'two' },
      { path: 'three', component: () => import('pages/RealEstatePage/Index.vue'), name: 'three' }
    ],
    name: 'real_estate'
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
