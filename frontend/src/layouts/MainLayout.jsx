import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-shell">
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
