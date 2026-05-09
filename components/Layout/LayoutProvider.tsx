import store from "@/Store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default LayoutProvider;
