import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import {lazy, Suspense} from 'react'




//pages admin
import AdminLogin from "./pages/adminside/Login"
import AdminHome from './pages/adminside/Home';
import Dashboard from './pages/adminside/Dashboard';
import UsersManagement from './pages/adminside/Users';
import SignoutAdmin from './pages/adminside/Signout';
import VerifyCars from './pages/adminside/VerifyCars';
import Cars from './pages/adminside/Cars'
import Bookings from './pages/adminside/Bookings';
import BookingDetailsAdmin from './pages/adminside/BookingDetails'
import Reports from './pages/adminside/Reports'





//pages users
import Home from "./pages/userside/Home"
import Login from "./pages/userside/Login"
import Signup from './pages/userside/Signup';

import AddVehicle from './pages/userside/AddVehicle';
import EditVehicle from './pages/userside/EditVehicle';


// import Host from './pages/userside/Host';
const Host = lazy(()=> import('./pages/userside/Host'))
const VehicleDetails = lazy(()=> import('./pages/userside/VehicleDetails'));

// const MyComponent = lazy(() => import('./MyComponent'));
import Outline from './pages/userside/Outline'
import Search from './pages/userside/Search';
import Logout from './pages/userside/Logout'
import Profile from './pages/userside/Profile';
import ProfileHome from './pages/userside/ProfileHome'
import ProfileBooking from './pages/userside/ProfileBooking';
import ProfileWallet from './pages/userside/ProfileWallet'

// import ShowBookings from './pages/userside/ShowBookings'
const ShowBookings = lazy(()=> import('./pages/userside/ShowBookings'));


import BookingSuccess from './pages/userside/BookingSuccess'
import BookingDetails from './pages/userside/BookingDetails'


// middleware Auth

import {AuthorizeAdmin, ProtectPath} from './middleware/Auth'
import {AuthorizeUser, ProtectPathUser , UserDetails} from "./middleware/AuthUser"






const router = createBrowserRouter([
  {
    path:"/admin/login",
    element:<ProtectPath><AdminLogin/></ProtectPath>
  },
  {
    path:"/admin",
    element:<AuthorizeAdmin> <AdminHome/>  </AuthorizeAdmin>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UsersManagement />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "VerifyCars",
        element: <VerifyCars />,
      },
      {
        path: "cars",
        element: <Cars />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "bookingsDetails/:bookingId",
        element: <BookingDetailsAdmin />,
      },
      {
        path: "signout",
        element: <SignoutAdmin />,
      },
    ]
  },
  {
    path:"/user",
    element:<Outline />,
    children:[
      {
        path:"home",
        element:<UserDetails><Home/></UserDetails>
      },
      {
        path:"login",
        element:<ProtectPathUser><Login/></ProtectPathUser>
      },
      {
        path:"signup",
        element:<ProtectPathUser><Signup/></ProtectPathUser>
      },
      {
        path:"host",
        element:
        <Suspense fallback={<div className='w-full h-screen flex justify-center items-center bg-slate-400 text-red-600 text-5xl '>Loading...</div>}>
            <UserDetails><Host/></UserDetails>
        </Suspense>

      },
      {
        path:"showBookings/:vehicleId",
        element:
        <Suspense fallback={<div className='w-full h-screen flex justify-center items-center bg-slate-400 text-red-600 text-5xl '>Loading...</div>}>

        <AuthorizeUser><UserDetails><ShowBookings/></UserDetails> </AuthorizeUser>
        </Suspense>

      },
      {
        path:"addVehicle",
        element:<AuthorizeUser><UserDetails><AddVehicle/></UserDetails> </AuthorizeUser>
      },
      {
        path:"editVehicle/:vehicleId",
        element:<AuthorizeUser><UserDetails><EditVehicle/></UserDetails> </AuthorizeUser>
      },
      {
        path:"vehicleDetails/:vehicleId",
        element:  
        <Suspense fallback={<div className='w-full h-screen flex justify-center items-center bg-slate-400 text-red-600 text-5xl '>Loading...</div>}>
        <VehicleDetails/> 
        </Suspense>

      },
      {
        path:"bookingSuccessfull/:bookingId",
        element:  <BookingSuccess/> 
      },
      {
        path:"bookingDetails/:bookingId",
        element:  <BookingDetails/> 
      },
      {
        path:"search",
        element:<Search />
      },
      {
        path:"logout",
        element:<Logout />
      },
      {
        path:"profile",
        element:<Profile />,
        children:[{
          path:"home",
          element: <ProfileHome/>
        },{
          path:"booking",
          element: <ProfileBooking/>
        },{
          path:"wallet",
          element: <ProfileWallet/>
        }

        ]
      }
    ]
  }
])



function App() {
 

  return (
    <RouterProvider router={router} />
  )
}

export default App
