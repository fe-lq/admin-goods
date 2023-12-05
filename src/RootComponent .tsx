import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const RootComponent: React.FC<{ basename: string }> = ({ basename }) => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
