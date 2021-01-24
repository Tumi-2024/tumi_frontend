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
      { path: '', component: () => import('pages/HomePage/Index.vue'), name: 'home' }
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
      { path: 'area', component: () => import('pages/AreaPage/Index.vue'), name: 'area' },
      { path: 'property-interest', component: () => import('pages/PropertyInterestPage/Index.vue'), name: 'property_interest' },
      { path: 'property-contacted', component: () => import('pages/PropertyContactedPage/Index.vue'), name: 'property_contacted' }
    ]
  },
  { path: '/recently-seen', component: () => import('pages/RecentlySeenPage/Index.vue'), name: 'recently_seen' },
  // {
  //   path: '/real-estate/',
  //   component: () => import('layouts/MyPageLayout.vue'),
  //   children: [
  //     { path: '부동산팁', component: () => import('pages/RealEstatePage/RealEstateTips/Index.vue'), name: 'real_estate_tips' },
  //     { path: '정책분석', component: () => import('pages/RealEstatePage/PolicyAnalysis/Index.vue'), name: 'real_estate_policy_analysis' },
  //     { path: '시장전망', component: () => import('pages/RealEstatePage/MarketOutlook/Index.vue'), name: 'real_estate_market_outlook' }
  //   ],
  //   name: 'real_estate'
  // },
  {
    path: '/insights/',
    component: () => import('layouts/MyPageLayout.vue'),
    children: [
      { path: ':tab', component: () => import('pages/InsightPage/Index.vue'), name: 'insights' }
    ]
  },
  {
    path: '/map/',
    component: () => import('layouts/MapLayout.vue'),
    children: [
      { path: '', redirect: '/map/city' },
      { path: 'city', component: () => import('pages/MapCity/Index.vue'), name: 'map_city' },
      { path: 'redevelop-area', component: () => import('pages/MapRedevelopArea/Index.vue'), name: 'map_redevelop_area' },
      { path: 'list-sale', component: () => import('pages/MapListSale/Index.vue'), name: 'map_list_sale' },
      { path: 'for-sale/land', component: () => import('pages/MapForSale/Index.vue'), name: 'map_for_sale' }
    ]
  },
  { path: '/map/view-search', component: () => import('pages/MapViewSearch/Index.vue'), name: 'map_view_search' },
  {
    path: '/actual-transaction',
    component: () => import('layouts/ActualTransactionLayout.vue'),
    children: [
      { path: 'apartment', component: () => import('pages/ApartmentPage/Index.vue'), name: 'apartment' }
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
