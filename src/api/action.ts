import type {Report} from "../types/report.ts";
import {createReport} from "./report.ts";

export async function createAnnouncementAction(_: unknown, formData: FormData) {

    try {
        const formEntries = Object.fromEntries(formData);
        let hasValidationError = false
        for (const key in formEntries) {
            if (formEntries[key] === '') hasValidationError = true
        }

        if (hasValidationError) {
            return {success: false, data: formEntries, error: "Empty Field"};
        }

        const newFormData = {
            ...formEntries,
            createdAt: new Date().toISOString().replace(/\.\d{3}/, "")
        } as Report;

        await new Promise((resolve) => setTimeout(resolve, 3000))
        await createReport(newFormData);

        return {success: true, data: null, error: null};
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {success: false, data: null, error: error.message || "Failed to create report"};
        }
    }
}