import type {Report} from "../types/report.ts";
import {createReports} from "./report.ts";

export async function createAnnouncementAction(_: unknown, formData: FormData) {

    try {
        const formEntries = Object.fromEntries(formData);
        let isError = false
        for (const formKey in formEntries) {
            if (formEntries[formKey] === '') {
                isError = true
            }
        }

        if (isError) {
            return {success: false, data: formEntries, error: "Empty Field"};
        }

        const newFormDate = {
            ...formEntries,
            createdAt: new Date().toISOString().replace(/\.\d{3}/, "")
        } as Report;

        await createReports(newFormDate);
        return {success: true, data: null, error: null};
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {success: false, data: null, error: err.message || "Failed to create report"};
        }
    }
}