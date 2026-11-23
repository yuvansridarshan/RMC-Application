# Rajalakshmi Medical College Hospital & Research Institute (RMC)
## MBBS Admission Application Portal 2026–27

A full-stack, responsive, and secure web application meticulously engineered based on the official 14-page MBBS Admission Application Form of **Rajalakshmi Medical College Hospital & Research Institute (Pennalur, Sriperumbudur, Tamil Nadu)**.

---

### Key Capabilities & Architecture

- **Frontend**: React, Tailwind CSS, Lucide Icons, Vite.
  - Multi-step intuitive wizard reproducing all 14 pages and every field accurately.
  - Real-time client-side calculation of qualifying marks, aggregate, and percentage.
  - Live eligibility verification against **The Tamil Nadu Dr. M.G.R. Medical University** minimum regulations (OC/EWS: 50%, BC/MBC/SC/ST: 40%, PWD: 45%).
  - Photo and document uploads with preview.
  - Authentic 14-Page printable document replica view (`PrintableApplication.jsx`) formatted for standard A4 printing.
  - Office / Admin Scrutiny Portal for Administrative Officer and Dean verification.
  - Resume Draft & Application Tracking by Application ID, Email, or NEET Roll No.
  - Annexure III Anti-Ragging Committee 14-member interactive contact directory. Yuvan

- **Backend**: Node.js & Express.
  - Built-in `node:sqlite` relational database running in WAL mode with foreign key constraints.
  - Multer-based secure file uploads with file type restrictions (JPEG, PNG, WEBP, PDF, DOCX) and size limits.
  - Server-side validation on every mandatory field, category regulations, and required undertakings.
  - Anti-duplicate submission protection based on NEET Roll No and Aadhaar.
  - Unique Application ID generator (`RMC-2026-XXXX-XXX`).

- **Database**:
  - Relational tables: `applications`, `qualifying_exam_marks`, `ia_assessment_subjects`, `application_documents`, `anti_ragging_committee`.
  - Durable persistence on disk at `data/rmc_applications.db`.

---

### Exact Form Mapping (Pages 1–14)

1. **Cover Page (Page 1)**: Roll No. box, Candidate Name, Passport Photograph upload frame, College credentials, tagline (*LEARN · CARE · HEAL*).
2. **Admission & Candidate Details (Page 2)**:
   - Application No, Mode of Admission (Round 1 / Round 2 / Mop-up Round / Stray Round).
   - Admission Table: Admission No (Office use), Allotted Quota (Govt. / Magt. / NRI), DME Allotment Date, Date of Admission.
   - Candidate Details: Name (as in TC), Gender, NEET Roll No, NEET Marks (/720), Communal Rank, State Rank, DME Merit No, Category (Gen / BC / MBC / SC / ST / EWS / PWD), Local/Non-Local, Date of Birth, Completed age as on 31.12.2026, Allotment Round, Allotted Category, Student Mobile, PAN, Aadhaar, Email, Hosteller/Day Scholar, Mother Tongue, 2 Identification Marks.
3. **Parent / Guardian Details & Qualifying Exam (Page 3)**:
   - Father's & Mother's Names, Mobiles, Emails, Occupation, Landline, Full Residential Address (Street, Place, District, State, Pin Code), Local Guardian Name & Mobile.
   - Qualifying Exam Board, Marks Grid (Botany, Zoology, Physics, Chemistry, Total 4 Subjects, English) with auto-percentage calculation and university regulation validation.
4. **Bonds & Parent IA Undertaking (Page 4)**:
   - 5 Notarized Bonds on ₹200 Non-Judicial stamp paper checklist with Yes/No status and file upload:
     1. Genuine certificates bond
     2. Non-seat blocking declaration
     3. ₹10,00,000/- course discontinuance bond
     4. Tuition fee and vacant seat affidavit
     5. Anti-ragging affidavit
   - Parent's Undertaking on 80% attendance and 50% Internal Assessment marks with MBBS subject table and legal acknowledgment.
5. **Annexures I, II & III (Pages 5–11)**:
   - Annexure I: Code of conduct (offences a–h reported to police), Ragging prohibition, 23 accommodation rules, signed undertaking.
   - Page 8: Course Completion Undertaking to study full duration without absence as per NMC & University norms.
   - Annexure II: Medical Students' Dress Code Undertaking (Men, Women, Both, Prohibited clothing, electronic devices confiscation clause).
   - Annexure III: Anti-Ragging Committee (14 designated members with phone numbers and email addresses).
6. **Student Rules, Leave & Final Declarations (Pages 12–14)**:
   - Timings, Movement Register, visiting hours, 2nd Saturday home visit rules, mandatory 5–7 PM Library hours.
   - Leave rules, WhatsApp video call parent verification, WhatsApp group daily attendance.
   - Candidate's Declaration (Clauses 1–6 in full: June 1 fee deadline, truthfulness, strike ban, grievances through Dean, NMC compliance).
   - Parent's Declaration & For Office Use scrutiny sections.

---

### How to Run

1. **Start Server**:
   ```bash
   node server/index.js
   ```
   Server runs at: `http://localhost:5000`

2. **Run Tests**:
   ```bash
   node test/backend-test.js
   ```

3. **Client Development**:
   ```bash
   cd client
   npm run dev
   ```
