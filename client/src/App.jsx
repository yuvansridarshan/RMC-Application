import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AuthGateway from './components/AuthGateway';
import Step1Admission from './components/Step1Admission';
import Step2Candidate from './components/Step2Candidate';
import Step3Parent from './components/Step3Parent';
import Step4QualifyingExam from './components/Step4QualifyingExam';
import Step5BondsUndertakings from './components/Step5BondsUndertakings';
import Step6RulesAnnexures from './components/Step6RulesAnnexures';
import Step7Declarations from './components/Step7Declarations';
import Step8ReviewSubmit from './components/Step8ReviewSubmit';
import SuccessView from './components/SuccessView';
import PrintableApplication from './components/PrintableApplication';
import OfficePortal from './components/OfficePortal';
import ResumeModal from './components/ResumeModal';
import CommitteeModal from './components/CommitteeModal';
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  CheckCircle, 
  ShieldAlert, 
  FileText, 
  Lock, 
  Check, 
  Sparkles,
  Info,
  AlertCircle
} from 'lucide-react';

const initialFormData = {
  application_no: '',
  roll_no: '',
  candidate_photo_url: '',
  status: 'draft',
  mode_of_admission: 'Round 1',
  admission_no: '',
  allotted_quota: 'Govt.',
  dme_allotment_date: '2026-08-15',
  date_of_admission: '2026-08-22',

  // Candidate
  candidate_name: '',
  gender: 'Male',
  neet_roll_no: '',
  neet_marks: '',
  neet_communal_rank: '',
  neet_state_rank: '',
  dme_merit_no: '',
  category: 'Gen',
  is_local: 'Local',
  date_of_birth: '',
  age_as_on_cutoff: '',
  allotment_in: 'Round 1',
  allotted_category: 'Govt.',
  student_mobile: '',
  student_pan: '',
  student_aadhar: '',
  student_email: '',
  student_type: 'Day Scholar',
  mother_tongue: 'Tamil',
  identification_mark_1: '',
  identification_mark_2: '',

  // Parent
  father_name: '',
  father_mobile: '',
  father_email: '',
  father_occupation: '',
  mother_name: '',
  mother_mobile: '',
  mother_email: '',
  landline_no: '',
  address_street: '',
  address_place: '',
  address_district: '',
  address_pincode: '',
  address_state: 'Tamil Nadu',
  local_guardian_name: '',
  local_guardian_mobile: '',

  // Qualifying Exam
  qualifying_exam_board: 'Tamil Nadu Board of Higher Secondary Education',
  marks: [
    { subject_name: 'Botany', max_marks: 100, marks_obtained: '', percentage: '' },
    { subject_name: 'Zoology', max_marks: 100, marks_obtained: '', percentage: '' },
    { subject_name: 'Physics', max_marks: 100, marks_obtained: '', percentage: '' },
    { subject_name: 'Chemistry', max_marks: 100, marks_obtained: '', percentage: '' },
    { subject_name: 'Total marks of the above 4 subjects', max_marks: 400, marks_obtained: '', percentage: '' },
    { subject_name: 'English', max_marks: 100, marks_obtained: '', percentage: '' }
  ],

  // Bonds
  bond1_submitted: 'YES',
  bond1_file_url: '',
  bond2_submitted: 'YES',
  bond2_file_url: '',
  bond3_submitted: 'YES',
  bond3_file_url: '',
  bond4_submitted: 'YES',
  bond4_file_url: '',
  bond5_submitted: 'YES',
  bond5_file_url: '',

  // Undertakings
  ia_parent_undertaking_agreed: 1,
  ia_parent_name: '',
  ia_parent_mobile: '',
  ia_parent_relation: 'Father',
  ia_subjects: [
    { subject_name: 'Human Anatomy', attendance_percentage: 85, theory_percentage: 65, practical_percentage: 70, lesser_percentage: 65 },
    { subject_name: 'Physiology', attendance_percentage: 82, theory_percentage: 62, practical_percentage: 68, lesser_percentage: 62 },
    { subject_name: 'Biochemistry', attendance_percentage: 88, theory_percentage: 70, practical_percentage: 75, lesser_percentage: 70 }
  ],

  annexure1_undertaking_agreed: 1,
  annexure1_student_name: '',
  annexure1_parent_name: '',

  course_undertaking_agreed: 1,
  course_undertaking_date: '2026-08-22',
  course_candidate_name: '',
  course_parent_name: '',
  course_parent_relation: 'Father',

  dress_code_agreed: 1,
  dress_code_date: '2026-08-22',
  dress_code_candidate_name: '',
  dress_code_parent_name: '',
  dress_code_parent_relation: 'Father',

  rules_declaration_agreed: 1,
  rules_declaration_date: '2026-08-22',
  rules_student_name: '',
  rules_parent_name: '',

  candidate_declaration_agreed: 1,
  candidate_decl_place: 'Sriperumbudur',
  candidate_decl_date: '2026-08-22',
  candidate_decl_name: '',

  parent_declaration_agreed: 1,
  parent_decl_place: 'Sriperumbudur',
  parent_decl_date: '2026-08-22',
  parent_decl_name: '',
  parent_decl_relation: 'Son'
};

const stepTitles = [
  'Admission Mode & Quota',
  'Candidate Details & NEET',
  'Parent Details & Address',
  'Qualifying Exam Marks',
  'Notarized Bonds & IA',
  'Annexures & Conduct Rules',
  'Final Declarations',
  'Review & Submit'
];

// Strict Step-by-Step Validation Rules
function validateStep(stepIndex, data) {
  const stepErrors = {};

  if (stepIndex === 0) {
    if (!data.mode_of_admission) stepErrors.mode_of_admission = 'Mode of Admission is required.';
    if (!data.allotted_quota) stepErrors.allotted_quota = 'Allotted Quota (Govt. / Magt. / NRI) is required.';
    if (!data.dme_allotment_date) stepErrors.dme_allotment_date = 'DME Allotment Date is required.';
    if (!data.date_of_admission) stepErrors.date_of_admission = 'Date of Admission is required.';
  } else if (stepIndex === 1) {
    if (!data.candidate_name?.trim()) stepErrors.candidate_name = 'Candidate Name (as in TC) is required.';
    if (!data.gender) stepErrors.gender = 'Gender is required.';
    if (!data.neet_roll_no?.trim()) stepErrors.neet_roll_no = 'NEET Roll Number is required.';
    if (data.neet_marks === '' || data.neet_marks === undefined || data.neet_marks === null) {
      stepErrors.neet_marks = 'NEET Marks (0–720) is required.';
    } else if (Number(data.neet_marks) < 0 || Number(data.neet_marks) > 720) {
      stepErrors.neet_marks = 'NEET Marks must be between 0 and 720.';
    }
    if (!data.category) stepErrors.category = 'Category is required.';
    if (!data.date_of_birth) stepErrors.date_of_birth = 'Date of Birth is required.';
    if (!data.student_mobile || data.student_mobile.replace(/\D/g, '').length !== 10) {
      stepErrors.student_mobile = 'Valid 10-digit Student Mobile Number is required.';
    }
    if (!data.student_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.student_email)) {
      stepErrors.student_email = 'Valid Student Email Address is required.';
    }
    if (!data.student_aadhar || data.student_aadhar.replace(/\D/g, '').length !== 12) {
      stepErrors.student_aadhar = 'Valid 12-digit Student Aadhaar Number is required.';
    }
    if (!data.identification_mark_1?.trim()) {
      stepErrors.identification_mark_1 = 'Identification Mark 1 is required.';
    }
  } else if (stepIndex === 2) {
    if (!data.father_name?.trim() && !data.mother_name?.trim()) {
      stepErrors.parent_name = "Either Father's Name or Mother's Name is required.";
    }
    if (!data.father_mobile && !data.mother_mobile) {
      stepErrors.parent_mobile = "At least one parent's contact mobile number is required.";
    }
    if (!data.address_street?.trim()) stepErrors.address_street = 'Street / Door No is required.';
    if (!data.address_district?.trim()) stepErrors.address_district = 'District is required.';
    if (!data.address_state?.trim()) stepErrors.address_state = 'State is required.';
    if (!data.address_pincode || data.address_pincode.replace(/\D/g, '').length !== 6) {
      stepErrors.address_pincode = 'Valid 6-digit PIN code is required.';
    }
  } else if (stepIndex === 3) {
    if (!data.qualifying_exam_board?.trim()) {
      stepErrors.qualifying_exam_board = 'Qualifying Examination Board is required.';
    }
    const marks = data.marks || [];
    const totalRow = marks.find((m) => m.subject_name.toLowerCase().includes('total'));
    if (!totalRow || totalRow.marks_obtained === '' || totalRow.marks_obtained === undefined) {
      stepErrors.marks = 'Please enter marks obtained for qualifying subjects (Botany, Zoology, Physics, Chemistry).';
    } else {
      const pct = Number(totalRow.percentage);
      const cat = (data.category || '').toUpperCase();
      let minPct = 50;
      if (['BC', 'MBC', 'SC', 'ST'].includes(cat)) minPct = 40;
      else if (cat === 'PWD') minPct = 45;
      if (pct < minPct) {
        stepErrors.marks_eligibility = `Total aggregate (${pct}%) does not meet the minimum eligibility requirement of ${minPct}% for category ${data.category}.`;
      }
    }
  } else if (stepIndex === 4) {
    if (!data.ia_parent_undertaking_agreed) {
      stepErrors.ia_parent_undertaking_agreed = "Parent's Undertaking regarding Internal Assessment marks & attendance must be agreed.";
    }
    if (!data.ia_parent_name?.trim()) {
      stepErrors.ia_parent_name = "Parent's Name in block letters is required.";
    }
  } else if (stepIndex === 5) {
    if (!data.annexure1_undertaking_agreed) {
      stepErrors.annexure1_undertaking_agreed = 'Annexure I (Hostel & Conduct Rules) Undertaking must be agreed.';
    }
    if (!data.course_undertaking_agreed) {
      stepErrors.course_undertaking_agreed = 'Course Completion Undertaking must be agreed.';
    }
    if (!data.dress_code_agreed) {
      stepErrors.dress_code_agreed = "Medical Students' Dress Code Undertaking must be agreed.";
    }
    if (!data.rules_declaration_agreed) {
      stepErrors.rules_declaration_agreed = 'Student Rules & Regulations Declaration must be agreed.';
    }
  } else if (stepIndex === 6) {
    if (!data.candidate_declaration_agreed) {
      stepErrors.candidate_declaration_agreed = 'Candidate Declaration (Page 14) must be accepted.';
    }
    if (!data.candidate_decl_name?.trim()) {
      stepErrors.candidate_decl_name = 'Candidate signature name in block letters is required.';
    }
    if (!data.parent_declaration_agreed) {
      stepErrors.parent_declaration_agreed = 'Parent / Guardian Declaration (Page 14) must be accepted.';
    }
    if (!data.parent_decl_name?.trim()) {
      stepErrors.parent_decl_name = 'Parent signature name in block letters is required.';
    }
  }

  return stepErrors;
}

export default function App() {
  // Authentication State: null = at entry gateway; { type: 'student' | 'admin', ... }
  const [currentUser, setCurrentUser] = useState(null);

  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'portal' | 'success' | 'print'
  const [currentStep, setCurrentStep] = useState(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(0); // STRICT STEP PROGRESSION

  const [formData, setFormData] = useState(initialFormData);
  const [submittedData, setSubmittedData] = useState(null);
  const [printData, setPrintData] = useState(null);

  const [lastAutoSaved, setLastAutoSaved] = useState(null);

  // Fill Sample Verified Candidate Data
  const handleFillSampleData = () => {
    setFormData({
      ...initialFormData,
      roll_no: 'MBBS-2026-077',
      mode_of_admission: 'Round 1',
      allotted_quota: 'Govt.',
      dme_allotment_date: '2026-08-16',
      date_of_admission: '2026-08-23',
      candidate_name: 'Adithya Narayanan',
      gender: 'Male',
      neet_roll_no: '3104088921',
      neet_marks: 635,
      neet_communal_rank: '142',
      neet_state_rank: '620',
      dme_merit_no: 'DME-3204',
      category: 'BC',
      is_local: 'Local',
      date_of_birth: '2007-04-12',
      age_as_on_cutoff: 19,
      allotment_in: 'Round 1',
      allotted_category: 'Govt.',
      student_mobile: '9840234567',
      student_pan: 'ABCDE5678M',
      student_aadhar: '998877665544',
      student_email: 'adithya.narayanan@example.com',
      student_type: 'Hosteller',
      mother_tongue: 'Tamil',
      identification_mark_1: 'A mole on the left side of neck',
      identification_mark_2: 'A small scar on right wrist',
      father_name: 'Narayanan S',
      father_mobile: '9840234568',
      father_email: 'narayanan.s@example.com',
      father_occupation: 'Civil Engineer',
      mother_name: 'Kavitha N',
      mother_mobile: '9840234569',
      mother_email: 'kavitha.n@example.com',
      landline_no: '044-24567899',
      address_street: '7, Rajalakshmi Avenue, Pennalur',
      address_place: 'Sriperumbudur',
      address_district: 'Kanchipuram',
      address_pincode: '602117',
      address_state: 'Tamil Nadu',
      local_guardian_name: 'Venkatesan R',
      local_guardian_mobile: '9840234570',
      qualifying_exam_board: 'Tamil Nadu Board of Higher Secondary Education',
      marks: [
        { subject_name: 'Botany', max_marks: 100, marks_obtained: 94, percentage: '94.00' },
        { subject_name: 'Zoology', max_marks: 100, marks_obtained: 96, percentage: '96.00' },
        { subject_name: 'Physics', max_marks: 100, marks_obtained: 90, percentage: '90.00' },
        { subject_name: 'Chemistry', max_marks: 100, marks_obtained: 92, percentage: '92.00' },
        { subject_name: 'Total marks of the above 4 subjects', max_marks: 400, marks_obtained: 372, percentage: '93.00' },
        { subject_name: 'English', max_marks: 100, marks_obtained: 88, percentage: '88.00' }
      ],
      bond1_submitted: 'YES',
      bond2_submitted: 'YES',
      bond3_submitted: 'YES',
      bond4_submitted: 'YES',
      bond5_submitted: 'YES',
      ia_parent_undertaking_agreed: 1,
      ia_parent_name: 'Narayanan S',
      ia_parent_mobile: '9840234568',
      ia_parent_relation: 'Father',
      annexure1_undertaking_agreed: 1,
      annexure1_student_name: 'Adithya Narayanan',
      annexure1_parent_name: 'Narayanan S',
      course_undertaking_agreed: 1,
      course_undertaking_date: '2026-08-23',
      course_candidate_name: 'Adithya Narayanan',
      course_parent_name: 'Narayanan S',
      course_parent_relation: 'Father',
      dress_code_agreed: 1,
      dress_code_date: '2026-08-23',
      dress_code_candidate_name: 'Adithya Narayanan',
      dress_code_parent_name: 'Narayanan S',
      dress_code_parent_relation: 'Father',
      rules_declaration_agreed: 1,
      rules_declaration_date: '2026-08-23',
      rules_student_name: 'Adithya Narayanan',
      rules_parent_name: 'Narayanan S',
      candidate_declaration_agreed: 1,
      candidate_decl_place: 'Sriperumbudur',
      candidate_decl_date: '2026-08-23',
      candidate_decl_name: 'Adithya Narayanan',
      parent_declaration_agreed: 1,
      parent_decl_place: 'Sriperumbudur',
      parent_decl_date: '2026-08-23',
      parent_decl_name: 'Narayanan S',
      parent_decl_relation: 'Son'
    });
    setMaxUnlockedStep(7);
    showNotification('Sample verified candidate data populated! All 8 steps unlocked for review.', 'success');
  };
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isCommitteeOpen, setIsCommitteeOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState(null);

  // Fetch stats on load
  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.stats);
      })
      .catch(console.error);
  }, []);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const updateField = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-propagate candidate & parent names to undertakings if empty
      if (field === 'candidate_name') {
        if (!prev.annexure1_student_name) updated.annexure1_student_name = value;
        if (!prev.course_candidate_name) updated.course_candidate_name = value;
        if (!prev.dress_code_candidate_name) updated.dress_code_candidate_name = value;
        if (!prev.rules_student_name) updated.rules_student_name = value;
        if (!prev.candidate_decl_name) updated.candidate_decl_name = value;
      }
      if (field === 'father_name' || field === 'mother_name') {
        const pName = value || prev.father_name || prev.mother_name;
        if (!prev.ia_parent_name) updated.ia_parent_name = pName;
        if (!prev.annexure1_parent_name) updated.annexure1_parent_name = pName;
        if (!prev.course_parent_name) updated.course_parent_name = pName;
        if (!prev.dress_code_parent_name) updated.dress_code_parent_name = pName;
        if (!prev.rules_parent_name) updated.rules_parent_name = pName;
        if (!prev.parent_decl_name) updated.parent_decl_name = pName;
      }
      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Save Draft
  const handleSaveDraft = async (showToast = true) => {
    setIsDraftSaving(true);
    try {
      const res = await fetch('/api/applications/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        updateField('application_no', data.application_no);
        if (showToast) {
          showNotification(`Draft saved successfully! Tracking ID: ${data.application_no}`, 'success');
        }
      } else if (showToast) {
        showNotification(data.errors?.[0] || data.error || 'Failed to save draft', 'error');
      }
    } catch (err) {
      if (showToast) showNotification('Network error while saving draft', 'error');
    } finally {
      setIsDraftSaving(false);
    }
  };

  // STRICT STEP PROGRESSION: Next Step Gate
  const handleProceedNextStep = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const firstError = Object.values(stepErrors)[0];
      showNotification(`Step ${currentStep + 1} incomplete: ${firstError}`, 'error');
      return;
    }

    // Step is verified!
    setErrors({});
    handleSaveDraft(false); // auto-save draft

    const nextStep = currentStep + 1;
    setMaxUnlockedStep((prev) => Math.max(prev, nextStep));
    setCurrentStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification(`Step ${currentStep + 1} completed! Step ${nextStep + 1} unlocked.`, 'success');
  };

  // Step Tab Click with Lock Verification
  const handleStepClick = (idx) => {
    if (idx <= maxUnlockedStep) {
      setCurrentStep(idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showNotification(
        `Step ${idx + 1} is locked! Please complete Step ${currentStep + 1} first to proceed.`, 
        'error'
      );
    }
  };

  // Submit Final Application
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedData({
          ...formData,
          application_no: data.application_no,
          submission_date: data.submission_date,
          id: data.id
        });
        setActiveTab('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showNotification(data.errors?.[0] || data.error || 'Submission failed. Please check required fields.', 'error');
      }
    } catch (err) {
      showNotification('Server communication error during submission', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Student Login (Existing draft)
  const handleStudentLogin = (app) => {
    setFormData(app);
    setCurrentUser({
      type: 'student',
      name: app.candidate_name || 'MBBS Applicant',
      application_no: app.application_no
    });

    if (app.status === 'submitted' || app.status === 'verified' || app.status === 'approved') {
      setSubmittedData(app);
      setActiveTab('success');
    } else {
      // Calculate how far they reached
      let unlocked = 0;
      for (let s = 0; s < 7; s++) {
        if (Object.keys(validateStep(s, app)).length === 0) {
          unlocked = s + 1;
        } else {
          break;
        }
      }
      setMaxUnlockedStep(Math.min(unlocked, 7));
      setCurrentStep(Math.min(unlocked, 7));
      setActiveTab('form');
    }
    showNotification(`Welcome back! Application ${app.application_no} loaded.`, 'success');
  };

  // Start New Application (Fresh Candidate)
  const handleStartNewApplication = () => {
    setFormData(initialFormData);
    setSubmittedData(null);
    setCurrentStep(0);
    setMaxUnlockedStep(0);
    setCurrentUser({
      type: 'student',
      name: 'New Candidate'
    });
    setActiveTab('form');
  };

  // Admin Login
  const handleAdminLogin = (adminInfo) => {
    setCurrentUser({
      type: 'admin',
      role: adminInfo.role,
      name: adminInfo.name,
      username: adminInfo.username
    });
    setActiveTab('portal');
    showNotification(`Logged in as ${adminInfo.name}`, 'success');
  };

  // Logout / Switch Portal
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('form');
    setCurrentStep(0);
    showNotification('Logged out successfully. Returning to portal gateway.', 'success');
  };

  // IF NO USER IS LOGGED IN, RENDER THE AUTH GATEWAY (STUDENT LOGIN & ADMIN LOGIN)
  if (!currentUser) {
    return (
      <AuthGateway
        onStudentLogin={handleStudentLogin}
        onAdminLogin={handleAdminLogin}
        onStartNewApplication={handleStartNewApplication}
        stats={stats}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900">
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenCommittee={() => setIsCommitteeOpen(true)}
        stats={stats}
      />

      {/* Floating Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl border text-xs font-bold animate-bounce flex items-center space-x-2 ${
          notification.type === 'error'
            ? 'bg-red-950 text-white border-red-700'
            : 'bg-emerald-950 text-white border-emerald-700'
        }`}>
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* VIEW 1: PRINT VIEW */}
        {activeTab === 'print' && (
          <PrintableApplication
            data={printData || submittedData || formData}
            onClose={() => setActiveTab(submittedData ? 'success' : 'form')}
          />
        )}

        {/* VIEW 2: SUCCESS VIEW */}
        {activeTab === 'success' && submittedData && (
          <SuccessView
            applicationData={submittedData}
            onPrintView={() => {
              setPrintData(submittedData);
              setActiveTab('print');
            }}
            onNewApplication={handleStartNewApplication}
          />
        )}

        {/* VIEW 3: OFFICE ADMIN PORTAL */}
        {activeTab === 'portal' && (
          <OfficePortal
            onSelectPrint={(app) => {
              setPrintData(app);
              setActiveTab('print');
            }}
            onSelectEdit={(app) => {
              setFormData(app);
              setActiveTab('form');
            }}
          />
        )}

        {/* VIEW 4: APPLICATION FORM WIZARD (STUDENT) */}
        {activeTab === 'form' && (
          <div className="space-y-6">
            
            {/* Step Progression Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm no-print space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-900 text-white">
                      Step {currentStep + 1} of 8
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Sequential Completion Enforced</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight mt-1">
                    {stepTitles[currentStep]}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFillSampleData}
                    className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-300 transition-all flex items-center space-x-1 shadow-xs"
                    title="Populate authentic sample data for rapid evaluation & testing"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Demo Auto-Fill</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveDraft(true)}
                    disabled={isDraftSaving}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-300 transition-all flex items-center space-x-1.5 shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isDraftSaving ? 'Saving...' : 'Save Draft'}</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / stepTitles.length) * 100}%` }}
                ></div>
              </div>

              {/* 8 Step Interactive Badges with Locked / Unlocked States */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 pt-1">
                {stepTitles.map((title, idx) => {
                  const isCurrent = currentStep === idx;
                  const isCompleted = idx < maxUnlockedStep;
                  const isLocked = idx > maxUnlockedStep;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      disabled={isLocked}
                      className={`p-2 rounded-xl text-left transition-all relative flex flex-col justify-between border ${
                        isCurrent
                          ? 'bg-blue-950 text-white border-blue-900 shadow-md ring-2 ring-amber-400/50'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-75'
                      }`}
                      title={isLocked ? `Step ${idx + 1} is locked. Complete Step 1 to ${idx} first.` : title}
                    >
                      <div className="flex items-center justify-between text-[10px] font-black uppercase mb-1">
                        <span>Step {idx + 1}</span>
                        {isCompleted ? (
                          <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                        ) : isLocked ? (
                          <Lock className="w-2.5 h-2.5 text-slate-400" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        )}
                      </div>
                      <span className={`text-[11px] font-bold leading-tight block line-clamp-1 ${
                        isCurrent ? 'text-amber-300' : ''
                      }`}>
                        {title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Step Form Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
              {currentStep === 0 && (
                <Step1Admission formData={formData} updateField={updateField} errors={errors} />
              )}
              {currentStep === 1 && (
                <Step2Candidate formData={formData} updateField={updateField} errors={errors} />
              )}
              {currentStep === 2 && (
                <Step3Parent formData={formData} updateField={updateField} errors={errors} />
              )}
              {currentStep === 3 && (
                <Step4QualifyingExam formData={formData} updateField={updateField} errors={errors} />
              )}
              {currentStep === 4 && (
                <Step5BondsUndertakings formData={formData} updateField={updateField} errors={errors} />
              )}
              {currentStep === 5 && (
                <Step6RulesAnnexures formData={formData} updateField={updateField} errors={errors} />
              )}
              {currentStep === 6 && (
                <Step7Declarations formData={formData} updateField={updateField} errors={errors} />
              )}
              {currentStep === 7 && (
                <Step8ReviewSubmit
                  formData={formData}
                  onSubmit={handleSubmit}
                  onSaveDraft={() => handleSaveDraft(true)}
                  isSubmitting={isSubmitting}
                  isDraftSaving={isDraftSaving}
                  onJumpToStep={(stepIdx) => handleStepClick(stepIdx)}
                />
              )}

              {/* Navigation Bar with Step Completion Enforcement */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep((prev) => Math.max(0, prev - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentStep === 0}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    currentStep === 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleSaveDraft(true)}
                    disabled={isDraftSaving}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-all shadow-xs"
                  >
                    {isDraftSaving ? 'Saving Draft...' : 'Save Draft'}
                  </button>

                  {currentStep < stepTitles.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleProceedNextStep}
                      className="px-7 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center space-x-2 group hover:scale-[1.02]"
                    >
                      <span>Complete &amp; Unlock Step {currentStep + 2}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-xl transition-all flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-slate-950" />
                      <span>{isSubmitting ? 'Submitting to Registry...' : 'Submit Final Application'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Resume / Track Modal */}
      <ResumeModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        onLoadApplication={handleStudentLogin}
      />

      {/* Anti-Ragging Committee Modal */}
      <CommitteeModal
        isOpen={isCommitteeOpen}
        onClose={() => setIsCommitteeOpen(false)}
      />

      {/* Institutional Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-xl">
              <img src="/rmc-logo.png" alt="RMC Logo" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <span className="font-bold text-white block uppercase">
                Rajalakshmi Medical College Hospital &amp; Research Institute
              </span>
              <span className="text-[11px] text-slate-400">
                Rajalakshmi HealthCity, Pennalur Village, Sriperumbudur Taluk, Tamil Nadu – 602117
              </span>
            </div>
          </div>

          <div className="text-right text-[11px] space-y-0.5">
            <div className="text-amber-400 font-semibold">Affiliated to The Tamil Nadu Dr. M.G.R. Medical University, Chennai - 32</div>
            <div>Official MBBS Admission Application Portal 2026–27</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
