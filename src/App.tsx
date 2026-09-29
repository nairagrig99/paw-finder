import './App.css'
import ReportPage from "./pages/ReportPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import {ErrorBoundary} from "./components/ErrorBoundary/ErrorBoundary.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ErrorBoundary fallback={<div>Failed to load</div>}>
            <ReportPage/>
        </ErrorBoundary>
    }
])

function App() {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
