import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchDashboardData } from '@/features/dashboard/dashboardSlice';
import RecentPatientsTable from '@/features/dashboard/RecentPatientsTable';
import { Users } from 'lucide-react';

const Patients = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.dashboard);

  // Ensure we have data when navigating directly to this page
  useEffect(() => {
    if (!data) {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, data]);

  if (isLoading || !data) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          Patients Directory
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage and view all registered patient records.
        </p>
      </div>

      {/* The Reused Table Component */}
      <RecentPatientsTable 
        patients={data.recentPatients} 
        title="All Patients" 
      />
    </div>
  );
};

export default Patients;