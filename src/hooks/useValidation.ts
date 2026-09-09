import {useState} from "react";
import type {FormElementType, Report} from "../types/report.ts";

export default function useValidation(form: Report) {

    const [error, setError] = useState(form);
    const validateForm = (event: React.ChangeEvent<FormElementType>) => {
        const {name, value} = event.target
        if (value === '') {
            setError((prevState) => ({
                ...prevState,
                [name]: 'This field is required'
            }))
        } else {
            setError((prevState) => ({
                ...prevState,
                [name]: ''
            }))
        }
    }

    return {error, validateForm}
}