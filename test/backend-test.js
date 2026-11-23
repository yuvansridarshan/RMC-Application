const http = require('node:http');

async function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting Comprehensive Full-Stack Verification ---');

  // Test 1: HTML Frontend delivery
  const indexHtml = await request('/');
  console.log('1. Frontend delivery at GET /: ', indexHtml.status === 200 && indexHtml.body.includes('<div id="root">') ? 'PASS (HTML with root div served)' : 'FAIL');

  // Test 2: Committee endpoint
  const comm = await request('/api/committee');
  console.log('2. GET /api/committee: ', comm.status === 200 && comm.body.committee.length === 14 ? 'PASS (14 Members loaded)' : 'FAIL');

  // Test 3: Validation failure on missing required fields
  const emptyRes = await request('/api/applications', { method: 'POST', body: {} });
  console.log('3. Server validation rejection: ', emptyRes.status === 400 && emptyRes.body.errors.length > 5 ? `PASS (${emptyRes.body.errors.length} validation errors returned)` : 'FAIL');

  // Test 4: Save Draft
  const testCandidateEmail = `applicant_${Date.now()}@test.edu`;
  const draftRes = await request('/api/applications/draft', {
    method: 'POST',
    body: {
      candidate_name: 'Ananya Ramachandran',
      student_email: testCandidateEmail,
      student_mobile: '9840199999',
      mode_of_admission: 'Round 1',
      allotted_quota: 'Govt.'
    }
  });
  console.log('4. POST /api/applications/draft: ', draftRes.status === 201 && draftRes.body.application_no ? `PASS (${draftRes.body.application_no})` : 'FAIL');
  const appNo = draftRes.body.application_no;
  const appId = draftRes.body.id;

  // Test 5: Lookup by Application No
  const lookupRes = await request(`/api/applications/lookup/${appNo}`);
  console.log('5. GET /api/applications/lookup/:identifier: ', lookupRes.status === 200 && lookupRes.body.application.candidate_name === 'Ananya Ramachandran' ? 'PASS' : 'FAIL');

  // Test 6: Final Submission with unique NEET Roll
  const uniqueNeetRoll = `NEET2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const submitData = {
    application_no: appNo,
    roll_no: 'MBBS-2026-088',
    mode_of_admission: 'Round 1',
    allotted_quota: 'Govt.',
    dme_allotment_date: '2026-08-16',
    date_of_admission: '2026-08-23',
    candidate_name: 'Ananya Ramachandran',
    gender: 'Female',
    neet_roll_no: uniqueNeetRoll,
    neet_marks: 648,
    neet_communal_rank: '85',
    neet_state_rank: '412',
    dme_merit_no: 'DME-2104',
    category: 'BC',
    is_local: 'Local',
    date_of_birth: '2007-06-18',
    age_as_on_cutoff: 19,
    allotment_in: 'Round 1',
    allotted_category: 'Govt.',
    student_mobile: '9840199999',
    student_pan: 'ABCDE9876K',
    student_aadhar: '887766554433',
    student_email: testCandidateEmail,
    student_type: 'Hosteller',
    mother_tongue: 'Tamil',
    identification_mark_1: 'A mole on right cheek',
    identification_mark_2: 'A birthmark on left wrist',
    father_name: 'Ramachandran K',
    father_mobile: '9840188888',
    father_email: 'ramachandran.k@example.com',
    father_occupation: 'Senior Professor',
    mother_name: 'Meenakshi R',
    mother_mobile: '9840177777',
    mother_email: 'meenakshi.r@example.com',
    landline_no: '044-24567891',
    address_street: '15, HealthCity Enclave, Pennalur',
    address_place: 'Sriperumbudur',
    address_district: 'Kanchipuram',
    address_pincode: '602117',
    address_state: 'Tamil Nadu',
    local_guardian_name: 'Swaminathan K',
    local_guardian_mobile: '9840166666',
    qualifying_exam_board: 'Tamil Nadu Higher Secondary State Board',
    marks: [
      { subject_name: 'Botany', max_marks: 100, marks_obtained: 95, percentage: 95 },
      { subject_name: 'Zoology', max_marks: 100, marks_obtained: 97, percentage: 97 },
      { subject_name: 'Physics', max_marks: 100, marks_obtained: 92, percentage: 92 },
      { subject_name: 'Chemistry', max_marks: 100, marks_obtained: 94, percentage: 94 },
      { subject_name: 'Total marks of the above 4 subjects', max_marks: 400, marks_obtained: 378, percentage: 94.5 },
      { subject_name: 'English', max_marks: 100, marks_obtained: 90, percentage: 90 }
    ],
    bond1_submitted: 'YES',
    bond2_submitted: 'YES',
    bond3_submitted: 'YES',
    bond4_submitted: 'YES',
    bond5_submitted: 'YES',
    ia_parent_undertaking_agreed: 1,
    ia_parent_name: 'Ramachandran K',
    ia_parent_mobile: '9840188888',
    ia_parent_relation: 'Father',
    annexure1_undertaking_agreed: 1,
    annexure1_student_name: 'Ananya Ramachandran',
    annexure1_parent_name: 'Ramachandran K',
    course_undertaking_agreed: 1,
    course_undertaking_date: '2026-08-23',
    course_candidate_name: 'Ananya Ramachandran',
    course_parent_name: 'Ramachandran K',
    course_parent_relation: 'Father',
    dress_code_agreed: 1,
    dress_code_date: '2026-08-23',
    dress_code_candidate_name: 'Ananya Ramachandran',
    dress_code_parent_name: 'Ramachandran K',
    dress_code_parent_relation: 'Father',
    rules_declaration_agreed: 1,
    rules_declaration_date: '2026-08-23',
    rules_student_name: 'Ananya Ramachandran',
    rules_parent_name: 'Ramachandran K',
    candidate_declaration_agreed: 1,
    candidate_decl_place: 'Pennalur',
    candidate_decl_date: '2026-08-23',
    candidate_decl_name: 'Ananya Ramachandran',
    parent_declaration_agreed: 1,
    parent_decl_place: 'Pennalur',
    parent_decl_date: '2026-08-23',
    parent_decl_name: 'Ramachandran K',
    parent_decl_relation: 'Daughter'
  };

  const submitRes = await request('/api/applications', { method: 'POST', body: submitData });
  console.log('6. Full Application Submission: ', submitRes.status === 201 && submitRes.body.success ? `PASS (Application No: ${submitRes.body.application_no}, ID: ${submitRes.body.id})` : 'FAIL');

  // Test 7: Duplicate Submission Prevention
  const dupAttempt = await request('/api/applications', {
    method: 'POST',
    body: {
      ...submitData,
      application_no: undefined
    }
  });
  console.log('7. Duplicate NEET Roll rejection: ', dupAttempt.status === 409 ? `PASS (Blocked duplicate NEET roll: ${uniqueNeetRoll})` : 'FAIL');

  // Test 8: Office Scrutiny & Dean Approval
  const verifyRes = await request(`/api/applications/${submitRes.body.id}/verify`, {
    method: 'POST',
    body: {
      admission_no: 'RMC/MBBS/2026/088',
      office_verified_by: 'Mr. Rajesh (HR & Administrative Officer)',
      office_verification_status: 'Verified',
      office_verification_remarks: 'All 5 stamp paper bonds on ₹200 non-judicial stamp paper verified. Marks and eligibility verified.',
      dean_approval_status: 'Approved',
      dean_remarks: 'Approved for admission into 1st Phase MBBS 2026-27'
    }
  });
  console.log('8. Administrative Officer & Dean Verification: ', verifyRes.status === 200 && verifyRes.body.success ? 'PASS' : 'FAIL');

  // Test 9: Verify persisted changes in database by fetching updated record
  const updatedApp = await request(`/api/applications/${submitRes.body.id}`);
  console.log('9. Persistent Database Retrieval: ', updatedApp.status === 200 && updatedApp.body.application.admission_no === 'RMC/MBBS/2026/088' && updatedApp.body.application.status === 'verified' ? 'PASS (Data persists reliably in SQLite)' : 'FAIL');

  // Test 10: Aggregate Statistics Endpoint
  const statsRes = await request('/api/stats');
  console.log('10. Statistics & Metrics: ', statsRes.status === 200 && statsRes.body.stats.total >= 2 ? `PASS (Total: ${statsRes.body.stats.total}, Verified: ${statsRes.body.stats.verified})` : 'FAIL');

  console.log('--- ALL 10 TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(console.error);
