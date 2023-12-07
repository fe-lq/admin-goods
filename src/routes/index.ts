import { lazy } from "react";

interface RouteType {
  name: string;
  path: string;
  component: React.FunctionComponent;
  children?: RouteType[];
}
export const routerConfig: RouteType[] = [
  {
    name: "商品信息",
    path: "/information",
    component: lazy(() => import("pages/information")),
    children: [
      {
        name: "商品信息",
        path: "/information",
        component: lazy(() => import("pages/edit")),
      },
    ],
  },
  {
    name: "商品分类",
    path: "/category",
    component: lazy(() => import("pages/information")),
  },
];

const transformRouter = (
  routerList: RouteType[],
  routes: Partial<Omit<RouteType, "children">>[] = [],
) => {
  routerList.forEach((route) => {
    routes.push({ path: route.path, component: route.component });
    if (route.children) {
      transformRouter(route.children, routes);
    }
  });
  return routes;
};

export const routers = transformRouter(routerConfig);
console.log(routers);
