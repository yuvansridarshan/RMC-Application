import React from 'react';
import { CheckCircle2, Printer, FileText, ArrowRight, Download, Calendar, User, ShieldCheck, Award } from 'lucide-react';

export default function SuccessView({ applicationData, onPrintView, onNewApplication }) {
  return (
    <div className="max-w-4xl mx-auto my-8 space-y-6 animate-fadeIn">
      {/* Success Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-center p-8 sm:p-10">
        <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 uppercase tracking-widest mb-2">
          Registration Complete
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f294a] uppercase tracking-tight">
          MBBS Admission Application Successfully Recorded
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2">
          Your admission dossier for the MBBS Degree Course 2026–27 has been registered with the Rajalakshmi Medical College Hospital &amp; Research Institute admissions registry.
        </p>

        {/* Application Key Credentials Box */}
        <div className="my-8 max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-6 text-left space-y-3 shadow-2xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Application ID</span>
            <span className="text-sm font-black font-mono text-[#0f294a] bg-white px-3 py-1 rounded-lg border border-slate-300">
              {applicationData.application_no || 'RMC-2026-SUBMITTED'}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Candidate Name:</span>
            <span className="font-bold text-slate-900 uppercase">{applicationData.candidate_name}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">NEET Roll No:</span>
            <span className="font-mono font-semibold text-slate-900">{applicationData.neet_roll_no}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Quota &amp; Category:</span>
            <span className="font-semibold text-slate-900">{applicationData.allotted_quota} Quota / {applicationData.category}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Admission Mode:</span>
            <span className="font-semibold text-slate-900">{applicationData.mode_of_admission || 'Round 1'}</span>
          </div>

          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200">
            <span className="text-slate-500">Registration Timestamp:</span>
            <span className="font-mono text-slate-700">
              {applicationData.submission_date ? new Date(applicationData.submission_date).toLocaleString() : new Date().toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onPrintView}
            className="px-6 py-2.5 bg-[#0f294a] hover:bg-[#163a66] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center space-x-2"
          >
            <Printer className="w-4 h-4 text-teal-300" />
            <span>View &amp; Print Official 14-Page Booklet</span>
          </button>

          <button
            onClick={onNewApplication}
            className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300 transition-all flex items-center space-x-2"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Start Another Application</span>
          </button>
        </div>
      </div>

      {/* Instructions for Physical Verification */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-[#0f294a] uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          Instructions for In-Person Verification at Pennalur Campus
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="font-bold text-[#0f294a] block">1. Print 14-Page Booklet</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Click the button above to print the complete 14-page filled application booklet in A4 portrait layout. Affix your physical passport size photograph on Page 1.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="font-bold text-[#0f294a] block">2. Notarized Stamp Bonds</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Execute all 5 bonds on ₹200 Non-Judicial stamp paper as detailed in Page 4, signed by both candidate and parent/guardian before a Notary Public.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="font-bold text-[#0f294a] block">3. In-Person Reporting</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Report to the Administrative Officer (College) and Dean at Rajalakshmi HealthCity, Pennalur Campus with all original certificates for final verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
