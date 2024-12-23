import { type ReactNode } from 'react';

interface LocationWrapperProps {
  children: ReactNode;
}

export function LocationWrapper({ children }: LocationWrapperProps) {
  return (
    <div className="container py-4">
      <div className="bg-white p-4 rounded-3 shadow-lg mx-auto location-wrapper">
        {children}
      </div>
    </div>
  );
}
