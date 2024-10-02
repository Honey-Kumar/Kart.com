import React from 'react';

// Step 1: Create the ErrorBoundary class
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        // Step 2: Initialize state to track whether an error has occurred
        this.state = { hasError: false };
    }

    // Step 3: Update state when an error is caught
    static getDerivedStateFromError(error) {
        return { hasError: true }; // Indicate that an error has occurred
    }

    // Step 4: Log the error details for debugging
    componentDidCatch(error, info) {
        console.error("Error caught by ErrorBoundary:", error, info);
        // Here, you could also send error information to a logging service
    }

    // Step 5: Render fallback UI if an error occurred
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>;
        }

        return this.props.children; // Render children if no error occurred
    }
}

export default ErrorBoundary;