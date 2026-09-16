import {useEffect, useState} from "react";
import {fetchReports} from "../api/report.ts";
import type {PaginatedResponse, Report} from "../types/report.ts";

export default function useReportList(pageNumber: number = 1) {

    const [fetchRequest, setFetchRequest] = useState<Promise<PaginatedResponse<Report>>>()
    const [page, setPageState] = useState(pageNumber);

    const setPage = (newPage: number) => {
        setPageState(newPage)
        setFetchRequest(fetchReports(newPage))
    }

    useEffect(() => {
        setFetchRequest(fetchReports(pageNumber))
    }, [pageNumber]);


    return {
        fetchRequest,
        page,
        setPage
    }
}
