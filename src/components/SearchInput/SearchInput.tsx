import useReportFilters from "../../hooks/useReportFilters.ts";
import {useRef} from "react";

export default function SearchInput() {

    const {setFilters} = useReportFilters();

    const debounceRef = useRef(0);

    const onChange = (value: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setFilters({search: value})
        }, 400)

    }


    return <>
        <input type="search"
               className="bg-red-100 border-2"
               onChange={(e) => onChange(e.currentTarget.value)}/>
    </>
}