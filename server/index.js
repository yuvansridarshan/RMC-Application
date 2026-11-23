require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const isVercel = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || (isVercel ? '/tmp/uploads' : './uploads'));

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOAD_DIR));

// File upload configuration with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${uuidv4().substring(0, 8)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, PDF, and DOC/DOCX files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024 },
  fileFilter
});

// Helper: Generate unique application number
function generateApplicationNo() {
  const year = new Date().getFullYear();
  const row = db.prepare('SELECT COUNT(*) as count FROM applications').get();
  const nextSeq = (row.count + 1).toString().padStart(4, '0');
  const rand = Math.floor(100 + Math.random() * 900);
  return `RMC-${year}-${nextSeq}-${rand}`;
}

// Validation logic for submitted applications
function validateApplication(data, isDraft = false) {
  const errors = [];

  if (isDraft) {
    if (!data.candidate_name && !data.student_email && !data.student_mobile) {
      errors.push('Please provide at least a Candidate Name, Email, or Mobile to save a draft.');
    }
    return errors;
  }

  // Mandatory Candidate Details
  if (!data.candidate_name || data.candidate_name.trim().length === 0) {
    errors.push('Candidate Name (as in School Transfer Certificate) is required.');
  }
  if (!data.gender) {
    errors.push('Gender is required.');
  }
  if (!data.neet_roll_no || data.neet_roll_no.trim().length === 0) {
    errors.push('NEET Roll No. is required.');
  }
  if (data.neet_marks === undefined || data.neet_marks === null || data.neet_marks === '') {
    errors.push('NEET Marks (out of 720) is required.');
  } else {
    const marks = Number(data.neet_marks);
    if (isNaN(marks) || marks < 0 || marks > 720) {
      errors.push('NEET Marks must be a valid number between 0 and 720.');
    }
  }
  if (!data.category) {
    errors.push('Category (Gen / BC / MBC / SC / ST / EWS / PWD) is required.');
  }
  if (!data.mode_of_admission) {
    errors.push('Mode of Admission (Round 1 / Round 2 / Mop-up / Stray) is required.');
  }
  if (!data.allotted_quota) {
    errors.push('Allotted Quota (Govt. / Magt. / NRI) is required.');
  }
  if (!data.allotment_in) {
    errors.push('Allotment in Round is required.');
  }
  if (!data.allotted_category) {
    errors.push('Allotted Category is required.');
  }
  if (!data.student_type) {
    errors.push('Student Type (Day Scholar / Hosteller) is required.');
  }
  if (!data.date_of_birth) {
    errors.push('Date of Birth is required.');
  }
  if (!data.student_mobile || !/^\d{10}$/.test(data.student_mobile.replace(/[^0-9]/g, ''))) {
    errors.push('Valid 10-digit Student Mobile Number is required.');
  }
  if (!data.student_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.student_email)) {
    errors.push('Valid Student Email Address is required.');
  }
  if (!data.student_aadhar || !/^\d{12}$/.test(data.student_aadhar.replace(/[^0-9]/g, ''))) {
    errors.push('Valid 12-digit Student Aadhaar Number is required.');
  }
  if (!data.identification_mark_1) {
    errors.push('Identification Mark 1 is required.');
  }

  // Parent Details
  if (!data.father_name && !data.mother_name) {
    errors.push("Either Father's Name or Mother's Name is required.");
  }
  if (!data.father_mobile && !data.mother_mobile) {
    errors.push("At least one parent's contact mobile number is required.");
  }
  if (!data.address_street || !data.address_district || !data.address_pincode || !data.address_state) {
    errors.push('Complete Residential Address (Street, District, State, Pin Code) is required.');
  }

  // Qualifying Examination Checks
  if (data.marks && Array.isArray(data.marks)) {
    const totalRow = data.marks.find(m => m.subject_name.toLowerCase().includes('total'));
    if (totalRow && totalRow.percentage !== undefined) {
      const pct = Number(totalRow.percentage);
      const cat = (data.category || '').toUpperCase();
      let minRequired = 50;
      if (cat === 'BC' || cat === 'MBC' || cat === 'SC' || cat === 'ST') {
        minRequired = 40;
      } else if (cat === 'PWD') {
        minRequired = 45;
      }
      if (!isNaN(pct) && pct < minRequired) {
        errors.push(`Total percentage in qualifying exam (${pct}%) does not meet the minimum eligibility requirement of ${minRequired}% for category ${data.category}.`);
      }
    }
  }

  // Mandatory Declarations & Undertakings
  if (!data.ia_parent_undertaking_agreed) {
    errors.push("Parent's Undertaking regarding Internal Assessment marks and attendance must be agreed.");
  }
  if (!data.annexure1_undertaking_agreed) {
    errors.push('Annexure I (Hostel & Day Scholar Rules) Undertaking must be agreed.');
  }
  if (!data.course_undertaking_agreed) {
    errors.push('Course Completion Undertaking must be agreed.');
  }
  if (!data.dress_code_agreed) {
    errors.push("Medical Students' Dress Code Undertaking must be agreed.");
  }
  if (!data.rules_declaration_agreed) {
    errors.push('Rules & Regulations Declaration must be agreed.');
  }
  if (!data.candidate_declaration_agreed) {
    errors.push('Candidate Declaration (Page 14) must be accepted.');
  }
  if (!data.parent_declaration_agreed) {
    errors.push('Parent / Guardian Declaration (Page 14) must be accepted.');
  }

  return errors;
}

// 1. Single & Multiple Document Upload API
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded or file type rejected.' });
  }

  const relativeUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: relativeUrl
    }
  });
});

// 2. Fetch Anti-Ragging Committee List
app.get('/api/committee', (req, res) => {
  try {
    const members = db.prepare('SELECT * FROM anti_ragging_committee ORDER BY id ASC').all();
    res.json({ success: true, committee: members });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Application Statistics
app.get('/api/stats', (req, res) => {
  try {
    const total = db.prepare('SELECT COUNT(*) as count FROM applications').get().count;
    const submitted = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'submitted'").get().count;
    const drafts = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'draft'").get().count;
    const verified = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'verified'").get().count;
    const approved = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'approved'").get().count;

    const categories = db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM applications 
      WHERE category IS NOT NULL AND category != '' 
      GROUP BY category
    `).all();

    const quotas = db.prepare(`
      SELECT allotted_quota, COUNT(*) as count 
      FROM applications 
      WHERE allotted_quota IS NOT NULL AND allotted_quota != '' 
      GROUP BY allotted_quota
    `).all();

    res.json({
      success: true,
      stats: {
        total,
        submitted,
        drafts,
        verified,
        approved,
        categories,
        quotas
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. List Applications with Search & Filter
app.get('/api/applications', (req, res) => {
  try {
    const { search, status, category, quota } = req.query;
    let query = 'SELECT * FROM applications WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (quota) {
      query += ' AND allotted_quota = ?';
      params.push(quota);
    }
    if (search) {
      query += ' AND (application_no LIKE ? OR candidate_name LIKE ? OR neet_roll_no LIKE ? OR student_email LIKE ? OR student_mobile LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    query += ' ORDER BY id DESC';

    const applications = db.prepare(query).all(...params);
    res.json({ success: true, count: applications.length, applications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Lookup Application by Application No, Email, or NEET Roll No (For Draft Resume / Tracking)
app.get('/api/applications/lookup/:identifier', (req, res) => {
  try {
    const identifier = req.params.identifier.trim();
    const appRecord = db.prepare(`
      SELECT * FROM applications 
      WHERE application_no = ? OR student_email = ? OR neet_roll_no = ? OR student_aadhar = ?
      ORDER BY id DESC LIMIT 1
    `).get(identifier, identifier, identifier, identifier);

    if (!appRecord) {
      return res.status(404).json({ success: false, error: 'Application not found with the provided details.' });
    }

    const marks = db.prepare('SELECT * FROM qualifying_exam_marks WHERE application_id = ?').all(appRecord.id);
    const iaSubjects = db.prepare('SELECT * FROM ia_assessment_subjects WHERE application_id = ?').all(appRecord.id);
    const documents = db.prepare('SELECT * FROM application_documents WHERE application_id = ?').all(appRecord.id);

    res.json({
      success: true,
      application: {
        ...appRecord,
        marks,
        ia_subjects: iaSubjects,
        documents
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Get Single Application by ID
app.get('/api/applications/:id', (req, res) => {
  try {
    const appRecord = db.prepare('SELECT * FROM applications WHERE id = ?').get(req.params.id);
    if (!appRecord) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    const marks = db.prepare('SELECT * FROM qualifying_exam_marks WHERE application_id = ?').all(appRecord.id);
    const iaSubjects = db.prepare('SELECT * FROM ia_assessment_subjects WHERE application_id = ?').all(appRecord.id);
    const documents = db.prepare('SELECT * FROM application_documents WHERE application_id = ?').all(appRecord.id);

    res.json({
      success: true,
      application: {
        ...appRecord,
        marks,
        ia_subjects: iaSubjects,
        documents
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Helper: Save Child Tables
function saveChildRecords(appId, marks, iaSubjects, documents) {
  if (Array.isArray(marks) && marks.length > 0) {
    db.prepare('DELETE FROM qualifying_exam_marks WHERE application_id = ?').run(appId);
    const insertMark = db.prepare(`
      INSERT INTO qualifying_exam_marks (application_id, subject_name, max_marks, marks_obtained, percentage)
      VALUES (?, ?, ?, ?, ?)
    `);
    for (const m of marks) {
      insertMark.run(
        appId,
        m.subject_name || 'Subject',
        m.max_marks !== undefined ? Number(m.max_marks) : 0,
        m.marks_obtained !== undefined ? Number(m.marks_obtained) : 0,
        m.percentage !== undefined ? Number(m.percentage) : 0
      );
    }
  }

  if (Array.isArray(iaSubjects) && iaSubjects.length > 0) {
    db.prepare('DELETE FROM ia_assessment_subjects WHERE application_id = ?').run(appId);
    const insertIA = db.prepare(`
      INSERT INTO ia_assessment_subjects (application_id, subject_name, attendance_percentage, theory_percentage, practical_percentage, lesser_percentage)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const ia of iaSubjects) {
      insertIA.run(
        appId,
        ia.subject_name || 'Subject',
        ia.attendance_percentage !== undefined ? Number(ia.attendance_percentage) : 0,
        ia.theory_percentage !== undefined ? Number(ia.theory_percentage) : 0,
        ia.practical_percentage !== undefined ? Number(ia.practical_percentage) : 0,
        ia.lesser_percentage !== undefined ? Number(ia.lesser_percentage) : 0
      );
    }
  }

  if (Array.isArray(documents) && documents.length > 0) {
    const insertDoc = db.prepare(`
      INSERT INTO application_documents (application_id, doc_type, file_name, file_path, file_size, mime_type, uploaded_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const doc of documents) {
      if (doc.file_path && !doc.id) {
        insertDoc.run(
          appId,
          doc.doc_type || 'document',
          doc.file_name || 'document',
          doc.file_path,
          doc.file_size || 0,
          doc.mime_type || 'application/octet-stream',
          new Date().toISOString()
        );
      }
    }
  }
}

// 7. Save Draft Application
app.post('/api/applications/draft', (req, res) => {
  try {
    const body = req.body;
    const errors = validateApplication(body, true);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const now = new Date().toISOString();
    let appRecord = null;

    if (body.application_no) {
      appRecord = db.prepare('SELECT * FROM applications WHERE application_no = ?').get(body.application_no);
    }

    if (appRecord) {
      // Update existing draft
      const updateStmt = db.prepare(`
        UPDATE applications SET
          roll_no = ?, candidate_photo_url = ?, updated_at = ?,
          mode_of_admission = ?, admission_no = ?, allotted_quota = ?, dme_allotment_date = ?, date_of_admission = ?,
          candidate_name = ?, gender = ?, neet_roll_no = ?, neet_marks = ?, neet_communal_rank = ?, neet_state_rank = ?,
          dme_merit_no = ?, category = ?, is_local = ?, date_of_birth = ?, age_as_on_cutoff = ?, allotment_in = ?,
          allotted_category = ?, student_mobile = ?, student_pan = ?, student_aadhar = ?, student_email = ?,
          student_type = ?, mother_tongue = ?, identification_mark_1 = ?, identification_mark_2 = ?,
          father_name = ?, father_mobile = ?, father_email = ?, father_occupation = ?,
          mother_name = ?, mother_mobile = ?, mother_email = ?, landline_no = ?,
          address_street = ?, address_place = ?, address_district = ?, address_pincode = ?, address_state = ?,
          local_guardian_name = ?, local_guardian_mobile = ?, qualifying_exam_board = ?,
          bond1_submitted = ?, bond1_file_url = ?, bond2_submitted = ?, bond2_file_url = ?,
          bond3_submitted = ?, bond3_file_url = ?, bond4_submitted = ?, bond4_file_url = ?,
          bond5_submitted = ?, bond5_file_url = ?,
          ia_parent_undertaking_agreed = ?, ia_parent_name = ?, ia_parent_mobile = ?, ia_parent_relation = ?,
          ia_parent_signature_url = ?, ia_parent_date = ?,
          annexure1_undertaking_agreed = ?, annexure1_student_name = ?, annexure1_student_signature_url = ?,
          annexure1_parent_name = ?, annexure1_parent_signature_url = ?,
          course_undertaking_agreed = ?, course_undertaking_date = ?, course_candidate_name = ?, course_candidate_signature_url = ?,
          course_parent_relation = ?, course_parent_name = ?, course_parent_signature_url = ?, course_parent_date = ?,
          dress_code_agreed = ?, dress_code_date = ?, dress_code_candidate_name = ?, dress_code_candidate_signature_url = ?,
          dress_code_parent_relation = ?, dress_code_parent_name = ?, dress_code_parent_signature_url = ?, dress_code_parent_date = ?,
          rules_declaration_agreed = ?, rules_declaration_date = ?, rules_student_name = ?, rules_student_signature_url = ?,
          rules_parent_name = ?, rules_parent_signature_url = ?,
          candidate_declaration_agreed = ?, candidate_decl_place = ?, candidate_decl_date = ?, candidate_decl_name = ?, candidate_decl_signature_url = ?,
          parent_declaration_agreed = ?, parent_decl_place = ?, parent_decl_date = ?, parent_decl_name = ?, parent_decl_relation = ?, parent_decl_signature_url = ?
        WHERE id = ?
      `);

      updateStmt.run(
        body.roll_no || '', body.candidate_photo_url || '', now,
        body.mode_of_admission || '', body.admission_no || '', body.allotted_quota || '', body.dme_allotment_date || '', body.date_of_admission || '',
        body.candidate_name || '', body.gender || '', body.neet_roll_no || '', body.neet_marks ? Number(body.neet_marks) : null, body.neet_communal_rank || '', body.neet_state_rank || '',
        body.dme_merit_no || '', body.category || '', body.is_local || '', body.date_of_birth || '', body.age_as_on_cutoff ? Number(body.age_as_on_cutoff) : null, body.allotment_in || '',
        body.allotted_category || '', body.student_mobile || '', body.student_pan || '', body.student_aadhar || '', body.student_email || '',
        body.student_type || '', body.mother_tongue || '', body.identification_mark_1 || '', body.identification_mark_2 || '',
        body.father_name || '', body.father_mobile || '', body.father_email || '', body.father_occupation || '',
        body.mother_name || '', body.mother_mobile || '', body.mother_email || '', body.landline_no || '',
        body.address_street || '', body.address_place || '', body.address_district || '', body.address_pincode || '', body.address_state || '',
        body.local_guardian_name || '', body.local_guardian_mobile || '', body.qualifying_exam_board || '',
        body.bond1_submitted || 'NO', body.bond1_file_url || '', body.bond2_submitted || 'NO', body.bond2_file_url || '',
        body.bond3_submitted || 'NO', body.bond3_file_url || '', body.bond4_submitted || 'NO', body.bond4_file_url || '',
        body.bond5_submitted || 'NO', body.bond5_file_url || '',
        body.ia_parent_undertaking_agreed ? 1 : 0, body.ia_parent_name || '', body.ia_parent_mobile || '', body.ia_parent_relation || '',
        body.ia_parent_signature_url || '', body.ia_parent_date || '',
        body.annexure1_undertaking_agreed ? 1 : 0, body.annexure1_student_name || '', body.annexure1_student_signature_url || '',
        body.annexure1_parent_name || '', body.annexure1_parent_signature_url || '',
        body.course_undertaking_agreed ? 1 : 0, body.course_undertaking_date || '', body.course_candidate_name || '', body.course_candidate_signature_url || '',
        body.course_parent_relation || '', body.course_parent_name || '', body.course_parent_signature_url || '', body.course_parent_date || '',
        body.dress_code_agreed ? 1 : 0, body.dress_code_date || '', body.dress_code_candidate_name || '', body.dress_code_candidate_signature_url || '',
        body.dress_code_parent_relation || '', body.dress_code_parent_name || '', body.dress_code_parent_signature_url || '', body.dress_code_parent_date || '',
        body.rules_declaration_agreed ? 1 : 0, body.rules_declaration_date || '', body.rules_student_name || '', body.rules_student_signature_url || '',
        body.rules_parent_name || '', body.rules_parent_signature_url || '',
        body.candidate_declaration_agreed ? 1 : 0, body.candidate_decl_place || '', body.candidate_decl_date || '', body.candidate_decl_name || '', body.candidate_decl_signature_url || '',
        body.parent_declaration_agreed ? 1 : 0, body.parent_decl_place || '', body.parent_decl_date || '', body.parent_decl_name || '', body.parent_decl_relation || '', body.parent_decl_signature_url || '',
        appRecord.id
      );

      saveChildRecords(appRecord.id, body.marks, body.ia_subjects, body.documents);

      return res.json({
        success: true,
        message: 'Draft saved successfully.',
        application_no: appRecord.application_no,
        id: appRecord.id
      });
    } else {
      // Create new draft
      const applicationNo = generateApplicationNo();
      const insertStmt = db.prepare(`
        INSERT INTO applications (
          application_no, roll_no, candidate_photo_url, status, created_at, updated_at,
          mode_of_admission, admission_no, allotted_quota, dme_allotment_date, date_of_admission,
          candidate_name, gender, neet_roll_no, neet_marks, neet_communal_rank, neet_state_rank,
          dme_merit_no, category, is_local, date_of_birth, age_as_on_cutoff, allotment_in,
          allotted_category, student_mobile, student_pan, student_aadhar, student_email,
          student_type, mother_tongue, identification_mark_1, identification_mark_2,
          father_name, father_mobile, father_email, father_occupation,
          mother_name, mother_mobile, mother_email, landline_no,
          address_street, address_place, address_district, address_pincode, address_state,
          local_guardian_name, local_guardian_mobile, qualifying_exam_board,
          bond1_submitted, bond1_file_url, bond2_submitted, bond2_file_url,
          bond3_submitted, bond3_file_url, bond4_submitted, bond4_file_url,
          bond5_submitted, bond5_file_url,
          ia_parent_undertaking_agreed, ia_parent_name, ia_parent_mobile, ia_parent_relation,
          ia_parent_signature_url, ia_parent_date,
          annexure1_undertaking_agreed, annexure1_student_name, annexure1_student_signature_url,
          annexure1_parent_name, annexure1_parent_signature_url,
          course_undertaking_agreed, course_undertaking_date, course_candidate_name, course_candidate_signature_url,
          course_parent_relation, course_parent_name, course_parent_signature_url, course_parent_date,
          dress_code_agreed, dress_code_date, dress_code_candidate_name, dress_code_candidate_signature_url,
          dress_code_parent_relation, dress_code_parent_name, dress_code_parent_signature_url, dress_code_parent_date,
          rules_declaration_agreed, rules_declaration_date, rules_student_name, rules_student_signature_url,
          rules_parent_name, rules_parent_signature_url,
          candidate_declaration_agreed, candidate_decl_place, candidate_decl_date, candidate_decl_name, candidate_decl_signature_url,
          parent_declaration_agreed, parent_decl_place, parent_decl_date, parent_decl_name, parent_decl_relation, parent_decl_signature_url
        ) VALUES (
          ?, ?, ?, 'draft', ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?,
          ?, ?, ?, ?,
          ?, ?,
          ?, ?, ?,
          ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?
        )
      `);

      const result = insertStmt.run(
        applicationNo, body.roll_no || '', body.candidate_photo_url || '', now, now,
        body.mode_of_admission || '', body.admission_no || '', body.allotted_quota || '', body.dme_allotment_date || '', body.date_of_admission || '',
        body.candidate_name || '', body.gender || '', body.neet_roll_no || '', body.neet_marks ? Number(body.neet_marks) : null, body.neet_communal_rank || '', body.neet_state_rank || '',
        body.dme_merit_no || '', body.category || '', body.is_local || '', body.date_of_birth || '', body.age_as_on_cutoff ? Number(body.age_as_on_cutoff) : null, body.allotment_in || '',
        body.allotted_category || '', body.student_mobile || '', body.student_pan || '', body.student_aadhar || '', body.student_email || '',
        body.student_type || '', body.mother_tongue || '', body.identification_mark_1 || '', body.identification_mark_2 || '',
        body.father_name || '', body.father_mobile || '', body.father_email || '', body.father_occupation || '',
        body.mother_name || '', body.mother_mobile || '', body.mother_email || '', body.landline_no || '',
        body.address_street || '', body.address_place || '', body.address_district || '', body.address_pincode || '', body.address_state || '',
        body.local_guardian_name || '', body.local_guardian_mobile || '', body.qualifying_exam_board || '',
        body.bond1_submitted || 'NO', body.bond1_file_url || '', body.bond2_submitted || 'NO', body.bond2_file_url || '',
        body.bond3_submitted || 'NO', body.bond3_file_url || '', body.bond4_submitted || 'NO', body.bond4_file_url || '',
        body.bond5_submitted || 'NO', body.bond5_file_url || '',
        body.ia_parent_undertaking_agreed ? 1 : 0, body.ia_parent_name || '', body.ia_parent_mobile || '', body.ia_parent_relation || '',
        body.ia_parent_signature_url || '', body.ia_parent_date || '',
        body.annexure1_undertaking_agreed ? 1 : 0, body.annexure1_student_name || '', body.annexure1_student_signature_url || '',
        body.annexure1_parent_name || '', body.annexure1_parent_signature_url || '',
        body.course_undertaking_agreed ? 1 : 0, body.course_undertaking_date || '', body.course_candidate_name || '', body.course_candidate_signature_url || '',
        body.course_parent_relation || '', body.course_parent_name || '', body.course_parent_signature_url || '', body.course_parent_date || '',
        body.dress_code_agreed ? 1 : 0, body.dress_code_date || '', body.dress_code_candidate_name || '', body.dress_code_candidate_signature_url || '',
        body.dress_code_parent_relation || '', body.dress_code_parent_name || '', body.dress_code_parent_signature_url || '', body.dress_code_parent_date || '',
        body.rules_declaration_agreed ? 1 : 0, body.rules_declaration_date || '', body.rules_student_name || '', body.rules_student_signature_url || '',
        body.rules_parent_name || '', body.rules_parent_signature_url || '',
        body.candidate_declaration_agreed ? 1 : 0, body.candidate_decl_place || '', body.candidate_decl_date || '', body.candidate_decl_name || '', body.candidate_decl_signature_url || '',
        body.parent_declaration_agreed ? 1 : 0, body.parent_decl_place || '', body.parent_decl_date || '', body.parent_decl_name || '', body.parent_decl_relation || '', body.parent_decl_signature_url || ''
      );

      saveChildRecords(result.lastInsertRowid, body.marks, body.ia_subjects, body.documents);

      return res.status(201).json({
        success: true,
        message: 'New draft created successfully.',
        application_no: applicationNo,
        id: Number(result.lastInsertRowid)
      });
    }
  } catch (err) {
    console.error('Error in /api/applications/draft:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Submit Final Application
app.post('/api/applications', (req, res) => {
  try {
    const body = req.body;
    const errors = validateApplication(body, false);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Check duplicate submission by NEET Roll No
    if (body.neet_roll_no) {
      const duplicate = db.prepare(`
        SELECT id, application_no FROM applications 
        WHERE neet_roll_no = ? AND status IN ('submitted', 'verified', 'approved') AND application_no != ?
      `).get(body.neet_roll_no, body.application_no || '');

      if (duplicate) {
        return res.status(409).json({
          success: false,
          error: `An application (${duplicate.application_no}) has already been submitted with NEET Roll No: ${body.neet_roll_no}. Duplicate submissions are prevented.`
        });
      }
    }

    const now = new Date().toISOString();
    let appId = null;
    let applicationNo = body.application_no;

    if (applicationNo) {
      const existing = db.prepare('SELECT id FROM applications WHERE application_no = ?').get(applicationNo);
      if (existing) {
        appId = existing.id;
      }
    }

    if (!applicationNo || !appId) {
      applicationNo = generateApplicationNo();
    }

    if (appId) {
      // Update existing record and set status to 'submitted'
      const updateStmt = db.prepare(`
        UPDATE applications SET
          status = 'submitted', submission_date = ?, updated_at = ?,
          roll_no = ?, candidate_photo_url = ?,
          mode_of_admission = ?, admission_no = ?, allotted_quota = ?, dme_allotment_date = ?, date_of_admission = ?,
          candidate_name = ?, gender = ?, neet_roll_no = ?, neet_marks = ?, neet_communal_rank = ?, neet_state_rank = ?,
          dme_merit_no = ?, category = ?, is_local = ?, date_of_birth = ?, age_as_on_cutoff = ?, allotment_in = ?,
          allotted_category = ?, student_mobile = ?, student_pan = ?, student_aadhar = ?, student_email = ?,
          student_type = ?, mother_tongue = ?, identification_mark_1 = ?, identification_mark_2 = ?,
          father_name = ?, father_mobile = ?, father_email = ?, father_occupation = ?,
          mother_name = ?, mother_mobile = ?, mother_email = ?, landline_no = ?,
          address_street = ?, address_place = ?, address_district = ?, address_pincode = ?, address_state = ?,
          local_guardian_name = ?, local_guardian_mobile = ?, qualifying_exam_board = ?,
          bond1_submitted = ?, bond1_file_url = ?, bond2_submitted = ?, bond2_file_url = ?,
          bond3_submitted = ?, bond3_file_url = ?, bond4_submitted = ?, bond4_file_url = ?,
          bond5_submitted = ?, bond5_file_url = ?,
          ia_parent_undertaking_agreed = ?, ia_parent_name = ?, ia_parent_mobile = ?, ia_parent_relation = ?,
          ia_parent_signature_url = ?, ia_parent_date = ?,
          annexure1_undertaking_agreed = ?, annexure1_student_name = ?, annexure1_student_signature_url = ?,
          annexure1_parent_name = ?, annexure1_parent_signature_url = ?,
          course_undertaking_agreed = ?, course_undertaking_date = ?, course_candidate_name = ?, course_candidate_signature_url = ?,
          course_parent_relation = ?, course_parent_name = ?, course_parent_signature_url = ?, course_parent_date = ?,
          dress_code_agreed = ?, dress_code_date = ?, dress_code_candidate_name = ?, dress_code_candidate_signature_url = ?,
          dress_code_parent_relation = ?, dress_code_parent_name = ?, dress_code_parent_signature_url = ?, dress_code_parent_date = ?,
          rules_declaration_agreed = ?, rules_declaration_date = ?, rules_student_name = ?, rules_student_signature_url = ?,
          rules_parent_name = ?, rules_parent_signature_url = ?,
          candidate_declaration_agreed = ?, candidate_decl_place = ?, candidate_decl_date = ?, candidate_decl_name = ?, candidate_decl_signature_url = ?,
          parent_declaration_agreed = ?, parent_decl_place = ?, parent_decl_date = ?, parent_decl_name = ?, parent_decl_relation = ?, parent_decl_signature_url = ?
        WHERE id = ?
      `);

      updateStmt.run(
        now, now,
        body.roll_no || '', body.candidate_photo_url || '',
        body.mode_of_admission || '', body.admission_no || '', body.allotted_quota || '', body.dme_allotment_date || '', body.date_of_admission || '',
        body.candidate_name || '', body.gender || '', body.neet_roll_no || '', body.neet_marks ? Number(body.neet_marks) : null, body.neet_communal_rank || '', body.neet_state_rank || '',
        body.dme_merit_no || '', body.category || '', body.is_local || '', body.date_of_birth || '', body.age_as_on_cutoff ? Number(body.age_as_on_cutoff) : null, body.allotment_in || '',
        body.allotted_category || '', body.student_mobile || '', body.student_pan || '', body.student_aadhar || '', body.student_email || '',
        body.student_type || '', body.mother_tongue || '', body.identification_mark_1 || '', body.identification_mark_2 || '',
        body.father_name || '', body.father_mobile || '', body.father_email || '', body.father_occupation || '',
        body.mother_name || '', body.mother_mobile || '', body.mother_email || '', body.landline_no || '',
        body.address_street || '', body.address_place || '', body.address_district || '', body.address_pincode || '', body.address_state || '',
        body.local_guardian_name || '', body.local_guardian_mobile || '', body.qualifying_exam_board || '',
        body.bond1_submitted || 'NO', body.bond1_file_url || '', body.bond2_submitted || 'NO', body.bond2_file_url || '',
        body.bond3_submitted || 'NO', body.bond3_file_url || '', body.bond4_submitted || 'NO', body.bond4_file_url || '',
        body.bond5_submitted || 'NO', body.bond5_file_url || '',
        body.ia_parent_undertaking_agreed ? 1 : 0, body.ia_parent_name || '', body.ia_parent_mobile || '', body.ia_parent_relation || '',
        body.ia_parent_signature_url || '', body.ia_parent_date || '',
        body.annexure1_undertaking_agreed ? 1 : 0, body.annexure1_student_name || '', body.annexure1_student_signature_url || '',
        body.annexure1_parent_name || '', body.annexure1_parent_signature_url || '',
        body.course_undertaking_agreed ? 1 : 0, body.course_undertaking_date || '', body.course_candidate_name || '', body.course_candidate_signature_url || '',
        body.course_parent_relation || '', body.course_parent_name || '', body.course_parent_signature_url || '', body.course_parent_date || '',
        body.dress_code_agreed ? 1 : 0, body.dress_code_date || '', body.dress_code_candidate_name || '', body.dress_code_candidate_signature_url || '',
        body.dress_code_parent_relation || '', body.dress_code_parent_name || '', body.dress_code_parent_signature_url || '', body.dress_code_parent_date || '',
        body.rules_declaration_agreed ? 1 : 0, body.rules_declaration_date || '', body.rules_student_name || '', body.rules_student_signature_url || '',
        body.rules_parent_name || '', body.rules_parent_signature_url || '',
        body.candidate_declaration_agreed ? 1 : 0, body.candidate_decl_place || '', body.candidate_decl_date || '', body.candidate_decl_name || '', body.candidate_decl_signature_url || '',
        body.parent_declaration_agreed ? 1 : 0, body.parent_decl_place || '', body.parent_decl_date || '', body.parent_decl_name || '', body.parent_decl_relation || '', body.parent_decl_signature_url || '',
        appId
      );
    } else {
      // Insert new submitted record
      const insertStmt = db.prepare(`
        INSERT INTO applications (
          application_no, roll_no, candidate_photo_url, status, submission_date, created_at, updated_at,
          mode_of_admission, admission_no, allotted_quota, dme_allotment_date, date_of_admission,
          candidate_name, gender, neet_roll_no, neet_marks, neet_communal_rank, neet_state_rank,
          dme_merit_no, category, is_local, date_of_birth, age_as_on_cutoff, allotment_in,
          allotted_category, student_mobile, student_pan, student_aadhar, student_email,
          student_type, mother_tongue, identification_mark_1, identification_mark_2,
          father_name, father_mobile, father_email, father_occupation,
          mother_name, mother_mobile, mother_email, landline_no,
          address_street, address_place, address_district, address_pincode, address_state,
          local_guardian_name, local_guardian_mobile, qualifying_exam_board,
          bond1_submitted, bond1_file_url, bond2_submitted, bond2_file_url,
          bond3_submitted, bond3_file_url, bond4_submitted, bond4_file_url,
          bond5_submitted, bond5_file_url,
          ia_parent_undertaking_agreed, ia_parent_name, ia_parent_mobile, ia_parent_relation,
          ia_parent_signature_url, ia_parent_date,
          annexure1_undertaking_agreed, annexure1_student_name, annexure1_student_signature_url,
          annexure1_parent_name, annexure1_parent_signature_url,
          course_undertaking_agreed, course_undertaking_date, course_candidate_name, course_candidate_signature_url,
          course_parent_relation, course_parent_name, course_parent_signature_url, course_parent_date,
          dress_code_agreed, dress_code_date, dress_code_candidate_name, dress_code_candidate_signature_url,
          dress_code_parent_relation, dress_code_parent_name, dress_code_parent_signature_url, dress_code_parent_date,
          rules_declaration_agreed, rules_declaration_date, rules_student_name, rules_student_signature_url,
          rules_parent_name, rules_parent_signature_url,
          candidate_declaration_agreed, candidate_decl_place, candidate_decl_date, candidate_decl_name, candidate_decl_signature_url,
          parent_declaration_agreed, parent_decl_place, parent_decl_date, parent_decl_name, parent_decl_relation, parent_decl_signature_url
        ) VALUES (
          ?, ?, ?, 'submitted', ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?,
          ?, ?, ?, ?,
          ?, ?,
          ?, ?, ?,
          ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?
        )
      `);

      const result = insertStmt.run(
        applicationNo, body.roll_no || '', body.candidate_photo_url || '', now, now, now,
        body.mode_of_admission || '', body.admission_no || '', body.allotted_quota || '', body.dme_allotment_date || '', body.date_of_admission || '',
        body.candidate_name || '', body.gender || '', body.neet_roll_no || '', body.neet_marks ? Number(body.neet_marks) : null, body.neet_communal_rank || '', body.neet_state_rank || '',
        body.dme_merit_no || '', body.category || '', body.is_local || '', body.date_of_birth || '', body.age_as_on_cutoff ? Number(body.age_as_on_cutoff) : null, body.allotment_in || '',
        body.allotted_category || '', body.student_mobile || '', body.student_pan || '', body.student_aadhar || '', body.student_email || '',
        body.student_type || '', body.mother_tongue || '', body.identification_mark_1 || '', body.identification_mark_2 || '',
        body.father_name || '', body.father_mobile || '', body.father_email || '', body.father_occupation || '',
        body.mother_name || '', body.mother_mobile || '', body.mother_email || '', body.landline_no || '',
        body.address_street || '', body.address_place || '', body.address_district || '', body.address_pincode || '', body.address_state || '',
        body.local_guardian_name || '', body.local_guardian_mobile || '', body.qualifying_exam_board || '',
        body.bond1_submitted || 'NO', body.bond1_file_url || '', body.bond2_submitted || 'NO', body.bond2_file_url || '',
        body.bond3_submitted || 'NO', body.bond3_file_url || '', body.bond4_submitted || 'NO', body.bond4_file_url || '',
        body.bond5_submitted || 'NO', body.bond5_file_url || '',
        body.ia_parent_undertaking_agreed ? 1 : 0, body.ia_parent_name || '', body.ia_parent_mobile || '', body.ia_parent_relation || '',
        body.ia_parent_signature_url || '', body.ia_parent_date || '',
        body.annexure1_undertaking_agreed ? 1 : 0, body.annexure1_student_name || '', body.annexure1_student_signature_url || '',
        body.annexure1_parent_name || '', body.annexure1_parent_signature_url || '',
        body.course_undertaking_agreed ? 1 : 0, body.course_undertaking_date || '', body.course_candidate_name || '', body.course_candidate_signature_url || '',
        body.course_parent_relation || '', body.course_parent_name || '', body.course_parent_signature_url || '', body.course_parent_date || '',
        body.dress_code_agreed ? 1 : 0, body.dress_code_date || '', body.dress_code_candidate_name || '', body.dress_code_candidate_signature_url || '',
        body.dress_code_parent_relation || '', body.dress_code_parent_name || '', body.dress_code_parent_signature_url || '', body.dress_code_parent_date || '',
        body.rules_declaration_agreed ? 1 : 0, body.rules_declaration_date || '', body.rules_student_name || '', body.rules_student_signature_url || '',
        body.rules_parent_name || '', body.rules_parent_signature_url || '',
        body.candidate_declaration_agreed ? 1 : 0, body.candidate_decl_place || '', body.candidate_decl_date || '', body.candidate_decl_name || '', body.candidate_decl_signature_url || '',
        body.parent_declaration_agreed ? 1 : 0, body.parent_decl_place || '', body.parent_decl_date || '', body.parent_decl_name || '', body.parent_decl_relation || '', body.parent_decl_signature_url || ''
      );
      appId = Number(result.lastInsertRowid);
    }

    saveChildRecords(appId, body.marks, body.ia_subjects, body.documents);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Your submission has been securely recorded.',
      application_no: applicationNo,
      id: appId,
      submission_date: now
    });
  } catch (err) {
    console.error('Error in /api/applications:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Office Use Verification Endpoint (Admin Officer / Dean)
app.post('/api/applications/:id/verify', (req, res) => {
  try {
    const { id } = req.params;
    const {
      admission_no,
      office_verified_by,
      office_verification_status,
      office_verification_remarks,
      dean_approval_status,
      dean_remarks,
      status
    } = req.body;

    const existing = db.prepare('SELECT id FROM applications WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    const now = new Date().toISOString();
    const updateStmt = db.prepare(`
      UPDATE applications SET
        admission_no = COALESCE(?, admission_no),
        office_verified_by = ?,
        office_verification_status = ?,
        office_verification_remarks = ?,
        office_verification_date = ?,
        dean_approval_status = ?,
        dean_remarks = ?,
        dean_approval_date = ?,
        status = COALESCE(?, status),
        updated_at = ?
      WHERE id = ?
    `);

    updateStmt.run(
      admission_no || null,
      office_verified_by || 'Administrative Officer (College)',
      office_verification_status || 'Verified',
      office_verification_remarks || '',
      now,
      dean_approval_status || 'Approved',
      dean_remarks || '',
      now,
      status || 'verified',
      now,
      id
    );

    res.json({
      success: true,
      message: 'Office verification and Dean review updated successfully.',
      id
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve client production build if available
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      return res.sendFile(path.join(clientDistPath, 'index.html'));
    }
    next();
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`RMC Application Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
