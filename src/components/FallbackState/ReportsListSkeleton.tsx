import placeholder_svg from "../../assets/placeholder_svg.svg"

export default function ReportsListSkeleton() {
    return <div className="flex gap-2 justify-center w-full">
        {Array.from({length: 3}).map(() => (
            <div className="w-[250px] h-[250px] border border-gray-500">
                <img src={placeholder_svg} alt=""/>
            </div>
        ))}
    </div>
}