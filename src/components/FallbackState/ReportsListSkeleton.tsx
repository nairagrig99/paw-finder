import placeholderIcon from "../../assets/placeholder_svg.svg"

export default function ReportsListSkeleton() {
    return <div className="flex gap-2 justify-center w-full"
                role="status"
                aria-busy="true"
                aria-hidden="true"
                aria-label="Loading reports">
        {Array.from({length: 3}, (_, index) => 1 + index).map((item) => (
            <div key={item} className=" border border-gray-500">
                <img src={placeholderIcon}
                     role="status"
                     alt="Placeholder Icon"
                     className="w-62.5 h-62.5 animate-pulse"/>
            </div>
        ))}
    </div>
}