import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from '@/app/store';
import { ThemeProvider } from '@/components/theme-provider';
import { ErrorFallback } from '@/components/ErrorFallback';
import App from './App';
import './index.css';
import { Toaster } from 'sonner';

// FIX: Allow componentStack to be null or undefined to satisfy TypeScript
const logErrorToService = (error: Error, info: { componentStack?: string | null }) => {
  console.error("Caught an error:", error, info);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logErrorToService}
        >
          <Toaster richColors position="top-right" closeButton />
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);