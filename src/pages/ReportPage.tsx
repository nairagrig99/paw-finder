import {fetchReports} from "../api/report.ts";
import {Suspense} from "react";
import ReportGrid from "../components/ReportGrid/ReportGrid.tsx";

export default function ReportPage(){

    const fetchReport = fetchReports(1);

    return <Suspense fallback={<div>Loading pet lists...</div>}>
        <ReportGrid fetchReport={fetchReport}/>
    </Suspense>
}