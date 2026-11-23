import React, { useEffect } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, Calculator, Info } from 'lucide-react';

export default function Step4QualifyingExam({ formData, updateField, errors }) {
  // Initial subject marks template
  const defaultSubjects = [
    { subject_name: 'Botany', max_marks: 100, marks_obtained: '', percentage: '' },
    { subject_name: 'Zoology', max_marks: 100, marks_obtained: '', percentage: '' },
    { subject_name: 'Physics', max_marks: 100, marks_obtained: '', percentage: '' },
    { subject_name: 'Chemistry', max_marks: 100, marks_obtained: '', percentage: '' },
    { subject_name: 'Total marks of the above 4 subjects', max_marks: 400, marks_obtained: '', percentage: '' },
    { subject_name: 'English', max_marks: 100, marks_obtained: '', percentage: '' }
  ];

  const marksList = formData.marks && formData.marks.length > 0 ? formData.marks : defaultSubjects;

  const handleMarkChange = (index, field, value) => {
    const updated = [...marksList];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-calculate individual percentage
    const max = Number(updated[index].max_marks);
    const obt = Number(updated[index].marks_obtained);
    if (!isNaN(max) && !isNaN(obt) && max > 0 && updated[index].marks_obtained !== '') {
      updated[index].percentage = ((obt / max) * 100).toFixed(2);
    }

    // Auto-recalculate Total of 4 subjects (indices 0, 1, 2, 3)
    let totalMax = 0;
    let totalObt = 0;
    let hasAll4 = true;

    for (let i = 0; i < 4; i++) {
      const sMax = Number(updated[i].max_marks) || 0;
      const sObt = Number(updated[i].marks_obtained) || 0;
      totalMax += sMax;
      totalObt += sObt;
      if (updated[i].marks_obtained === '') hasAll4 = false;
    }

    // Index 4 is Total
    updated[4].max_marks = totalMax;
    updated[4].marks_obtained = hasAll4 ? totalObt : '';
    updated[4].percentage = (hasAll4 && totalMax > 0) ? ((totalObt / totalMax) * 100).toFixed(2) : '';

    updateField('marks', updated);
  };

  // Eligibility check logic
  const totalRow = marksList.find(m => m.subject_name.toLowerCase().includes('total'));
  const currentTotalPct = totalRow && totalRow.percentage ? Number(totalRow.percentage) : null;
  const cat = (formData.category || '').toUpperCase();
  let requiredPct = 50;
  if (cat === 'BC' || cat === 'MBC' || cat === 'SC' || cat === 'ST') {
    requiredPct = 40;
  } else if (cat === 'PWD') {
    requiredPct = 45;
  }

  const isEligible = currentTotalPct !== null ? currentTotalPct >= requiredPct : null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-slate-50 border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-900" />
          Page 3 — Qualifying Examination Marks
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Enter marks scored in Botany, Zoology, Physics, Chemistry, and English in your qualifying examination (+2 / Higher Secondary / CBSE).
        </p>
      </div>

      {/* University Admission Regulation Notice */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 space-y-2">
        <div className="flex items-center space-x-2 font-bold text-blue-900 text-sm">
          <Info className="w-4 h-4 text-blue-800" />
          <span>The Tamil Nadu Dr. M.G.R. Medical University Minimum Regulations</span>
        </div>
        <p className="leading-relaxed text-blue-800">
          Qualifying examination subjects (Botany / Zoology / Physics / Chemistry). As per The Tamil Nadu Dr. M.G.R. Medical University admission regulations, the candidate should have passed and obtained:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-semibold">
          <div className="bg-white p-2 rounded border border-blue-200 flex justify-between">
            <span>OC / EWS:</span> <span className="text-blue-900">50% Minimum</span>
          </div>
          <div className="bg-white p-2 rounded border border-blue-200 flex justify-between">
            <span>BC / MBC / SC / ST:</span> <span className="text-blue-900">40% Minimum</span>
          </div>
          <div className="bg-white p-2 rounded border border-blue-200 flex justify-between">
            <span>PWD:</span> <span className="text-blue-900">45% Minimum</span>
          </div>
        </div>
      </div>

      {/* Board Name */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
          QUALIFYING EXAMINATION BOARD <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.qualifying_exam_board || ''}
          onChange={(e) => updateField('qualifying_exam_board', e.target.value)}
          placeholder="e.g. Tamil Nadu Board of Higher Secondary Education / CBSE / CISCE"
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none uppercase font-medium"
        />
      </div>

      {/* Marks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider">
            QUALIFYING EXAMINATION BOARD MARKS (INCLUDING PRACTICAL)
          </h3>
          <span className="text-[11px] text-amber-300 font-medium">Automatic Aggregate &amp; Percentage</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Subjects</th>
                <th className="px-4 py-3 text-center">Maximum Marks (incl. practical)</th>
                <th className="px-4 py-3 text-center">Marks Obtained (incl. practical)</th>
                <th className="px-4 py-3 text-center">Percentage (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {marksList.map((row, idx) => {
                const isTotal = row.subject_name.toLowerCase().includes('total');
                const isEnglish = row.subject_name.toLowerCase() === 'english';

                return (
                  <tr
                    key={row.subject_name}
                    className={isTotal ? 'bg-amber-50/60 font-bold text-slate-900' : 'hover:bg-slate-50'}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {row.subject_name}
                    </td>

                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        disabled={isTotal}
                        value={row.max_marks || ''}
                        onChange={(e) => handleMarkChange(idx, 'max_marks', e.target.value)}
                        className={`w-28 text-center px-2 py-1.5 border rounded text-sm ${
                          isTotal ? 'bg-slate-100 border-slate-300 font-bold' : 'border-slate-300'
                        }`}
                      />
                    </td>

                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        disabled={isTotal}
                        value={row.marks_obtained !== undefined ? row.marks_obtained : ''}
                        onChange={(e) => handleMarkChange(idx, 'marks_obtained', e.target.value)}
                        placeholder={isTotal ? 'Auto-sum' : '0'}
                        className={`w-28 text-center px-2 py-1.5 border rounded text-sm ${
                          isTotal ? 'bg-slate-100 border-slate-300 font-bold text-blue-900' : 'border-slate-300 focus:ring-1 focus:ring-blue-600'
                        }`}
                      />
                    </td>

                    <td className="px-4 py-2 text-center">
                      <div className="inline-flex items-center space-x-1 font-mono font-bold">
                        <span className={`px-2 py-1 rounded text-xs ${
                          row.percentage ? (Number(row.percentage) >= 50 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800') : 'text-slate-400'
                        }`}>
                          {row.percentage ? `${row.percentage}%` : '—'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Live Eligibility Status Footer */}
        {currentTotalPct !== null && (
          <div className={`p-4 border-t flex items-center justify-between ${
            isEligible ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {isEligible ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <div className="text-xs">
                <span className="font-bold">
                  {isEligible ? 'ELIGIBILITY CRITERIA MET: ' : 'ELIGIBILITY ALERT: '}
                </span>
                <span>
                  Aggregate of 4 subjects is <strong>{currentTotalPct}%</strong>. Minimum required for category{' '}
                  <strong>{formData.category || 'General'}</strong> is <strong>{requiredPct}%</strong>.
                </span>
              </div>
            </div>

            <div className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border shadow-sm">
              {isEligible ? 'Passed TN M.G.R. Norms' : 'Below Minimum Requirement'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
