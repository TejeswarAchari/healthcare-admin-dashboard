import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-12 transition-colors duration-300">
      <div className="w-full max-w-lg text-center animate-in fade-in zoom-in-95 duration-500">
        
        {/* Soft Background Glow */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Friendly Icon */}
        <div className="mx-auto h-24 w-24 bg-white dark:bg-gray-900 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100 dark:shadow-none ring-1 ring-gray-100 dark:ring-gray-800 mb-8 relative z-10">
          <SearchX className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
        </div>

        {/* Conversational Text (Amazon Style) */}
        <div className="space-y-4 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Looking for something?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
            We're sorry, but the web address you entered is not a functioning page on our site. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary Action: Go Home */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 active:scale-95 group"
          >
            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Go to Dashboard
          </button>

          {/* Secondary Action: Go Back */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;