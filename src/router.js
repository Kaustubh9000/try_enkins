import { createBrowserRouter } from "react-router-dom";
import Layout from "./container/layout";
import Login from "./container/login";
import Register from "./container/register";
import Profile from "./container/profile";
import Home from "./container/home";
import AddMyquotes from "./container/addmyquotes";
import MyQuotes from "./container/myquotes";
import ProtectedRoutes from "./protectedroutes";
import ProtectedRoutesforLogin from "./protectedrouteforlogin";
import EditQuotes from "./container/edit";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <ProtectedRoutesforLogin path="/login" component={Login} />,
    },
    {
        path: "/register",
        element: <ProtectedRoutesforLogin path="/register" component={Register}/>,
    },
    {
        path: "/",
        element:<Layout /> ,
        children: [
            {
                path: "/profile",
                element: <ProtectedRoutes path="/profile" component={Profile} />,
            },
            {
                path: "/",
                element: <ProtectedRoutes path="/" component={Home} />,
            },
            {
                path: "/myquotes",
                element: <ProtectedRoutes path="/myquotes" component={MyQuotes} />,
            },
            {
                path: "/edit/:qid",
                element: <ProtectedRoutes path="/edit/:qid" component={EditQuotes} />,
            },
            {
                path: "/addmyquotes",
                element: <ProtectedRoutes path="addmyquotes" component={AddMyquotes}/>
            }
        ],
    },
]);

export default router;
