import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  FileText, 
  Search, 
  Lock, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  ShieldAlert,
  Building2,
  Check
} from 'lucide-react';

export default function AuthGateway({ onStudentLogin, onAdminLogin, onStartNewApplication, stats }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Student Resume Form State
  const [studentIdentifier, setStudentIdentifier] = useState('');
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentError, setStudentError] = useState('');

  // Admin Login State
  const [adminRole, setAdminRole] = useState('Administrative Officer');
  const [adminUsername, setAdminUsername] = useState('admin@rmchri.edu.in');
  const [adminPassword, setAdminPassword] = useState('rmc2026');
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // Handle Resume
  const handleStudentResume = async (e) => {
    e.preventDefault();
    if (!studentIdentifier.trim()) {
      setStudentError('Please enter your Application No, NEET Roll No, or registered Email.');
      return;
    }
    setStudentLoading(true);
    setStudentError('');

    try {
      const res = await fetch(`/api/applications/lookup/${encodeURIComponent(studentIdentifier.trim())}`);
      const data = await res.json();
      if (data.success && data.application) {
        onStudentLogin(data.application);
      } else {
        setStudentError(data.error || 'No application record found. Please verify your details or start a new application.');
      }
    } catch (err) {
      setStudentError('Network error connecting to admission server. Please try again.');
    } finally {
      setStudentLoading(false);
    }
  };

  // Handle Admin Submit
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError('');

    setTimeout(() => {
      if (
        (adminUsername.toLowerCase().includes('admin') || adminUsername.toLowerCase().includes('dean')) &&
        adminPassword.length >= 4
      ) {
        onAdminLogin({
          role: adminRole,
          username: adminUsername,
          name: adminRole === 'Dean' ? 'Dr. K. Vanitha (Dean)' : 'Mr. Rajesh (Administrative Officer)'
        });
      } else {
        setAdminError('Invalid credentials. Staff default demo PIN: rmc2026');
      }
      setAdminLoading(false);
    }, 350);
  };

  const processSteps = [
    { num: '01', title: 'Admission & Quota', desc: 'Select Counselling Mode (Rounds 1/2/Mop-up/Stray) and DME Allotted Quota' },
    { num: '02', title: 'Candidate & NEET', desc: 'Personal particulars, NEET UG 2026 roll, marks/720, ranks, and category' },
    { num: '03', title: 'Parent & Address', desc: 'Father, Mother, communication contacts, and full residential address' },
    { num: '04', title: 'Qualifying Marks', desc: 'Botany, Zoology, Physics, Chemistry & English marks with TN M.G.R. checks' },
    { num: '05', title: 'Notarized Bonds', desc: 'Execution of 5 bonds on ₹200 stamp paper and Parent IA undertaking' },
    { num: '06', title: 'Rules & Annexures', desc: 'Hostel accommodation rules, dress code undertaking, and leave policy' },
    { num: '07', title: 'Declarations', desc: 'Statutory 6-clause Candidate & Parent declarations with digital signatures' },
    { num: '08', title: 'Review & Submit', desc: 'Comprehensive verification, instant Application ID, and 14-page printout' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
      
      {/* 1. TOP NOTIFICATION BAR */}
      <div className="bg-[#0b1d3a] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              ADMISSION 2026–27
            </span>
            <span className="hidden sm:inline font-medium">Affiliated to The Tamil Nadu Dr. M.G.R. Medical University, Chennai - 32</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span>Admissions Desk: <strong className="text-white">044-27176404 / 05</strong></span>
            <span className="hidden md:inline">Email: <strong className="text-white">admin@rmchri.edu.in</strong></span>
            <button
              onClick={() => setShowAdminModal(true)}
              className="text-amber-400 hover:text-amber-300 font-semibold underline flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-0.5" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN INSTITUTIONAL HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center gap-4">
          
          {/* Logo & College Name */}
          <div className="flex items-center space-x-4">
            <div className="p-1 bg-white rounded-lg shrink-0">
              <img 
                src="/rmc-logo.png" 
                alt="Rajalakshmi HealthCity Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <div className="border-l border-slate-200 pl-4 hidden sm:block">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block">
                Sri Devi Karumariamman Educational Trust
              </span>
              <h1 className="text-sm sm:text-base font-extrabold text-[#0f294a] uppercase tracking-tight leading-tight">
                Rajalakshmi Medical College Hospital &amp; Research Institute
              </h1>
              <p className="text-[11px] text-slate-500">
                (Formerly Annaii Medical College and Hospital) • Pennalur, Sriperumbudur, Tamil Nadu – 602117
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowResumeModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0f294a] bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-all flex items-center space-x-1.5"
            >
              <Search className="w-3.5 h-3.5 text-teal-700" />
              <span>Application Status</span>
            </button>

            <button
              onClick={onStartNewApplication}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0f294a] hover:bg-[#163a66] rounded-lg shadow-sm transition-all flex items-center space-x-1.5"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER */}
      <section className="bg-gradient-to-b from-[#0f294a] to-[#16355d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-teal-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-teal-300" />
              <span>MBBS Degree Course Admission 2026–27</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight uppercase">
              Official MBBS Admission Application Portal
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Welcome to the official admission portal for Rajalakshmi Medical College Hospital &amp; Research Institute. Candidates allotted through Directorate of Medical Education (DME) Counselling can complete their admission booklet, notarized stamp bond undertakings, and candidate documentation online.
            </p>

            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>TN Dr. M.G.R. Medical University</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>National Medical Commission (NMC) Norms</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>150 MBBS Annual Intake</span>
              </div>
            </div>
          </div>

          {/* Quick Start Card */}
          <div className="lg:col-span-5 bg-white text-slate-800 rounded-2xl shadow-xl p-6 sm:p-7 border border-slate-200">
            <h3 className="text-base font-bold text-[#0f294a] uppercase tracking-wide border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
              <span>Candidate Admission Desk</span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                AY 2026–27
              </span>
            </h3>

            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800 block mb-1">New Candidate Registration:</strong>
                Complete your official 14-page admission form across 8 sequential steps. Progress is auto-saved at every step.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={onStartNewApplication}
                  className="w-full py-3 px-4 bg-[#0f294a] hover:bg-[#163a66] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5"
                >
                  <FileText className="w-4 h-4 text-teal-300" />
                  <span>Start Application</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowResumeModal(true)}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-[#0f294a] border border-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-1.5"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Resume Draft</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
                <span>College Administration / Dean:</span>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(true)}
                  className="text-teal-700 font-bold hover:underline"
                >
                  Office Scrutiny Login →
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. APPLICATION PROCESS OVERVIEW */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block mb-1">
            Standard Operating Procedure
          </span>
          <h3 className="text-2xl font-black text-[#0f294a] uppercase tracking-tight">
            Application Process Overview
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Follow the 8 sequential steps to complete your MBBS admission application and generate the authentic 14-page physical booklet for campus verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step) => (
            <div 
              key={step.num}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xl font-black text-slate-300 group-hover:text-teal-600 transition-colors font-mono">
                  {step.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-teal-500 transition-colors"></span>
              </div>
              <h4 className="text-xs font-bold text-[#0f294a] uppercase tracking-wider mb-1.5">
                {step.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ELIGIBILITY CRITERIA & UNIVERSITY REGULATIONS */}
      <section className="py-10 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Eligibility Box */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <BookOpen className="w-5 h-5 text-teal-700" />
                <h4 className="text-sm font-bold text-[#0f294a] uppercase tracking-wider">
                  Qualifying Examination Minimum Eligibility (The Tamil Nadu Dr. M.G.R. Medical University)
                </h4>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                As per the official regulations of The Tamil Nadu Dr. M.G.R. Medical University, candidates must have passed the qualifying examination (+2 / Higher Secondary / CBSE) with the following minimum aggregate in Botany, Zoology, Physics, and Chemistry:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">General / OC / EWS</span>
                  <span className="text-lg font-black text-[#0f294a]">50% Minimum</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">BC / MBC / SC / ST</span>
                  <span className="text-lg font-black text-[#0f294a]">40% Minimum</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">PwD Category</span>
                  <span className="text-lg font-black text-[#0f294a]">45% Minimum</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Age Criteria:</strong> Candidate must have completed minimum 17 years of age as on <strong>31.12.2026</strong>.</span>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <h4 className="text-sm font-bold text-[#0f294a] uppercase tracking-wider">
                  Important Admission Checkpoints &amp; Dates
                </h4>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start space-x-2.5">
                  <Calendar className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-800 block">Annual Tuition Fee Deadline:</strong>
                    Subsequent year fees must be remitted on or before <strong>1<sup>st</sup> June</strong> of each academic year.
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <FileText className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-800 block">5 Notarized Bonds on ₹200 Stamp Paper:</strong>
                    Required during physical verification at Pennalur Campus: Genuine certificates bond, Non-seat blocking declaration, ₹10 Lakh discontinuance bond, vacant seat tuition fee affidavit, and anti-ragging affidavit.
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-800 block">Attendance &amp; Internal Assessment:</strong>
                    Minimum 80% attendance (theory + practical) and 50% IA marks to sit for University Examinations.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. RESUME DRAFT MODAL */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block">Candidate Verification</span>
                <h3 className="text-base font-bold text-[#0f294a] uppercase">Resume Saved Application</h3>
              </div>
              <button 
                onClick={() => setShowResumeModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {studentError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{studentError}</span>
              </div>
            )}

            <form onSubmit={handleStudentResume} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Application ID / NEET Roll No / Registered Email
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={studentIdentifier}
                    onChange={(e) => setStudentIdentifier(e.target.value)}
                    placeholder="e.g. RMC-2026-0001-740 or NEET Roll No"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f294a] outline-none font-medium"
                    autoFocus
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Check your draft save confirmation message</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResumeModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={studentLoading}
                  className="px-5 py-2 bg-[#0f294a] hover:bg-[#163a66] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  {studentLoading ? 'Searching...' : 'Continue Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. ADMIN / STAFF LOGIN MODAL */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block">College Admission Cell</span>
                <h3 className="text-base font-bold text-[#0f294a] uppercase">Office Scrutiny &amp; Dean Portal</h3>
              </div>
              <button 
                onClick={() => setShowAdminModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {adminError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Designated Staff Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Administrative Officer', 'Dean'].map((role) => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => setAdminRole(role)}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all text-center ${
                        adminRole === role
                          ? 'bg-[#0f294a] text-white border-[#0f294a] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Official Email / Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="e.g. admin@rmchri.edu.in"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f294a] outline-none font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Staff Access PIN / Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f294a] outline-none"
                    required
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Default staff demo PIN: <code>rmc2026</code></p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adminLoading}
                  className="px-5 py-2 bg-[#0f294a] hover:bg-[#163a66] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  {adminLoading ? 'Authenticating...' : `Log in as ${adminRole}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. PROFESSIONAL INSTITUTIONAL FOOTER */}
      <footer className="bg-[#0b1d3a] text-slate-400 text-xs py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
            
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="bg-white p-2 rounded-lg inline-block">
                <img src="/rmc-logo.png" alt="Rajalakshmi HealthCity" className="h-9 w-auto object-contain" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Rajalakshmi Medical College Hospital &amp; Research Institute is run by Sri Devi Karumariamman Educational Trust and affiliated to The Tamil Nadu Dr. M.G.R. Medical University, Chennai.
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <span className="text-white font-bold uppercase tracking-wider block">Campus Address</span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Rajalakshmi HealthCity,<br />
                Pennalur Village, Sriperumbudur Taluk,<br />
                Kanchipuram District,<br />
                Tamil Nadu – 602117
              </p>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <span className="text-white font-bold uppercase tracking-wider block">Admissions Helpdesk</span>
              <p className="text-[11px] text-slate-400">Phone: 044-27176404 / 05 / 06 / 07</p>
              <p className="text-[11px] text-slate-400">Email: admin@rmchri.edu.in</p>
              <p className="text-[11px] text-slate-400">Dean Office: deanrmc@rmchri.edu.in</p>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <span className="text-white font-bold uppercase tracking-wider block">Quick Links</span>
              <ul className="space-y-1 text-[11px]">
                <li><button onClick={onStartNewApplication} className="hover:text-white transition-colors">Start New Application</button></li>
                <li><button onClick={() => setShowResumeModal(true)} className="hover:text-white transition-colors">Resume Saved Application</button></li>
                <li><button onClick={() => setShowAdminModal(true)} className="hover:text-white transition-colors">Office Scrutiny Cell Login</button></li>
                <li><span className="text-teal-400">Anti-Ragging 24/7 Helpline: 9443003355</span></li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
            <span>© 2026 Rajalakshmi Medical College Hospital &amp; Research Institute. All rights reserved.</span>
            <span>Application for Admission into MBBS Degree Course 2026–27</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
