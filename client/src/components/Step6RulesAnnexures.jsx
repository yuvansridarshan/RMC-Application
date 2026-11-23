import React, { useState } from 'react';
import { ShieldCheck, BookOpen, UserCheck, AlertTriangle, CheckSquare, Eye, Phone, Mail, Award, Clock } from 'lucide-react';

export default function Step6RulesAnnexures({ formData, updateField, errors }) {
  const [activeSubTab, setActiveSubTab] = useState('annexure1');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-slate-50 border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-900" />
          Pages 5–13 — Annexures I, II, III &amp; Student Conduct Undertakings
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Review all statutory institution guidelines, hostel accommodation terms, dress code policies, and leave rules. Both candidate and parent must affirm compliance.
        </p>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {[
          { id: 'annexure1', label: 'Annexure I: Hostel & Conduct Rules (Pages 5–7)' },
          { id: 'course', label: 'Course Completion Undertaking (Page 8)' },
          { id: 'annexure2', label: 'Annexure II: Dress Code (Pages 9–10)' },
          { id: 'annexure3', label: 'Annexure III: Anti-Ragging Committee (Page 11)' },
          { id: 'rules', label: 'Hostel, Library & Leave Rules (Pages 12–13)' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === tab.id
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUBTAB 1: Annexure I */}
      {activeSubTab === 'annexure1' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b pb-3">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block">ANNEXURE – I</span>
            <h3 className="text-base font-bold text-slate-900 uppercase">
              RULES AND REGULATIONS FOR HOSTEL STUDENTS AND DAY SCHOLARS
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              The College attaches equal importance to conduct, discipline, decorum, decency and studies. Both parents and students are expected to extend their fullest co-operation by adhering to the code of conduct formulated by the college from time to time.
            </p>
          </div>

          {/* Code of Conduct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-blue-950">
              CODE OF CONDUCT &amp; CRIMINAL OFFENCES REPORTED TO POLICE
            </h4>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2">
              <p>
                Each student shall conduct himself / herself both within and outside the campus of Rajalakshmi Medical College Hospital and Research Institute in a manner befitting a student of this institution.
              </p>
              <p>
                Each student shall show due respect and courtesy to the faculty, Administration, Non-Teaching Staff, Patients, Visitors and Residents of the Institute, and shall also keep good behaviour with fellow students in a congenial atmosphere.
              </p>
              <div className="pt-2">
                <span className="font-bold text-red-900">The following criminal offences will be forthwith reported to the police and offenders will be handed over to the respective authority:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2 font-medium text-slate-800">
                  <div>a. Consumption of drugs</div>
                  <div>b. Theft / stealing</div>
                  <div>c. Vandalism / destruction of public property</div>
                  <div>d. Littering</div>
                  <div>e. Gambling</div>
                  <div>f. Unlawful assembling or gathering</div>
                  <div>g. Fighting</div>
                  <div>h. Any other form of criminal act or behaviour</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ragging Warning */}
          <div className="bg-red-50 border-l-4 border-red-700 p-4 rounded-r-lg text-xs text-red-950 space-y-2">
            <h4 className="font-black uppercase tracking-wider text-red-900">RAGGING STRICTLY BANNED</h4>
            <p>
              Ragging in any form is banned inside and outside the campus of Rajalakshmi Medical College Hospital and Research Institute. Stringent action will be taken against the defaulters. No leniency will be shown to the offenders. Suspension or withdrawal from the Hostel / College is one of the actions to be taken promptly. Punishment for ragging shall be up to one-year imprisonment. The Supreme Court has also defined ragging as a criminal offence.
            </p>
          </div>

          {/* 23 Points Hostel Rules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-blue-950">
              FOR HOSTEL STUDENTS — ALLOTMENT OF ACCOMMODATION (23 MANDATORY RULES)
            </h4>
            <div className="h-64 overflow-y-auto p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-2.5 font-normal">
              <p><strong>1.</strong> Hostel accommodation is allotted purely on a “First Come First Served” basis and at the discretion of the Warden and on approval of the Dean. The Dean may refuse or remove a resident at short notice without assigning any reason.</p>
              <p><strong>2.</strong> No booking / reservation will be entertained over phone / e-mail.</p>
              <p><strong>3.</strong> Students at the time of admission to the hostel must show receipts of Hostel Fee and Room Rent paid to the Warden.</p>
              <p><strong>4.</strong> Students must occupy rooms specifically allotted to them. Changing rooms without written permission of Warden/Dean is prohibited.</p>
              <p><strong>5.</strong> Allotment is subject to cancellation if student fails to occupy room in prescribed time or clear dues.</p>
              <p><strong>6.</strong> The Warden reserves the right to break open rooms in case of rule violation, suspected unlawful activities, or security risk.</p>
              <p><strong>7.</strong> Once a student vacates the hostel, he/she will not be re-allotted hostel accommodation for a minimum period of 6 months.</p>
              <p><strong>8.</strong> Room allotments are for a limited period up to one year or less. Residents are required to shift blocks/rooms as required.</p>
              <p><strong>9.</strong> Room allotment cancelled if resident is found absent without prior written permission.</p>
              <p><strong>10.</strong> Vacating requires Chief Warden's formalities, parental permission, and returning duplicate keys.</p>
              <p><strong>11.</strong> Residents are forbidden to keep heavy cash / valuables in rooms and must use their own locks.</p>
              <p><strong>12.</strong> Birthday parties or any other celebrations inside or outside the hostel premises that disturb others are prohibited.</p>
              <p><strong>13.</strong> TV sets, music systems, electrical appliances like iron boxes, cookers, or water heaters are strictly disallowed.</p>
              <p><strong>14.</strong> During the day students must attend postings / classes / wards; presence in rooms during college hours invites disciplinary action.</p>
              <p><strong>15.</strong> No strangers, friends, or relatives are permitted to live in rooms; violators face immediate expulsion.</p>
              <p><strong>16.</strong> Authorized visitors permitted only up to 7:30 PM.</p>
              <p><strong>17.</strong> Lights and fans must be switched off before leaving; fine imposed for violations.</p>
              <p><strong>18.</strong> Rough behaviour with Mess/Canteen staff is strictly prohibited; complaints go to Mess Manager/Warden only.</p>
              <p><strong>19.</strong> Smoking and keeping cigarette packs in rooms or campus is strictly prohibited.</p>
              <p><strong>20.</strong> Possessing or consuming narcotic drugs invites instant police handover and expulsion.</p>
              <p><strong>21.</strong> Alcohol consumption or keeping alcohol bottles is strictly prohibited; drunk reporting leads to instant expulsion.</p>
              <p><strong>22.</strong> Any violation leads to IMMEDIATE EXPULSION FROM HOSTEL and summons before Disciplinary Committee with parents.</p>
              <p><strong>23.</strong> Warden or representatives may enter and inspect any room at any time of day or night.</p>
            </div>
          </div>

          {/* Affirmation Undertaking */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.annexure1_undertaking_agreed)}
                onChange={(e) => updateField('annexure1_undertaking_agreed', e.target.checked ? 1 : 0)}
                className="mt-1 h-4 w-4 text-blue-900 rounded border-slate-300 focus:ring-blue-600"
              />
              <span className="text-xs font-bold text-blue-950">
                I hereby undertake to abide by the above Rules &amp; Regulations of the College (Annexure – I). <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Candidate's Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.annexure1_student_name || formData.candidate_name || ''}
                  onChange={(e) => updateField('annexure1_student_name', e.target.value)}
                  placeholder="Candidate Name"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Parent / Guardian Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.annexure1_parent_name || formData.father_name || formData.mother_name || ''}
                  onChange={(e) => updateField('annexure1_parent_name', e.target.value)}
                  placeholder="Parent Name"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Course Completion Undertaking */}
      {activeSubTab === 'course' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b pb-3">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block">PAGE 8</span>
            <h3 className="text-base font-bold text-slate-900 uppercase">
              UNDERTAKING TO ABIDE WITH THE RULES AND REGULATIONS OF THE COLLEGE / UNIVERSITY
            </h3>
            <p className="text-xs text-slate-500 mt-1">Undertaking for full course duration adherence</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-xs text-slate-800 leading-relaxed space-y-3">
            <p>
              I, <strong className="text-blue-950 uppercase">{formData.candidate_name || '[Candidate Name]'}</strong>,{' '}
              Son / Daughter of <strong className="text-blue-950 uppercase">{formData.father_name || formData.mother_name || '[Parent Name]'}</strong>,{' '}
              aged about <strong className="text-blue-950">{formData.age_as_on_cutoff || '[Age]'}</strong> years, residing at{' '}
              <strong className="text-blue-950">{formData.address_street || ''}, {formData.address_district || ''}, {formData.address_state || ''}</strong>,{' '}
              joined in I MBBS degree course on <strong className="text-blue-950">{formData.date_of_admission || '___ / ___ / 2026'}</strong> at{' '}
              <strong>Rajalakshmi Medical College Hospital and Research Institute, Pennalur, Sriperumbudur</strong>, do hereby solemnly affirm and sincerely exercise my consent to undertake to strictly obey and abide, at all times, by the following:
            </p>

            <div className="p-3 bg-white rounded border border-slate-200 font-semibold text-slate-900">
              1. To study the full duration of the course: To pursue my full duration of the MBBS degree course without absence, as per the norms of the National Medical Commission, New Delhi and The Tamil Nadu Dr. M.G.R. Medical University, Chennai - 600 032.
            </div>

            <p className="text-slate-600 italic">
              "By furnishing this Undertaking I am fully aware of the above norms, and in case I fail to fulfil the above norms, I know that I have no rights whatsoever to claim to appear for the University Examinations."
            </p>
          </div>

          {/* Parent Counter Signature Text */}
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl text-xs text-amber-950 space-y-2">
            <span className="font-bold uppercase tracking-wider block text-amber-900">
              COUNTER SIGNED BY THE PARENT / GUARDIAN
            </span>
            <p>
              "I, <strong className="uppercase">{formData.father_name || formData.mother_name || '[Parent Name]'}</strong>, Father / Mother / Guardian of the above mentioned student, have read the above said norms of the College / University and I fully take up the responsibility to ensure that my son / daughter shall abide by the said norms at all times during this duration of study without fail."
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.course_undertaking_agreed)}
                onChange={(e) => updateField('course_undertaking_agreed', e.target.checked ? 1 : 0)}
                className="mt-1 h-4 w-4 text-blue-900 rounded border-slate-300 focus:ring-blue-600"
              />
              <span className="text-xs font-bold text-blue-950">
                We (Candidate and Parent / Guardian) solemnly affirm and accept the Course Completion Undertaking. <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Candidate Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.course_candidate_name || formData.candidate_name || ''}
                  onChange={(e) => updateField('course_candidate_name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Parent / Guardian Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.course_parent_name || formData.father_name || formData.mother_name || ''}
                  onChange={(e) => updateField('course_parent_name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Date of Undertaking <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.course_undertaking_date || formData.date_of_admission || ''}
                  onChange={(e) => updateField('course_undertaking_date', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Annexure II Dress Code */}
      {activeSubTab === 'annexure2' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b pb-3">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block">ANNEXURE – II</span>
            <h3 className="text-base font-bold text-slate-900 uppercase">
              UNDERTAKING — MEDICAL STUDENTS’ DRESS CODE
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Applicable during entire duration of MBBS while attending Theory, Practical, Clinical, Oral classes, and Ward postings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold uppercase text-blue-900 tracking-wider">FOR MEN</h4>
              <p className="text-slate-700 leading-relaxed">
                To wear neat and clean formal pants and shirts only, with a white apron of knee length size thereon. Leather shoes with socks, neatly polished. Beards must be neatly shaved / moustaches must be neatly trimmed.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold uppercase text-purple-900 tracking-wider">FOR WOMEN</h4>
              <p className="text-slate-700 leading-relaxed">
                To wear a neat and cleanly washed saree and full sleeved blouse, chudidhar or salwar with dupatta, with a white apron of knee length size. Leather ladies shoes with socks neatly polished, or normal good chappals.
              </p>
            </div>
          </div>

          <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 text-xs space-y-2 text-blue-950">
            <h4 className="font-bold uppercase tracking-wider text-blue-900">FOR BOTH MEN &amp; WOMEN</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-medium">
              <div>1. To wear the ID card issued by the College.</div>
              <div>2. To wear name badge on left side of apron identifying as a medical student.</div>
              <div>3. Hair should be combed neat and clean.</div>
              <div>4. To wish the teacher and management whenever they come across, as a mark of respect.</div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-xs space-y-2 text-red-950">
            <h4 className="font-bold uppercase tracking-wider text-red-900">THE FOLLOWING ARE NOT PERMISSIBLE</h4>
            <ol className="list-decimal list-inside space-y-1 font-medium">
              <li>Jeans, denim pants, T-shirts, sleeveless tops, bermudas, stretch / tight leggings or athletic sports clothing, transparent tops and shorts are not permissible.</li>
              <li>Sport shoes, high-heeled or canvas shoes, open totes, shoes and sandals.</li>
              <li><strong className="text-red-900">All electronic devices including cellphones</strong> — if found, they will be seized and will not be returned.</li>
            </ol>
            <p className="pt-2 text-red-800 italic">
              "Penalty: I am fully aware that in case I fail to follow the above said Medical Student Dress Code, I will not be allowed to attend classes and will be sent out for the entire session, and considered absent."
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.dress_code_agreed)}
                onChange={(e) => updateField('dress_code_agreed', e.target.checked ? 1 : 0)}
                className="mt-1 h-4 w-4 text-blue-900 rounded border-slate-300 focus:ring-blue-600"
              />
              <span className="text-xs font-bold text-blue-950">
                Candidate and Parent solemnly agree to adhere to the Medical Students' Dress Code Undertaking. <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Candidate Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.dress_code_candidate_name || formData.candidate_name || ''}
                  onChange={(e) => updateField('dress_code_candidate_name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Parent / Guardian Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.dress_code_parent_name || formData.father_name || formData.mother_name || ''}
                  onChange={(e) => updateField('dress_code_parent_name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dress_code_date || formData.date_of_admission || ''}
                  onChange={(e) => updateField('dress_code_date', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Annexure III Anti-Ragging Committee */}
      {activeSubTab === 'annexure3' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b pb-3 flex justify-between items-center">
            <div>
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block">ANNEXURE – III</span>
              <h3 className="text-base font-bold text-slate-900 uppercase">
                INSTITUTION ANTI-RAGGING COMMITTEE (14 MEMBERS)
              </h3>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
              24/7 Helpline Available
            </span>
          </div>

          <div className="overflow-x-auto border rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-3 py-3">Designation</th>
                  <th className="px-3 py-3">Name &amp; Affiliation</th>
                  <th className="px-3 py-3">Mail ID</th>
                  <th className="px-3 py-3 text-center">Contact Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { role: 'Chairperson', name: 'Dr. K. Vanitha', aff: 'Dean', email: 'deanrmc@rmchri.edu.in', phone: '9443003355' },
                  { role: 'Member Secretary', name: 'Dr. Premkumar L.', aff: 'Prof. and HOD of Microbiology', email: 'hod.microbiology@rmchri.edu.in', phone: '7904864657' },
                  { role: 'Member', name: 'Dr. Anuradha', aff: 'Prof. and HOD of General Medicine', email: 'hod.generalmedicine@rmchri.edu.in', phone: '9841424677' },
                  { role: 'Member', name: 'Dr. Sangeetha Nagpal', aff: 'Professor of Physiology', email: 'hod.physiology@rmchri.edu.in', phone: '7657852503' },
                  { role: 'Member', name: 'Dr. Sarah Grace Priyadharshini', aff: 'Associate Professor of Pathology', email: 'sarahgrace.priyadarshini@rmchri.edu.in', phone: '9790722496' },
                  { role: 'Member', name: 'Dr. Santhanu Mallik', aff: 'Associate Professor of Anatomy', email: 'shantanu.pm@annaiimedicalcollege.edu.in', phone: '9320877099' },
                  { role: 'Member', name: 'Dr. Monica', aff: 'Professor of Pathology & Chief Warden (Girls Hostel)', email: 'drmonicavincent@gmail.com', phone: '9629481992' },
                  { role: 'Member', name: 'Dr. Naveen Kumar', aff: 'Assistant Professor of General Surgery', email: 'naveenkumar.m@annaiimedicalcollege.edu.in', phone: '7200364127' },
                  { role: 'Member', name: 'Dr. Shenbaga Lalitha', aff: 'Assoc. Prof. of Biochemistry', email: 'dr.lalitha@gmail.com', phone: '9994869160' },
                  { role: 'Member', name: 'Dr. Mohanapriyya', aff: 'Assistant Professor of Pathology', email: 'mohanapriya.d@annaiimedicalcollege.edu.in', phone: '7708401966' },
                  { role: 'Member', name: 'Dr. Praveen', aff: 'Assoc. Prof. of Pathology & Chief Warden (Male Hostel)', email: 'Praveen.easwar@gmail.com', phone: '9047627937' },
                  { role: 'Member', name: 'Dr. Gowtham Padmanaban', aff: 'Asst. Prof. of Pharmacology', email: 'vedaamirtha@gmail.com', phone: '8296273481' },
                  { role: 'Member', name: 'Dr. Devi Priya', aff: 'Asst. Prof. of ENT', email: 'priyahamii@gmail.com', phone: '8754867607' },
                  { role: 'Representative of Non-Teaching Staff', name: 'Mr. Rajesh', aff: 'HR Head', email: 'hr.head@rmchri.edu.in', phone: '7904894189' }
                ].map((m, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-bold text-slate-800">{m.role}</td>
                    <td className="px-3 py-2">
                      <div className="font-bold text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-500">{m.aff}</div>
                    </td>
                    <td className="px-3 py-2">
                      <a href={`mailto:${m.email}`} className="text-blue-700 hover:underline flex items-center space-x-1">
                        <Mail className="w-3 h-3 mr-1" />
                        <span>{m.email}</span>
                      </a>
                    </td>
                    <td className="px-3 py-2 text-center font-mono font-bold text-slate-800">
                      <a href={`tel:${m.phone}`} className="hover:text-blue-700 inline-flex items-center space-x-1">
                        <Phone className="w-3 h-3 mr-1 text-slate-400" />
                        <span>{m.phone}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 5: Hostel, Library & Leave Rules */}
      {activeSubTab === 'rules' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b pb-3">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block">PAGES 12–13</span>
            <h3 className="text-base font-bold text-slate-900 uppercase">
              RULES AND REGULATIONS FOR STUDENTS (HOSTEL, LIBRARY &amp; LEAVE PERMISSION)
            </h3>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <div className="bg-slate-50 p-4 rounded-xl border space-y-2">
              <h4 className="font-bold uppercase text-slate-900">TIMINGS &amp; MOVEMENT REGISTER (PAGE 12)</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>All students should enter hostel by <strong>4.00 pm</strong> after attending classes.</li>
                <li>Students have to sign the <strong>Movement Register</strong> maintained by Warden for every exit/entry (tea break, lunch break, library visit, outings).</li>
                <li>Parents not allowed to meet students in classrooms. Visiting hours in hostel: weekdays 6.00 pm to 8.00 pm; Sundays/holidays 8.00 am to 8.00 pm with Warden's permission.</li>
                <li>Second Saturday &amp; Sunday home visits permitted with written permissions of Warden, Deputy Warden, Vice-Principal and Dean. Pre and post holiday absence is strictly prohibited.</li>
              </ul>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 space-y-1">
              <h4 className="font-bold uppercase text-blue-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-800" />
                MANDATORY LIBRARY VISIT FOR HOSTEL STUDENTS
              </h4>
              <p className="font-semibold text-blue-950">
                It is mandatory for all hostel students to visit the Library between <strong>5.00 pm and 7.00 pm</strong> for reading and accessing books/journals through the E-Consortium.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border space-y-2">
              <h4 className="font-bold uppercase text-slate-900">LEAVE AND PERMISSION RULES (PAGE 13)</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Leave letters addressed to Dean, recommended by Warden, Deputy Warden, and HODs of the Phase.</li>
                <li>If travelling without parent, parent must converse via <strong>WhatsApp video call</strong> with Warden for recorded safety permission.</li>
                <li>Daily attendance communicated through WhatsApp group messages to parents.</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.rules_declaration_agreed)}
                onChange={(e) => updateField('rules_declaration_agreed', e.target.checked ? 1 : 0)}
                className="mt-1 h-4 w-4 text-blue-900 rounded border-slate-300 focus:ring-blue-600"
              />
              <span className="text-xs font-bold text-blue-950">
                "I hereby undertake to abide by the above Rules and Regulations of the College (Page 13 Declaration)." <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Candidate Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.rules_student_name || formData.candidate_name || ''}
                  onChange={(e) => updateField('rules_student_name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Parent / Guardian Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.rules_parent_name || formData.father_name || formData.mother_name || ''}
                  onChange={(e) => updateField('rules_parent_name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.rules_declaration_date || formData.date_of_admission || ''}
                  onChange={(e) => updateField('rules_declaration_date', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
