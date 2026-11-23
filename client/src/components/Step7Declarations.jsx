import React from 'react';
import { PenTool, CheckCircle2, ShieldCheck, AlertCircle, Building2, UserCheck } from 'lucide-react';
import SignaturePad from './SignaturePad';

export default function Step7Declarations({ formData, updateField, errors }) {
  const relations = ['Son', 'Daughter', 'Ward', 'Wife', 'Husband'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-slate-50 border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <PenTool className="w-5 h-5 text-blue-900" />
          Page 14 — Candidate &amp; Parent Declarations
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Final statutory undertakings governing fee remissions by 1st June, truthfulness of certificates, no strike/media criticism clauses, and disciplinary authority.
        </p>
      </div>

      {/* DECLARATION BY THE CANDIDATE */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
        <div className="border-b pb-3">
          <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block">PAGE 14</span>
          <h3 className="text-base font-bold text-slate-900 uppercase">
            DECLARATION BY THE CANDIDATE
          </h3>
        </div>

        {/* 6 Mandatory Statutory Clauses */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-800 space-y-3 leading-relaxed">
          <p>
            <strong>1.</strong> I hereby undertake that I will remit my subsequent year’s Annual Tuition Fee on or before <strong>1<sup>st</sup> June</strong> of every year as per the rates applicable to my category of admission as prescribed by the Government of Tamil Nadu from time to time.
          </p>
          <p>
            <strong>2.</strong> I declare that all the information provided by me is true and correct in all respects, and in case any information is found to be false or incorrect in this application form or in the documents / certificates attached thereto, the college authorities, at any time before completion of my MBBS degree course and duly following the procedures prescribed, can order the cancellation of my admission to the MBBS program.
          </p>
          <p>
            <strong>3.</strong> The University has every right to cancel the admission without any notice if the certificates produced are found to be fake / false / forged.
          </p>
          <p>
            <strong>4.</strong> I am fully aware about maintaining strict discipline and I will not resort to any strike during the period of my study / training. I also know that I am not permitted to criticize the policies of the College / University either before the print or electronic media, and grievances, if any, shall be submitted through proper channel to the Dean. I will not approach the legal authorities / NMC / Government without prior permission of the College and University. Further, I am fully aware that in case of violation of these conduct rules my admission is liable for cancellation apart from invoking the terms and conditions of the bonds submitted to the College and University.
          </p>
          <p>
            <strong>5.</strong> I shall abide by the regulations of the NMC / The Tamil Nadu Dr. M.G.R. Medical University with regard to academics, attendance, examination and anti-ragging regulations etc.
          </p>
          <p>
            <strong>6.</strong> In case all the submitted original documents / certificates / information are found to be false at any stage of my admission for study, or any relevant information is concealed in my admission, I am fully aware that I am liable to be disqualified and my admission will be cancelled. Further, for this act the authorities concerned shall initiate any disciplinary action as per rules.
          </p>
        </div>

        {/* Candidate Acceptance & Place/Date */}
        <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(formData.candidate_declaration_agreed)}
              onChange={(e) => updateField('candidate_declaration_agreed', e.target.checked ? 1 : 0)}
              className="mt-1 h-4 w-4 text-blue-900 rounded border-slate-300 focus:ring-blue-600"
            />
            <span className="text-xs font-bold text-blue-950">
              I, the Candidate, have carefully read and solemnly accept all 6 clauses of the Candidate Declaration. <span className="text-red-500">*</span>
            </span>
          </label>
          {errors?.candidate_declaration_agreed && (
            <p className="text-xs text-red-600">{errors.candidate_declaration_agreed}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Place <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.candidate_decl_place || ''}
                onChange={(e) => updateField('candidate_decl_place', e.target.value)}
                placeholder="e.g. Sriperumbudur / Chennai"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.candidate_decl_date || formData.date_of_admission || ''}
                onChange={(e) => updateField('candidate_decl_date', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Name in Block Letters <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.candidate_decl_name || formData.candidate_name || ''}
                onChange={(e) => updateField('candidate_decl_name', e.target.value)}
                placeholder="CANDIDATE NAME"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-bold text-blue-950"
              />
            </div>
          </div>

          {/* Candidate Signature Pad */}
          <SignaturePad
            role="Candidate"
            title="Candidate Physical Digital Signature"
            subtitle="Draw or upload your authentic physical signature as per official admission records"
            signatureUrl={formData.candidate_decl_signature_url}
            onSignatureChange={(url) => updateField('candidate_decl_signature_url', url)}
          />
        </div>
      </div>

      {/* DECLARATION BY THE PARENT / GUARDIAN */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
        <div className="border-b pb-3">
          <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block">PAGE 14</span>
          <h3 className="text-base font-bold text-slate-900 uppercase">
            DECLARATION BY THE PARENT / GUARDIAN
          </h3>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-800 leading-relaxed">
          <p>
            "I am fully abiding with the above declaration and I hereby undertake that I shall abide by the rules and regulations of the University / Management / Institution regarding the discipline of my{' '}
            <strong>{formData.parent_decl_relation || 'Son / Daughter'}</strong>, and the regulations and academic curriculum of the MBBS course as defined by the University and NMC, and payment of fees due to the College / University / Management."
          </p>
        </div>

        {/* Parent Acceptance & Details */}
        <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(formData.parent_declaration_agreed)}
              onChange={(e) => updateField('parent_declaration_agreed', e.target.checked ? 1 : 0)}
              className="mt-1 h-4 w-4 text-blue-900 rounded border-slate-300 focus:ring-blue-600"
            />
            <span className="text-xs font-bold text-blue-950">
              I, the Parent / Guardian, hereby solemnly give my consent and abide by the above Parent Declaration. <span className="text-red-500">*</span>
            </span>
          </label>
          {errors?.parent_declaration_agreed && (
            <p className="text-xs text-red-600">{errors.parent_declaration_agreed}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Ward Relation <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.parent_decl_relation || 'Son'}
                onChange={(e) => updateField('parent_decl_relation', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-medium"
              >
                {relations.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Place <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.parent_decl_place || formData.candidate_decl_place || ''}
                onChange={(e) => updateField('parent_decl_place', e.target.value)}
                placeholder="Place"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.parent_decl_date || formData.date_of_admission || ''}
                onChange={(e) => updateField('parent_decl_date', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Name in Block Letters <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.parent_decl_name || formData.father_name || formData.mother_name || ''}
                onChange={(e) => updateField('parent_decl_name', e.target.value)}
                placeholder="PARENT NAME"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-bold text-blue-950"
              />
            </div>
          </div>

          {/* Parent Signature Pad */}
          <SignaturePad
            role="Parent / Guardian"
            title="Parent / Guardian Physical Digital Signature"
            subtitle="Countersign with screen stylus, mouse, or scanned signature image"
            signatureUrl={formData.parent_decl_signature_url}
            onSignatureChange={(url) => updateField('parent_decl_signature_url', url)}
          />
        </div>
      </div>

      {/* FOR OFFICE USE SECTION (Page 14 bottom) */}
      <div className="bg-slate-100 p-6 rounded-xl border-2 border-dashed border-slate-300 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300 pb-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-700" />
            FOR OFFICE USE ONLY (PENNALUR CAMPUS ADMISSION CELL)
          </h3>
          <span className="text-[10px] uppercase font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-700">
            Official Verification
          </span>
        </div>

        <p className="text-xs text-slate-600">
          This section will be endorsed during document scrutiny at Rajalakshmi Medical College Hospital &amp; Research Institute.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
          <div className="border-t border-slate-400 pt-2 text-center sm:text-left">
            <div className="text-xs font-bold text-slate-800">Verified by</div>
            <div className="text-xs text-slate-600">Administrative Officer (College)</div>
            {formData.office_verified_by && (
              <div className="mt-1 text-xs text-emerald-700 font-semibold">
                ✓ Verified: {formData.office_verified_by}
              </div>
            )}
          </div>

          <div className="border-t border-slate-400 pt-2 text-center sm:text-right">
            <div className="text-xs font-bold text-slate-800">Approval &amp; Admission Order</div>
            <div className="text-xs text-slate-600">Dean, Rajalakshmi Medical College</div>
            {formData.dean_approval_status === 'Approved' && (
              <div className="mt-1 text-xs text-emerald-700 font-semibold">
                ✓ Approved by Dean
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
