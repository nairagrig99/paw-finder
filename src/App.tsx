import './App.css'
import ReportPage from "./pages/ReportPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import OfflineBanner from "./components/OfflineBanner/OfflineBanner.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ReportPage/>
    }
])

function App() {
    return <ThemeProvider>
        <OfflineBanner></OfflineBanner>
        <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
}

export default App
