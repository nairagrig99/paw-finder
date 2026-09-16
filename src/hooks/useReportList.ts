import {useState} from "react";
import {fetchReports} from "../api/report.ts";
import type {PaginatedResponse, Report} from "../types/report.ts";

export default function useReportList(pageNumber: number = 1) {
    const [fetchRequest, setFetchRequest] = useState<Promise<PaginatedResponse<Report>>>(fetchReports(pageNumber))
    const [page, setPageState] = useState(pageNumber);

    const setPage = (newPage: number) => {
        const nextRequest = fetchReports(newPage);
        setPageState(newPage)
        setFetchRequest(nextRequest)
    }

    return {
        fetchRequest,
        page,
        setPage
    }
}
