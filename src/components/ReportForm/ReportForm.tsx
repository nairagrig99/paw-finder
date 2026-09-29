import type {FormElementType, Report} from "../../types/report.ts";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import type useValidation from "../../hooks/useValidation.ts";


type FormElementProps = {
    form: Report;
    formAction: (payload: FormData) => void;
    isPending: boolean;
    validation: ReturnType<typeof useValidation>;
    handleInputChange: (e: React.ChangeEvent<FormElementType>) => void;
};
export default function ReportForm({
                                        form,
                                        isPending,
                                        formAction,
                                       validation,
                                        handleInputChange
                                    }: FormElementProps) {
    const isErrorExist = () => !!Object.keys(validation?.error).length;

    return <form action={formAction}
                 className="flex flex-col gap-5 p-5 h-[600px] overflow-y-scroll">
        <div>
            <span>Announcement type </span>
            <div className="flex gap-5">
                <label>
                    <input type="radio"
                           name="type"
                           value="lost"
                           checked={form.type === 'lost'}
                           className="mr-2"
                           onBlur={(event: React.ChangeEvent<FormElementType>) => validation.validateForm(event)}
                           onChange={handleInputChange}
                    />
                    <span>Lost</span>
                </label>
                <label>
                    <input type="radio"
                           name="type"
                           value="found"
                           checked={form.type === 'found'}
                           className="mr-2"
                           onBlur={(event: React.ChangeEvent<FormElementType>) => validation.validateForm(event)}
                           onChange={handleInputChange}
                    />
                    <span>Found</span>
                </label>

            </div>
        </div>
        <ErrorMessage message={validation?.error?.type}/>

        <label htmlFor="pet-type">Pet Type</label>

        <select onChange={handleInputChange}
                onBlur={(event: React.ChangeEvent<FormElementType>) => validation.validateForm(event)}
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

        <ErrorMessage message={validation?.error?.petType}/>

        <label className="flex flex-col gap-2">
            Pet Name
            <input onChange={handleInputChange}
                   value={form.petName}
                   onBlur={(event: React.ChangeEvent<FormElementType>) => validation.validateForm(event)}
                   type="text" placeholder="Pet name" name="petName" className="border-2 border-solid"/>

            <ErrorMessage message={validation?.error?.petName}/>
        </label>

        <label className="flex flex-col gap-2">
            Photo URL
            <input onChange={handleInputChange}
                   onBlur={(event: React.ChangeEvent<FormElementType>) => validation.validateForm(event)}
                   value={form.photoUrl}
                   type="url" name="photoUrl" className="border-2 border-solid"/>

            <ErrorMessage message={validation?.error?.photoUrl}/>
        </label>


        <label className="flex flex-col gap-2">
            location
            <input onChange={handleInputChange}
                   value={form.location}
                   onBlur={(event: React.ChangeEvent<FormElementType>) => validation.validateForm(event)}
                   type="text"
                   name="location"
                   className="border-2 border-solid"/>
            <ErrorMessage message={validation?.error?.location}/>
        </label>

        <label>
            <p>Details</p>

            <textarea
                name="details"
                value={form.details}
                onChange={handleInputChange}
                onBlur={(event: React.ChangeEvent<FormElementType>) => validation.validateForm(event)}
                className="border-2 border-solid w-full"
                id="">
                    </textarea>
            <br/>
            <ErrorMessage message={validation?.error?.details}/>
        </label>

        <label className="flex flex-col gap-2">
            Contact info
            <input onChange={handleInputChange}
                   onBlur={(event: React.ChangeEvent<FormElementType>) => validation.validateForm(event)}
                   value={form.contact}
                   type="text" name="contact" className="border-2 border-solid"/>

            <ErrorMessage message={validation?.error?.contact}/>
        </label>

        <input type="submit"
               value={isPending ? 'Submitting...' : 'Submit'}
               disabled={isPending || isErrorExist()}
               className={`${isPending || isErrorExist() ? 'bg-gray-500 cursor-wait' : ' bg-green-500 cursor-pointer'} rounded py-2 px-4 w-fit text-white`}/>
    </form>
}