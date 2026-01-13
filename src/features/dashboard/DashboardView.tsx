import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchDashboardData } from './dashboardSlice';
import StatsCard from './StatsCard';
import RecentPatientsTable from './RecentPatientsTable';
import { Users, Stethoscope, Calendar, Activity } from 'lucide-react';

const DashboardView = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.dashboard);

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        {/* Skeleton for Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        {/* Skeleton for Table */}
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 p-4 bg-red-50 rounded-lg">Error: {error}</div>;
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* 1. Header Section (Context) */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <p className="text-gray-500">Overview of your healthcare system metrics.</p>
      </div>

      {/* 2. KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Patients" 
          value={data.stats.totalPatients} 
          icon={Users} 
          trend="+12%" 
          trendUp={true}
        />
        <StatsCard 
          title="Total Doctors" 
          value={data.stats.totalDoctors} 
          icon={Stethoscope} 
        />
        <StatsCard 
          title="Appointments" 
          value={data.stats.totalAppointments} 
          icon={Calendar} 
          trend="+5%" 
          trendUp={true}
        />
        <StatsCard 
          title="Active Clinics" 
          value={data.stats.activeClinics} 
          icon={Activity} 
          trend="-2%" 
          trendUp={false}
        />
      </div>

      {/* 3. Data Table */}
      <RecentPatientsTable patients={data.recentPatients} />
    </div>
  );
};

export default DashboardView;