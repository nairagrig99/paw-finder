import {SORT_BY} from "../../constant.ts";
import useReportFilters from "../../hooks/useReportFilters.ts";

export default function Sort() {
    const {setFilters} = useReportFilters()
    return <select
        name="sort"
        onChange={(e) => setFilters({sort: e.target.value})}
        aria-label="Sort reports"
        className="..."
    >
        <option disabled selected>Sort</option>
        {SORT_BY.map((option) =>
            <option value={option} key={option}>{option}</option>
        )}
    </select>
}