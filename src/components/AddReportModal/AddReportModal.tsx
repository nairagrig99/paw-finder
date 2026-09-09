import {useActionState, useEffect, useState} from "react";
import type {FormElementType, Report} from "../../types/report.ts";
import useValidation from "../../hooks/useValidation.ts";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

type ModalProps = {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}

const INITIAL_FORM: Report = {
    type: "",
    petType: "",
    petName: "",
    details: "",
    photoUrl: "",
    location: "",
    contact: ""
}

async function createAnnouncementAction(prevState, formData) {
    console.log("prevState", prevState);
    console.log("formData", formData);
    return await new Promise((resolve) => resolve)
}

export default function AddReportModal({isOpen, setIsOpen}: ModalProps) {

    const [state, formAction, isPending] = useActionState(createAnnouncementAction, INITIAL_FORM);

    const [form, setForm] = useState(INITIAL_FORM);
    const useValidate = useValidation(form);

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
            <form action={formAction}
                  className="flex flex-col gap-5 p-5 h-[600px] overflow-y-scroll">
                <div>
                    <span>Announcement type </span>
                    <div className="flex gap-5">
                        <label>
                            <input type="radio"
                                   name="type"
                                   value="Lost"
                                   className="mr-2"
                                   onChange={handleFormState}
                            />
                            <span>Lost</span>
                        </label>
                        <label>
                            <input type="radio"
                                   name="type"
                                   value="Found"
                                   className="mr-2"
                                   onChange={handleFormState}
                            />
                            <span>Found</span>
                        </label>

                    </div>
                </div>

                <label htmlFor="pet-type">Pet Type</label>

                <select onChange={handleFormState}
                        onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                        value={form.petType}
                        name="petType"
                        id="pet-type"
                        className="border-2 border-solid">

                    <option value="" disabled> Select a Pet type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                </select>

                <ErrorMessage message={useValidate.error.petType}/>

                <label className="flex flex-col gap-2">
                    Pet Name
                    <input onChange={handleFormState}
                           onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                           type="text" placeholder="Pet name" name="petName" className="border-2 border-solid"/>

                    <ErrorMessage message={useValidate.error.petName}/>
                </label>

                <label className="flex flex-col gap-2">
                    Photo URL
                    <input onChange={handleFormState}
                           onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                           value={form.photoUrl}
                           type="url" name="photoUrl" className="border-2 border-solid"/>

                    <ErrorMessage message={useValidate.error.photoUrl}/>
                </label>

                <label className="flex flex-col gap-2">
                    location
                    <input onChange={handleFormState}
                           value={form.location}
                           onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                           type="text" name="location" className="border-2 border-solid"/>

                    <ErrorMessage message={useValidate.error.location}/>
                </label>

                <label className="flex flex-col gap-2">
                    location
                    <input onChange={handleFormState}
                           value={form.location}
                           onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                           type="text"
                           name="location"
                           className="border-2 border-solid"/>
                    <ErrorMessage message={useValidate.error.location}/>
                </label>

                <label>
                    <p>Details</p>

                    <textarea
                        name="details"
                        value={form.details}
                        onChange={handleFormState}
                        onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                        className="border-2 border-solid w-full"
                        id="">
                    </textarea>
                    <br/>
                    <ErrorMessage message={useValidate.error.details}/>
                </label>

                <label className="flex flex-col gap-2">
                    Contact info
                    <input onChange={handleFormState}
                           onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                           value={form.contact}
                           type="text" name="contactInfo" className="border-2 border-solid"/>

                    <ErrorMessage message={useValidate.error.contact}/>
                </label>

                <input type="submit"
                       value="Create"
                       className="bg-green-500 rounded py-2 px-4 w-fit text-white"/>
            </form>
        </div>
    </div>
}