import {Suspense, useState} from "react";
import ReportGrid from "../components/ReportGrid/ReportGrid.tsx";
import useReports from "../hooks/useReports.ts";
import AddReportModal from "../components/AddReportModal/AddReportModal.tsx";
import ReportsListSkeleton from "../components/FallbackState/ReportsListSkeleton.tsx";
import {ErrorBoundary} from "../components/ErrorBoundary/ErrorBoundary.tsx";
import RetryError from "../components/ErrorBoundary/RetryError.tsx";
import SearchInput from "../components/SearchInput/SearchInput.tsx";
import FilterBar from "../components/FilterBar/FilterBar.tsx";
import Sort from "../components/SortBar/Sort.tsx";
import {ANNOUNCEMENT_TYPES, PET_TYPES} from "../constant.ts";

export default function ReportPage() {

    const {data, totalPages, page, filters, isPending, onPageChange} = useReports();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleReport = () => {
        setIsOpen(prevState => !prevState)
    }

    return <div className="flex flex-col gap-5 items-start w-full px-3 py-10">
        <div>
            {isPending ?
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div
                        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                </div> : ""}
        </div>

        <button
            onClick={handleReport}
            className="bg-green-500 px-5 py-2 rounded-sm w-fit text-white">
            Report a Pet
        </button>

        <div className="flex justify-between w-full">
            <SearchInput/>
            <FilterBar options={PET_TYPES} type="petType"/>
            <FilterBar options={ANNOUNCEMENT_TYPES} type="type"/>
            <Sort/>
        </div>

        <ErrorBoundary fallback={({resetErrorBoundary}) => {
            return <RetryError resetErrorBoundary={resetErrorBoundary}/>
        }
        }>
            <Suspense fallback={<ReportsListSkeleton/>}>
                {data?.length > 0 && <ReportGrid data={data}
                                                 onPageChange={onPageChange}
                                                 page={page}
                                                 totalPages={totalPages}/>}
                {!data?.length && filters.search &&
                    <div>No reports found for {(<span> [{filters.search}]</span>)}</div>}

            </Suspense>
        </ErrorBoundary>

        {isOpen && <AddReportModal
            page={page}
            isOpen={isOpen}
            setIsOpen={setIsOpen}/>}
    </div>
}