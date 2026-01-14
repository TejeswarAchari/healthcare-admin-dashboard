import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useTheme } from '@/components/theme-provider';
import { registerUser } from '@/features/auth/authSlice'; // Import action
import { User as UserIcon, Mail, Shield, Bell, Moon, Sun, Monitor, Plus, Users } from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '@/types';

const Settings = () => {
  const dispatch = useAppDispatch();
  // Access registeredUsers from state (need to cast or update type definition)
  const { user, registeredUsers } = useAppSelector((state: any) => state.auth);
  const { setTheme, theme } = useTheme();

  // Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newUserName || !newUserEmail) return;

    // Create new admin object
const newUser: User = {
      id: `u_${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: 'admin', // Now TypeScript knows this is correct
      avatar: `https://ui-avatars.com/api/?name=${newUserName}&background=random`,
      password: 'password123' // Now valid because we added it to the Interface
    };
    // Dispatch to Redux
    dispatch(registerUser(newUser));
    
    // Show Success Toast
    toast.success("Admin Created Successfully", {
      description: `Login with Email: ${newUserEmail} / Password: password123`
    });

    // Reset Form
    setNewUserName('');
    setNewUserEmail('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and system configuration.</p>
      </div>

      {/* SECTION 1: ACCOUNT PROFILE (Read-Only) */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <UserIcon className="h-4 w-4" /> Account Information
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
        </div>
      </div>

      {/* SECTION 2: USER MANAGEMENT (New Feature) */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-4 w-4" /> Admin Management
          </h3>
          <span className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md text-gray-500">
            {registeredUsers?.length || 1} Users
          </span>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* List of Admins */}
          <div>
             <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Current Admins</h4>
             <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
               {registeredUsers?.map((u: any) => (
                 <div key={u.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                   <img src={u.avatar} alt={u.name} className="h-8 w-8 rounded-full bg-gray-200" />
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{u.name}</p>
                     <p className="text-xs text-gray-500 truncate">{u.email}</p>
                   </div>
                   <div className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-900/30 text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
                     ADMIN
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Create User Form */}
          <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-5 border border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Add New Admin</h4>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Full Name</label>
                <input 
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm p-2 shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Email Address</label>
                <input 
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="john@healthcare.com"
                  className="w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm p-2 shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow active:scale-95"
              >
                <Plus className="h-4 w-4" /> Create User
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-3">
                Default password: <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-gray-600 dark:text-gray-300">password123</code>
              </p>
            </form>
          </div>

        </div>
      </div>

      {/* SECTION 3: APPEARANCE & NOTIFICATIONS (Existing) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Moon className="h-4 w-4" /> Appearance
            </h3>
          </div>
          <div className="p-6 grid grid-cols-3 gap-3">
             {/* Small Theme Buttons */}
             {['light', 'dark', 'system'].map((mode) => (
                <button 
                  key={mode}
                  onClick={() => setTheme(mode as any)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    theme === mode 
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {mode === 'light' && <Sun className="h-5 w-5 mb-2" />}
                  {mode === 'dark' && <Moon className="h-5 w-5 mb-2" />}
                  {mode === 'system' && <Monitor className="h-5 w-5 mb-2" />}
                  <span className="text-xs font-medium capitalize">{mode}</span>
                </button>
             ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </h3>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Alerts</span>
                <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SMS Alerts</span>
                <div className="w-10 h-5 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;