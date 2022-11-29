import router from "@/router";
import store from "@/store";
import {
  constRouter
} from "./routers";

import error_401 from "@/components/error-page/401.vue";
import error_404 from "@/components/error-page/404.vue";
import error_500 from "@/components/error-page/500.vue";
let errorRouter = [
  {
    path: "/error_401",
    name: "error_401",
    component: error_401
  },
  {
    path: "/error_500",
    name: "error_500",
    component: error_500
  },
  {
    path: "*",
    name: "error_404",
    component: error_404
  }
];

import Layout from "@/components/Layout/Layout.vue";
import FullLayout from "@/components/Layout/FullLayout.vue";

let routerList
router.beforeEach((to, from, next) => {
  if ( to.name == 'login') {
    next();
    return
  }

  //获取路由
  if (!routerList) {
    //判断sessionStorage中是否有保存的路由
    if (!getRouter("routers")) {
      //没有路由则先获取vuex路由，需登陆操作后才有
      if (store.state.user.menu) {
        routerList = JSON.parse(JSON.stringify(store.state.user.menu));
      } else {
        routerList = null
      }
      saveRouter("routers", routerList);
      routerGo(to, next);
    } else {
      //sessionStorage有路由直接获取
      routerList = getRouter("routers");
      routerGo(to, next);
    }
  } else {
    next();
  }
});

// 保存路由至sessionStorage
function saveRouter(name, routers) {
  if (routers && routers.length) {
    window.sessionStorage.setItem(name, JSON.stringify(routers));
  }
}

// 从sessionStorage获取路由
function getRouter(name) {
  return JSON.parse(window.sessionStorage.getItem(name));
}

// 路由跳转
function routerGo(to, next) {
  if (routerList && routerList.length > 0) {
    routerList = filterRouter(routerList);
  }
  routerList = constRouter.concat(routerList);
  routerList = routerList.concat(errorRouter)
  router.addRoutes(routerList);
  next({
    ...to,
    replace: true
  });
}

function filterRouter(routers) {
  const res = routers.filter(route => {
    if (route.component) {
      if (route.component == "Layout") {
        route.component = Layout;
      } else if (route.component === "FullLayout") {
        route.component = FullLayout;
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children && route.children.length > 0) {
      route.children = filterRouter(route.children);
    }
    return true;
  });
  return res;
}

function loadView(view) {
  return () => import(`@/views/${view}`)
}

// 路由跳转完成操作
router.afterEach((to) => {
  window.scrollTo(0, 0);
});