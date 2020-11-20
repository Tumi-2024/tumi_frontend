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
    path: '/real-estate/',
    component: () => import('layouts/MyPageLayout.vue'),
    children: [
      { path: 'tips', component: () => import('pages/RealEstatePage/RealEstateTips/Index.vue'), name: 'tips' },
      { path: 'policy-analysis', component: () => import('pages/RealEstatePage/PolicyAnalysis/Index.vue'), name: 'policy_analysis' },
      { path: 'market-outlook', component: () => import('pages/RealEstatePage/MarketOutlook/Index.vue'), name: 'market_outlook' }
    ],
    name: 'real_estate'
  },
  {
    path: '/map/',
    component: () => import('layouts/MapLayout.vue'),
    children: [
      { path: '', redirect: '/map/city' },
      { path: 'city', component: () => import('pages/MapCity/Index.vue'), name: 'map_city' }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
