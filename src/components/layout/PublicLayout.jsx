import { Navigate, Outlet } from "react-router-dom";
import PublicNavBar from "../PublicNavbar";
import {useAuth} from "../context/Authcontext";
const PublicLayout = () => {
  const auth = useAuth(); 
  
  if (auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PublicNavBar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;