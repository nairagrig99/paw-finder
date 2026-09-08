import type {Report} from "../../types/report.ts";
import Badge from "../Badge/Badge.tsx";
import PhotoWithFallback from "../PhotoWithFallback/PhotoWithFallback.tsx";
import useConvertDate from "../../hooks/useConvertDate.ts";

export default function ReportCart({pet}: { pet: Report }) {

    const convertDate = useConvertDate();

    return <div className="border p-[7px] flex flex-col justify-around break-words w-[250px]">

        <PhotoWithFallback photoUrl={pet.photoUrl}/>

        <div className="flex items-center justify-between break-all gap-5">
            <div>
                <p className="capitalize"><strong>pet name: </strong> <span>{pet.petName}</span></p>
                <p className="capitalize"><strong>pet type:</strong> <span>{pet.petType}</span></p>
                <p className="capitalize"><strong>pet description:</strong> <span>{pet.location}</span></p>
                <p className="capitalize"><strong>created date:</strong> {convertDate(pet.createdAt)}</p>
            </div>
            <Badge type={pet.type}></Badge>
        </div>

    </div>
}