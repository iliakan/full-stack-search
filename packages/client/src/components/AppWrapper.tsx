import type { ReactNode } from "react";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          {children}
        </div>
      </div>
    </div>
  );
}