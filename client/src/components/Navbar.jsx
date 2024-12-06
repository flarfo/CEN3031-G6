import React from 'react';
import logo from '../assets/crocodile.png';
import { NavLink } from 'react-router-dom';

export const Navbar = ({ user, setUser }) => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

      const handleLogout = async () => {
        try {
          const response = await fetch('http://localhost:3500/auth/logout', {
            method: 'POST',
            credentials: 'include', // Ensure cookies are sent
          });
      
          if (response.ok) {
            // Clear the user state
            setUser(null);
            localStorage.removeItem('token'); // Clear token from localStorage
            localStorage.removeItem('voterID');
            window.location.href = '/login'; // Redirect to login
          } else {
            alert('Failed to log out.');
          }
        } catch (error) {
          console.error('Logout error:', error);
          alert('An error occurred during logout.');
        }
      }; 

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="GatorConnect" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                GatorConnect
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/blog-board" className={linkClass}>
                  Blog
                </NavLink>
                <NavLink to="/calendar" className={linkClass}>
                  Calendar
                </NavLink>
                <NavLink to="/poll-board" className={linkClass}
                  >Polls
                </NavLink>
                {user ? (
                  <>
                    {/* Safely display username */}
                    <span className="text-white px-3 py-2">{`Welcome, ${user.username || 'User'}`}</span>
                    <NavLink to="/profile" className={linkClass}>
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink to="/login" className={linkClass}>
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;


// import React from 'react';
// import logo from '../assets/crocodile.png';
// import { NavLink } from 'react-router-dom';

// export const Navbar = ({ user, setUser }) => {
//   const linkClass = ({ isActive }) =>
//     isActive
//       ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
//       : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

//       const handleLogout = async () => {
//         try {
//           const response = await fetch('http://localhost:3500/auth/logout', {
//             method: 'POST',
//             credentials: 'include', // Ensure cookies are sent
//           });
      
//           if (response.ok) {
//             // Clear the user state
//             setUser(null);
//             localStorage.removeItem('token'); // Clear token from localStorage
//             window.location.href = '/login'; // Redirect to login
//           } else {
//             alert('Failed to log out.');
//           }
//         } catch (error) {
//           console.error('Logout error:', error);
//           alert('An error occurred during logout.');
//         }
//       }; 

//   return (
//     <nav className="bg-blue-700 border-b border-blue-500">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="flex h-20 items-center justify-between">
//           <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
//             <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
//               <img className="h-10 w-auto" src={logo} alt="GatorConnect" />
//               <span className="hidden md:block text-white text-2xl font-bold ml-2">
//                 GatorConnect
//               </span>
//             </NavLink>
//             <div className="md:ml-auto">
//               <div className="flex space-x-2">
//                 <NavLink to="/" className={linkClass}>
//                   Home
//                 </NavLink>
//                 <NavLink to="/blog-board" className={linkClass}>
//                   Blog
//                 </NavLink>
//                 <NavLink to="/calendar" className={linkClass}>
//                   Calendar
//                 </NavLink>
//                 {user ? (
//                   <>
//                     {/* Safely display username */}
//                     <span className="text-white px-3 py-2">{`Welcome, ${user.username || 'User'}`}</span>
//                     <NavLink to="/profile" className={linkClass}>
//                       Profile
//                     </NavLink>
//                 <NavLink
//                   to="/poll-board"
//                   className={linkClass}
//                   >Polls
//                   </NavLink>
//                     <button
//                       onClick={handleLogout}
//                       className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <NavLink to="/login" className={linkClass}>
//                     Login
//                   </NavLink>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };


// export default Navbar;
