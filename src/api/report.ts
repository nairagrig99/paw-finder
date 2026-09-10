import {BASE_URL} from "../constant.ts";
import type {PaginatedResponse, Report} from "../types/report.ts";

export async function fetchReports(page: number): Promise<PaginatedResponse<Report>> {

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

export async function createReports(reportForm: Report) {

    try {
        const response = await fetch(`${BASE_URL}/reports`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reportForm)
        })

        if (!response.ok) {
            console.log("error here")
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
