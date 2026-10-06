import type {ActionState, Report} from "../../types/report.ts";
import {createReport} from "../../api/report.ts";

export async function createAnnouncementAction(_: unknown, formData: FormData): Promise<ActionState> {

    try {
        const formEntries = Object.fromEntries(formData);
        let hasValidationError = false
        for (const key in formEntries) {
            if (formEntries[key] === '' && key !== 'photoUrl') hasValidationError = true
        }

        if (hasValidationError) {
            return {success: false, data: formEntries, error: "Empty Field"};
        }

        const newFormData = {
            ...formEntries,
            createdAt: new Date().toISOString().replace(/\.\d{3}/, "")
        } as Report;

        await createReport(newFormData);

        return {success: true, data: null, error: null};
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create report";

        return {success: false, data: null, error: message};

    }
}