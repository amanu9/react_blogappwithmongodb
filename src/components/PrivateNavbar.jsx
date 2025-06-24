import { NavLink } from "react-router-dom";

const PrivateNavBar = () => {
  return (
    <div className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <NavLink 
              to="/" 
              className="hover:text-gray-300 transition-colors"
            >
              YourLogo
            </NavLink>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-gray-900' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/post" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-gray-900' : ''
                }`
              }
            >
              Post
            </NavLink>
           
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-gray-900' : ''
                }`
              }
            >
              Profile
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-gray-900' : ''
                }`
              }
            >
              Settings
            </NavLink>
             <NavLink 
              to="/login" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-gray-900' : ''
                }`
              }
            >
              Login
            </NavLink>
          </div>

          <div className="md:hidden">
            {/* Mobile menu button */}
            <button className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PrivateNavBar;