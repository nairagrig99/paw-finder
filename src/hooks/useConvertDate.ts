import {useEffect, useState} from "react";
import {DAY, MILLISECOND, MINUTE, MONTH, YEAR} from "../constant.ts";

export default function useConvertDate() {

    const [dateNow, setDateNow] = useState<number>(() => Date.now());

    useEffect(() => {

        const timer = setTimeout(() => {
            setDateNow(Date.now());
        }, 1000);

        return () => clearTimeout(timer)

    }, []);

    //idempotency problem
    return (createdAt: string) => {
        const createdTime = new Date(createdAt).getTime();
        const differencesInSecond = Math.floor((dateNow - createdTime) / MILLISECOND);
        if (differencesInSecond < 0) return
        const hour = MINUTE * MINUTE;
        const day = hour * DAY;
        const month = day * MONTH;
        const year = day * YEAR;

        if (differencesInSecond < MINUTE) {
            return `${differencesInSecond} seconds ago`;
        }

        if (differencesInSecond < hour) {
            const diffMinutes = Math.floor(differencesInSecond / MINUTE)
            return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
        }

        if (differencesInSecond < day) {
            const diffHours = Math.floor(differencesInSecond / hour);
            return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
        }

        if (differencesInSecond < month) {
            const diffDays = Math.floor(differencesInSecond / day);
            return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
        }

        if (differencesInSecond < year) {
            const diffMonths = Math.floor(differencesInSecond / month);
            return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
        }

        const years = Math.floor(differencesInSecond / year);
        return `${years} ${years === 1 ? "year" : "years"} ago`;
    }

}