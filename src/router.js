import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const authChildRoutes = (prop) => [
    {
        path:'login',
        name: prop + '.login',
        component:() => import('@/components/auth/Login')
    },
    {
        path:'register',
        name: prop + '.register',
        component: () => import('@/components/auth/Register')
    },
    {
        path:'otp',
        name: prop + '.otp',
        component: () => import('@/components/auth/Otp')
    }
]

const otherRoutes = () => [
    {
        path:'/',
        name:'home',
        component:() => import('./components/dashboard/Home'),
        meta: {  requiresAuth:true }
    },
    {
        path:'/user',
        name:'user',
        component:() => import('./components/user/User'),  
        meta: { requiresAuth:true }     
    },
    {
        path:'/edit-user',
        name:'editUser',
        component:() => import('./components/user/EditUser'),  
        meta: { requiresAuth:true }     
    },
    {
        path:'/partner',
        name:'partner',
        component:() => import('./components/partner/Partner'),      
        meta: { requiresAuth:true }       
    },
    {
        path:'/rider',
        name:'rider',
        component:() => import('./components/rider/Rider'),   
        meta: { requiresAuth:true }          
    },
    {
        path:'/hub',
        name:'hub',
        component:() => import('./components/settings/Hub'),        
        meta: { requiresAuth:true }     
    },
    {
        path:'/bank',
        name:'bank',
        component:() => import('./components/settings/Bank'),     
        meta: { requiresAuth:true }         
    },
    {
        path:'/area',
        name:'area',
        component:() => import('./components/settings/Area'),       
        meta: { requiresAuth:true }     
    },
    {
        path:'/banner',
        name:'banner',
        component:() => import('./components/settings/Banner'),       
        meta: { requiresAuth:true }     
    },
    {
        path:'/profile',
        name:'profile',
        component:() => import('./components/settings/Profile'),       
        meta: { requiresAuth:true }     
    },
    {
        path:'/thana',
        name:'thana',
        component:() => import('./components/settings/Thana'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/zone',
        name:'zone',
        component:() => import('./components/settings/Zone'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/weight-charge',
        name:'WeightCharge',
        component:() => import('./components/settings/WeightCharge'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/store',
        name:'store',
        component:() => import('./components/settings/Store'),      
        meta: { requiresAuth:true }      
    },
    {
        path:'/reason',
        name:'reason',
        component:() => import('./components/settings/Reason'),      
        meta: { requiresAuth:true }      
    },
    {
        path:'/issue',
        name:'issue',
        component: () => import('./components/settings/issue/List'),          
        meta: { requiresAuth:true }    
    },
    {
        path:'/merchant',
        name:'merchant',
        component:() => import('./components/merchant/Merchant'),     
        meta: { requiresAuth:true }      
    },
    {
        path:'/pickup',
        name:'pickup',
        component:() => import('./components/pickup/Pickup'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/order',
        name:'order',
        component:() => import('./components/order/Order'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/due',
        name:'due',
        component:() => import('./components/accounts/Due'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/make-payment/:id?',
        name:'makePayment',
        component:() => import('./components/accounts/MakePaymentOrder'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/show-order',
        name:'show-order',
        component:() => import('./components/accounts/ShowOrder'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/paid',
        name:'paid',
        component:() => import('./components/accounts/Paid'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/invoice',
        name:'invoice',
        component:() => import('./components/accounts/Invoice'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/collection',
        name:'collection',
        component:() => import('./components/accounts/Collection'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/adjustment',
        name:'adjustment',
        component:() => import('./components/accounts/Adjustment'),     
        meta: { requiresAuth:true }       
    },
    {
        path:'/role',
        name:'role',
        component: () => import('./components/role-permission/Role'),
        meta: { requiresAuth:true }    
    },
    {
        path:'/permission',
        name:'permission',
        component: () => import('./components/role-permission/Permission'),          
        meta: { requiresAuth:true }    
    },
    {
        path:'/fraud',
        name:'fraud',
        component: () => import('./components/fraud/Fraud'),          
        meta: { requiresAuth:true }    
    },
]

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/components/layouts/AuthLayout'),
        meta: { auth: false },
        children: authChildRoutes('auth')
    },    
    {
        path: '/',
        name: 'main',
        component: () => import('@/components/layouts/MainLayout'),
        meta: { auth: false },
        children: otherRoutes()
    },    
    {
        path: '*',
        component: () => import('@/components/NotFoundPage'),
        meta: { hideNavigation: true }
    }
];

export const router = new VueRouter({
    mode: "history",
    hash: false,
    base: process.env.BASE_URL,
    hashbang: false,
    routes
})
  
router.beforeEach((to, from, next) => {  
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            next({
                path: '/auth/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next();
        }
    } else {
      next();
    }
})

export default router
