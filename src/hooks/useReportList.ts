import {useRef, useState} from "react";
import {fetchReports} from "../api/report.ts";
import type {PaginatedResponse, Report} from "../types/report.ts";

export default function useReportList(pageNumber: number = 1) {

    const promiseRef = useRef<Promise<PaginatedResponse<Report>> | null>(null);
    const [page, setPageState] = useState<number>(pageNumber);
    const [, setRefreshKey] = useState(0);


    if (!promiseRef.current) {
        promiseRef.current = fetchReports(pageNumber);
    }

    const setPage = (newPage: number) => {
        setPageState(newPage);
        promiseRef.current = fetchReports(newPage);
        setRefreshKey((k) => k + 1);
    };

    return {
        promiseRef,
        page,
        setPage
    };
}
