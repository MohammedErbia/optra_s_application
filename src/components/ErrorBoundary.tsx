import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F0F13] text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
            <p className="text-[#F3F4F6] mb-4">An unexpected error occurred. Please try reloading the page.</p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="bg-[#18181B] text-left text-xs p-4 rounded mb-4 max-w-xl mx-auto overflow-x-auto">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-[#14B8A6] text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 