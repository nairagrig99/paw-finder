import {useEffect, useState, useTransition} from "react";

import {fetchReports} from "../api/report.ts";

import type {Report} from "../types/report.ts";
import useReportFilters from "./useReportFilters.ts";


export default function useReports() {

    const {filters, setFilters} = useReportFilters();
    const [data, setData] = useState<Report[]>([]);

    const [isPending, startTransition] = useTransition();

    const [totalPages, setTotalPage] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {

        (async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            const fetchRequest = await fetchReports(filters)
            startTransition(() => {
                setData(fetchRequest.data)
                setTotalPage(fetchRequest.total)
                setPage(fetchRequest.page)
            })
        })()
    }, [filters]);

    const onPageChange = (page: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setFilters({page})
    }

    return {
        data,
        totalPages,
        page,
        filters,
        onPageChange,
        isPending
    };

}

