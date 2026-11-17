import useNetwork from "../../hooks/useNetwork.ts";

export default function OfflineBanner() {
    const networkStatus = useNetwork();

    if (networkStatus) return
    return <div className="bg-red-500 w-full h-[50px] flex flex-col items-center justify-center">
        <h3 className="text-white text-xl">You're offline — some content may be unavailable</h3>
    </div>
}