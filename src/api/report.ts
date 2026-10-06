import {BASE_URL, PAGE_SIZE} from "../constant.ts";
import type {CreateReportPayload, PaginatedResponse, Report} from "../types/report.ts";

export async function fetchReports(page: number): Promise<PaginatedResponse<Report>> {

    try {
        const response = await fetch(`${BASE_URL}/reports?_page=${page}&_per_page=${PAGE_SIZE}`)

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const data = await response.json();

        return {
            data: data.data,
            total: data.items,
            page: data.prev ? data.prev + 1 : (data.next ? data.next - 1 : data.first),
            totalPages: data.pages
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to fetch reports", {cause: error});

    }
}

export async function createReport(data: CreateReportPayload): Promise<Report> {

    try {
        const response = await fetch(`${BASE_URL}/reports`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to create reports",{cause: error});
    }
}
