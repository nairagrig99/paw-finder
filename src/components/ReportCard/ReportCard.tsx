import type {Report} from "../../types/report.ts";
import Badge from "../Badge/Badge.tsx";
import PhotoWithFallback from "../PhotoWithFallback/PhotoWithFallback.tsx";
import {formatRelativeTime} from "../../util/dateUtils.ts";

export default function ReportCard({pet}: { pet: Report }) {


    return <div className="border p-[7px] flex flex-col justify-around break-words w-[250px]" tabIndex={0}>

        <PhotoWithFallback photoUrl={pet.photoUrl}/>

        <div className="flex items-center justify-between break-all gap-5">
            <div>
                <p className="capitalize"><strong>Name: </strong> <span>{pet.petName}</span></p>
                <p className="capitalize"><strong>Type:</strong> <span>{pet.petType}</span></p>
                <p className="capitalize"><strong>Location:</strong> <span>{pet.location}</span></p>
                <p className="capitalize"><strong>Contact:</strong> <span>{pet.contact}</span></p>
                {pet.createdAt &&
                    <p className="capitalize"><strong>Created date:</strong> {formatRelativeTime(pet.createdAt)}
                    </p>}
            </div>
            <Badge type={pet.type}/>
        </div>

    </div>
}