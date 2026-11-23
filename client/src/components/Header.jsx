import React from 'react';
import { ShieldAlert, FileText, Search, UserCheck, LogOut, ArrowLeft } from 'lucide-react';

export default function Header({ 
  currentUser, 
  onLogout, 
  activeTab, 
  setActiveTab, 
  onOpenLookup, 
  onOpenCommittee, 
  stats 
}) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-xs no-print sticky top-0 z-40">
      {/* Top Strip */}
      <div className="bg-[#0b1d3a] px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="inline-flex items-center px-2 py-0.2 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              MBBS ADMISSION 2026–27
            </span>
            <span className="hidden sm:inline">The Tamil Nadu Dr. M.G.R. Medical University Affiliated</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span>Admissions Desk: <strong className="text-white">044-27176404 / 05</strong></span>
            <button 
              onClick={onOpenCommittee}
              className="text-amber-400 hover:text-amber-300 underline font-semibold flex items-center space-x-1"
            >
              <ShieldAlert className="w-3.5 h-3.5 mr-0.5" />
              <span>Anti-Ragging Helpline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Header with Official Rajalakshmi HealthCity Logo */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo & College Details */}
          <div className="flex items-center space-x-4">
            <div className="bg-white p-1 rounded shrink-0">
              <img 
                src="/rmc-logo.png" 
                alt="Rajalakshmi HealthCity Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>

            <div className="border-l border-slate-200 pl-4">
              <div className="text-[10px] font-bold tracking-wider text-teal-700 uppercase">
                Sri Devi Karumariamman Educational Trust
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-[#0f294a] uppercase tracking-tight leading-tight">
                Rajalakshmi Medical College Hospital &amp; Research Institute
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Rajalakshmi HealthCity, Pennalur Village, Sriperumbudur – 602117
              </p>
            </div>
          </div>

          {/* Session Info & Actions */}
          <div className="flex items-center space-x-3 shrink-0">
            {currentUser && (
              <div className="flex items-center space-x-2.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                <div className="text-right">
                  <span className="text-[10px] text-teal-800 uppercase font-black block leading-none">
                    {currentUser.type === 'admin' ? 'Staff Session' : 'Applicant Active'}
                  </span>
                  <span className="text-xs font-bold text-[#0f294a] max-w-[150px] truncate block">
                    {currentUser.name || (currentUser.type === 'admin' ? 'Office Admin' : 'Candidate')}
                  </span>
                </div>

                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-200/60 rounded-lg transition-all"
                  title="Logout / Exit Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Strip */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap justify-between items-center gap-2">
          <nav className="flex space-x-2">
            {currentUser?.type !== 'admin' && (
              <button
                onClick={() => setActiveTab('form')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'form'
                    ? 'bg-[#0f294a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>MBBS Application Form</span>
              </button>
            )}

            {currentUser?.type === 'admin' && (
              <button
                onClick={() => setActiveTab('portal')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'portal'
                    ? 'bg-[#0f294a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Office Scrutiny Dashboard</span>
                {stats?.total > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-teal-600 text-white font-mono">
                    {stats.total}
                  </span>
                )}
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenLookup}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center space-x-1.5"
            >
              <Search className="w-3.5 h-3.5 text-teal-700" />
              <span>Resume Draft</span>
            </button>

            <button
              onClick={onOpenCommittee}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 transition-all flex items-center space-x-1"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">Anti-Ragging Committee</span>
              <span className="sm:hidden">Helpline</span>
            </button>

            <button
              onClick={onLogout}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-1"
            >
              <LogOut className="w-3 h-3 text-slate-400" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
