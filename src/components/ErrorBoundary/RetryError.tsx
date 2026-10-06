import type {FallbackProps} from "./ErrorBoundary.tsx";

export default function RetryError({resetErrorBoundary}: {
    resetErrorBoundary: Pick<FallbackProps, "resetErrorBoundary">
}) {
    return <div role="alert" className="flex flex-col items-center justify-center p-4">
        <p>Failed to load</p>
        <button
            onClick={() => resetErrorBoundary}
            className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
            Retry
        </button>
    </div>
}