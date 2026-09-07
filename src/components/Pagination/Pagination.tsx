import type {PaginatedResponse, Report} from "../../types/report.ts";


export default function Pagination({petsList, setPage}: {
    petsList: PaginatedResponse<Report>,
    setPage: (page: number) => void
}) {

    const handlePrev = () => {

    }

    const handleNext = () => {

    }

    const pageIndicators = (page: number) => {
        setPage(page)
    }

    return <div className="flex gap-2 justify-center mt-8">
        <button
            onClick={handlePrev}
            className="bg-black text-white px-3 py-2">Prev
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
            {
                Array.from({length: petsList.pages}, (_, index) => index + 1).map((e) => {
                    return <span onClick={() => pageIndicators(e)} key={e}>{e}</span>
                })
            }
        </div>
        <button
            onClick={handleNext}
            className="bg-black text-white px-3 py-2">
            Next
        </button>
    </div>
}