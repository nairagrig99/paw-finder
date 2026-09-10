import type {FormElementType, Report} from "../../types/report.ts";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import type useValidation from "../../hooks/useValidation.ts";


type FormElementProps = {
    form: Report;
    formAction: (payload: FormData) => void;
    isPending: boolean;
    useValidate: ReturnType<typeof useValidation>;
    handleFormState: (e: React.ChangeEvent<FormElementType>) => void;
};
export default function FormElement({
                                        form,
                                        isPending,
                                        formAction,
                                        useValidate,
                                        handleFormState
                                    }: FormElementProps) {
    const isErrorExist = () => !!Object.keys(useValidate?.error).length;

    return <form action={formAction}
                 className="flex flex-col gap-5 p-5 h-[600px] overflow-y-scroll">
        <div>
            <span>Announcement type </span>
            <div className="flex gap-5">
                <label>
                    <input type="radio"
                           name="type"
                           value="Lost"
                           className="mr-2"
                           onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                           onChange={handleFormState}
                    />
                    <span>Lost</span>
                </label>
                <label>
                    <input type="radio"
                           name="type"
                           value="Found"
                           className="mr-2"
                           onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                           onChange={handleFormState}
                    />
                    <span>Found</span>
                </label>

            </div>
        </div>
        <ErrorMessage message={useValidate?.error?.type}/>

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

        <ErrorMessage message={useValidate?.error?.petType}/>

        <label className="flex flex-col gap-2">
            Pet Name
            <input onChange={handleFormState}
                   value={form.petName}
                   onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                   type="text" placeholder="Pet name" name="petName" className="border-2 border-solid"/>

            <ErrorMessage message={useValidate?.error?.petName}/>
        </label>

        <label className="flex flex-col gap-2">
            Photo URL
            <input onChange={handleFormState}
                   onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                   value={form.photoUrl}
                   type="url" name="photoUrl" className="border-2 border-solid"/>

            <ErrorMessage message={useValidate?.error?.photoUrl}/>
        </label>


        <label className="flex flex-col gap-2">
            location
            <input onChange={handleFormState}
                   value={form.location}
                   onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                   type="text"
                   name="location"
                   className="border-2 border-solid"/>
            <ErrorMessage message={useValidate?.error?.location}/>
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
            <ErrorMessage message={useValidate?.error?.details}/>
        </label>

        <label className="flex flex-col gap-2">
            Contact info
            <input onChange={handleFormState}
                   onBlur={(event: React.ChangeEvent<FormElementType>) => useValidate.validateForm(event)}
                   value={form.contact}
                   type="text" name="contact" className="border-2 border-solid"/>

            <ErrorMessage message={useValidate?.error?.contact}/>
        </label>

        <input type="submit"
               value="Create"
               disabled={isPending || isErrorExist()}
               className={`${isPending || isErrorExist() ? 'bg-gray-500 cursor-wait' : ' bg-green-500 cursor-pointer'} rounded py-2 px-4 w-fit text-white`}/>
    </form>
}