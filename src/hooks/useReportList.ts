import {useRef, useState, useTransition} from "react";

import {fetchReports} from "../api/report.ts";

import type {PaginatedResponse, Report} from "../types/report.ts";
import {useSearchParams} from "react-router";


export default function useReportList(pageNumber: number = 1) {

    const [searchParams, setSearchParams] = useSearchParams();

    const promiseRef = useRef<Promise<PaginatedResponse<Report>> | null>(null);

    const [page, setPageState] = useState<number>(pageNumber);

    const [isPending, startTransition] = useTransition()

    if (!promiseRef.current) {
        promiseRef.current = fetchReports(pageNumber);
    }

    const setPage = (newPage: number) => {

        startTransition(() => {
            promiseRef.current = fetchReports(newPage);
            setPageState(newPage);
        });

    };
    // { data, totalPages, isPending }.
    return {
        promiseRef,
        isPending,
        page,
        setPage
    };

}

