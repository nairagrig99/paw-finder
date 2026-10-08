import * as React from 'react';
import type {ReactNode} from "react";

export interface FallbackProps {
    error: Error | null;
    resetErrorBoundary: () => void;
}

type ErrorBoundaryProps = {
    fallback?: ReactNode | ((props: FallbackProps) => ReactNode),
    children: React.ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean;
    error: Error | null;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false, error: null}
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {hasError: true, error}
    }


    resetErrorBoundary = () => {
        console.log("is this work ")
        this.setState({hasError: false, error: null});
    }

    render() {

        if (this.state.hasError) {
            if (typeof this.props.fallback === "function") {

                return this.props.fallback({
                    error: this.state.error,
                    resetErrorBoundary: this.resetErrorBoundary,
                });
            }
            return (
                this.props.fallback || (
                    <div role="alert" className="p-4 text-center">
                        <p className="text-red-600 mb-2">Failed to load</p>
                        <button
                            onClick={this.resetErrorBoundary}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}