import {useEffect, useState, useTransition} from "react";

import {fetchReports} from "../api/report.ts";

import type {PaginatedResponse, Report} from "../types/report.ts";
import useReportFilters from "./useReportFilters.ts";


export default function useReports() {

    const {filters, setFilters} = useReportFilters();
    const [data, setData] = useState<PaginatedResponse<Report[]>>();

    const [isPending, startTransition] = useTransition();

    const [totalPage, setTotalPage] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {

        (async () => {
            const fetchRequest = await fetchReports(filters)
            startTransition(() => {
                setData(fetchRequest.data)
                setTotalPage(fetchRequest.total)
                setPage(fetchRequest.page)
            })
        })()
    }, [filters]);

    const onPageChange = (page: number) => {
        setFilters({page: page})
    }

    return {
        data,
        totalPage,
        page,
        filters,
        onPageChange,
        isPending
    };

}

