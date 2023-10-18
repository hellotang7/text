import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {authStore} from '@/stores/authStore';
import {Message} from 'view-ui-plus';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/index.vue'),
        },
        {
            path: '/desktop',
            name: 'desktop',
            component: () => import('../views/DesktopView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/loginJump',
            name: 'loginJump',
            component: () => import('../views/login/loginJump.vue'),
        },
        {
            path: '/1',
            name: '111',
            component: () => import('../views/111.vue'),
        },
    ],
});


// 导航守卫
router.beforeEach(async (to, from, next) => {
  // currentUserInfo() 检查用户是否已登录

  const isAuthenticated = await localStorage.getItem('token') !== null;
  if (to.name === "login" && isAuthenticated) {
    // 如果用户已经登录，而且访问的是登录页面，将用户重定向到主页
    next({ name: "desktop" }); // 修改为你的主页路由名
  } else if (to.name !== "login" && !isAuthenticated) {
    // 如果用户未登录，并且不是访问登录页面，将用户重定向到登录页面
    Message.error('请先登录！');
    next({ name: "login" });
  } else {
    // 如果用户已登录或访问登录页面，直接通过
    next();
  }
});
// 导航守卫
// router.beforeEach(async (to, from, next) => {
//     const isAuthenticated = await authStore().token !== null;
//     if (to.name === 'login') {
//         // 如果已经在登录页面，直接允许访问
//         next();
//     } else {
//         try {
//             if (isAuthenticated === true) {
//                 // 用户已登录，允许访问
//                 next();
//             } else {
//                 next('/login?return_to=' + to.path); // 重定向到登录页面
//             }
//         } catch (error) {
//             console.error(error);
//             // 处理错误，可以选择重定向到一个错误页面
//             // next('/login');
//         }
//     }
// });


export default router;
