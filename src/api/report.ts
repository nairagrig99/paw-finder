import {BASE_URL, DEFAULT_PAGE_SIZE} from "../constant.ts";
import type {PaginatedResponse, Report} from "../types/report.ts";

export async function fetchReports(page: number): Promise<PaginatedResponse<Report>> {

    try {
        const response = await fetch(`${BASE_URL}/reports?_page=${page}&_per_page=${DEFAULT_PAGE_SIZE}`)

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Something went wrong")
        }
        throw error;
    }
}

export async function createReport(reportForm: Report) {

    try {
        const response = await fetch(`${BASE_URL}/reports`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reportForm)
        })

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        return await response.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log("Something went wrong")
        }
        throw e;
    }
}
