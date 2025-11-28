'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/app/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h2 className="text-2xl font-bold mb-4 text-[#022444]">
            Something went wrong!
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            An error occurred while loading the page. Please try refreshing the page.
          </p>
          {this.state.error && process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md">
              <p className="text-sm text-red-800 font-mono">
                {this.state.error.message}
              </p>
            </div>
          )}
          <div className="flex gap-4">
            <Button
              onClick={this.handleReset}
              className="bg-[#7B91FF] hover:bg-[#E16D32] text-white"
            >
              Try again
            </Button>
            <Button
              onClick={() => (window.location.href = '/')}
              variant="outline"
              className="border-[#7B91FF] text-[#7B91FF] hover:bg-[#7B91FF] hover:text-white"
            >
              Go to home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

