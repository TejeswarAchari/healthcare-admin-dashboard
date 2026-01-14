import { useState, useMemo } from 'react';
import type { Patient } from './dashboardSlice';
import { Search, Download, FilterX, Filter } from 'lucide-react';

const StatusBadge = ({ status }: { status: Patient['status'] }) => {
  const styles = {
    Active: 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-400/20',
    Recovered: 'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/20',
    Critical: 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-400/20',
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}>
      {status}
    </span>
  );
};

interface RecentPatientsTableProps {
  patients: Patient[];
}

const RecentPatientsTable = ({ patients }: RecentPatientsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All'); // <--- New State

  // 1. FILTER LOGIC: Search + Status Dropdown
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Check Name/Doctor text
      const matchesSearch = 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.assignedDoctor.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Check Status Dropdown
      const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchQuery, statusFilter]);

  // 2. EXPORT LOGIC
  const handleExport = () => {
    const headers = ['Patient Name,Status,Assigned Doctor,Last Visit'];
    const rows = filteredPatients.map(p => 
      `"${p.name}","${p.status}","${p.assignedDoctor}","${p.lastVisit}"`
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'patients_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-300">
      
      {/* HEADER WITH CONTROLS */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Recent Patients</h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 h-9 w-full sm:w-64 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 h-9 w-full sm:w-auto text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Critical">Critical</option>
              <option value="Active">Active</option>
              <option value="Recovered">Recovered</option>
            </select>
            {/* Custom Arrow for select (optional styling tweak) */}
            <div className="absolute right-2.5 top-3 pointer-events-none">
               <div className="h-0 w-0 border-x-4 border-x-transparent border-t-[5px] border-t-gray-400"></div>
            </div>
          </div>

          {/* Export Button */}
          <button 
            onClick={handleExport}
            className="h-9 px-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="Export to CSV"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* TABLE CONTENT */}
      <div className="overflow-x-auto">
        {filteredPatients.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Visit</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                        {patient.name.charAt(0)}
                    </div>
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {patient.assignedDoctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {patient.lastVisit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FilterX className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">No patients found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No results match your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
              className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPatientsTable;