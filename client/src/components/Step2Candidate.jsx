import React, { useState, useEffect } from 'react';
import { User, Upload, Image, Phone, Mail, Award, AlertCircle, CheckCircle, FileText, Calendar } from 'lucide-react';

export default function Step2Candidate({ formData, updateField, errors, onFileUpload }) {
  const [photoUploading, setPhotoUploading] = useState(false);

  const categories = ['Gen', 'BC', 'MBC', 'SC', 'ST', 'EWS', 'PWD'];
  const genders = ['Male', 'Female', 'Transgender'];
  const studentTypes = ['Day Scholar', 'Hosteller'];
  const allotmentRounds = ['Round 1', 'Round 2', 'Mop-up round', 'Stray vacancy'];
  const allottedCategories = ['Govt.', 'Magt.', 'NRI'];

  // Auto-calculate age as on 31.12.2026 based on Date of Birth
  useEffect(() => {
    if (formData.date_of_birth) {
      const dob = new Date(formData.date_of_birth);
      if (!isNaN(dob.getTime())) {
        const cutoffDate = new Date('2026-12-31');
        let age = cutoffDate.getFullYear() - dob.getFullYear();
        const m = cutoffDate.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && cutoffDate.getDate() < dob.getDate())) {
          age--;
        }
        if (age >= 0 && formData.age_as_on_cutoff !== age) {
          updateField('age_as_on_cutoff', age);
        }
      }
    }
  }, [formData.date_of_birth]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo file size should not exceed 5MB.');
      return;
    }

    setPhotoUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      if (data.success) {
        updateField('candidate_photo_url', data.file.url);
      } else {
        alert(data.error || 'Failed to upload photo');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Network error while uploading photo.');
    } finally {
      setPhotoUploading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Banner */}
      <div className="bg-slate-50 border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <User className="w-5 h-5 text-blue-900" />
          Page 2 — Candidate’s Details &amp; NEET Qualifications
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Provide complete candidate information exactly as shown in your School Transfer Certificate (TC) and NEET UG 2026 Scorecard.
        </p>
      </div>

      {/* Photo and Full Name Row */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Photo Box */}
          <div className="md:col-span-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/60">
            <div className="w-32 h-40 bg-white border border-slate-300 rounded-lg flex flex-col items-center justify-center overflow-hidden relative shadow-inner mb-3">
              {formData.candidate_photo_url ? (
                <img
                  src={formData.candidate_photo_url}
                  alt="Candidate Passport Photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-3 text-slate-400">
                  <Image className="w-8 h-8 mx-auto mb-1 stroke-1" />
                  <span className="text-[11px] leading-tight block font-medium">Affix latest passport size photograph</span>
                </div>
              )}
              {photoUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                  Uploading...
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="cursor-pointer inline-flex items-center justify-center space-x-1.5 px-3 py-2 bg-[#0f294a] hover:bg-[#163a66] text-white text-xs font-semibold rounded-lg shadow-sm transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{formData.candidate_photo_url ? 'Replace Photo' : 'Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {formData.candidate_photo_url && (
                <button
                  type="button"
                  onClick={() => updateField('candidate_photo_url', '')}
                  className="text-[11px] text-red-600 hover:text-red-800 font-semibold text-center hover:underline transition-colors"
                >
                  Remove Photo
                </button>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1">Max 5MB (JPG/PNG/WEBP)</span>
          </div>

          {/* Name & Basic Demographics */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                NAME OF THE CANDIDATE <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.candidate_name || ''}
                onChange={(e) => updateField('candidate_name', e.target.value)}
                placeholder="Exact name as in School Transfer Certificate (TC)"
                className="w-full px-3 py-2.5 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none uppercase"
              />
              <p className="text-[11px] text-slate-500 mt-1">(as in School Transfer Certificate)</p>
              {errors?.candidate_name && (
                <p className="text-xs text-red-600 mt-1 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> {errors.candidate_name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  GENDER <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {genders.map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => updateField('gender', g)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                        formData.gender === g
                          ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Scholar / Hosteller */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  STUDENT TYPE <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {studentTypes.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => updateField('student_type', t)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                        formData.student_type === t
                          ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">(circle whichever is applicable)</p>
              </div>
            </div>

            {/* Mother Tongue & Local status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  MOTHER TONGUE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.mother_tongue || ''}
                  onChange={(e) => updateField('mother_tongue', e.target.value)}
                  placeholder="e.g. Tamil, Telugu, Malayalam, Hindi, etc."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  WHETHER LOCAL / NON-LOCAL <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Local', 'Non-Local'].map((l) => (
                    <button
                      type="button"
                      key={l}
                      onClick={() => updateField('is_local', l)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                        formData.is_local === l
                          ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEET & Counselling Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          NEET UG 2026 &amp; MERIT RANK DETAILS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              NEET ROLL NO. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.neet_roll_no || ''}
              onChange={(e) => updateField('neet_roll_no', e.target.value)}
              placeholder="e.g. 3101010101"
              className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none uppercase"
            />
            {errors?.neet_roll_no && (
              <p className="text-xs text-red-600 mt-1">{errors.neet_roll_no}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              NEET MARKS (OUT OF 720) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="720"
                value={formData.neet_marks !== undefined ? formData.neet_marks : ''}
                onChange={(e) => updateField('neet_marks', e.target.value)}
                placeholder="Marks / 720"
                className="w-full pr-12 pl-3 py-2 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <span className="absolute right-3 top-2 text-xs text-slate-400 font-bold">/ 720</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              COMMUNAL RANK
            </label>
            <input
              type="text"
              value={formData.neet_communal_rank || ''}
              onChange={(e) => updateField('neet_communal_rank', e.target.value)}
              placeholder="e.g. 154"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              STATE RANK
            </label>
            <input
              type="text"
              value={formData.neet_state_rank || ''}
              onChange={(e) => updateField('neet_state_rank', e.target.value)}
              placeholder="e.g. 1240"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              DME MERIT NO.
            </label>
            <input
              type="text"
              value={formData.dme_merit_no || ''}
              onChange={(e) => updateField('dme_merit_no', e.target.value)}
              placeholder="DME Merit Number"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              CATEGORY <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category || ''}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 mt-1">Gen / BC / MBC / SC / ST / EWS / PWD</p>
          </div>
        </div>

        {/* Allotment round & allotted category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              ALLOTMENT IN <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.allotment_in || ''}
              onChange={(e) => updateField('allotment_in', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white"
            >
              <option value="">Select Allotment Round</option>
              {allotmentRounds.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 mt-1">Round 1 / Round 2 / Mop-up round / Stray vacancy</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              ALLOTTED CATEGORY <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {allottedCategories.map((ac) => (
                <button
                  type="button"
                  key={ac}
                  onClick={() => updateField('allotted_category', ac)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                    formData.allotted_category === ac
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {ac}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Govt. / Magt. / NRI</p>
          </div>
        </div>
      </div>

      {/* Date of Birth & Completed Age */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">
          DATE OF BIRTH &amp; AGE CRITERIA
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              DATE OF BIRTH (AS PER TC) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={formData.date_of_birth || ''}
                onChange={(e) => updateField('date_of_birth', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">(as per Transfer Certificate)</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              COMPLETED AGE AS ON 31.12.2026
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={formData.age_as_on_cutoff || ''}
                onChange={(e) => updateField('age_as_on_cutoff', e.target.value)}
                placeholder="e.g. 17"
                className="w-32 px-3 py-2 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50"
              />
              <span className="text-xs text-slate-600 font-medium">years</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">NMC requirement: minimum 17 years completed as on 31.12.2026</p>
          </div>
        </div>
      </div>

      {/* Student Contact & ID Proofs */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">
          STUDENT IDENTIFICATION &amp; CONTACT DETAILS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              STUDENT’S MOBILE NO. <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                maxLength="10"
                value={formData.student_mobile || ''}
                onChange={(e) => updateField('student_mobile', e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="10-digit mobile"
                className="w-full pl-9 pr-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              STUDENT’S EMAIL-ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={formData.student_email || ''}
                onChange={(e) => updateField('student_email', e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              STUDENT’S AADHAAR NO. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength="12"
              value={formData.student_aadhar || ''}
              onChange={(e) => updateField('student_aadhar', e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="12-digit Aadhaar number"
              className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none tracking-wider"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              STUDENT’S PAN NO.
            </label>
            <input
              type="text"
              maxLength="10"
              value={formData.student_pan || ''}
              onChange={(e) => updateField('student_pan', e.target.value.toUpperCase())}
              placeholder="10-character PAN"
              className="w-full px-3 py-2 text-sm font-mono uppercase border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none tracking-wider"
            />
          </div>
        </div>

        {/* Identification Marks */}
        <div className="pt-4 border-t space-y-3">
          <label className="block text-xs font-bold text-slate-800 uppercase">
            IDENTIFICATION MARKS <span className="text-red-500">*</span>
            <span className="text-[11px] font-normal text-slate-500 ml-1">(as per TC / Date of Birth Certificate)</span>
          </label>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-500 w-5">1.</span>
              <input
                type="text"
                value={formData.identification_mark_1 || ''}
                onChange={(e) => updateField('identification_mark_1', e.target.value)}
                placeholder="e.g. A mole on the right side of the neck"
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-500 w-5">2.</span>
              <input
                type="text"
                value={formData.identification_mark_2 || ''}
                onChange={(e) => updateField('identification_mark_2', e.target.value)}
                placeholder="e.g. A scar on left eyebrow / mole on left collarbone"
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
