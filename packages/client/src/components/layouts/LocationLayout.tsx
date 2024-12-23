import { Outlet } from "react-router";

export function LocationLayout() {
  return (
    <div className='container py-4'>
      <div className='bg-white p-4 rounded-3 shadow-lg mx-auto location-wrapper'>
        <Outlet />
      </div>
    </div>
  );
}
