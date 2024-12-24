import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          {children}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}