import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Offers from "../pages/Offers";
import SignIn from "../pages/SignIn";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/offers',
                element: <Offers />
            }, 
            {
                path: '/sign-in',
                element: <SignIn />
            }
        ]
    }
])