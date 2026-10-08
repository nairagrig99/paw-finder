import {useActionState, useCallback, useEffect, useRef, useState} from "react";
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

export default function AddReportModal({
                                           isOpen,
                                           setIsOpen,
                                           setPage,
                                           page
                                       }: ModalProps) {

    const [state, formAction, isPending] = useActionState(createAnnouncementAction, INITIAL_ACTION_STATE);

    const [form, setForm] = useState<ReportFormData>(INITIAL_FORM);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const firstInputRef = useRef<HTMLInputElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const modalRef = useRef<HTMLDivElement>(null);
    const validation = useValidation();


    useEffect(() => {
        document.body.style.overflow = "hidden";
        const modalElement = modalRef.current;

        const handler = (event: KeyboardEvent) => {
            const focusableElements =
                modalElement?.querySelectorAll<HTMLElement>('button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')

            if (!focusableElements) return

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1]

            if (event.key === 'Escape') setIsOpen(false)
            if (event.key === 'Tab') {

                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        event.preventDefault()
                        lastElement.focus()
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault()
                        firstElement.focus()
                    }
                }

            }
        }

        window.addEventListener('keydown', handler);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener('keydown', handler)
        }
    }, [setIsOpen]);

    useEffect(() => {
        if (state.error) {
            if (!state.data) return
            for (const key in state.data) {
                const reportKey = key as keyof Report;
                const value = state.data[reportKey];
                validation.validateFormByName(reportKey, String(value))
            }
        }
    }, [state])

    useEffect(() => {
        if (isOpen && firstInputRef?.current) firstInputRef.current.focus()
    }, [isOpen]);


    useEffect(() => {
        if (state?.success) {
            setIsOpen(false)
            setPage(page)
        }

        if (state?.error) closeButtonRef.current?.focus();

    }, [state, setIsOpen, setPage, page]);

    const handleInputChange = (e: React.ChangeEvent<FormElementType>) => {
        validation.validateForm(e)
        const {name, value} = e.target
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onBlurHandle = useCallback((event: React.ChangeEvent<FormElementType>) => {
        if (!isSubmit) return
        validation.validateForm(event)
    }, [isSubmit, validation])
    const submitFormAction = (formData: FormData) => {
        formAction(formData)
        setIsSubmit(true)
    }

    if (!isOpen) return;

    return <div>
        {isOpen && <div onClick={() => setIsOpen(!isOpen)} className="absolute inset-0 bg-black/50"></div>}

        <div
            ref={modalRef}

            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"

            className="w-[600px] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">

            <div className="relative">
                <div className="absolute right-2 top-0 text-xl">
                    <button ref={closeButtonRef} onClick={() => setIsOpen(false)}> X</button>
                </div>
            </div>

            <div>
                <h2 className="text-2xl text-center py-4 text-green-500 font-bold" id="modal-title">Add new Report</h2>
                <ReportForm form={form}
                            formAction={submitFormAction}
                            isPending={isPending}
                            validation={validation}
                            onBlurHandle={onBlurHandle}
                            handleInputChange={handleInputChange}
                            firstInputRef={firstInputRef}
                ></ReportForm>
            </div>
        </div>
    </div>
}