import {useActionState, useCallback, useEffect, useEffectEvent, useState} from "react";
import type {ActionState, FormElementType, ModalProps, Report} from "../../types/report.ts";
import useValidation from "../../hooks/useValidation.ts";
import {createAnnouncementAction} from "./action.ts";
import ReportForm from "../ReportForm/ReportForm.tsx";

export type ReportFormData = Omit<Report, "id">

const INITIAL_ACTION_STATE: ActionState = {
    success: false,
    data: null,
    error: null,
};

const INITIAL_FORM: ReportFormData = {
    type: "lost",
    petType: "other",
    petName: "",
    details: "",
    photoUrl: "",
    location: "",
    contact: "",
    createdAt: ""
}

export default function AddReportModal({isOpen, setIsOpen}: ModalProps) {

    const [state, formAction, isPending] = useActionState(createAnnouncementAction, INITIAL_ACTION_STATE);

    const [form, setForm] = useState<ReportFormData>(INITIAL_FORM);
    const validation = useValidation();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false)
        }

        window.addEventListener('keydown', handler);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener('keydown', handler)
        }
    }, [setIsOpen]);

    const validateErrors = useEffectEvent((state: ActionState) => {
        if (!state.data) return
        for (const key in state.data) {
            const reportKey = key as keyof Report;
            const value = state.data[reportKey];
            validation.validateFormByName(reportKey, String(value))
        }
    })


    useEffect(() => {
        if (state?.success) {
            setIsOpen(false)
        }

        if (state?.error) {
            validateErrors(state)
        }

    }, [state, setIsOpen]);

    const handleInputChange = (e: React.ChangeEvent<FormElementType>) => {
        validation.validateForm(e)
        const {name, value} = e.target
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onBlurHandle = useCallback((event: React.ChangeEvent<FormElementType>) => {
        validation.validateForm(event)
    }, [state?.error])

    return <>
        {isOpen && <div onClick={() => setIsOpen(!isOpen)} className="absolute inset-0 bg-black/50"></div>}

        <div className="w-[600px] h-[600px] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">

            <div className="relative">
                <div className="absolute right-2 top-0 text-xl">
                    <button onClick={() => setIsOpen(!isOpen)}> X</button>
                </div>
            </div>

            <div>
                <ReportForm form={form}
                            formAction={formAction}
                            isPending={isPending}
                            validation={validation}
                            onBlurHandle={onBlurHandle}
                            handleInputChange={handleInputChange}
                ></ReportForm>
            </div>
        </div>
    </>
}