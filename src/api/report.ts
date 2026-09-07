import {BASE_URL} from "../constant.ts";
import type {PaginatedResponse, Report} from "../types/report.ts";

export async function fetchReports(page: number): Promise<PaginatedResponse<Report>>  {

    try {
        const response = await fetch(`${BASE_URL}/reports?_page=${page}&_per_page=${12}`)

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        return await response.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log("Something went wrong")
        }
    }
}
