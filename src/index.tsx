import { Root, createRoot } from "react-dom/client";
import "./styles/base.css";
import { RootComponent } from "./RootComponent ";
import { setBaseStore } from "./utils";

export const provider = () => {
  let root: Root | null = null;
  return {
    render({
      basename,
      dom,
    }: {
      basename: string;
      dom: Document;
      store: Record<string, any>;
      props: any;
    }) {
      const container = dom.querySelector("#app");
      root = createRoot(container!);
      // 接收基座传递的信息， 使用Garfish.channel实现通信
      window?.Garfish?.channel.on("baseStore", setBaseStore);
      (root as Root).render(<RootComponent basename={basename} />);
    },
    destroy() {
      (root as Root).unmount();
      window?.Garfish?.channel.removeListener("baseStore", setBaseStore);
    },
  };
};

if (!window.__GARFISH__) {
  const container = document.getElementById("app");
  const root = createRoot(container!);
  root.render(<RootComponent basename="/goods" />);
} else {
  __GARFISH_EXPORTS__.provider = provider;
}
