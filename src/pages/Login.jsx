import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import loginvalidator from "../validators/loginValidator";
import { useNavigate } from "react-router-dom";
import baseurl from "../util/axiosinistance";
const initialFormData = {
  
  email: "",
  password: "",
  
};
const Login = () => {
   const navigate = useNavigate();

   const [loading,setLoading]=useState(false);// to show loading state 
     const [formData, setFormData] = useState(initialFormData);
   
     const [formError, setFormError] = useState({
       
       email: "",
       password: ""
    
     });


      const handleChange =async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value  
    }));

    // Clear error when user types
    if (formError[name]) {
      setFormError(prev => ({
        ...prev,
        [name]: ""
      }));
    }
   

  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = loginvalidator(formData);
  setFormError(errors);

  const hasError = Object.values(errors).some(error => error);
  if (hasError) {
    toast.error("Please fill out all fields.");
    return;
  }

  try {
    setLoading(true);

    const requestbody = {
      email: formData.email,
      password: formData.password,
    };

    const response = await baseurl.post(`/auth/signin`, requestbody);
   

    setFormData(initialFormData);
    setLoading(false);

 
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } catch (error) {
    setLoading(false);
    toast.error("Incorrect credential. Please try again.");
    console.log(error?.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit} >
             <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full px-3 py-2 border ${
                    formError.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {formError.email && <p className="mt-1 text-sm text-red-500">{formError.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className={`block w-full px-3 py-2 border ${
                      formError.password ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formError.password ? (
                    <p className="mt-1 text-sm text-red-500">{formError.password}</p>
                  ) : (
                    <p className="mt-2 text-xs text-gray-500"></p>
                  )}
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;