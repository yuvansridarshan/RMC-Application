import React from 'react';
import { CheckCircle2, AlertTriangle, FileCheck, ShieldAlert, Award, User, Home, BookOpen, Clock } from 'lucide-react';

export default function Step8ReviewSubmit({ formData, onSubmit, onSaveDraft, isSubmitting, isDraftSaving, validationErrors, onJumpToStep }) {
  const marks = formData.marks || [];
  const totalRow = marks.find(m => m.subject_name.toLowerCase().includes('total'));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-slate-50 border-l-4 border-emerald-600 p-4 rounded-r-lg shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          Review &amp; Final Application Submission
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Carefully review all details filled across all pages before final submission. Once submitted, your application will be assigned an official Application ID and queued for verification.
        </p>
      </div>

      {/* Validation Alert if errors exist */}
      {validationErrors && validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-300 p-4 rounded-xl text-xs text-red-900 space-y-2">
          <div className="flex items-center space-x-2 font-bold text-red-800 text-sm">
            <AlertTriangle className="w-4 h-4 text-red-700" />
            <span>Please resolve the following required fields before final submission:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidate & Admission Summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-900" />
              Candidate &amp; Allotment
            </h3>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="text-xs text-blue-700 hover:underline font-semibold"
            >
              Edit
            </button>
          </div>

          <div className="text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Candidate Name:</span>
              <span className="font-bold text-slate-800 uppercase">{formData.candidate_name || '—'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Gender &amp; Category:</span>
              <span className="font-semibold text-slate-800">{formData.gender || '—'} / {formData.category || '—'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">NEET Roll No. &amp; Score:</span>
              <span className="font-mono font-bold text-blue-900">{formData.neet_roll_no || '—'} ({formData.neet_marks || 0} / 720)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Mode of Admission:</span>
              <span className="font-semibold text-slate-800">{formData.mode_of_admission || '—'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Allotted Quota:</span>
              <span className="font-bold text-blue-900">{formData.allotted_quota || '—'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Student Type:</span>
              <span className="font-semibold text-slate-800">{formData.student_type || '—'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Student Mobile &amp; Email:</span>
              <span className="font-medium text-slate-800">{formData.student_mobile || '—'} • {formData.student_email || '—'}</span>
            </div>
          </div>
        </div>

        {/* Parent & Address Summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1.5">
              <Home className="w-4 h-4 text-purple-900" />
              Parent / Guardian &amp; Address
            </h3>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-xs text-blue-700 hover:underline font-semibold"
            >
              Edit
            </button>
          </div>

          <div className="text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Father's Name:</span>
              <span className="font-bold text-slate-800 uppercase">{formData.father_name || '—'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Mother's Name:</span>
              <span className="font-bold text-slate-800 uppercase">{formData.mother_name || '—'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Contact Number:</span>
              <span className="font-mono font-medium text-slate-800">{formData.father_mobile || formData.mother_mobile || '—'}</span>
            </div>
            <div className="py-1">
              <span className="text-slate-500 block mb-0.5">Residential Address:</span>
              <span className="font-medium text-slate-800 block">
                {formData.address_street || ''}, {formData.address_place || ''}, {formData.address_district || ''}, {formData.address_state || ''} - {formData.address_pincode || ''}
              </span>
            </div>
          </div>
        </div>

        {/* Qualifying Examination Summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-800" />
              Qualifying Marks &amp; Eligibility
            </h3>
            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              className="text-xs text-blue-700 hover:underline font-semibold"
            >
              Edit
            </button>
          </div>

          <div className="text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Board:</span>
              <span className="font-semibold text-slate-800">{formData.qualifying_exam_board || '—'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Aggregate of 4 Subjects:</span>
              <span className="font-bold text-emerald-700">
                {totalRow ? `${totalRow.marks_obtained || 0} / ${totalRow.max_marks || 400} (${totalRow.percentage || 0}%)` : '—'}
              </span>
            </div>
            <div className="text-slate-600 text-[11px] pt-1">
              Passed Dr. M.G.R. Medical University eligibility threshold for category <strong>{formData.category || 'General'}</strong>.
            </div>
          </div>
        </div>

        {/* Bonds & Undertakings Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Bonds &amp; Affirmations Status
            </h3>
            <button
              type="button"
              onClick={() => onJumpToStep(4)}
              className="text-xs text-blue-700 hover:underline font-semibold"
            >
              Edit
            </button>
          </div>

          <div className="text-xs space-y-1.5">
            {[
              { label: 'Bond 1: Genuine Certificates', status: formData.bond1_submitted },
              { label: 'Bond 2: Non-Seat Blocking', status: formData.bond2_submitted },
              { label: 'Bond 3: ₹10 Lakh Discontinuance', status: formData.bond3_submitted },
              { label: 'Bond 4: Vacant Seat Tuition Fees', status: formData.bond4_submitted },
              { label: 'Bond 5: Anti-Ragging Notarized', status: formData.bond5_submitted },
              { label: 'Parent IA & Attendance Undertaking', status: formData.ia_parent_undertaking_agreed ? 'YES' : 'NO' },
              { label: 'Annexures I, II, III & Conduct Rules', status: formData.annexure1_undertaking_agreed && formData.dress_code_agreed ? 'YES' : 'NO' },
              { label: 'Page 14 Final Declarations', status: formData.candidate_declaration_agreed && formData.parent_declaration_agreed ? 'YES' : 'NO' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-1 border-b border-slate-100 items-center">
                <span className="text-slate-600">{item.label}:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.status === 'YES' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status || 'NO'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation & Submission Controls */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-500">
        <div>
          <h3 className="text-base font-bold text-amber-400">Ready to Submit Application?</h3>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            By clicking Submit, your application details, marks, and submitted bond records will be securely recorded in the official RMC admission registry. You will receive an official Application Tracking Number.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isDraftSaving || isSubmitting}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all shadow-sm"
          >
            {isDraftSaving ? 'Saving Draft...' : 'Save As Draft'}
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || (validationErrors && validationErrors.length > 0)}
            className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center space-x-2 ${
              validationErrors && validationErrors.length > 0
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? (
              <span>Submitting to RMC Portal...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Submit Final Application</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
