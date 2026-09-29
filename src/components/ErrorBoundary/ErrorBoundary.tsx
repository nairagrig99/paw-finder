import * as React from 'react';

type ErrorBoundaryProps = {
    fallback: React.ReactNode,
    children: React.ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false}
    }

    // when error occurred
    static getDerivedStateFromError() {
        return {hasError: true}
    }

    // after error info about where exacle happen error
    // componentDidCatch(error, info) {
    //     console.log("error", error)
    //     console.log("info", info)
    // }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}