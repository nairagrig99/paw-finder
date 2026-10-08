import {Suspense, useState} from "react";
import ReportGrid from "../components/ReportGrid/ReportGrid.tsx";
import useReportList from "../hooks/useReportList.ts";
import AddReportModal from "../components/AddReportModal/AddReportModal.tsx";
import ReportsListSkeleton from "../components/FallbackState/ReportsListSkeleton.tsx";
import {ErrorBoundary} from "../components/ErrorBoundary/ErrorBoundary.tsx";
import RetryError from "../components/ErrorBoundary/RetryError.tsx";

export default function ReportPage() {

    const {promiseRef, setPage, page, isPending} = useReportList();

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
        <ErrorBoundary fallback={({resetErrorBoundary}) => {
            return <RetryError resetErrorBoundary={resetErrorBoundary}/>
        }
        }>
            <Suspense fallback={<ReportsListSkeleton/>}>
                {promiseRef.current && <ReportGrid fetchRequest={promiseRef.current}
                                           onPageChange={setPage}
                                           page={page}/>}
            </Suspense>
        </ErrorBoundary>

        {isOpen && <AddReportModal
            page={page}
            setPage={setPage}
            isOpen={isOpen}
            setIsOpen={setIsOpen}/>}
    </div>
}