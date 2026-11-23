import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle2, XCircle, FileText, Printer, Building2, UserCheck, ShieldCheck, RefreshCw, Download, Award, Clock } from 'lucide-react';

export default function OfficePortal({ onSelectPrint, onSelectEdit }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [quotaFilter, setQuotaFilter] = useState('');
  const [stats, setStats] = useState(null);

  // Selected application for verification modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [verificationForm, setVerificationForm] = useState({
    admission_no: '',
    office_verified_by: 'Administrative Officer (College)',
    office_verification_status: 'Verified',
    office_verification_remarks: '',
    dean_approval_status: 'Approved',
    dean_remarks: '',
    status: 'verified'
  });
  const [savingVerification, setSavingVerification] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter) params.append('status', statusFilter);
      if (quotaFilter) params.append('quota', quotaFilter);

      const res = await fetch(`/api/applications?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      }

      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.stats);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, quotaFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchApplications();
  };

  const handleOpenVerify = async (app) => {
    try {
      const res = await fetch(`/api/applications/${app.id}`);
      const data = await res.json();
      if (data.success) {
        setSelectedApp(data.application);
        setVerificationForm({
          admission_no: data.application.admission_no || '',
          office_verified_by: data.application.office_verified_by || 'Administrative Officer (College)',
          office_verification_status: data.application.office_verification_status || 'Verified',
          office_verification_remarks: data.application.office_verification_remarks || '',
          dean_approval_status: data.application.dean_approval_status || 'Approved',
          dean_remarks: data.application.dean_remarks || '',
          status: data.application.status === 'draft' ? 'submitted' : data.application.status
        });
      }
    } catch (err) {
      alert('Failed to load application details');
    }
  };

  const handleSaveVerification = async (e) => {
    e.preventDefault();
    setSavingVerification(true);
    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificationForm)
      });
      const data = await res.json();
      if (data.success) {
        alert('Verification & Admission status updated successfully.');
        setSelectedApp(null);
        fetchApplications();
      } else {
        alert(data.error || 'Failed to update verification');
      }
    } catch (err) {
      alert('Error updating verification');
    } finally {
      setSavingVerification(false);
    }
  };

  const handleExportCSV = () => {
    if (applications.length === 0) return;
    const headers = ['Application ID', 'Candidate Name', 'Gender', 'Category', 'NEET Roll', 'NEET Score', 'Quota', 'Status', 'Admission No'];
    const rows = applications.map(a => [
      `"${a.application_no}"`,
      `"${a.candidate_name || ''}"`,
      `"${a.gender || ''}"`,
      `"${a.category || ''}"`,
      `"${a.neet_roll_no || ''}"`,
      a.neet_marks || '',
      `"${a.allotted_quota || ''}"`,
      `"${a.status || ''}"`,
      `"${a.admission_no || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RMC_MBBS_Admissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Portal Header */}
      <div className="bg-[#0f294a] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-teal-500">
        <div>
          <div className="text-[11px] font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-teal-400" />
            Pennalur Campus Admission Cell • Verification Division
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-0.5">
            Administrative Officer &amp; Dean Scrutiny Portal
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            In-person verification registry for MBBS 2026–27 admissions. Scrutinize 5 notarized stamp bonds on ₹200 paper, verify qualifying exam eligibility, assign Admission Numbers, and record Dean admission approvals.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all border border-white/20"
            title="Download CSV roster"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Roster</span>
          </button>

          <button
            onClick={fetchApplications}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Applications</span>
            <span className="text-2xl font-black text-[#0f294a] mt-0.5 block">{stats.total}</span>
            <span className="text-[10px] text-slate-400">Total in registry</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs bg-blue-50/30">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Submitted</span>
            <span className="text-2xl font-black text-blue-900 mt-0.5 block">{stats.submitted}</span>
            <span className="text-[10px] text-blue-600">Awaiting scrutiny</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-teal-200 shadow-xs bg-teal-50/30">
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Verified (AO)</span>
            <span className="text-2xl font-black text-teal-900 mt-0.5 block">{stats.verified}</span>
            <span className="text-[10px] text-teal-600">Documents verified</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs bg-emerald-50/30">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Dean Approved</span>
            <span className="text-2xl font-black text-emerald-900 mt-0.5 block">{stats.approved}</span>
            <span className="text-[10px] text-emerald-600">Admission confirmed</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs bg-amber-50/30 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Drafts</span>
            <span className="text-2xl font-black text-amber-900 mt-0.5 block">{stats.drafts}</span>
            <span className="text-[10px] text-amber-600">Incomplete / saved</span>
          </div>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 justify-between items-center">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full md:w-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate by name, application ID, NEET roll no, or mobile..."
            className="w-full pl-9 pr-24 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f294a] outline-none"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 px-3 py-1 bg-[#0f294a] text-white text-[11px] font-bold rounded-md hover:bg-[#163a66] transition-all"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white outline-none font-medium text-slate-700"
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="verified">Verified</option>
            <option value="approved">Dean Approved</option>
            <option value="draft">Draft</option>
          </select>

          <select
            value={quotaFilter}
            onChange={(e) => setQuotaFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white outline-none font-medium text-slate-700"
          >
            <option value="">All Quotas</option>
            <option value="Govt.">Govt. Quota</option>
            <option value="Magt.">Management Quota</option>
            <option value="NRI">NRI Quota</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 font-medium">
            Loading admissions registry records...
          </div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <FileText className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">No application records found</p>
            <p className="text-xs text-slate-400">Try modifying your search criteria or resetting filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-extrabold border-b border-slate-200 tracking-wider">
                <tr>
                  <th className="px-4 py-3">Application ID &amp; Roll</th>
                  <th className="px-4 py-3">Candidate Particulars</th>
                  <th className="px-4 py-3">NEET 2026 Score</th>
                  <th className="px-4 py-3">Quota &amp; Category</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono font-bold text-[#0f294a]">{app.application_no}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {app.roll_no ? `Roll: ${app.roll_no}` : (app.admission_no ? `Adm: ${app.admission_no}` : 'No Roll Assigned')}
                      </div>
                    </td>

                    <td className="px-4 py-3 font-semibold text-slate-900 uppercase">
                      <div className="flex items-center space-x-2">
                        {app.candidate_photo_url ? (
                          <img src={app.candidate_photo_url} alt="Candidate" className="w-7 h-8 object-cover rounded border border-slate-300" />
                        ) : null}
                        <div>
                          <div>{app.candidate_name || <span className="text-slate-400 font-normal italic">Untitled Draft</span>}</div>
                          {app.student_mobile && (
                            <span className="text-[10px] text-slate-500 font-normal font-mono block">{app.student_mobile}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-mono font-semibold">{app.neet_roll_no || '—'}</div>
                      <div className="text-[10px] font-bold text-teal-800">
                        {app.neet_marks !== null && app.neet_marks !== undefined ? `${app.neet_marks} / 720` : '—'}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-800">{app.allotted_quota || '—'}</span>
                      <span className="text-slate-500 text-[10px] block">{app.category || '—'}</span>
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {app.student_type || '—'}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'verified'
                          ? 'bg-teal-100 text-teal-800 border border-teal-200'
                          : app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : app.status === 'submitted'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenVerify(app)}
                        className="px-2.5 py-1.5 bg-[#0f294a] hover:bg-[#163a66] text-white rounded text-[11px] font-bold transition-all inline-flex items-center space-x-1 shadow-2xs"
                        title="Document Scrutiny & Verification"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Scrutiny</span>
                      </button>

                      <button
                        onClick={() => onSelectPrint(app)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold border border-slate-300 transition-all inline-flex items-center space-x-1"
                        title="Print 14-page document"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Booklet</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VERIFICATION SCRUTINY MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 sm:p-7 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block">
                  In-Person Document Scrutiny &amp; Admission Order
                </span>
                <h3 className="text-lg font-black text-[#0f294a] uppercase">
                  {selectedApp.candidate_name} ({selectedApp.application_no})
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  NEET Roll: {selectedApp.neet_roll_no} • NEET Score: {selectedApp.neet_marks}/720 • Quota: {selectedApp.allotted_quota}
                </p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* 5 Notarized Bonds Check Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0f294a] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                ₹200 Non-Judicial Stamp Paper Bonds Verification
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { name: '1. Genuine Certificates Bond', status: selectedApp.bond1_submitted, file: selectedApp.bond1_file_url },
                  { name: '2. Non-Seat Blocking Declaration', status: selectedApp.bond2_submitted, file: selectedApp.bond2_file_url },
                  { name: '3. ₹10 Lakh Discontinuance Bond', status: selectedApp.bond3_submitted, file: selectedApp.bond3_file_url },
                  { name: '4. Tuition Fee & Vacant Seat Affidavit', status: selectedApp.bond4_submitted, file: selectedApp.bond4_file_url },
                  { name: '5. Anti-Ragging Notarized Affidavit', status: selectedApp.bond5_submitted, file: selectedApp.bond5_file_url }
                ].map((b, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border rounded-lg flex items-center justify-between">
                    <span className="font-medium text-slate-800 text-[11px]">{b.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.status === 'YES' ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {b.status || 'NO'}
                      </span>
                      {b.file && (
                        <a
                          href={b.file}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-700 hover:underline text-[11px] font-semibold"
                        >
                          View Document
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrutiny Action Form */}
            <form onSubmit={handleSaveVerification} className="space-y-4 pt-3 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Assign Official Admission Number
                  </label>
                  <input
                    type="text"
                    value={verificationForm.admission_no}
                    onChange={(e) => setVerificationForm({ ...verificationForm, admission_no: e.target.value })}
                    placeholder="e.g. RMC/MBBS/2026/042"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f294a] font-mono font-bold"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Official college admission register entry</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Verified By (Administrative Officer)
                  </label>
                  <input
                    type="text"
                    value={verificationForm.office_verified_by}
                    onChange={(e) => setVerificationForm({ ...verificationForm, office_verified_by: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Administrative Officer Scrutiny Remarks
                </label>
                <textarea
                  rows="2"
                  value={verificationForm.office_verification_remarks}
                  onChange={(e) => setVerificationForm({ ...verificationForm, office_verification_remarks: e.target.value })}
                  placeholder="e.g. Verified all 5 original bonds on ₹200 stamp paper, NEET rank card, TC and marks sheets in person."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Dean Admission Approval Status
                  </label>
                  <select
                    value={verificationForm.dean_approval_status}
                    onChange={(e) => setVerificationForm({ ...verificationForm, dean_approval_status: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-bold text-slate-800"
                  >
                    <option value="Approved">Approved (Admit to MBBS Phase 1)</option>
                    <option value="Pending">Pending Scrutiny</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Dean Remarks
                  </label>
                  <input
                    type="text"
                    value={verificationForm.dean_remarks}
                    onChange={(e) => setVerificationForm({ ...verificationForm, dean_remarks: e.target.value })}
                    placeholder="e.g. Admitted to 1st MBBS 2026–27"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingVerification}
                  className="px-5 py-2 bg-[#0f294a] hover:bg-[#163a66] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  {savingVerification ? 'Saving...' : 'Save Office Verification'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
