import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <div>商品信息</div>
      <Outlet />
    </>
  );
}
