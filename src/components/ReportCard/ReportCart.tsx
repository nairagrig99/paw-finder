import type {Report} from "../../types/report.ts";
import Badge from "../Badge/Badge.tsx";
import PhotoWithFallback from "../PhotoWithFallback/PhotoWithFallback.tsx";
import {useEffect, useState} from "react";

export default function ReportCart({pet}: { pet: Report }) {

    const [dateNow, setDateNow] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDateNow(Date.now());
        }, 1000);

        return () => clearTimeout(timer)
    }, [pet]);

    //idempotency
    const convertDate = (createdAt: string) => {
        const createdTime = new Date(createdAt).getTime();
        const differencesInSecond = Math.floor((dateNow - createdTime) / 1000);

        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = day * 365;

        if (differencesInSecond < minute) {
            return `${differencesInSecond} seconds ago`;
        }

        if (differencesInSecond < hour) {
            const diffMinutes = Math.floor(differencesInSecond / minute)
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

    return <div className="border p-[7px] flex flex-col justify-around">

        <PhotoWithFallback photoUrl={pet.photoUrl}/>

        <div className="flex items-center justify-between">
            <div>
                <p className="capitalize">pet name: {pet.petName}</p>
                <p className="capitalize">pet type: {pet.petType}</p>
                <p className="capitalize">{pet.location}</p>
                <p className="capitalize">{convertDate(pet.createdAt)}</p>
            </div>
            <Badge type={pet.type}></Badge>
        </div>

    </div>
}