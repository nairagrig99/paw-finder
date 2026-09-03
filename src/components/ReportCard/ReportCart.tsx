import type {Report} from "../../types/report.ts";
import Badge from "../Badge/Badge.tsx";
import PhotoWithFallback from "../PhotoWithFallback/PhotoWithFallback.tsx";
import useConvertDate from "../../hooks/useConvertDate.ts";

export default function ReportCart({pet}: { pet: Report }) {

    const convertDate = useConvertDate()

    return <div className="border p-[7px] flex flex-col justify-around">

        <PhotoWithFallback photoUrl={pet.photoUrl}/>

        <div className="flex items-center justify-between">
            <div>
                <p className="capitalize">pet name: {pet.petName}</p>
                <p className="capitalize">pet type: {pet.petType}</p>
                <p className="capitalize">{pet.location}</p>
                <p className="capitalize">{convertDate(pet.createdAt)}</p>
            </div>
            <Badge type={pet.type}></Badge>
        </div>

    </div>
}