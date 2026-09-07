import {useState, useTransition} from "react";
import {fetchReports} from "../api/report.ts";
import type {PaginatedResponse} from "../types/report.ts";

export default function useReportList(pageNumber: number = 1) {
    const [render, setRender] = useState<Promise<PaginatedResponse<Report>>>(() => fetchReports(pageNumber))
    const [page, setPageState] = useState(pageNumber);
    const [isPending, startTransition] = useTransition();

    // console.log("page", page)
    // const fetchReportList = useMemo<Promise<PaginatedResponse<Report>>>(() => {
    //     return fetchReports(page)
    // }, [page])

    const setPage = (newPage: number) => {
        const nextRequest = fetchReports(newPage);

        startTransition(() => {
            setPageState(newPage)
            setRender(nextRequest)
        })

    }

    return {
        fetchReportList: render,
        page,
        setPage
    }
}
