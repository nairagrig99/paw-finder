import './App.css'
import {Suspense} from "react";
import ReportGrid from "./components/ReportGrid/ReportGrid.tsx";
import {fetchReports} from "./api/report.ts";

function App() {
    const fetchReport = fetchReports(1);

    return <Suspense fallback={<div>Loading pet lists...</div>}>
        <ReportGrid fetchReport={fetchReport}/>
    </Suspense>
}

export default App
