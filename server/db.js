const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const isVercel = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const DB_DIR = isVercel ? '/tmp' : path.join(__dirname, '../data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = process.env.DATABASE_FILE || path.join(DB_DIR, 'rmc_applications.db');

// If on Vercel and DB doesn't exist in /tmp, copy seed DB from bundled data
if (isVercel && !fs.existsSync(DB_PATH)) {
  const seedPath = path.join(__dirname, '../data/rmc_applications.db');
  if (fs.existsSync(seedPath)) {
    try {
      fs.copyFileSync(seedPath, DB_PATH);
    } catch (e) {
      console.warn('Could not copy seed DB to /tmp:', e.message);
    }
  }
}

const db = new DatabaseSync(DB_PATH);

// Enable WAL mode & foreign keys for high reliability and concurrency
db.exec(`PRAGMA journal_mode = WAL;`);
db.exec(`PRAGMA foreign_keys = ON;`);

// Create Relational Tables
db.exec(`
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_no TEXT UNIQUE NOT NULL,
  roll_no TEXT,
  candidate_photo_url TEXT,
  status TEXT DEFAULT 'draft',
  submission_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  -- Page 2: Admission & Quota
  mode_of_admission TEXT,
  admission_no TEXT,
  allotted_quota TEXT,
  dme_allotment_date TEXT,
  date_of_admission TEXT,

  -- Page 2: Candidate Details
  candidate_name TEXT,
  gender TEXT,
  neet_roll_no TEXT,
  neet_marks REAL,
  neet_communal_rank TEXT,
  neet_state_rank TEXT,
  dme_merit_no TEXT,
  category TEXT,
  is_local TEXT,
  date_of_birth TEXT,
  age_as_on_cutoff INTEGER,
  allotment_in TEXT,
  allotted_category TEXT,
  student_mobile TEXT,
  student_pan TEXT,
  student_aadhar TEXT,
  student_email TEXT,
  student_type TEXT,
  mother_tongue TEXT,
  identification_mark_1 TEXT,
  identification_mark_2 TEXT,

  -- Page 3: Parent/Guardian Details
  father_name TEXT,
  father_mobile TEXT,
  father_email TEXT,
  father_occupation TEXT,
  mother_name TEXT,
  mother_mobile TEXT,
  mother_email TEXT,
  landline_no TEXT,
  address_street TEXT,
  address_place TEXT,
  address_district TEXT,
  address_pincode TEXT,
  address_state TEXT,
  local_guardian_name TEXT,
  local_guardian_mobile TEXT,

  -- Page 3: Qualifying Exam Board
  qualifying_exam_board TEXT,

  -- Page 4: Bonds Submitted status & URLs
  bond1_submitted TEXT DEFAULT 'NO',
  bond1_file_url TEXT,
  bond2_submitted TEXT DEFAULT 'NO',
  bond2_file_url TEXT,
  bond3_submitted TEXT DEFAULT 'NO',
  bond3_file_url TEXT,
  bond4_submitted TEXT DEFAULT 'NO',
  bond4_file_url TEXT,
  bond5_submitted TEXT DEFAULT 'NO',
  bond5_file_url TEXT,

  -- Page 4: Parent's Undertaking on IA & Attendance
  ia_parent_undertaking_agreed INTEGER DEFAULT 0,
  ia_parent_name TEXT,
  ia_parent_mobile TEXT,
  ia_parent_relation TEXT,
  ia_parent_signature_url TEXT,
  ia_parent_date TEXT,

  -- Page 7: Annexure I Undertaking
  annexure1_undertaking_agreed INTEGER DEFAULT 0,
  annexure1_student_name TEXT,
  annexure1_student_signature_url TEXT,
  annexure1_parent_name TEXT,
  annexure1_parent_signature_url TEXT,

  -- Page 8: Course Completion Undertaking
  course_undertaking_agreed INTEGER DEFAULT 0,
  course_undertaking_date TEXT,
  course_candidate_name TEXT,
  course_candidate_signature_url TEXT,
  course_parent_relation TEXT,
  course_parent_name TEXT,
  course_parent_signature_url TEXT,
  course_parent_date TEXT,

  -- Page 9-10: Annexure II Dress Code Undertaking
  dress_code_agreed INTEGER DEFAULT 0,
  dress_code_date TEXT,
  dress_code_candidate_name TEXT,
  dress_code_candidate_signature_url TEXT,
  dress_code_parent_relation TEXT,
  dress_code_parent_name TEXT,
  dress_code_parent_signature_url TEXT,
  dress_code_parent_date TEXT,

  -- Page 13: Rules & Regulations Declaration
  rules_declaration_agreed INTEGER DEFAULT 0,
  rules_declaration_date TEXT,
  rules_student_name TEXT,
  rules_student_signature_url TEXT,
  rules_parent_name TEXT,
  rules_parent_signature_url TEXT,

  -- Page 14: Candidate Declaration
  candidate_declaration_agreed INTEGER DEFAULT 0,
  candidate_decl_place TEXT,
  candidate_decl_date TEXT,
  candidate_decl_name TEXT,
  candidate_decl_signature_url TEXT,

  -- Page 14: Parent Declaration
  parent_declaration_agreed INTEGER DEFAULT 0,
  parent_decl_place TEXT,
  parent_decl_date TEXT,
  parent_decl_name TEXT,
  parent_decl_relation TEXT,
  parent_decl_signature_url TEXT,

  -- Page 14: Office Use Verification
  office_verified_by TEXT,
  office_verification_status TEXT DEFAULT 'Pending',
  office_verification_remarks TEXT,
  office_verification_date TEXT,
  dean_approval_status TEXT DEFAULT 'Pending',
  dean_remarks TEXT,
  dean_approval_date TEXT
);

CREATE TABLE IF NOT EXISTS qualifying_exam_marks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL,
  subject_name TEXT NOT NULL,
  max_marks REAL,
  marks_obtained REAL,
  percentage REAL,
  FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ia_assessment_subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL,
  subject_name TEXT NOT NULL,
  attendance_percentage REAL,
  theory_percentage REAL,
  practical_percentage REAL,
  lesser_percentage REAL,
  FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS application_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL,
  doc_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TEXT NOT NULL,
  FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS anti_ragging_committee (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL
);
`);

// Populate Anti-Ragging Committee from the official form if not already populated
const committeeCountStmt = db.prepare('SELECT COUNT(*) as count FROM anti_ragging_committee');
const committeeCount = committeeCountStmt.get();

if (committeeCount.count === 0) {
  const insertMember = db.prepare(`
    INSERT INTO anti_ragging_committee (role, name, designation, email, phone)
    VALUES (?, ?, ?, ?, ?)
  `);

  const committeeMembers = [
    ['Chairperson', 'Dr. K. Vanitha', 'Dean', 'deanrmc@rmchri.edu.in', '9443003355'],
    ['Member Secretary', 'Dr. Premkumar L.', 'Prof. and HOD of Microbiology', 'hod.microbiology@rmchri.edu.in', '7904864657'],
    ['Member', 'Dr. Anuradha', 'Prof. and HOD of General Medicine', 'hod.generalmedicine@rmchri.edu.in', '9841424677'],
    ['Member', 'Dr. Sangeetha Nagpal', 'Professor of Physiology', 'hod.physiology@rmchri.edu.in', '7657852503'],
    ['Member', 'Dr. Sarah Grace Priyadharshini', 'Associate Professor of Pathology', 'sarahgrace.priyadarshini@rmchri.edu.in', '9790722496'],
    ['Member', 'Dr. Santhanu Mallik', 'Associate Professor of Anatomy', 'shantanu.pm@annaiimedicalcollege.edu.in', '9320877099'],
    ['Member', 'Dr. Monica', 'Professor of Pathology & Chief Warden (Girls Hostel)', 'drmonicavincent@gmail.com', '9629481992'],
    ['Member', 'Dr. Naveen Kumar', 'Assistant Professor of General Surgery', 'naveenkumar.m@annaiimedicalcollege.edu.in', '7200364127'],
    ['Member', 'Dr. Shenbaga Lalitha', 'Assoc. Prof. of Biochemistry', 'dr.lalitha@gmail.com', '9994869160'],
    ['Member', 'Dr. Mohanapriyya', 'Assistant Professor of Pathology', 'mohanapriya.d@annaiimedicalcollege.edu.in', '7708401966'],
    ['Member', 'Dr. Praveen', 'Assoc. Prof. of Pathology & Chief Warden (Male Hostel)', 'Praveen.easwar@gmail.com', '9047627937'],
    ['Member', 'Dr. Gowtham Padmanaban', 'Asst. Prof. of Pharmacology', 'vedaamirtha@gmail.com', '8296273481'],
    ['Member', 'Dr. Devi Priya', 'Asst. Prof. of ENT', 'priyahamii@gmail.com', '8754867607'],
    ['Representative of Non-Teaching Staff', 'Mr. Rajesh', 'HR Head', 'hr.head@rmchri.edu.in', '7904894189']
  ];

  for (const member of committeeMembers) {
    insertMember.run(...member);
  }
}

module.exports = db;
