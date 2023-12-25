import Layout from "@/page/Layout";
import Month from "@/page/Month";
import New from "@/page/New";
import Year from "@/page/Year";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout></Layout>,
            children:[
                {
                    path:'month',
                    element:<Month></Month>
                },
                {
                    path:'year',
                    element:<Year></Year>
                }
            ]
            
        },
        {
            path:"/new",
            element:<New></New>
        },
        {
            path:"*",
            element: <div>找不到</div>
        }

    ]
)

export default router