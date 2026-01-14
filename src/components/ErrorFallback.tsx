import { AlertTriangle, RefreshCcw, Home, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleGoHome = () => {
    // Hard redirect to clear any bad application state
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-12 transition-colors duration-300">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        
        {/* Background Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl -z-10"></div>

        {/* Icon */}
        <div className="mx-auto h-20 w-20 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-red-100 dark:ring-red-900/40">
          <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
        </div>

        {/* Headings */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg leading-relaxed">
          The application encountered an unexpected error. You can try reloading or return to the dashboard.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 active:scale-95"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </button>
          
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </button>
        </div>

        {/* Technical Details Toggle */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="group flex items-center justify-center text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mx-auto"
          >
            <span className="mr-2 font-medium">Technical Details</span>
            {showDetails ? (
              <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            )}
          </button>

          {/* Collapsible Error Log */}
          {showDetails && (
            <div className="mt-6 text-left animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 bg-gray-50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
                <p className="text-xs font-mono text-red-600 dark:text-red-400 mb-2 font-bold uppercase tracking-wider">
                  {error.name}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3 font-mono">
                   {error.message}
                </p>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-3"></div>
                <pre className="text-[11px] text-gray-500 dark:text-gray-400 font-mono whitespace-pre-wrap leading-relaxed opacity-80">
                  {error.stack}
                </pre>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};