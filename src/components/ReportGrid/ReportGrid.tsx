import type {Report, ReportProps} from "../../types/report.ts";
import ReportCard from "../ReportCard/ReportCard.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import {memo, use} from "react";


const ReportGrid = memo(({fetchRequest, onPageChange, page}: ReportProps) => {

    const getPets = use(fetchRequest);

    return <div className="flex flex-col gap-2 w-full">

        <div className="flex flex-wrap w-full gap-4 justify-center">
            {
                getPets && getPets.data.map((pet: Report) => (
                    <ReportCard pet={pet} key={pet.id}/>
                ))
            }
            {getPets.data.length === 0 &&
                <div
                    className="flex items-center justify-center w-[250px] max-w-full h-[100px] text-black rounded-[5px] border border-gray-500 bg-[#dad9d98a]">
                    There is no any Reports yet
                </div>}
        </div>

        {!!getPets.data.length && <Pagination petsList={getPets}
                                              onPageChange={onPageChange}
                                              page={page}
        />}
    </div>

})
export default ReportGrid