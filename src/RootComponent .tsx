import NotFoundPage from "@/pages/not-found";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routers } from "./routes";

export const RootComponent: React.FC<{ basename: string }> = ({ basename }) => {
  return (
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
  );
};
