import React, { useState } from 'react';
import { Search, XCircle, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose, onLoadApplication }) {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your Application No, Email, or NEET Roll No.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/applications/lookup/${encodeURIComponent(identifier.trim())}`);
      const data = await res.json();
      if (data.success && data.application) {
        onLoadApplication(data.application);
        onClose();
      } else {
        setError(data.error || 'No application or draft found matching those details.');
      }
    } catch (err) {
      setError('Unable to reach the server. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-start border-b pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 uppercase">
              Resume Draft / Track Application
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your Application Number, Email, or NEET Roll No to retrieve your application.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Application ID / Registered Email / NEET Roll No
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. RMC-2026-0001-740 or name@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none font-medium"
                autoFocus
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-all shadow-md"
            >
              {loading ? 'Searching...' : 'Retrieve Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
