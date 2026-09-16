import {useEffect, useState} from "react";
import {convertData} from "../uril/convertData.ts";

export default function useConvertDate() {

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

    return (createdAt: string) => convertData(createdAt, dateNow)

}