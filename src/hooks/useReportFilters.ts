import {useCallback, useMemo} from "react";
import {useSearchParams} from "react-router";

export default function useReportFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(() => {
        return ({
            page: Number(searchParams.get("page")) || 1,
            search: searchParams.get("search") || "",
            petType: searchParams.get("petType") || "all",
            type: searchParams.get("type") || "all",
            sort: searchParams.get("sort") || "desc",
        })
    }, [searchParams]);

    const setFilters = useCallback((updates: Record<string, string>) => {
        setSearchParams((params) => {
            if ((filters.search !== "undefined" && filters.search !== null && updates.search) || updates.search === '') {
                params.set('search', updates.search);
            }

            if (filters.page && updates.page) {
                params.set('page', updates.page);
            }

            if (filters.type !== "undefined" && filters.type !== "" && filters.type !== null && updates.type) {
                params.set('type', updates.type);
            }

            if (filters.petType !== "undefined" && filters.petType !== "" && filters.petType !== null && updates.petType) {
                params.set('petType', updates.petType);
            }

            if (filters.sort !== "undefined" && filters.sort !== "" && filters.sort !== null && updates.sort) {
                params.set('sort', updates.sort);
            }

            return params;
        })
    }, [setSearchParams])

    return {filters, setFilters};
}