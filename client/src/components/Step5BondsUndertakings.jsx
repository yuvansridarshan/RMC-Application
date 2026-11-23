import React, { useState } from 'react';
import { FileCheck2, Upload, AlertCircle, CheckCircle, ShieldCheck, FileText, Trash2, RefreshCw, Eye } from 'lucide-react';

export default function Step5BondsUndertakings({ formData, updateField, errors }) {
  const [uploadingDoc, setUploadingDoc] = useState(null);

  const bonds = [
    {
      id: 1,
      name: 'Genuine Certificates Bond',
      text: 'One bond duly notarized on Rs. 200/- Non-Judicial stamp paper in the prescribed format by the candidate and parent stating that all the certificates submitted to the institution are genuine.',
      fieldStatus: 'bond1_submitted',
      fieldFile: 'bond1_file_url'
    },
    {
      id: 2,
      name: 'Non-Seat Blocking Declaration',
      text: 'Declaration by the candidate and parent on a Rs. 200/- Non-Judicial stamp paper duly notarized stating that they are not a part of any seat blocking procedure.',
      fieldStatus: 'bond2_submitted',
      fieldFile: 'bond2_file_url'
    },
    {
      id: 3,
      name: 'Discontinuance Bond (₹10,00,000/-)',
      text: 'Bond duly notarized on Rs. 200/- Non-Judicial stamp paper stating that in case of any discontinuance, to remit Rs. 10,00,000/- (Rupees Ten Lakhs only).',
      fieldStatus: 'bond3_submitted',
      fieldFile: 'bond3_file_url'
    },
    {
      id: 4,
      name: 'Tuition Fee & Vacant Seat Affidavit',
      text: 'Affidavit duly notarized on Rs. 200/- Non-Judicial stamp paper to the effect to pay the entire tuition fee and other eligible fees to the institution for the discontinuance of the course after the cut-off date and the seat became vacant.',
      fieldStatus: 'bond4_submitted',
      fieldFile: 'bond4_file_url'
    },
    {
      id: 5,
      name: 'Anti-Ragging Notarized Affidavit',
      text: 'Affidavit duly notarized on Rs. 200/- Non-Judicial stamp paper to be signed by both parent & candidate for not indulging in any misdeeds under "Ragging".',
      fieldStatus: 'bond5_submitted',
      fieldFile: 'bond5_file_url'
    }
  ];

  // Default IA subjects for MBBS 1st Phase
  const defaultIASubjects = [
    { subject_name: 'Human Anatomy', attendance_percentage: 85, theory_percentage: 65, practical_percentage: 70, lesser_percentage: 65 },
    { subject_name: 'Physiology', attendance_percentage: 82, theory_percentage: 62, practical_percentage: 68, lesser_percentage: 62 },
    { subject_name: 'Biochemistry', attendance_percentage: 88, theory_percentage: 70, practical_percentage: 75, lesser_percentage: 70 }
  ];

  const iaList = formData.ia_subjects && formData.ia_subjects.length > 0 ? formData.ia_subjects : defaultIASubjects;

  const handleIAChange = (index, field, value) => {
    const updated = [...iaList];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-calculate lesser percentage between theory & practical
    const th = Number(updated[index].theory_percentage);
    const pr = Number(updated[index].practical_percentage);
    if (!isNaN(th) && !isNaN(pr)) {
      updated[index].lesser_percentage = Math.min(th, pr);
    }
    updateField('ia_subjects', updated);
  };

  const handleFileUpload = async (fieldFile, file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('Document size must not exceed 10MB.');
      return;
    }

    setUploadingDoc(fieldFile);
    const formUpload = new FormData();
    formUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formUpload
      });
      const data = await res.json();
      if (data.success) {
        updateField(fieldFile, data.file.url);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Network error uploading file');
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleRemoveFile = (fieldFile) => {
    updateField(fieldFile, '');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-slate-50 border-l-4 border-teal-600 p-4 rounded-r-lg shadow-2xs">
        <h2 className="text-base font-bold text-[#0f294a] tracking-tight flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-teal-700" />
          Page 4 — Notarized Bonds &amp; Parent's IA Undertaking
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          All 5 documents must be duly notarized on ₹200/- Non-Judicial stamp paper as per official university requirements.
        </p>
      </div>

      {/* 5 Notarized Bonds Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-[#0f294a] text-white flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider">
            BOND DETAILS (ON RS. 200/- NON-JUDICIAL STAMP PAPER)
          </h3>
          <span className="text-[11px] text-teal-300 font-semibold">5 Statutory Undertakings</span>
        </div>

        <div className="divide-y divide-slate-200">
          {bonds.map((bond) => {
            const isSubmitted = formData[bond.fieldStatus] === 'YES';
            const fileUrl = formData[bond.fieldFile];
            const isUploading = uploadingDoc === bond.fieldFile;

            return (
              <div key={bond.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-[#0f294a] text-white text-[10px] font-bold rounded">
                        BOND #{bond.id}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 uppercase">{bond.name}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-1">
                      {bond.text}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {/* YES / NO Radio Buttons */}
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-300">
                      <span className="text-[10px] font-bold text-slate-600 px-1">SUBMITTED:</span>
                      <button
                        type="button"
                        onClick={() => updateField(bond.fieldStatus, 'YES')}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          isSubmitted ? 'bg-teal-700 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        YES
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField(bond.fieldStatus, 'NO')}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          !isSubmitted ? 'bg-slate-400 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        NO
                      </button>
                    </div>

                    {/* Document Upload Interface */}
                    <div>
                      {fileUrl ? (
                        <div className="flex items-center space-x-2 bg-teal-50/80 border border-teal-200 px-3 py-1.5 rounded-lg">
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1.5 text-xs text-teal-800 hover:underline font-semibold"
                          >
                            <Eye className="w-3.5 h-3.5 text-teal-600" />
                            <span>View Uploaded File</span>
                          </a>

                          <span className="text-slate-300">|</span>

                          <label className="cursor-pointer text-[11px] text-slate-600 hover:text-slate-900 font-medium">
                            <span>Replace</span>
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={(e) => handleFileUpload(bond.fieldFile, e.target.files[0])}
                              className="hidden"
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => handleRemoveFile(bond.fieldFile)}
                            className="p-1 text-slate-400 hover:text-red-600"
                            title="Remove file"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <label className={`cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                          isUploading 
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-wait' 
                            : 'bg-white hover:bg-slate-50 text-[#0f294a] border-slate-300 shadow-2xs'
                        }`}>
                          {isUploading ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5 text-teal-700" />
                              <span>Upload Stamp Bond</span>
                              <input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => handleFileUpload(bond.fieldFile, e.target.files[0])}
                                className="hidden"
                              />
                            </>
                          )}
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Allowed formats: <strong>PDF, PNG, JPG, JPEG</strong> (Max: 10MB per bond)</span>
          <span className="text-teal-700 font-semibold">Keep physical originals ready for campus verification</span>
        </div>
      </div>

      {/* PARENT'S UNDERTAKING - Internal Assessment Marks & Attendance */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-sm font-bold text-[#0f294a] uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            PARENT’S UNDERTAKING — INTERNAL ASSESSMENT MARKS AND ATTENDANCE
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Mandatory undertaking as per The Tamil Nadu Dr. M.G.R. Medical University regulations.
          </p>
        </div>

        {/* Dynamic Legal Undertaking Text */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs leading-relaxed text-slate-700">
          <p>
            I, <strong className="text-[#0f294a] font-bold uppercase">{formData.father_name || formData.mother_name || '[Parent Name]'}</strong>,{' '}
            Father / Mother of Mr. / Ms.{' '}
            <strong className="text-[#0f294a] font-bold uppercase">{formData.candidate_name || '[Candidate Name]'}</strong>,{' '}
            I<sup>st</sup> MBBS bearing Roll No.{' '}
            <strong className="text-[#0f294a] font-mono">{formData.roll_no || '[Roll No]'}</strong> studying at{' '}
            <strong>Rajalakshmi Medical College Hospital &amp; Research Institute, Pennalur, Sriperumbudur</strong>, is fully aware that as per The Tamil Nadu Dr. M.G.R. Medical University Regulations he/she has to score a minimum of:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 font-semibold text-slate-900">
            <li>(1) 80% attendance in theory and practical, and</li>
            <li>(2) 50% marks in Internal Assessment Examinations to become eligible to appear for University Examinations.</li>
          </ul>
          <p className="mt-2 text-slate-600">
            The Dean of the College has brought to my notice that my Son / Daughter has scored the following subject-wise IA attendance and marks in the I / II / III – IA Exams of the concerned Phase of the MBBS Program:
          </p>
        </div>

        {/* IA Subjects Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-800 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-3 py-2.5">Subject</th>
                <th className="px-3 py-2.5 text-center">% of Attendance (Theory + Practical)</th>
                <th className="px-3 py-2.5 text-center">% of Marks in Theory</th>
                <th className="px-3 py-2.5 text-center">% of Marks in Practical</th>
                <th className="px-3 py-2.5 text-center">Lesser % Scored in Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {iaList.map((row, idx) => (
                <tr key={row.subject_name} className="hover:bg-slate-50">
                  <td className="px-3 py-2 font-semibold text-slate-800">{row.subject_name}</td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="number"
                      value={row.attendance_percentage || ''}
                      onChange={(e) => handleIAChange(idx, 'attendance_percentage', e.target.value)}
                      placeholder="80% min"
                      className="w-20 text-center px-2 py-1 border border-slate-300 rounded text-xs"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="number"
                      value={row.theory_percentage || ''}
                      onChange={(e) => handleIAChange(idx, 'theory_percentage', e.target.value)}
                      placeholder="50% min"
                      className="w-20 text-center px-2 py-1 border border-slate-300 rounded text-xs"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="number"
                      value={row.practical_percentage || ''}
                      onChange={(e) => handleIAChange(idx, 'practical_percentage', e.target.value)}
                      placeholder="50% min"
                      className="w-20 text-center px-2 py-1 border border-slate-300 rounded text-xs"
                    />
                  </td>
                  <td className="px-3 py-2 text-center font-bold text-[#0f294a]">
                    {row.lesser_percentage !== undefined ? `${row.lesser_percentage}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Binding Agreement Clause */}
        <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-lg text-xs text-amber-950 leading-relaxed">
          <p>
            <strong>Parent's Acknowledgment:</strong> "Now, I am fully aware that if he / she does not improve both in IA Marks and attendance percentage in his / her remaining duration of study, as per the University norms he / she will not be eligible to appear for The Tamil Nadu Dr. M.G.R. Medical University Examinations and will be detained from appearing for University Examinations. For this I shall have no right to blame / claim against the college administration in any manner."
          </p>
        </div>

        {/* Parent Undertaking Checkbox & Details */}
        <div className="pt-2 space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(formData.ia_parent_undertaking_agreed)}
              onChange={(e) => updateField('ia_parent_undertaking_agreed', e.target.checked ? 1 : 0)}
              className="mt-1 h-4 w-4 text-[#0f294a] rounded border-slate-300 focus:ring-teal-600"
            />
            <span className="text-xs font-bold text-slate-800">
              I, as the Parent / Guardian, hereby solemnly exercise my consent and agree to the above Internal Assessment marks and attendance undertaking without reservations. <span className="text-red-500">*</span>
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Name of Parent (in Block Letters) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.ia_parent_name || formData.father_name || formData.mother_name || ''}
                onChange={(e) => updateField('ia_parent_name', e.target.value)}
                placeholder="Parent's Name"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f294a] uppercase font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Relationship <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.ia_parent_relation || 'Father'}
                onChange={(e) => updateField('ia_parent_relation', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f294a] bg-white"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Parent's Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                maxLength="10"
                value={formData.ia_parent_mobile || formData.father_mobile || formData.mother_mobile || ''}
                onChange={(e) => updateField('ia_parent_mobile', e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="10-digit mobile"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f294a] font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
