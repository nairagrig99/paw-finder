import {BASE_URL} from "../constant.ts";
import type {PaginatedResponse, Report} from "../types/report.ts";

export async function fetchReports(page: number): Promise<PaginatedResponse<Report>> {

    const response = await fetch(`${BASE_URL}/reports?_page=${page}&_per_page=${3}`)

    if (!response.ok) {
        throw new Error("Something went wrong")
    }
    const json = await response.json()

    return {
        data: json.data,
        total: json.items,
        page: page,
    };
}
