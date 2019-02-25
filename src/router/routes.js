
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/register')
  },
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: { auth: true },
    children: [
      { path: '', name: 'home', component: () => import('pages/index') },
      { path: '/account', name: 'account', component: () => import('pages/account') },
      { path: '/new_payment', name: 'new_payment', component: () => import('pages/new_payment') },
      { path: '/new_payment/:id?', name: 'new_payment_with_template', component: () => import('pages/new_payment'), props: true },
      { path: '/incoming', name: 'incoming', component: () => import('pages/incoming') },
      { path: '/outgoing', name: 'outgoing', component: () => import('pages/outgoing') },
      { path: '/all_payments', name: 'all_payments', component: () => import('pages/all_payments') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/default'),
    meta: { auth: ['admin'] },
    children: [
      { path: '', name: 'admin', component: () => import('pages/admin/index') },
      { path: 'edit/user/:id', name: 'admin.edit_user', component: () => import('pages/admin/edit_user'), props: true },
      { path: 'view/user/:id', name: 'admin.view_user', component: () => import('pages/admin/view_user'), props: true },
      { path: 'edit/payment/:id', name: 'admin.edit_payment', component: () => import('pages/admin/edit_payment'), props: true },
      { path: 'view/payment/:id', name: 'admin.view_payment', component: () => import('pages/admin/view_payment'), props: true },
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
