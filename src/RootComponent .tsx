import NotFoundPage from "@/pages/not-found";
import App from "./App";
import zhCN from "antd/locale/zh_CN";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routers } from "./routes";
import { Suspense } from "react";
import { ConfigProvider, Spin } from "antd";

export const RootComponent: React.FC<{ basename: string }> = ({ basename }) => {
  return (
    <ConfigProvider locale={zhCN} theme={{ hashed: false }}>
      <Suspense fallback={<Spin />}>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<App />}>
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
    </ConfigProvider>
  );
};
