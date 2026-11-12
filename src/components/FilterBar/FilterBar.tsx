import useReportFilters from "../../hooks/useReportFilters.ts";
import {useState} from "react";

export default function FilterBar({options, type}: { options: string[], type: string }) {
    const [selected, setSelected] = useState<string>();
    const {setFilters} = useReportFilters()

    return <div>
        <select name="" id="" className="capitalize" onChange={(e) => {
            setFilters({[type]: e.currentTarget.value})
            setSelected(e.currentTarget.value)
        }}>
            <option disabled selected>Filter by {[type]}</option>
            {options.map((option) => (
                <option key={option} value={option} selected={selected === option}
                        className={`${selected === option ? 'bg-red-500' : ''} capitalize hover:bg-red-100`}>{option}</option>
            ))}
        </select>

    </div>
}

