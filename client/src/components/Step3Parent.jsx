import React from 'react';
import { Users, Phone, Mail, Home, MapPin, Briefcase, AlertCircle } from 'lucide-react';

export default function Step3Parent({ formData, updateField, errors }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Banner */}
      <div className="bg-slate-50 border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-900" />
          Page 3 — Parent / Guardian Details &amp; Address
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          <strong className="text-slate-800">Important Note:</strong> All communication relating to the student (including daily WhatsApp attendance, academic warnings, emergency alerts) will be sent to these contacts.
        </p>
      </div>

      {/* Father's Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-800" />
          FATHER’S PARTICULARS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              FATHER’S NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.father_name || ''}
              onChange={(e) => updateField('father_name', e.target.value)}
              placeholder="Full name of father"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              FATHER’S MOBILE NO. <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                maxLength="10"
                value={formData.father_mobile || ''}
                onChange={(e) => updateField('father_mobile', e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="10-digit mobile"
                className="w-full pl-9 pr-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              FATHER’S OCCUPATION
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={formData.father_occupation || ''}
                onChange={(e) => updateField('father_occupation', e.target.value)}
                placeholder="Occupation / Designation"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              FATHER’S EMAIL-ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={formData.father_email || ''}
                onChange={(e) => updateField('father_email', e.target.value)}
                placeholder="father.email@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mother's Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-700" />
          MOTHER’S PARTICULARS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              MOTHER’S NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.mother_name || ''}
              onChange={(e) => updateField('mother_name', e.target.value)}
              placeholder="Full name of mother"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              MOTHER’S MOBILE NO.
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                maxLength="10"
                value={formData.mother_mobile || ''}
                onChange={(e) => updateField('mother_mobile', e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="10-digit mobile"
                className="w-full pl-9 pr-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              LANDLINE NO.
            </label>
            <input
              type="tel"
              value={formData.landline_no || ''}
              onChange={(e) => updateField('landline_no', e.target.value)}
              placeholder="STD Code - Number"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              MOTHER’S EMAIL-ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={formData.mother_email || ''}
                onChange={(e) => updateField('mother_email', e.target.value)}
                placeholder="mother.email@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Residential Address */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
          <Home className="w-4 h-4 text-blue-900" />
          FULL RESIDENTIAL ADDRESS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              STREET / DOOR NO. / ROAD <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address_street || ''}
              onChange={(e) => updateField('address_street', e.target.value)}
              placeholder="Door No, Building, Street Name"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              PLACE / TOWN / VILLAGE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address_place || ''}
              onChange={(e) => updateField('address_place', e.target.value)}
              placeholder="Place / Area"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              DISTRICT <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address_district || ''}
              onChange={(e) => updateField('address_district', e.target.value)}
              placeholder="District"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              STATE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address_state || ''}
              onChange={(e) => updateField('address_state', e.target.value)}
              placeholder="Tamil Nadu, Kerala, Karnataka, etc."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              PIN CODE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength="6"
              value={formData.address_pincode || ''}
              onChange={(e) => updateField('address_pincode', e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="6-digit PIN"
              className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Local Guardian Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2 flex items-center justify-between">
          <span>LOCAL GUARDIAN (OPTIONAL / MANDATORY FOR OUTSTATION HOSTELLERS)</span>
          <span className="text-[11px] font-normal text-slate-500">Pennalur / Chennai / Kanchipuram area contact</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              LOCAL GUARDIAN NAME
            </label>
            <input
              type="text"
              value={formData.local_guardian_name || ''}
              onChange={(e) => updateField('local_guardian_name', e.target.value)}
              placeholder="Name of Local Guardian"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              LOCAL GUARDIAN MOBILE NO.
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                maxLength="10"
                value={formData.local_guardian_mobile || ''}
                onChange={(e) => updateField('local_guardian_mobile', e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="10-digit mobile"
                className="w-full pl-9 pr-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
