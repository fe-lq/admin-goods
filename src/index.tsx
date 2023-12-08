import { Root, createRoot } from "react-dom/client";
import "../styles/base.css";
import { RootComponent } from "./RootComponent ";
// import { reactBridge } from "@garfish/bridge-react-v18";

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

// export const provider = reactBridge({
//   el: "#app",
//   rootComponent: RootComponent,
//   errorBoundary: (e: any) => <h1>{e.message}</h1>,
// });

if (!window.__GARFISH__) {
  const container = document.getElementById("app");
  const root = createRoot(container!);
  root.render(<RootComponent basename="/goods" />);
}
