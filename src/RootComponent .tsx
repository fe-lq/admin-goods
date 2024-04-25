import NotFoundPage from "@/pages/not-found";
import AppComponent from "./App";
import zhCN from "antd/locale/zh_CN";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routers } from "./routes";
import { Suspense } from "react";
import { App, ConfigProvider, Spin } from "antd";
import { Provider } from "react-redux";
import { store } from "./store";

export const RootComponent: React.FC<{ basename: string }> = ({ basename }) => {
  return (
    <ConfigProvider locale={zhCN}>
      {/* 为了使用antd静态方法 */}
      <Provider store={store}>
        <App>
          <Suspense fallback={<Spin />}>
            <BrowserRouter basename={basename}>
              <Routes>
                <Route path="/" element={<AppComponent />}>
                  {routers.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      Component={route.component}
                    />
                  ))}
                  <Route path="*" Component={NotFoundPage} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </App>
      </Provider>
    </ConfigProvider>
  );
};
