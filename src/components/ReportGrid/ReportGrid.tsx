import type {Report, ReportProps} from "../../types/report.ts";
import ReportCart from "../ReportCard/ReportCart.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import {use} from "react";


export default function ReportGrid({fetchReport, setPage, page}: ReportProps) {

    const getPets = use(fetchReport);

    return <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[repeat(3,250px)] gap-4">
            {
                getPets.data.map((pet: Report) => (
                    <ReportCart pet={pet} key={pet.id}/>
                ))
            }
        </div>

        <Pagination petsList={getPets} setPage={setPage} page={page}/>
    </div>

}