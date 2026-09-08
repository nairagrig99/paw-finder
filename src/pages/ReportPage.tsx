import {Suspense, useState} from "react";
import ReportGrid from "../components/ReportGrid/ReportGrid.tsx";
import useReportList from "../hooks/useReportList.ts";
import AddReportModal from "../components/AddReportModal/AddReportModal.tsx";

export default function ReportPage() {

    const {fetchReportList, setPage, page} = useReportList(1);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleReport = () => {
        setIsOpen(prevState => !prevState)
    }

    return <div className="flex flex-col gap-5 items-start w-full px-3 py-10">
        {isOpen && <div className="absolute inset-0 bg-black/50"></div>}
        <button
            onClick={handleReport}
            className="bg-green-500 px-5 py-2 rounded-sm w-fit text-white">
            Add Report
        </button>
        <Suspense fallback={<div>Loading pet lists...</div>}>
            <ReportGrid fetchReport={fetchReportList} setPage={setPage} page={page}/>
        </Suspense>
        {isOpen && <AddReportModal isOpen={isOpen} setIsOpen={setIsOpen}/>}
    </div>
}