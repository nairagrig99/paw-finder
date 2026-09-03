// import {use} from "react";

import {use} from "react";
import type {PaginatedResponse, Report} from "../../types/report.ts";
import ReportCart from "../ReportCard/ReportCart.tsx";
import Pagination from "../Pagination/Pagination.tsx";

export default function ReportGrid({fetchReport}: { fetchReport: Promise<PaginatedResponse<Report>> }) {
    const getPets = use(fetchReport);


    return <div className="grid grid-cols-[repeat(3,auto)] gap-4">
        {
            getPets.data.map((pet: Report) => (
                <ReportCart pet={pet} key={pet.id}/>
            ))
        }
            <Pagination/>
    </div>
}