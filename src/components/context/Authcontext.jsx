import { createContext, useState, useEffect,useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom";

export const Authcontext = createContext(null);

export const AuthProvider = ({ children }) => {

const [auth, setAuth] = useState(null);
const navigate=useNavigate();// detect url change
const location=useLocation();// detect url change

    // Load user from localStorage on initial render
    useEffect(() => {
        
       const userdata= window.localStorage.getItem("userinfo")
        if (userdata) {
          const blogData=JSON.parse(userdata);
          const user=blogData.user
          setAuth(user)
        }else{
            setAuth(null)
        }
    }, [navigate,location]);

    

    return (
        <Authcontext.Provider value={{ auth }}>
            {children}
        </Authcontext.Provider>
    );
};
 
// create function to use the above
export const useAuth=()=>{
  const auth=  useContext(Authcontext)
return auth;
}