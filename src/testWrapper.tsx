import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";


const TestWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default TestWrapper;