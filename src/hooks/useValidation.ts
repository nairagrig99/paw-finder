import {useState} from "react";
import type {FormElementType} from "../types/report.ts";

export default function useValidation() {

    const [error, setError] = useState<Record<string, string | number>>({});
    const validation = (name: string, value: string) => {
        if (value === '') {
            setError((prevState) => ({
                ...prevState,
                [name]: 'This field is required'
            }))
        } else {
            setError((prevState) => {
                const nextState = {...prevState}
                delete nextState[name]
                return nextState
            })
        }
    }
    const validateForm = (event: React.ChangeEvent<FormElementType>) => {
        const {name, value} = event.target
        validation(name, value)
    }
    const validateFormByName = (name: string, value: string) => {

        validation(name, value)
    }

    console.log('error', error);
    return {error, validateForm,validateFormByName}
}