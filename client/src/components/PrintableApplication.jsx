import React from 'react';
import { Printer, ArrowLeft } from 'lucide-react';

export default function PrintableApplication({ data, onClose }) {
  const marks = data.marks || [
    { subject_name: 'Botany', max_marks: 100, marks_obtained: '—', percentage: '—' },
    { subject_name: 'Zoology', max_marks: 100, marks_obtained: '—', percentage: '—' },
    { subject_name: 'Physics', max_marks: 100, marks_obtained: '—', percentage: '—' },
    { subject_name: 'Chemistry', max_marks: 100, marks_obtained: '—', percentage: '—' },
    { subject_name: 'Total marks of the above 4 subjects', max_marks: 400, marks_obtained: '—', percentage: '—' },
    { subject_name: 'English', max_marks: 100, marks_obtained: '—', percentage: '—' }
  ];

  const iaSubjects = data.ia_subjects || [
    { subject_name: 'Human Anatomy', attendance_percentage: 85, theory_percentage: 65, practical_percentage: 70, lesser_percentage: 65 },
    { subject_name: 'Physiology', attendance_percentage: 82, theory_percentage: 62, practical_percentage: 68, lesser_percentage: 62 },
    { subject_name: 'Biochemistry', attendance_percentage: 88, theory_percentage: 70, practical_percentage: 75, lesser_percentage: 70 }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-200 min-h-screen py-8 text-black">
      {/* Floating Action Header (Hidden in Print) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex justify-between items-center no-print">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 flex items-center space-x-1.5 transition-all shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Application Portal</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-6 py-2.5 bg-blue-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-800 flex items-center space-x-2 transition-all shadow-lg"
        >
          <Printer className="w-4 h-4" />
          <span>Print Official 14-Page Application</span>
        </button>
      </div>

      {/* 14-PAGE AUTHENTIC DOCUMENT REPLICA CONTAINER */}
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-0 text-slate-900 text-[13px] leading-normal">

        {/* ==================== PAGE 1: COVER PAGE ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-8 flex justify-between items-start gap-4">
              <div className="w-64">
                <div className="text-xs font-bold uppercase mb-1">ROLL NO.</div>
                <div className="border-2 border-slate-900 p-2 font-mono font-bold text-sm bg-slate-50 min-h-[42px] flex items-center">
                  {data.roll_no || ''}
                </div>
              </div>

              {/* Photo Box */}
              <div className="w-36 h-48 border-2 border-dashed border-slate-400 p-1 flex flex-col items-center justify-center text-center overflow-hidden">
                {data.candidate_photo_url ? (
                  <img src={data.candidate_photo_url} alt="Candidate Photo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[11px] text-slate-500">Affix latest passport size photograph</span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-sm">Name:</span>
                <span className="flex-1 border-b-2 border-slate-900 font-bold uppercase tracking-wide text-base pl-2">
                  {data.candidate_name || ''}
                </span>
              </div>
            </div>

            {/* Central Institution Seal & Title */}
            <div className="mt-12 text-center space-y-3">
              <div className="flex justify-center mb-3">
                <img 
                  src="/rmc-logo.png" 
                  alt="Rajalakshmi Medical College Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>

              <div className="w-24 h-0.5 bg-blue-900 mx-auto my-3"></div>

              <p className="text-xs font-semibold text-slate-700">
                Affiliated to The T.N Dr. M.G.R Medical University, Chennai - 32
              </p>
              <p className="text-xs text-slate-600">
                (Formerly known as <strong>Annaii Medical College and Hospital</strong>) Sri Devi Karumariamman Educational Trust
              </p>
              <p className="text-xs text-slate-600">
                Rajalakshmi HealthCity, Pennalur Village, Sriperumbudur Taluk, Kanchipuram District, Tamil Nadu – 602117
              </p>
              <p className="text-xs text-slate-600">
                Ph.: 044-27176404 / 05 / 06 / 07 • E-Mail: admin@rmchri.edu.in
              </p>
            </div>

            {/* Dark Title Banner */}
            <div className="mt-12 bg-slate-900 text-white py-3 px-6 text-center rounded shadow-sm">
              <div className="text-sm font-extrabold uppercase tracking-wide">
                APPLICATION FOR ADMISSION INTO MBBS DEGREE COURSE 2026 – 27
              </div>
              <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                Candidate’s application, undertakings and annexures
              </div>
            </div>

            <div className="mt-12 text-center text-xs font-bold tracking-[0.3em] text-slate-700 uppercase">
              L E A R N · C A R E · H E A L
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Page 1 of 14</span>
          </div>
        </div>

        {/* ==================== PAGE 2: ADMISSION & CANDIDATE DETAILS ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-4 bg-slate-900 text-white py-2 px-4 text-center rounded">
              <span className="text-xs font-bold uppercase tracking-wider">
                APPLICATION FOR ADMISSION INTO MBBS DEGREE COURSE 2026 – 27
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold uppercase block mb-1">APPLICATION NO.</span>
              <div className="border border-slate-400 p-2 font-mono font-bold text-sm bg-slate-50 min-h-[36px]">
                {data.application_no || ''}
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold uppercase block mb-1">MODE OF ADMISSION</span>
              <div className="border border-slate-400 p-3 flex justify-around text-xs font-semibold">
                {['Round 1', 'Round 2', 'Mop-up Round', 'Stray Round'].map((mode) => (
                  <div key={mode} className="flex items-center space-x-1">
                    <span className={`w-3.5 h-3.5 rounded-full border border-slate-900 flex items-center justify-center text-[10px] ${data.mode_of_admission === mode ? 'bg-slate-900 text-white' : ''}`}>
                      {data.mode_of_admission === mode ? '✓' : ''}
                    </span>
                    <span>{mode}</span>
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-slate-500 italic block mt-0.5">(Tick / circle whichever is applicable)</span>
            </div>

            {/* Admission Table */}
            <div className="mt-4 border border-slate-400 overflow-hidden text-xs">
              <div className="grid grid-cols-4 bg-slate-800 text-white font-bold text-center py-2 border-b">
                <div className="border-r border-slate-600">ADMISSION NO. <span className="text-[9px] font-normal block">(for office use only)</span></div>
                <div className="border-r border-slate-600">ALLOTTED QUOTA</div>
                <div className="border-r border-slate-600">DME ALLOTMENT DATE</div>
                <div>DATE OF ADMISSION</div>
              </div>
              <div className="grid grid-cols-4 text-center py-2 font-semibold">
                <div className="border-r border-slate-300 font-mono">{data.admission_no || '—'}</div>
                <div className="border-r border-slate-300">{data.allotted_quota || 'Govt. / Magt. / NRI'}</div>
                <div className="border-r border-slate-300">{data.dme_allotment_date || '___ / ___ / 2026'}</div>
                <div>{data.date_of_admission || '___ / ___ / 2026'}</div>
              </div>
            </div>

            {/* Candidate's Details Header */}
            <div className="mt-5 bg-slate-800 text-white py-1.5 px-3 text-center text-xs font-bold uppercase">
              CANDIDATE’S DETAILS
            </div>

            {/* Candidate Details Grid */}
            <div className="border border-slate-400 text-xs divide-y divide-slate-300">
              <div className="grid grid-cols-4 p-2">
                <div className="font-bold col-span-1">Name of the Candidate:</div>
                <div className="col-span-1 uppercase font-bold text-blue-950">{data.candidate_name || ''}</div>
                <div className="font-bold col-span-1">Gender:</div>
                <div className="col-span-1">{data.gender || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">NEET Roll No.:</div>
                <div className="font-mono">{data.neet_roll_no || ''}</div>
                <div className="font-bold">NEET Marks:</div>
                <div className="font-bold">{data.neet_marks !== undefined ? `${data.neet_marks} / 720` : '—'}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">NEET Communal Rank:</div>
                <div>{data.neet_communal_rank || '—'}</div>
                <div className="font-bold">NEET State Rank:</div>
                <div>{data.neet_state_rank || '—'}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">DME Merit No.:</div>
                <div>{data.dme_merit_no || '—'}</div>
                <div className="font-bold">Category:</div>
                <div className="font-bold">{data.category || 'Gen / BC / MBC / SC / ST / EWS / PWD'}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Whether:</div>
                <div>{data.is_local || 'Local / Non-Local'}</div>
                <div className="font-bold">Date of Birth &amp; Age:</div>
                <div>{data.date_of_birth || 'DD/MM/YYYY'} (Age: {data.age_as_on_cutoff || '—'} yrs)</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Allotment in:</div>
                <div>{data.allotment_in || '—'}</div>
                <div className="font-bold">Allotted Category:</div>
                <div className="font-bold">{data.allotted_category || '—'}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Student’s Mobile No.:</div>
                <div className="font-mono">{data.student_mobile || ''}</div>
                <div className="font-bold">Student’s PAN No.:</div>
                <div className="font-mono">{data.student_pan || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Student’s Aadhar No.:</div>
                <div className="font-mono">{data.student_aadhar || ''}</div>
                <div className="font-bold">Student Type:</div>
                <div className="font-bold">{data.student_type || 'Day Scholar / Hosteller'}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Student’s Email-ID:</div>
                <div className="col-span-3">{data.student_email || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Mother Tongue:</div>
                <div className="col-span-3">{data.mother_tongue || ''}</div>
              </div>

              <div className="p-2 space-y-1">
                <div className="font-bold">Identification Marks (as per TC / Birth Certificate):</div>
                <div className="pl-4">1. {data.identification_mark_1 || '________________________________________'}</div>
                <div className="pl-4">2. {data.identification_mark_2 || '________________________________________'}</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Page 2 of 14</span>
          </div>
        </div>

        {/* ==================== PAGE 3: PARENT DETAILS & QUALIFYING EXAM ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-4 bg-slate-800 text-white py-1.5 px-3 text-center text-xs font-bold uppercase">
              PARENT / GUARDIAN DETAILS
            </div>
            <p className="text-[11px] text-slate-600 text-center italic mt-1 mb-2">
              All communication relating to the student will be sent to these contacts
            </p>

            <div className="border border-slate-400 text-xs divide-y divide-slate-300">
              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Father’s Name:</div>
                <div className="uppercase font-semibold">{data.father_name || ''}</div>
                <div className="font-bold">Father’s Mobile No.:</div>
                <div className="font-mono">{data.father_mobile || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Father’s Email-ID:</div>
                <div>{data.father_email || ''}</div>
                <div className="font-bold">Father’s Occupation:</div>
                <div>{data.father_occupation || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Mother’s Name:</div>
                <div className="uppercase font-semibold">{data.mother_name || ''}</div>
                <div className="font-bold">Mother’s Mobile No.:</div>
                <div className="font-mono">{data.mother_mobile || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Mother’s Email-ID:</div>
                <div>{data.mother_email || ''}</div>
                <div className="font-bold">Landline No.:</div>
                <div>{data.landline_no || '—'}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Residential Address:</div>
                <div className="col-span-3">{data.address_street || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Place:</div>
                <div>{data.address_place || ''}</div>
                <div className="font-bold">District:</div>
                <div>{data.address_district || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Pin Code:</div>
                <div className="font-mono">{data.address_pincode || ''}</div>
                <div className="font-bold">State:</div>
                <div>{data.address_state || ''}</div>
              </div>

              <div className="grid grid-cols-4 p-2">
                <div className="font-bold">Local Guardian Name:</div>
                <div>{data.local_guardian_name || '—'}</div>
                <div className="font-bold">Local Guardian Mobile:</div>
                <div className="font-mono">{data.local_guardian_mobile || '—'}</div>
              </div>
            </div>

            {/* Qualifying Exam Section */}
            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-wider mb-1">QUALIFYING EXAMINATION</div>
              <p className="text-[11px] text-slate-700 leading-relaxed mb-3">
                Qualifying examination subjects (Botany / Zoology / Physics / Chemistry). As per The Tamil Nadu Dr. M.G.R. Medical University admission regulations the candidate should have passed and obtained — <strong>OC / EWS 50% • BC / MBC and SC / ST 40% • PWD 45%</strong>.
              </p>

              <div className="mb-2 text-xs">
                <span className="font-bold">QUALIFYING EXAMINATION BOARD:</span>{' '}
                <span className="font-semibold">{data.qualifying_exam_board || '—'}</span>
              </div>

              <table className="w-full text-xs border border-slate-400">
                <thead className="bg-slate-800 text-white font-bold text-center">
                  <tr>
                    <th className="p-2 border-r border-slate-600 text-left">SUBJECTS</th>
                    <th className="p-2 border-r border-slate-600">MAXIMUM MARKS (INCL. PRACTICAL)</th>
                    <th className="p-2 border-r border-slate-600">MARKS OBTAINED (INCL. PRACTICAL)</th>
                    <th className="p-2">PERCENTAGE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 text-center">
                  {marks.map((m, idx) => (
                    <tr key={idx} className={m.subject_name.toLowerCase().includes('total') ? 'font-bold bg-slate-100' : ''}>
                      <td className="p-2 text-left border-r border-slate-300 font-semibold">{m.subject_name}</td>
                      <td className="p-2 border-r border-slate-300">{m.max_marks || ''}</td>
                      <td className="p-2 border-r border-slate-300 font-bold">{m.marks_obtained !== undefined ? m.marks_obtained : ''}</td>
                      <td className="p-2 font-mono font-bold">{m.percentage ? `${m.percentage}%` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Page 3 of 14</span>
          </div>
        </div>

        {/* ==================== PAGE 4: BOND DETAILS & PARENT UNDERTAKING ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-4 text-xs font-bold uppercase tracking-wider mb-2">BOND DETAILS</div>
            <table className="w-full text-xs border border-slate-400">
              <thead className="bg-slate-800 text-white font-bold text-center">
                <tr>
                  <th className="p-2 border-r border-slate-600 text-left">DOCUMENT</th>
                  <th className="p-2 w-28">SUBMITTED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                <tr>
                  <td className="p-2 border-r border-slate-300">
                    One bond duly notarized on Rs. 200/- Non-Judicial stamp paper in the prescribed format by the candidate and parent stating that all the certificates submitted to the institution are genuine.
                  </td>
                  <td className="p-2 text-center font-bold">{data.bond1_submitted || 'NO'}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-300">
                    Declaration by the candidate and parent on a Rs. 200/- Non-Judicial stamp paper duly notarized stating that they are not a part of any seat blocking procedure.
                  </td>
                  <td className="p-2 text-center font-bold">{data.bond2_submitted || 'NO'}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-300">
                    Bond duly notarized on Rs. 200/- Non-Judicial stamp paper stating that in case of any discontinuance, to remit Rs. 10,00,000/- (Rupees Ten Lakhs only).
                  </td>
                  <td className="p-2 text-center font-bold">{data.bond3_submitted || 'NO'}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-300">
                    Affidavit duly notarized on Rs. 200/- Non-Judicial stamp paper to the effect to pay the entire tuition fee and other eligible fees to the institution for the discontinuance of the course after the cut-off date and the seat became vacant.
                  </td>
                  <td className="p-2 text-center font-bold">{data.bond4_submitted || 'NO'}</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-300">
                    Affidavit duly notarized on Rs. 200/- Non-Judicial stamp paper to be signed by both parent &amp; candidate for not indulging in any misdeeds under “Ragging”.
                  </td>
                  <td className="p-2 text-center font-bold">{data.bond5_submitted || 'NO'}</td>
                </tr>
              </tbody>
            </table>

            {/* Parent's Undertaking */}
            <div className="mt-6 bg-slate-800 text-white py-1.5 px-3 text-center text-xs font-bold uppercase">
              PARENT’S UNDERTAKING — Internal Assessment marks and attendance
            </div>

            <p className="mt-3 text-xs leading-relaxed text-justify">
              I, <strong className="uppercase">{data.ia_parent_name || data.father_name || data.mother_name || '______________________'}</strong>, Father / Mother of Mr. / Ms.{' '}
              <strong className="uppercase">{data.candidate_name || '______________________'}</strong>, I<sup>st</sup> MBBS bearing Roll No.{' '}
              <strong>{data.roll_no || '________________'}</strong> studying at Rajalakshmi Medical College Hospital &amp; Research Institute, Pennalur, Sriperumbudur, is fully aware that as per The Tamil Nadu Dr. M.G.R. Medical University Regulations he/she has to score a minimum of (1) 80% attendance in theory and practical and (2) 50% marks in Internal Assessment Examinations to become eligible to appear for University Examinations.
            </p>

            <table className="w-full text-xs border border-slate-400 mt-3">
              <thead className="bg-slate-100 font-bold text-center">
                <tr>
                  <th className="p-2 border-r border-slate-300 text-left">SUBJECT</th>
                  <th className="p-2 border-r border-slate-300">% ATTENDANCE</th>
                  <th className="p-2 border-r border-slate-300">% THEORY</th>
                  <th className="p-2 border-r border-slate-300">% PRACTICAL</th>
                  <th className="p-2">LESSER %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-center">
                {iaSubjects.map((row, i) => (
                  <tr key={i}>
                    <td className="p-2 text-left border-r border-slate-300 font-semibold">{row.subject_name}</td>
                    <td className="p-2 border-r border-slate-300">{row.attendance_percentage}%</td>
                    <td className="p-2 border-r border-slate-300">{row.theory_percentage}%</td>
                    <td className="p-2 border-r border-slate-300">{row.practical_percentage}%</td>
                    <td className="p-2 font-bold">{row.lesser_percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-3 text-xs leading-relaxed text-justify">
              Now, I am fully aware that if he / she does not improve both in IA Marks and attendance percentage in his / her remaining duration of study, as per the University norms he / she will not be eligible to appear for The Tamil Nadu Dr. M.G.R. Medical University Examinations and will be detained from appearing for University Examinations. For this I shall have no right to blame / claim against the college administration in any manner.
            </p>

            <div className="mt-8 flex justify-between items-end text-xs">
              <div>
                <div className="font-bold border-b border-slate-800 pb-1 mb-1 min-w-[200px]">
                  {data.ia_parent_name || data.father_name || ''}
                </div>
                <span>Signature of the Parent</span>
              </div>

              <div>
                <div className="font-bold uppercase min-w-[180px] border-b border-slate-800 pb-1 mb-1">
                  {data.ia_parent_name || data.father_name || ''}
                </div>
                <span>Name in Block Letters</span>
              </div>

              <div>
                <div className="font-mono min-w-[140px] border-b border-slate-800 pb-1 mb-1">
                  {data.ia_parent_mobile || data.father_mobile || ''}
                </div>
                <span>Mobile Number</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Page 4 of 14</span>
          </div>
        </div>

        {/* ==================== PAGE 5–7: ANNEXURE I (HOSTEL RULES & CONDUCT) ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-4 bg-slate-900 text-white py-2 px-4 text-center rounded">
              <span className="text-xs font-bold uppercase tracking-wider">
                ANNEXURE – I: RULES AND REGULATIONS FOR HOSTEL STUDENTS AND DAY SCHOLARS
              </span>
            </div>

            <div className="mt-4 text-xs space-y-3 leading-relaxed text-justify">
              <p>
                The College attaches equal importance to conduct, discipline, decorum, decency and studies. Both parents and students are expected to extend their fullest co-operation by adhering to the code of conduct formulated by the college from time to time.
              </p>

              <div className="font-bold uppercase tracking-wider text-slate-900 border-b pb-1">CODE OF CONDUCT</div>
              <p>
                Each student shall conduct himself / herself both within and outside the campus of Rajalakshmi Medical College Hospital and Research Institute in a manner befitting a student of this institution.
              </p>
              <p>
                The following criminal offences will be forthwith reported to the police and offenders will be handed over to the respective authority: (a) Consumption of drugs (b) Theft / stealing (c) Vandalism / destruction of public property (d) Littering (e) Gambling (f) Unlawful assembling (g) Fighting (h) Any other form of criminal act or behaviour.
              </p>

              <div className="font-bold uppercase tracking-wider text-red-900 border-b pb-1">RAGGING</div>
              <p>
                Ragging in any form is banned inside and outside the campus. Stringent action will be taken against the defaulters. No leniency will be shown to the offenders. Suspension or withdrawal from the Hostel / College is one of the actions to be taken promptly. Punishment for ragging shall be up to one-year imprisonment. The Supreme Court has also defined ragging as a criminal offence.
              </p>

              <div className="font-bold uppercase tracking-wider text-slate-900 border-b pb-1">FOR HOSTEL STUDENTS — ALLOTMENT OF ACCOMMODATION</div>
              <p>
                1. Hostel accommodation is allotted purely on a “First Come First Served” basis and at the discretion of the Warden and on approval of the Dean.
                2. No booking / reservation will be entertained over phone / e-mail.
                3. The students at the time of admission to the hostel must show the receipt(s) of the Hostel Fee and Room Rent.
                4. Students must occupy rooms specifically allotted to them.
                5. Allotment is subject to cancellation if dues are not paid or room is not occupied in time.
                6. The Warden reserves the right to break open rooms in case of any violation of hostel rules.
                7. Once vacated, no re-allotment for minimum 6 months.
                8. Allotment for up to 1 year; residents required to shift as informed.
                9. Unauthorised absence leads to room cancellation.
                10. Vacating requires Chief Warden advice, parent permission and returning duplicate keys.
                11. Forbidden to keep heavy cash/valuables in room.
                12. Birthday parties or celebrations strictly disallowed.
                13. Electrical appliances like irons, cookers, water heaters disallowed.
                14. Presence in rooms during college working hours invites disciplinary action.
                15. No strangers/friends/relatives allowed to live in rooms.
                16. Authorized visitors not allowed to stay beyond 7.30 PM.
                17. Lights and fans must be switched off; fines imposed for violations.
                18. Rough behaviour with Mess employees prohibited.
                19. Smoking strictly prohibited inside/outside hostel.
                20. Narcotics strictly prohibited; results in police action &amp; expulsion.
                21. Alcohol strictly prohibited; violators expelled immediately.
                22. Violating rules leads to immediate expulsion and summons before Disciplinary Committee.
                23. Warden may enter any room for verification at any time of day or night.
              </p>

              <div className="border border-slate-400 p-4 bg-slate-50 mt-4">
                <div className="font-bold uppercase mb-2">UNDERTAKING</div>
                <p>I hereby undertake to abide by the above Rules &amp; Regulations of the College.</p>
                <div className="mt-8 flex justify-between text-xs pt-4 border-t border-slate-300">
                  <div>
                    <div className="font-bold">{data.annexure1_parent_name || data.father_name || ''}</div>
                    <span>Signature of Parent / Guardian</span>
                  </div>
                  <div>
                    <div className="font-bold">{data.annexure1_student_name || data.candidate_name || ''}</div>
                    <span>Signature of the Student</span>
                  </div>
                  <div>
                    <span className="border-t border-slate-400 pt-1 block">Chief Warden / In-charge</span>
                  </div>
                  <div>
                    <span className="border-t border-slate-400 pt-1 block">Dean</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Pages 5–7 of 14</span>
          </div>
        </div>

        {/* ==================== PAGE 8: COURSE COMPLETION UNDERTAKING ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-6 bg-slate-800 text-white py-2 px-4 text-center rounded">
              <span className="text-xs font-bold uppercase tracking-wider">
                UNDERTAKING TO ABIDE WITH THE RULES AND REGULATIONS OF THE COLLEGE / UNIVERSITY
              </span>
            </div>

            <div className="mt-8 text-xs leading-relaxed text-justify space-y-4">
              <p>
                I, <strong className="uppercase">{data.course_candidate_name || data.candidate_name || '__________________________'}</strong>, Son / Daughter of{' '}
                <strong className="uppercase">{data.course_parent_name || data.father_name || data.mother_name || '__________________________'}</strong>, aged about{' '}
                <strong>{data.age_as_on_cutoff || '____'}</strong> years, residing at{' '}
                <strong>{data.address_street || ''}, {data.address_district || ''}, {data.address_state || ''}</strong>, joined in I MBBS degree course on{' '}
                <strong>{data.date_of_admission || '____ / ____ / 2026'}</strong> at Rajalakshmi Medical College Hospital and Research Institute, Pennalur, Sriperumbudur, do hereby solemnly affirm and sincerely exercise my consent to undertake to strictly obey and abide, at all times, by the following:
              </p>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-900">
                1. To study the full duration of the course: To pursue my full duration of the MBBS degree course without absence, as per the norms of the National Medical Commission, New Delhi and The Tamil Nadu Dr. M.G.R. Medical University, Chennai - 600 032.
              </div>

              <p>
                By furnishing this Undertaking I am fully aware of the above norms, and in case I fail to fulfil the above norms, I know that I have no rights whatsoever to claim to appear for the University Examinations.
              </p>

              <div className="mt-8 flex justify-between items-end pt-4">
                <div>
                  <div className="font-mono">{data.course_undertaking_date || data.date_of_admission || 'Date'}</div>
                  <span>Date</span>
                </div>
                <div className="text-right">
                  <div className="font-bold uppercase">{data.course_candidate_name || data.candidate_name || ''}</div>
                  <span>Signature of the Candidate</span>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t-2 border-slate-400">
                <div className="font-bold uppercase tracking-wider mb-2">COUNTER SIGNED BY THE PARENT / GUARDIAN</div>
                <p>
                  I, <strong className="uppercase">{data.course_parent_name || data.father_name || data.mother_name || '__________________________'}</strong>, Father / Mother / Guardian of the above mentioned student, have read the above said norms of the College / University and I fully take up the responsibility to ensure that my son / daughter shall abide by the said norms at all times during this duration of study without fail.
                </p>

                <div className="mt-8 flex justify-between items-end pt-4">
                  <div>
                    <div className="font-mono">{data.course_undertaking_date || data.date_of_admission || 'Date'}</div>
                    <span>Date</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold uppercase">{data.course_parent_name || data.father_name || ''}</div>
                    <span>Signature of the Parent / Guardian</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Page 8 of 14</span>
          </div>
        </div>

        {/* ==================== PAGES 9–10: ANNEXURE II DRESS CODE ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-6 bg-slate-800 text-white py-2 px-4 text-center rounded">
              <span className="text-xs font-bold uppercase tracking-wider">
                ANNEXURE – II: UNDERTAKING — MEDICAL STUDENTS’ DRESS CODE
              </span>
            </div>

            <div className="mt-6 text-xs leading-relaxed space-y-4 text-justify">
              <p>
                I, <strong className="uppercase">{data.dress_code_candidate_name || data.candidate_name || '__________________________'}</strong>, Son / Daughter of{' '}
                <strong className="uppercase">{data.dress_code_parent_name || data.father_name || data.mother_name || '__________________________'}</strong>, aged about{' '}
                <strong>{data.age_as_on_cutoff || '____'}</strong> years, residing at{' '}
                <strong>{data.address_street || ''}, {data.address_district || ''}</strong>, joined in I MBBS degree course on{' '}
                <strong>{data.date_of_admission || '____ / ____ / 2026'}</strong> at Rajalakshmi Medical College Hospital and Research Institute, Pennalur, Sriperumbudur, do hereby solemnly affirm and sincerely exercise my consent to undertake to strictly obey and abide by the following “Medical student dress code of the college” during my entire duration of the course while attending Theory / Practical / Clinical / Oral classes / Ward postings etc.
              </p>

              <div className="border border-slate-300 p-4 space-y-2 bg-slate-50">
                <div className="font-bold uppercase text-slate-900">FOR MEN:</div>
                <p>To wear neat and clean formal pants and shirts only, with a white apron of knee length size thereon. Leather shoes with socks, neatly polished. Beards must be neatly shaved / moustaches must be neatly trimmed.</p>

                <div className="font-bold uppercase text-slate-900 pt-2">FOR WOMEN:</div>
                <p>To wear a neat and cleanly washed saree and full sleeved blouse, chudidhar or salwar with dupatta, with a white apron of knee length size. Leather ladies shoes with socks neatly polished, or normal good chappals.</p>

                <div className="font-bold uppercase text-slate-900 pt-2">FOR BOTH:</div>
                <p>1. To wear the ID card issued by the College. 2. To wear his / her name badge on the left side of the apron identifying as a medical student. 3. Hair should be combed neat and clean. 4. To wish the teacher and the management in the campus whenever they come across, as a mark of respect.</p>
              </div>

              <div className="border border-red-300 p-4 space-y-2 bg-red-50 text-red-950">
                <div className="font-bold uppercase text-red-900">THE FOLLOWING ARE NOT PERMISSIBLE:</div>
                <p>1. Jeans, denim pants, T-shirts, sleeveless tops, bermudas, stretch / tight leggings or athletic sports clothing, transparent tops and shorts are not permissible.</p>
                <p>2. Sport shoes, high-heeled or canvas shoes, open totes, shoes and sandals.</p>
                <p>3. <strong>All electronic devices including cellphones</strong> — if found, they will be seized and will not be returned.</p>
              </div>

              <p className="italic">
                "I am fully aware that in case I fail to follow the above said Medical Student Dress Code, I know that I will not be allowed to attend the classes and I will be sent out of the class for the entire session, and for this act of disobedience I will be considered as absent for the class / ward posting."
              </p>

              <div className="mt-6 flex justify-between items-end pt-4">
                <div>
                  <div className="font-mono">{data.dress_code_date || data.date_of_admission || 'Date'}</div>
                  <span>Date</span>
                </div>
                <div className="text-right">
                  <div className="font-bold uppercase">{data.dress_code_candidate_name || data.candidate_name || ''}</div>
                  <span>Signature of the Candidate</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-end">
                <div>
                  <div className="font-mono">{data.dress_code_date || data.date_of_admission || 'Date'}</div>
                  <span>Date</span>
                </div>
                <div className="text-right">
                  <div className="font-bold uppercase">{data.dress_code_parent_name || data.father_name || ''}</div>
                  <span>Signature of the Parent / Guardian</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Pages 9–10 of 14</span>
          </div>
        </div>

        {/* ==================== PAGE 11: ANNEXURE III ANTI-RAGGING COMMITTEE ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-6 bg-slate-900 text-white py-2 px-4 text-center rounded">
              <span className="text-xs font-bold uppercase tracking-wider">
                ANNEXURE – III: ANTI-RAGGING COMMITTEE
              </span>
            </div>

            <table className="w-full text-[11px] border border-slate-400 mt-6">
              <thead className="bg-slate-800 text-white font-bold text-center">
                <tr>
                  <th className="p-2 border-r border-slate-600 text-left">DESIGNATION</th>
                  <th className="p-2 border-r border-slate-600 text-left">NAME AND AFFILIATION</th>
                  <th className="p-2 border-r border-slate-600 text-left">MAIL ID</th>
                  <th className="p-2">CONTACT NUMBER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {[
                  ['Chairperson', 'Dr. K. Vanitha (Dean)', 'deanrmc@rmchri.edu.in', '9443003355'],
                  ['Member Secretary', 'Dr. Premkumar L. (Prof. and HOD of Microbiology)', 'hod.microbiology@rmchri.edu.in', '7904864657'],
                  ['Member', 'Dr. Anuradha (Prof. and HOD of General Medicine)', 'hod.generalmedicine@rmchri.edu.in', '9841424677'],
                  ['Member', 'Dr. Sangeetha Nagpal (Professor of Physiology)', 'hod.physiology@rmchri.edu.in', '7657852503'],
                  ['Member', 'Dr. Sarah Grace Priyadharshini (Assoc. Prof. Pathology)', 'sarahgrace.priyadarshini@rmchri.edu.in', '9790722496'],
                  ['Member', 'Dr. Santhanu Mallik (Assoc. Prof. Anatomy)', 'shantanu.pm@annaiimedicalcollege.edu.in', '9320877099'],
                  ['Member', 'Dr. Monica (Prof. Pathology & Chief Warden Girls Hostel)', 'drmonicavincent@gmail.com', '9629481992'],
                  ['Member', 'Dr. Naveen Kumar (Asst. Prof. General Surgery)', 'naveenkumar.m@annaiimedicalcollege.edu.in', '7200364127'],
                  ['Member', 'Dr. Shenbaga Lalitha (Assoc. Prof. Biochemistry)', 'dr.lalitha@gmail.com', '9994869160'],
                  ['Member', 'Dr. Mohanapriyya (Asst. Prof. Pathology)', 'mohanapriya.d@annaiimedicalcollege.edu.in', '7708401966'],
                  ['Member', 'Dr. Praveen (Assoc. Prof. Pathology & Chief Warden Boys Hostel)', 'Praveen.easwar@gmail.com', '9047627937'],
                  ['Member', 'Dr. Gowtham Padmanaban (Asst. Prof. Pharmacology)', 'vedaamirtha@gmail.com', '8296273481'],
                  ['Member', 'Dr. Devi Priya (Asst. Prof. ENT)', 'priyahamii@gmail.com', '8754867607'],
                  ['Non-Teaching Rep.', 'Mr. Rajesh (HR Head)', 'hr.head@rmchri.edu.in', '7904894189']
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-2 border-r border-slate-300 font-bold">{row[0]}</td>
                    <td className="p-2 border-r border-slate-300">{row[1]}</td>
                    <td className="p-2 border-r border-slate-300 font-mono">{row[2]}</td>
                    <td className="p-2 text-center font-mono font-bold">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Page 11 of 14</span>
          </div>
        </div>

        {/* ==================== PAGES 12–13: STUDENT RULES & LEAVE ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-4 bg-slate-800 text-white py-1.5 px-3 text-center text-xs font-bold uppercase">
              RULES AND REGULATIONS FOR STUDENTS (HOSTEL, LIBRARY &amp; LEAVE)
            </div>

            <div className="mt-4 text-xs leading-relaxed space-y-3 text-justify">
              <p><strong>1.</strong> Enter hostel by 4.00 pm after attending classes in college.</p>
              <p><strong>2.</strong> Sign Movement Register maintained by Warden for every exit and entry.</p>
              <p><strong>3.</strong> Students not allowed to meet parents in classrooms.</p>
              <p><strong>4.</strong> Meeting parents in hostel: weekdays 6.00 pm to 8.00 pm; Sundays/holidays 8.00 am to 8.00 pm.</p>
              <p><strong>5.</strong> Home visits: accompanied by parents only or nominated guardian with photo, mobile, email, and Aadhaar copy.</p>
              <p><strong>6.</strong> Visiting parents must sign Warden’s register.</p>
              <p><strong>7.</strong> Home visits permitted during 2nd Saturday &amp; Sunday with Dean/Vice-Principal/Warden permission.</p>
              <p><strong>8.</strong> No college transport provided for early departures.</p>
              <p><strong>9.</strong> Mandatory Library visit for hostel students: 5.00 pm to 7.00 pm for E-Consortium.</p>

              <div className="font-bold uppercase tracking-wider text-slate-900 border-b pb-1 pt-2">
                LEAVE AND PERMISSION RULES (PAGE 13)
              </div>
              <p>• All leave letters addressed to Dean, recommended by Warden, Deputy Warden and HODs of the Phase.</p>
              <p>• If travelling without parent, parent must converse via <strong>WhatsApp video call</strong> with Warden (recorded).</p>
              <p>• Daily attendance communicated via WhatsApp group messages to parents.</p>

              <div className="border border-slate-400 p-4 bg-slate-50 mt-4">
                <div className="font-bold uppercase mb-2">DECLARATION (PAGE 13)</div>
                <p>
                  I, <strong className="uppercase">{data.rules_student_name || data.candidate_name || '__________________________'}</strong>, Son / Daughter of <strong className="uppercase">{data.rules_parent_name || data.father_name || '__________________________'}</strong>, aged <strong>{data.age_as_on_cutoff || '____'}</strong>, residing at <strong>{data.address_street || ''}, {data.address_district || ''}</strong>, joined in the MBBS program, hereby undertake to abide by the above Rules and Regulations of the College.
                </p>
                <div className="mt-6 flex justify-between text-xs pt-4 border-t border-slate-300">
                  <div>
                    <div className="font-bold uppercase">{data.rules_parent_name || data.father_name || ''}</div>
                    <span>Signature of Parent / Guardian</span>
                  </div>
                  <div>
                    <div className="font-bold uppercase">{data.rules_student_name || data.candidate_name || ''}</div>
                    <span>Signature of the Student</span>
                  </div>
                  <div>
                    <div className="font-mono">{data.rules_declaration_date || data.date_of_admission || ''}</div>
                    <span>Date</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Pages 12–13 of 14</span>
          </div>
        </div>

        {/* ==================== PAGE 14: FINAL DECLARATIONS & OFFICE USE ==================== */}
        <div className="bg-white p-10 sm:p-14 shadow-lg border border-slate-300 min-h-[1050px] flex flex-col justify-between page-break">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-700 font-bold border-b pb-2 tracking-wider">
              <span>RAJALAKSHMI MEDICAL COLLEGE HOSPITAL &amp; RESEARCH INSTITUTE</span>
              <span>MBBS Admission 2026–27</span>
            </div>

            <div className="mt-4 bg-slate-900 text-white py-2 px-4 text-center rounded">
              <span className="text-xs font-bold uppercase tracking-wider">
                DECLARATION BY THE CANDIDATE
              </span>
            </div>

            <div className="mt-4 text-xs leading-relaxed space-y-2 text-justify">
              <p><strong>1.</strong> I hereby undertake that I will remit my subsequent year’s Annual Tuition Fee on or before 1<sup>st</sup> June of every year as per the rates applicable to my category of admission as prescribed by the Government of Tamil Nadu from time to time.</p>
              <p><strong>2.</strong> I declare that all the information provided by me is true and correct in all respects, and in case any information is found to be false or incorrect in this application form or in the documents / certificates attached thereto, the college authorities, at any time before completion of my MBBS degree course and duly following the procedures prescribed, can order the cancellation of my admission to the MBBS program.</p>
              <p><strong>3.</strong> The University has every right to cancel the admission without any notice if the certificates produced are found to be fake / false / forged.</p>
              <p><strong>4.</strong> I am fully aware about maintaining strict discipline and I will not resort to any strike during the period of my study / training. I also know that I am not permitted to criticize the policies of the College / University either before the print or electronic media, and grievances, if any, shall be submitted through proper channel to the Dean. I will not approach the legal authorities / NMC / Government without prior permission of the College and University. Further, I am fully aware that in case of violation of these conduct rules my admission is liable for cancellation apart from invoking the terms and conditions of the bonds submitted to the College and University.</p>
              <p><strong>5.</strong> I shall abide by the regulations of the NMC / The Tamil Nadu Dr. M.G.R. Medical University with regard to academics, attendance, examination and anti-ragging regulations etc.</p>
              <p><strong>6.</strong> In case all the submitted original documents / certificates / information are found to be false at any stage of my admission for study, or any relevant information is concealed in my admission, I am fully aware that I am liable to be disqualified and my admission will be cancelled. Further, for this act the authorities concerned shall initiate any disciplinary action as per rules.</p>
            </div>

            <div className="mt-6 flex justify-between items-end text-xs">
              <div>
                <div>Place: <strong>{data.candidate_decl_place || 'Sriperumbudur'}</strong></div>
                <div>Date: <strong>{data.candidate_decl_date || data.date_of_admission || ''}</strong></div>
              </div>
              <div className="text-right">
                {data.candidate_decl_signature_url ? (
                  <div className="h-12 flex justify-end mb-1">
                    <img src={data.candidate_decl_signature_url} alt="Candidate Signature" className="max-h-full object-contain" />
                  </div>
                ) : null}
                <div className="font-bold uppercase text-blue-950 border-t border-slate-400 pt-1 min-w-[200px]">{data.candidate_decl_name || data.candidate_name || ''}</div>
                <span>Signature of the Candidate (Name in Block Letters)</span>
              </div>
            </div>

            <div className="mt-6 bg-slate-800 text-white py-1.5 px-3 text-center text-xs font-bold uppercase">
              DECLARATION BY THE PARENT / GUARDIAN
            </div>

            <p className="mt-3 text-xs leading-relaxed text-justify">
              I am fully abiding with the above declaration and I hereby undertake that I shall abide by the rules and regulations of the University / Management / Institution regarding the discipline of my <strong>{data.parent_decl_relation || 'Son / Daughter'}</strong>, and the regulations and academic curriculum of the MBBS course as defined by the University and NMC, and payment of fees due to the College / University / Management.
            </p>

            <div className="mt-6 flex justify-between items-end text-xs">
              <div>
                <div>Place: <strong>{data.parent_decl_place || 'Sriperumbudur'}</strong></div>
                <div>Date: <strong>{data.parent_decl_date || data.date_of_admission || ''}</strong></div>
              </div>
              <div className="text-right">
                {data.parent_decl_signature_url ? (
                  <div className="h-12 flex justify-end mb-1">
                    <img src={data.parent_decl_signature_url} alt="Parent Signature" className="max-h-full object-contain" />
                  </div>
                ) : null}
                <div className="font-bold uppercase text-blue-950 border-t border-slate-400 pt-1 min-w-[200px]">{data.parent_decl_name || data.father_name || ''}</div>
                <span>Signature of the Parent / Guardian (Name in Block Letters)</span>
              </div>
            </div>

            {/* FOR OFFICE USE */}
            <div className="mt-8 border-2 border-slate-900 p-4 bg-slate-50 text-xs">
              <div className="font-bold uppercase tracking-wider text-center border-b border-slate-400 pb-1 mb-4">
                FOR OFFICE USE
              </div>

              <div className="flex justify-between items-end pt-8">
                <div>
                  <div className="border-t border-slate-800 pt-1">
                    <span className="font-bold block">Verified by</span>
                    <span>Administrative Officer (College)</span>
                    {data.office_verified_by && (
                      <span className="block font-mono text-[11px] text-emerald-800 font-bold">
                        ✓ {data.office_verified_by}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="border-t border-slate-800 pt-1">
                    <span className="font-bold block">Dean</span>
                    <span>Rajalakshmi Medical College</span>
                    {data.dean_approval_status === 'Approved' && (
                      <span className="block font-mono text-[11px] text-emerald-800 font-bold">
                        ✓ APPROVED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600">
            <span>Rajalakshmi Institutions</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
            <span>Page 14 of 14</span>
          </div>
        </div>

      </div>
    </div>
  );
}
