import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignupValidator from "../validators/Signupvalidator";
import { useNavigate } from "react-router-dom";
import baseurl from "../util/axiosinistance";


const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const Signup = () => {
  
  const navigate = useNavigate();

  const [loading,setLoading]=useState(false);// to show loading state 
  const [formData, setFormData] = useState(initialFormData);

  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

  const errors = SignupValidator(formData);
  setFormError(errors);

  const hasError = Object.values(errors).some(error => error);
  if (hasError) {
    toast.error("Please fix the form errors.");
    return;
  }

  try {
    setLoading(true);

    const requestbody = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    const response = await baseurl.post(`/auth/signup`, requestbody);
    console.log(response);

    toast.success("Signup successful!");

    setFormData(initialFormData);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  } catch (error) {
    toast.error("Signup failed. Please try again.");
    console.error(error?.response?.data || error.message);
  } finally {
    setLoading(false); // Always stop loading, success or fail
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <NavLink to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </NavLink>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`block w-full px-3 py-2 border ${
                    formError.name ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {formError.name && <p className="mt-1 text-sm text-red-500">{formError.name}</p>}
              </div>
            </div>

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
                    <p className="mt-2 text-xs text-gray-500">Min. 8 characters</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className={`block w-full px-3 py-2 border ${
                      formError.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {formError.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{formError.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
              </label>
            </div>

           <div>
  <button
    type="submit"
    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {loading ? "Loading..." : "Sign Up"}
  </button>
</div>

          </form>
        </div>
      </div>
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;