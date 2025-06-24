import { Navigate, Outlet } from "react-router-dom";
import PrivateNavBar from "../PrivateNavbar";

const PrivateLayout = () => {
  const auth = true; 
  
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <PrivateNavBar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;