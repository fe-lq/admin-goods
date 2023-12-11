declare global {
  interface Window {
    __GARFISH__: boolean;
  }
  const __GARFISH_EXPORTS__: {
    provider: any;
    registerProvider?: (provider: any) => void;
  };
}
export {};
