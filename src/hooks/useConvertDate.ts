import {useEffect, useState} from "react";
import {formatDate} from "../uril/convertData.ts";

export default function useDateFormatter() {

    const [dateNow, setDateNow] = useState<number>(() => Date.now());

    // useEffect(() => {
    //
    //     const timer = setTimeout(() => {
    //         setDateNow(Date.now());
    //     }, MILLISECOND);
    //
    //     return () => clearTimeout(timer)
    //
    // }, []);

    return (createdAt: string) => formatDate(createdAt, dateNow)

}