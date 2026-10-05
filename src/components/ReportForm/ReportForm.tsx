import type {FormElementType} from "../../types/report.ts";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import type useValidation from "../../hooks/useValidation.ts";
import {ANNOUNCEMENT_TYPES, PET_TYPES} from "../../constant.ts";
import type {ReportFormData} from "../AddReportModal/AddReportModal.tsx";


type FormElementProps = {
    form: ReportFormData;
    formAction: (payload: FormData) => void;
    isPending: boolean;
    validation: ReturnType<typeof useValidation>;
    onBlurHandle: (e: React.ChangeEvent<FormElementType>) => void;
    handleInputChange: (e: React.ChangeEvent<FormElementType>) => void;
};
export default function ReportForm({
                                       form,
                                       isPending,
                                       formAction,
                                       validation,
                                       onBlurHandle,
                                       handleInputChange
                                   }: FormElementProps) {
    const isErrorExist = () => !!Object.keys(validation?.error).length;


    return <form action={formAction}
                 className="flex flex-col gap-5 p-5 h-[600px] overflow-y-scroll">
        <div>
            <span>Announcement type </span>
            <div className="flex gap-5">
                {ANNOUNCEMENT_TYPES.map((type) => {
                    return <label key={type}>
                        <input type="radio"
                               name="type"
                               value={type}
                               checked={form.type === type}
                               className="mr-2"
                               onBlur={onBlurHandle}
                               onChange={handleInputChange}
                        />
                        <span className="capitalize">{type}</span>
                    </label>
                })}
            </div>
        </div>

        <ErrorMessage message={validation?.error?.type}/>

        <label htmlFor="pet-type">Pet Type</label>

        <select onChange={handleInputChange}
                onBlur={onBlurHandle}
                value={form.petType}
                name="petType"
                id="pet-type"
                className="border-2 border-solid capitalize">

            <option value="" disabled> Select a Pet type</option>
            {PET_TYPES.map((petType) => <option
                key={petType}
                value={petType}
                className="capitalize"
            >
                {petType}
            </option>)}
        </select>

        <ErrorMessage message={validation?.error?.petType}/>

        <label className="flex flex-col gap-2">
            Pet Name
            <input onChange={handleInputChange}
                   value={form.petName}
                   onBlur={onBlurHandle}
                   type="text" placeholder="Pet name" name="petName" className="border-2 border-solid"/>

            <ErrorMessage message={validation?.error?.petName}/>
        </label>

        <label className="flex flex-col gap-2">
            Photo URL
            <input onChange={handleInputChange}
                   value={form.photoUrl}
                   type="url" name="photoUrl" className="border-2 border-solid"/>
        </label>


        <label className="flex flex-col gap-2">
            location
            <input onChange={handleInputChange}
                   value={form.location}
                   onBlur={onBlurHandle}
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
                onBlur={onBlurHandle}
                className="border-2 border-solid w-full"
                id="">
                    </textarea>
            <br/>
            <ErrorMessage message={validation?.error?.details}/>
        </label>

        <label className="flex flex-col gap-2">
            Contact info
            <input onChange={handleInputChange}
                   onBlur={onBlurHandle}
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