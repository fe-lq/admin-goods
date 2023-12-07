// import { NotFoundPage } from "pages/not-found";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./routes";
// import { GoodsInformation } from "pages/information";
// import { GoodsCategory } from "pages/category";

export const RootComponent: React.FC<{ basename: string }> = ({ basename }) => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/home" element={<GoodsInformation />} />
          <Route path="/home" element={<GoodsCategory />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
