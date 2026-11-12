import type {Report, ReportProps} from "../../types/report.ts";
import ReportCard from "../ReportCard/ReportCard.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import {memo} from "react";

const ReportGrid = memo(({
                             data,
                             onPageChange,
                             page,
                             totalPages
                         }: ReportProps) => {


    return <main role="main" className="flex flex-col gap-2 w-full min-h-screen">

        <div
            className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-full justify-items-center">
            {
                data && data?.map((pet: Report, index) => (
                    <ReportCard pet={pet}
                                index={index}
                                key={pet.id}/>
                ))
            }
            {data.length === 0 &&
                <div
                    className="col-span-full flex items-center justify-center w-62.5 max-w-full h-25 text-black rounded-[5px] border border-gray-500 bg-[#dad9d98a]">
                    There is no any Reports yet
                </div>}
        </div>

        {!!data.length && <Pagination
                                      onPageChange={onPageChange}
                                      page={page}
                                      totalPages={totalPages}
        />}
    </main>

})
export default ReportGrid