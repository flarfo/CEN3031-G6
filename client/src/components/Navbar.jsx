import logo from '../assets/crocodile.png'
import { NavLink} from 'react-router-dom'

export const Navbar = () => {
  const linkClass = ({isActive}) => isActive ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2': 
                'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className ="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
        
            <NavLink className="flex flex-shrink-0 items-center mr-4" to='/'>
              <img
                className="h-10 w-auto"
                src={logo}
                alt="GatorConnect"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                GatorConnect
                </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={linkClass}
                  >Home
                  </NavLink>
                <NavLink
                  to="/blog-board"
                  className={linkClass}
                  >Blog
                  </NavLink>
                <NavLink
<<<<<<< HEAD
                  to="/calendar"
                  className={linkClass}
                  >Calendar
                  </NavLink>
                <NavLink
=======
>>>>>>> 4067cb5721d36dcec2b084dcc15dc88e2dcfa60b
                  to="/poll-board"
                  className={linkClass}
                  >Polls
                  </NavLink>
                <NavLink
                  to="/login"
                  className={linkClass}
                  >Login
                  </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar