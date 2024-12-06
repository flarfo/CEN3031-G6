import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
        <ToastContainer />
        <Navbar />
        <Outlet />
        {/* <ToastContainer /> */}
    </>
  )
}

export default MainLayout