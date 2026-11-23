import React from 'react';
import { Calendar, Award, Hash, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Step1Admission({ formData, updateField, errors }) {
  const modes = ['Round 1', 'Round 2', 'Mop-up Round', 'Stray Round'];
  const quotas = [
    { label: 'Government Quota (Govt.)', value: 'Govt.' },
    { label: 'Management Quota (Magt.)', value: 'Magt.' },
    { label: 'NRI Quota', value: 'NRI' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Official Form Header Banner */}
      <div className="bg-slate-50 border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-900" />
          Page 1 &amp; 2 — Admission &amp; Quota Allotment
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Please enter the admission mode, allotment quota, and Director of Medical Education (DME) allotment details as specified in your allotment order.
        </p>
      </div>

      {/* Page 1: Candidate Roll No. Box */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
              ROLL NO. <span className="text-xs font-normal text-slate-500">(As assigned on the cover page)</span>
            </label>
            <p className="text-xs text-slate-500">Official candidate roll number if issued by the college admission office</p>
          </div>
          <div className="w-full sm:w-64">
            <div className="relative">
              <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={formData.roll_no || ''}
                onChange={(e) => updateField('roll_no', e.target.value)}
                placeholder="e.g. MBBS-2026-001"
                className="w-full pl-9 pr-3 py-2 text-sm font-semibold tracking-wider uppercase border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-slate-50"
              />
            </div>
          </div>
        </div>

        {formData.application_no && (
          <div className="flex items-center justify-between text-xs bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-900">
            <span className="font-semibold">APPLICATION TRACKING NO:</span>
            <span className="font-mono font-bold text-sm bg-white px-2 py-0.5 rounded border border-amber-300 text-blue-950">
              {formData.application_no}
            </span>
          </div>
        )}
      </div>

      {/* Mode of Admission */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
          MODE OF ADMISSION <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-slate-500 mb-4">(Tick / circle whichever is applicable as per DME counselling)</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {modes.map((mode) => (
            <label
              key={mode}
              className={`flex items-center p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                formData.mode_of_admission === mode
                  ? 'border-blue-900 bg-blue-50/70 text-blue-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <input
                type="radio"
                name="mode_of_admission"
                value={mode}
                checked={formData.mode_of_admission === mode}
                onChange={() => updateField('mode_of_admission', mode)}
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-slate-300"
              />
              <span className="ml-3 text-sm font-medium">{mode}</span>
            </label>
          ))}
        </div>
        {errors?.mode_of_admission && (
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> {errors.mode_of_admission}
          </p>
        )}
      </div>

      {/* Admission Table (Page 2) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">
          ADMISSION &amp; QUOTA ALLOTMENT DETAILS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allotted Quota */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              ALLOTTED QUOTA <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {quotas.map((q) => (
                <button
                  type="button"
                  key={q.value}
                  onClick={() => updateField('allotted_quota', q.value)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                    formData.allotted_quota === q.value
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {q.value}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Govt. / Magt. / NRI</p>
          </div>

          {/* Admission No (Office Use) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              ADMISSION NO. <span className="text-slate-400 font-normal">(for office use only)</span>
            </label>
            <input
              type="text"
              value={formData.admission_no || ''}
              onChange={(e) => updateField('admission_no', e.target.value)}
              placeholder="e.g. RMC/MBBS/2026/042 (if assigned)"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50"
            />
            <p className="text-[11px] text-slate-400 mt-1">Will be finalized during in-person verification by Administrative Officer</p>
          </div>

          {/* DME Allotment Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              DIRECTOR OF MEDICAL EDUCATION ALLOTMENT DATE <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={formData.dme_allotment_date || ''}
                onChange={(e) => updateField('dme_allotment_date', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">DD / MM / 2026 as mentioned on DME allotment letter</p>
          </div>

          {/* Date of Admission */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              DATE OF ADMISSION <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={formData.date_of_admission || ''}
                onChange={(e) => updateField('date_of_admission', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">DD / MM / 2026 reporting date at Rajalakshmi Medical College</p>
          </div>
        </div>
      </div>
    </div>
  );
}
