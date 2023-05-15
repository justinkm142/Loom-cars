import {createBrowserRouter,RouterProvider} from 'react-router-dom';




//pages admin
import AdminLogin from "./pages/adminside/Login"
import AdminHome from './pages/adminside/Home';
import Dashboard from './pages/adminside/Dashboard';
import UsersManagement from './pages/adminside/Users';
import SignoutAdmin from './pages/adminside/Signout';
import VerifyCars from './pages/adminside/VerifyCars';
import Cars from './pages/adminside/Cars'
import Bookings from './pages/adminside/Bookings';





//pages users
import Home from "./pages/userside/Home"
import Login from "./pages/userside/Login"
import Signup from './pages/userside/Signup';
import Host from './pages/userside/Host';
import AddVehicle from './pages/userside/AddVehicle';
import VehicleDetails from './pages/userside/VehicleDetails';
import Outline from './pages/userside/Outline'
import Search from './pages/userside/Search';


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
        element:<UserDetails> <Home/> </UserDetails>
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
        element:<UserDetails> <Host/> </UserDetails>
      },
      {
        path:"addVehicle",
        element:<AuthorizeUser> <UserDetails> <AddVehicle/> </UserDetails> </AuthorizeUser>
      },
      {
        path:"vehicleDetails/:vehicleId",
        element:  <VehicleDetails/> 
      },
      {
        path:"search",
        element:<Search />
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
