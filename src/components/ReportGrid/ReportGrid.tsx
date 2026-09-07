import type {PaginatedResponse, Report} from "../../types/report.ts";
import ReportCart from "../ReportCard/ReportCart.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import {use} from "react";

export default function ReportGrid({fetchReport,setPage}: { fetchReport: Promise<PaginatedResponse<Report>>,setPage: (page: number) => void }) {

    const getPets = use(fetchReport);

    return <div className="grid grid-cols-[repeat(3,250px)] gap-4">
        {
            getPets.data.map((pet: Report) => (
                <ReportCart pet={pet} key={pet.id}/>
            ))
        }
        <Pagination petsList={getPets} setPage={setPage}/>
    </div>

}