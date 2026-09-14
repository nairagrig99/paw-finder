import {useActionState, useEffect, useEffectEvent, useState} from "react";
import type {ActionState, FormElementType, ModalProps, Report} from "../../types/report.ts";
import useValidation from "../../hooks/useValidation.ts";
import FormElement from "../FormElement/FormElement.tsx";
import {createAnnouncementAction} from "../../api/action.ts";
import {AnnouncementEnum, PetEnum} from "../../enums/enums.ts";

const INITIAL_ACTION_STATE: ActionState = {
    success: false,
    data: null,
    error: null,
};

const INITIAL_FORM: Report = {
    type: AnnouncementEnum.LOST,
    petType: PetEnum.DOG,
    petName: "",
    details: "",
    photoUrl: "",
    location: "",
    contact: ""
}

export default function AddReportModal({isOpen, setIsOpen, page, setPage}: ModalProps) {

    const [state, formAction, isPending] = useActionState(createAnnouncementAction, INITIAL_ACTION_STATE);

    const [form, setForm] = useState(INITIAL_FORM);
    const useValidate = useValidation();


    useEffect(() => {
        document.body.style.overflow = "hidden";

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setIsOpen(!isOpen)
            }
        })
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener('keydown', () => setIsOpen(!isOpen))
        }
    }, [isOpen, setIsOpen]);

    const findErrors = useEffectEvent((state: ActionState) => {
        if (!state.data) return
        for (const key in state.data) {
            const reportKey = key as keyof Report;
            const value = state.data[reportKey];
            useValidate.validateFormByName(reportKey, String(value))
        }
    })

    const changePageEvent = useEffectEvent(() => {
        setPage(page)
    })

    useEffect(() => {
        if (state?.success) {
            setIsOpen(!isOpen)
            changePageEvent()
        }

        if (state?.error) {
            findErrors(state)
        }

    }, [state, setIsOpen, isOpen]);

    const handleFormState = (e: React.ChangeEvent<FormElementType>) => {
        const {name, value} = e.target
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    return <div className="w-[600px] h-[600px] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">

        <div className="relative">
            <div className="absolute right-2 top-0 text-xl">
                <button onClick={() => setIsOpen(!isOpen)}> X</button>
            </div>
        </div>

        <div>
            <FormElement form={form}
                         formAction={formAction}
                         isPending={isPending}
                         useValidate={useValidate}
                         handleFormState={handleFormState}
            ></FormElement>
        </div>
    </div>
}