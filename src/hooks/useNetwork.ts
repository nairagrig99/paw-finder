import {useCallback, useEffect, useState} from "react";

export default function useNetwork() {
    const [isOnline, setIsOnline] = useState<boolean>(true);

    const handleOnline = useCallback(() => setIsOnline(true), [])

    const handleOffline = useCallback(() => setIsOnline(false), [])

    useEffect(() => {
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [handleOnline, handleOffline]);

    return isOnline;
}