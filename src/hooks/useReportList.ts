import {useRef, useState, useTransition} from "react";
import {fetchReports} from "../api/report.ts";
import type {PaginatedResponse, Report} from "../types/report.ts";

export default function useReportList(pageNumber: number = 1) {

    const promiseRef = useRef<Promise<PaginatedResponse<Report>> | null>(null);
    const [page, setPageState] = useState<number>(pageNumber);

    if (!promiseRef.current) {
        promiseRef.current = fetchReports(pageNumber);
    }

    const setPage = (newPage: number) => {
        promiseRef.current = fetchReports(newPage);
        setPageState(newPage);
    };

    return {
        promiseRef,
        page,
        setPage
    };
}
