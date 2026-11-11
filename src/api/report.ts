import {BASE_URL, PAGE_SIZE} from "../constant.ts";
import type {CreateReportPayload, PaginatedResponse, Report, ReportFilters} from "../types/report.ts";

export async function fetchReports(reportFilters: ReportFilters):
    Promise<PaginatedResponse<Report>> {

    try {
        const response = await fetch(`
        ${BASE_URL}/reports?page=${reportFilters.page}&limit=${PAGE_SIZE}&search=${reportFilters.search}&type=${reportFilters.type}&petType=${reportFilters.petType}&sort=${reportFilters.sort}`)

        if (!response.ok
        ) {
            throw new Error("Something went wrong");
        }

        const data = await response.json();

        return {
            data: data.data,
            total: data.total,
            page: data.page,
        }
    } catch
        (error: unknown) {
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
        throw new Error("Failed to create reports", {cause: error});
    }
}
