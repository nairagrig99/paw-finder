import type {AnnouncementType} from "../../types/report.ts";

export default function Badge({type}: AnnouncementType) {
    return <div>
        <span className={`p-3 text-white rounded rounded-1xl w-12 h-12 block ${type === "lost" ? "bg-red-500" : "bg-green-500"}`}></span>
    </div>
}