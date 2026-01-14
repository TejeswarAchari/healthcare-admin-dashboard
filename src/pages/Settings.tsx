import { useAppSelector } from '@/hooks/redux';
import { useTheme } from '@/components/theme-provider';
import { User, Mail, Shield, Bell, Moon, Sun, Monitor } from 'lucide-react';

const Settings = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { setTheme, theme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and system configuration.</p>
      </div>

      {/* SECTION 1: ACCOUNT PROFILE (Read-Only from Redux) */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <User className="h-4 w-4" /> Account Information
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <div className="mt-1 flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 sm:text-sm">
              {user?.name || 'Admin User'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="mt-1 flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 sm:text-sm items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              {user?.email || 'admin@healthcare.com'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-400 ring-1 ring-inset ring-indigo-700/10 dark:ring-indigo-400/30">
                <Shield className="mr-1 h-3 w-3" />
                {user?.role || 'Administrator'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: APPEARANCE (Functional Theme Switcher) */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Moon className="h-4 w-4" /> Appearance
          </h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Choose how the admin dashboard looks to you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Light Option */}
            <button 
              onClick={() => setTheme('light')}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                theme === 'light' 
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-600' 
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                  <Sun className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
              </div>
              {theme === 'light' && <div className="h-2 w-2 rounded-full bg-indigo-600"></div>}
            </button>

            {/* Dark Option */}
            <button 
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                theme === 'dark' 
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-600' 
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400">
                  <Moon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
              </div>
              {theme === 'dark' && <div className="h-2 w-2 rounded-full bg-indigo-600"></div>}
            </button>

            {/* System Option */}
            <button 
              onClick={() => setTheme('system')}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                theme === 'system' 
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-600' 
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500">
                  <Monitor className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">System</span>
              </div>
              {theme === 'system' && <div className="h-2 w-2 rounded-full bg-indigo-600"></div>}
            </button>

          </div>
        </div>
      </div>

      {/* SECTION 3: NOTIFICATIONS (Dummy Toggles) */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Email Alerts</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive daily summaries of patient activity.</p>
            </div>
            {/* Dummy Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get text messages for critical alerts.</p>
            </div>
             {/* Dummy Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;