import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Gainer from "../pages/Gainer";
import Loser from "../pages/Loser";
import CompanyDetail from "../pages/CompanyDetail";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/gainer',
        element: <Gainer />,
    },
    {
        path: '/loser',
        element: <Loser />,
    },
    {
        path: '/company/:symbol',
        element: <CompanyDetail />,
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
