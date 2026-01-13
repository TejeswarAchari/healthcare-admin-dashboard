import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout } from '@/features/auth/authSlice';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'; // Radix Primitive
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  User as UserIcon,
  ChevronDown 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
    active 
      ? 'bg-indigo-50 text-indigo-700' 
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
  }`}>
    <Icon className="h-4 w-4" />
    {label}
  </div>
);

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <LayoutDashboard className="h-6 w-6" />
            <span>HealthAdmin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
          <SidebarItem icon={Users} label="Patients" />
          <SidebarItem icon={Users} label="Doctors" />
          <SidebarItem icon={Calendar} label="Appointments" />
          <div className="pt-4 mt-4 border-t border-gray-100">
             <SidebarItem icon={Settings} label="Settings" />
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">Overview</h1>

            {/* Radix UI User Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 outline-none">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <span className="hidden sm:inline-block">{user?.name || 'Admin'}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="min-w-[200px] bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1 z-50 animate-in fade-in zoom-in-95 duration-100" 
                  sideOffset={5}
                >
                  <DropdownMenu.Label className="px-2 py-1.5 text-xs font-semibold text-gray-500">
                    My Account
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />
                  <DropdownMenu.Item 
                    className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 rounded-sm hover:bg-gray-100 hover:text-gray-900 outline-none cursor-pointer"
                    onSelect={() => console.log('Profile clicked')}
                  >
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Item 
                    className="flex items-center gap-2 px-2 py-2 text-sm text-red-600 rounded-sm hover:bg-red-50 outline-none cursor-pointer"
                    onSelect={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;