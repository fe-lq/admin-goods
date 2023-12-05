import { Root, createRoot } from "react-dom/client";
import "../styles/base.css";
import { RootComponent } from "./RootComponent ";

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
      (root as Root).render(<RootComponent basename={basename} />);
    },
    destroy() {
      (root as Root).unmount();
    },
  };
};

if (!window.__GARFISH__) {
  const container = document.getElementById("app");
  const root = createRoot(container!);
  root.render(<RootComponent basename="/" />);
}
