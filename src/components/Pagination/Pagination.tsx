import type {PaginationProps} from "../../types/report.ts";
import {useEffect, useRef, useState, useTransition} from "react";
import {PER_PAGINATION} from "../../constant.ts";


export default function Pagination({setPage, page, petsList}: PaginationProps) {

    const [transform, setTransform] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(0)
    const pageItemRefs = useRef<HTMLSpanElement[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setPageWidth(pageItemRefs.current[0].offsetWidth)
    }, []);


    const handlePrevPage = () => {
        const prev = page - 1;

        if (prev <= 0) return
        startTransition(() => setPage(prev))
        // if (page - PER_PAGINATION === 1) return;
        setTransform((prevState) => prevState + pageWidth)
    }

    const handleNextPage = () => {
        const next = page + 1;

        if (next > petsList.pages) return
        startTransition(() => setPage(next))
        if (page + PER_PAGINATION > petsList.pages) return;
        setTransform((prevState) => prevState - pageWidth)
    }

    const handlePageSelect = (currentPage: number) => {
        startTransition(() => setPage(currentPage))
        if (currentPage === petsList.pages || currentPage === 1) return;

        setTransform((prevState) => {
            if (currentPage > page) return prevState - pageWidth
            return prevState + pageWidth
        })
    }

    return <div className="flex gap-2 justify-center mt-8">
        <button
            onClick={handlePrevPage}
            className="bg-black text-white px-3 py-2">Prev
        </button>
        <div className={`flex items-center gap-2 cursor-pointer overflow-hidden`}
             style={{width: `${pageWidth * PER_PAGINATION}px`}}
        >
            <div className="flex"
                 style={{
                     transition: 'transform 0.4s ease-in-out',
                     transform: `translateX(${transform}px)`
                 }}>
                {
                    Array.from({length: petsList.pages}, (_, index) => index + 1).map((pageNum, index) => {
                        return <span onClick={() => handlePageSelect(pageNum)} key={pageNum}
                                     ref={(el) => {
                                         if (el) {
                                             pageItemRefs.current[index] = el
                                         }
                                     }}
                                     className={`px-3 py-1 rounded-full ${pageNum === page ? 'bg-red-500' : ''}`}>
                            {pageNum}
                        </span>
                    })
                }
            </div>

        </div>
        <button
            onClick={handleNextPage}
            className="bg-black text-white px-3 py-2">
            Next
        </button>
    </div>
}