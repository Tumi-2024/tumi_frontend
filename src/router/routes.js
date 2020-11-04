
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage/Index.vue') }
    ]
  }, {
    path: '/my-page',
    component: () => import('pages/MyPage/Index'),
    name: 'my_page'
  }, {
    path: '/my-page/',
    component: () => import('layouts/MyPageLayout.vue'),
    children: [
      // Area(Interest)
      { path: 'area', component: () => import('pages/AreaPage/Index.vue'), name: 'area' }
      // Property(Interest)
      // Property(Contacted)
    ]
  }, {
    path: '/my-page/',
    component: () => import('layouts/MyPageLayout.vue'),
    children: [
      { path: 'property-interest', component: () => import('pages/PropertyInterestPage/Index.vue'), name: 'property-interest' }
    ]
  }, {
    path: '/my-page/',
    component: () => import('layouts/MyPageLayout.vue'),
    children: [
      { path: 'property-contacted', component: () => import('pages/PropertyContactedPage/Index.vue'), name: 'property-contacted' }
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
