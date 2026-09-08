import {Suspense} from "react";
import ReportGrid from "../components/ReportGrid/ReportGrid.tsx";
import useReportList from "../hooks/useReportList.ts";

export default function ReportPage() {
    const {fetchReportList, setPage, page} = useReportList(1);
    return <Suspense fallback={<div>Loading pet lists...</div>}>
        <ReportGrid fetchReport={fetchReportList} setPage={setPage} page={page}/>
    </Suspense>
}