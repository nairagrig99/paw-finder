import type {PaginationProps} from "../../types/report.ts";
import {useEffect, useRef, useState} from "react";
import {PER_PAGINATION} from "../../constant.ts";


export default function Pagination({setPage, page, petsList}: PaginationProps) {

    const [transform, setTransform] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(0)
    const pageRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        setPageWidth(pageRef.current[0].offsetWidth)
    }, []);

    const handlePrev = () => {
        const prev = page - 1;
        if (prev <= 0) return
        setPage(prev)
        // if (page - PER_PAGINATION === 1) return;
        setTransform((prevState) => prevState + pageWidth)
    }

    const handleNext = () => {
        const next = page + 1;
        if (next > petsList.pages) return
        setPage(next);
        if (page + PER_PAGINATION > petsList.pages) return;
        setTransform((prevState) => prevState - pageWidth)
    }

    const pageIndicators = (currentPage: number) => {
        setPage(currentPage);
        if (currentPage === petsList.pages || currentPage === 1) return;

        setTransform((prevState) => {
            if (currentPage > page) return prevState - pageWidth
            return prevState + pageWidth
        })
    }

    return <div className="flex gap-2 justify-center mt-8">
        <button
            onClick={handlePrev}
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
                    Array.from({length: petsList.pages}, (_, index) => index + 1).map((e, index) => {
                        return <span onClick={() => pageIndicators(e)} key={e}
                                     ref={(el) => {
                                         if (el) {
                                             pageRef.current[index] = el
                                         }
                                     }}
                                     className={`px-3 py-1 rounded-full ${e === page ? 'bg-red-500' : ''}`}>
                            {e}
                        </span>
                    })
                }
            </div>

        </div>
        <button
            onClick={handleNext}
            className="bg-black text-white px-3 py-2">
            Next
        </button>
    </div>
}