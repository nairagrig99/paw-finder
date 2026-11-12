import type {PaginationProps} from "../../types/report.ts";

import {PAGE_SIZE, PER_PAGINATION} from "../../constant.ts";


export default function Pagination({
                                       page,
                                       onPageChange,
                                       totalPages
                                   }: PaginationProps) {

    const handlePrevPage = () => {
        const prev = page - 1;
        if (prev <= 0) return
        onPageChange(prev)
    }

    if (!totalPages) return;

    const handleNextPage = () => {
        const next = page + 1;
        if (next > totalPages) return
        onPageChange(next);
        if (page + PER_PAGINATION > totalPages) return;
    }

    return <div className="flex gap-2 justify-center  mt-auto">

        <button
            onClick={handlePrevPage}
            className="bg-black text-white px-3 py-2">Prev
        </button>
        <div className={`flex items-center gap-2 cursor-pointer overflow-hidden`}
        >
            <div className="flex text-gray-700 font-medium">
                <div> {page} of {totalPages / PAGE_SIZE}</div>
            </div>
        </div>
        <button
            onClick={handleNextPage}
            className="bg-black text-white px-3 py-2">
            Next
        </button>
    </div>
}