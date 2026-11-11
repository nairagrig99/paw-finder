import type {PaginationProps} from "../../types/report.ts";

import {PAGE_SIZE, PER_PAGINATION} from "../../constant.ts";


export default function Pagination({
                                       page,
                                       onPageChange,
                                       totalPage,
                                       reportList
                                   }: PaginationProps) {

    const handlePrevPage = () => {
        const prev = page - 1;
        if (prev <= 0) return
        onPageChange(prev)
    }

    const handleNextPage = () => {
        const next = page + 1;
        if (next > totalPage) return
        onPageChange(next);
        if (page + PER_PAGINATION > totalPage) return;
    }

    return <div className="flex gap-2 justify-center  mt-auto">

        <button
            onClick={handlePrevPage}
            className="bg-black text-white px-3 py-2">Prev
        </button>
        <div className={`flex items-center gap-2 cursor-pointer overflow-hidden`}
        >
            <div className="flex text-gray-700 font-medium">
                <div> {page} of {totalPage / PAGE_SIZE}</div>
            </div>
        </div>
        <button
            onClick={handleNextPage}
            className="bg-black text-white px-3 py-2">
            Next
        </button>
    </div>
}