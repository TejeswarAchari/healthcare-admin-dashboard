import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginUser, clearError } from '@/features/auth/authSlice';
import { Loader2, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'; 


const LOGIN_IMAGE = "LoginImage.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Local validation state
  const [emailError, setEmailError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Robust Email Validation Regex
  const validateEmail = (value: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "Email is required";
    if (!regex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (isTouched) {
      setEmailError(validateEmail(val));
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);
    
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    if (!password) return; 

    dispatch(clearError());
    await dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-white dark:bg-gray-950 transition-colors duration-300">
      
      {/* LEFT SIDE: Image / Branding (Hidden on Mobile & Tablet) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-indigo-50 dark:bg-gray-900 overflow-hidden">
        {/* Abstract Background Shapes for Polish */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 p-10 text-center">
            <img 
              src={LOGIN_IMAGE} 
              alt="Healthcare Admin Illustration" 
              className="w-full max-w-lg mx-auto drop-shadow-2xl animate-in fade-in zoom-in-95 duration-700"
            />
            <h2 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">Manage Your Hospital Efficiently</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Streamline patient data, track appointments, and monitor hospital analytics in one unified dashboard.
            </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-8 md:p-12 lg:p-20 min-h-screen">
        <div className="w-full max-w-md space-y-8 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
          
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 rounded-lg bg-indigo-600 text-white mb-6 touch-manipulation">
                <svg className="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Email address
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleBlur}
                    className={`block w-full rounded-md border-0 py-3 pl-10 text-gray-900 dark:text-white dark:bg-gray-800 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-base sm:text-sm leading-6 transition-all touch-manipulation
                      ${emailError 
                        ? 'ring-red-300 focus:ring-red-500 text-red-900 dark:text-red-300' 
                        : 'ring-gray-300 dark:ring-gray-700 focus:ring-indigo-600'
                      }`}
                    placeholder="name@company.com"
                  />
                  {emailError && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                {emailError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400" id="email-error">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Password
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-3 pl-10 pr-10 text-gray-900 dark:text-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-base sm:text-sm leading-6 transition-all touch-manipulation"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none min-w-[44px] min-h-[44px] touch-manipulation"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Global Auth Error */}
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Login failed</h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-200">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 sm:py-3 text-base sm:text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95 min-h-[48px] touch-manipulation"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in 🧑‍⚕️...
                  </>
                ) : (
                  'Sign in to Account'
                )}
              </button>
            </div>
            
            <div className="text-center text-xs sm:text-xs text-gray-500 dark:text-gray-400 mt-6">
              <p className="mb-3">Use Demo Credentials:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-indigo-600 dark:text-indigo-400 font-mono border border-gray-200 dark:border-gray-700 text-sm">admin@healthcare.com</code>
                <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-indigo-600 dark:text-indigo-400 font-mono border border-gray-200 dark:border-gray-700 text-sm">admin123</code>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;