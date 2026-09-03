import './App.css'
import ReportPage from "./pages/ReportPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ReportPage/>
    }
])

function App() {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
