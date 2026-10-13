import type {Report} from "../../types/report.ts";
import Badge from "../Badge/Badge.tsx";
import PhotoWithFallback from "../PhotoWithFallback/PhotoWithFallback.tsx";
import {formatRelativeTime} from "../../util/dateUtils.ts";

export default function ReportCard({pet,index}: { pet: Report,index:number }) {


    return <article tabIndex={0} className="border p-1.75 flex flex-col justify-around wrap-break-word w-62.5">

        <PhotoWithFallback photoUrl={pet.photoUrl}
                           index={index}
                           alt={pet.petName}/>

        <div className="flex items-center justify-between break-all gap-5">
            <div>
                <h3 className="capitalize"><strong>Name: </strong> <span>{pet.petName}</span></h3>
                <p className="capitalize"><strong>Type:</strong> <span>{pet.petType}</span></p>
                <p className="capitalize"><strong>Location:</strong> <span>{pet.location}</span></p>
                <p className="capitalize"><strong>Contact:</strong> <span>{pet.contact}</span></p>
                {pet.createdAt &&
                    <p className="capitalize"><strong>Created date:</strong> {formatRelativeTime(pet.createdAt)}
                    </p>}
            </div>
            <Badge type={pet.type}/>
        </div>

    </article>
}