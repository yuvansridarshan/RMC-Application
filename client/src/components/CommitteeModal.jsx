import React, { useState, useEffect } from 'react';
import { ShieldAlert, XCircle, Phone, Mail, UserCheck } from 'lucide-react';

export default function CommitteeModal({ isOpen, onClose }) {
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/committee')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCommittee(data.committee);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start border-b pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest block">
                Annexure – III
              </span>
              <h3 className="text-lg font-black text-slate-900 uppercase">
                Anti-Ragging Committee (14 Members)
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs text-red-950 leading-relaxed">
          <p>
            <strong>24/7 Zero-Tolerance Anti-Ragging Cell:</strong> Ragging is strictly banned inside and outside Rajalakshmi Medical College campus under Supreme Court regulations. Students or parents may immediately contact any member below.
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading committee contacts...</div>
        ) : (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-3 py-3">Designation</th>
                  <th className="px-3 py-3">Name &amp; Affiliation</th>
                  <th className="px-3 py-3">Email ID</th>
                  <th className="px-3 py-3 text-center">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {committee.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2.5 font-bold text-slate-800">{m.role}</td>
                    <td className="px-3 py-2.5">
                      <div className="font-bold text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-500">{m.designation}</div>
                    </td>
                    <td className="px-3 py-2.5">
                      <a href={`mailto:${m.email}`} className="text-blue-700 hover:underline flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-slate-400 mr-1" />
                        <span>{m.email}</span>
                      </a>
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono font-bold">
                      <a href={`tel:${m.phone}`} className="inline-flex items-center px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded">
                        <Phone className="w-3 h-3 text-emerald-600 mr-1" />
                        <span>{m.phone}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
