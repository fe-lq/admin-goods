import { lazy } from "react";

interface RouteType {
  name: string;
  path: string;
  component: any;
  children?: RouteType[];
}
export const routerConfig: RouteType[] = [
  {
    name: "商品信息",
    path: "/information",
    component: lazy(() => import("@/pages/information")),
  },
  {
    name: "商品分类",
    path: "/category",
    component: lazy(() => import("@/pages/category")),
  },
];

const transformRouter = (
  routerList: RouteType[],
  baseUrl: string = "",
  routes: Partial<Omit<RouteType, "children">>[] = [],
) => {
  routerList.forEach((route) => {
    routes.push({
      path: `${baseUrl}${route.path}`,
      component: route.component,
    });
    if (route.children) {
      transformRouter(route.children, `${baseUrl}${route.path}`, routes);
    }
  });
  return routes;
};

export const routers = transformRouter(routerConfig);
