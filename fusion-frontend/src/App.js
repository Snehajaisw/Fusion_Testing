import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ===========================
   🔹 CORE PAGES
=========================== */
import Home from "./pages/home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SetPassword from "./pages/SetPassword";

import AssignmentResultTable from "./pages/AssignmentResultTable";




/* ===========================
   🔹 STUDENT – LEARNING
=========================== */
import LearnC from "./pages/LearnC";
import LearnCpp from "./pages/LearnCpp";

/* ----- Unit 1 (Student) ----- */
import CUnit1 from "./pages/CUnit1";
import CUnit1Ppt from "./pages/CUnit1Ppt";
import CUnit1Assignments from "./pages/CUnit1Assignments";
import CUnit1Coding from "./pages/CUnit1Coding";

/* ----- Unit 2 (Student) ----- */
import CUnit2 from "./pages/CUnit2";
import CUnit2Coding from "./pages/CUnit2Coding";
import CUnit2Ppt from "./pages/CUnit2Ppt";

/* ----- Unit 3 (Student) ----- */
import CUnit3 from "./pages/CUnit3";
import CUnit3Ppt from "./pages/CUnit3Ppt";
import CUnit3Coding from "./pages/CUnit3Coding";

/* ----- Unit 4 (Student) ----- */
import CUnit4 from "./pages/CUnit4";
import CUnit4Ppt from "./pages/CUnit4Ppt";
import CUnit4Coding from "./pages/CUnit4Coding";

/* ----- General Student Pages ----- */
import CNotes from "./pages/CNotes";
import CPPTs from "./pages/CPpts";
import CAssignments from "./pages/CAssignments";
import CCodingPractice from "./pages/CCodingPractices";

/* ⭐ Dynamic Notes Page */
import StudentNotes from "./pages/StudentNotes";


/* ===========================
   🔹 TEACHER – DASHBOARD
=========================== */
import Register from "./pages/Register";
import TeacherSignup from "./pages/TeacherSignup";

import AdminDashboard from "./pages/AdminDashboard";

import TeacherDashboard from "./pages/TeacherDashboard";
import ManageCLanguage from "./pages/ManageCLanguage";
import ManageCppLanguage from "./pages/ManageCppLanguage";



/* ----- Unit 1 (Teacher) ----- */
import TeacherUnit1 from "./pages/TeacherUnit1";
import TeacherUnit1Assignment from "./pages/TeacherUnit1Assignment";
import TeacherUnit1Coding from "./pages/TeacherUnit1Coding";
import TeacherUnit1UploadNotes from "./pages/TeacherUnit1UploadNotes";
import TeacherUnit1UploadPPT from "./pages/TeacherUnit1UploadPPT";   // ⭐ Added

/* ----- Unit 2 (Teacher) ----- */
import TeacherUnit2 from "./pages/TeacherUnit2";
import TeacherUnit2Assignment from "./pages/TeacherUnit2Assignment";
import TeacherUnit2Results from "./pages/TeacherUnit2Results";
import TeacherUnit2Coding from "./pages/TeacherUnit2Coding";
import TeacherUnit2ManageAssignments from "./pages/TeacherUnit2ManageAssignments";
import TeacherUnit2UploadNotes from "./pages/TeacherUnit2UploadNotes";
import TeacherUnit2UploadPPT from "./pages/TeacherUnit2UploadPPT";

/* ----- Unit 3 (Teacher) ----- */
import TeacherUnit3 from "./pages/TeacherUnit3";
import TeacherUnit3Assignment from "./pages/TeacherUnit3Assignment";
import TeacherUnit3ManageAssignments from "./pages/TeacherUnit3ManageAssignments";
import TeacherUnit3Results from "./pages/TeacherUnit3Results";
import TeacherUnit3Coding from "./pages/TeacherUnit3Coding";
import TeacherUnit3UploadNotes from "./pages/TeacherUnit3UploadNotes";
import TeacherUnit3UploadPPT from "./pages/TeacherUnit3UploadPPT";

/* ----- Unit 4 (Teacher) ----- */
import TeacherUnit4 from "./pages/TeacherUnit4";
import TeacherUnit4UploadNotes from "./pages/TeacherUnit4UploadNotes";
import TeacherUnit4UploadPPT from "./pages/TeacherUnit4UploadPPT";
import TeacherUnit4Assignment from "./pages/TeacherUnit4Assignment";
import TeacherUnit4Coding from "./pages/TeacherUnit4Coding";




import TeacherCppUnit1 from "./pages/TeacherCppUnit1";
import TeacherCppUnit1UploadNotes from "./pages/TeacherCppUnit1UploadNotes";
import TeacherCppUnit1UploadPPT from "./pages/TeacherCppUnit1UploadPPT";
import TeacherCppUnit1Coding from "./pages/TeacherCppUnit1Coding";
import TeacherCppUnit1Assignment from "./pages/TeacherCppUnit1Assignment";







import TeacherCppUnit2 from "./pages/TeacherCppUnit2";
import TeacherCppUnit2UploadNotes from "./pages/TeacherCppUnit2UploadNotes";
import TeacherCppUnit2UploadPPT from "./pages/TeacherCppUnit2UploadPPT";
import TeacherCppUnit2Assignment from "./pages/TeacherCppUnit2Assignment";
import TeacherCppUnit2Coding from "./pages/TeacherCppUnit2Coding";

import TeacherCppUnit3 from "./pages/TeacherCppUnit3";
import TeacherCppUnit3UploadNotes from "./pages/TeacherCppUnit3UploadNotes";
import TeacherCppUnit3UploadPPT from "./pages/TeacherCppUnit3UploadPPT";
import TeacherCppUnit3Assignment from "./pages/TeacherCppUnit3Assignment";
import TeacherCppUnit3Coding from "./pages/TeacherCppUnit3Coding";

import TeacherCppUnit4 from "./pages/TeacherCppUnit4";
import TeacherCppUnit4UploadNotes from "./pages/TeacherCppUnit4UploadNotes";
import TeacherCppUnit4UploadPPT from "./pages/TeacherCppUnit4UploadPPT";
import TeacherCppUnit4Assignment from "./pages/TeacherCppUnit4Assignment";
import TeacherCppUnit4Coding from "./pages/TeacherCppUnit4Coding";










/* ===========================
   🔹 ASSIGNMENTS SYSTEM
=========================== */
import CreateAssignment from "./pages/CreateAssignment";
import ManageAssignments from "./pages/ManageAssignments";
import AssignmentResults from "./pages/AssignmentResults";

/* ===========================
   🔹 FILE UPLOADS
=========================== */
import ViewUploads from "./pages/ViewUploads";

/* ===========================
   🔹 PERFORMANCE + TRACKING
=========================== */
import TrackPerformance from "./pages/TrackPerformance";
import TrackAssignments from "./pages/TrackAssignments";
import TeacherAssignment from "./pages/TeacherAssignment";
import StudentAssignment from "./pages/StudentAssignment";

/* ===========================
   🔹 SUBMISSIONS
=========================== */
import SubmissionResult from "./pages/SubmissionResult";
import SubmissionHistory from "./pages/SubmissionHistory";

/* ===========================
   🔹 MISC
=========================== */
import Leaderboard from "./leaderboard.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* ======================
            AUTH
        ====================== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route path="/teacher/assignment-results/:assignmentId" element={<AssignmentResultTable />} />
        
<Route path="/student-assignment" element={<StudentAssignment />} />
<Route path="/teacher/unit/3/assignments" element={<TeacherUnit3Assignment />} />
        {/* ======================
            STUDENT
        ====================== */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />



        <Route path="/learn-c" element={<LearnC />} />
        <Route path="/learn-cpp" element={<LearnCpp />} />

        {/* ----- Unit 1 (Student) ----- */}
<Route path="/learn-c/unit1" element={<CUnit1 />} />
<Route path="/learn-cpp/unit1" element={<CUnit1 />} />

{/* Notes */}
<Route
  path="/learn-c/unit1/notes"
  element={<Navigate to="/student/notes/c/1" replace />}
/>
<Route
  path="/learn-cpp/unit1/notes"
  element={<Navigate to="/student/notes/cpp/1" replace />}
/>

{/* PPT */}
<Route path="/learn-c/unit1/ppt" element={<CUnit1Ppt />} />
<Route path="/learn-cpp/unit1/ppt" element={<CUnit1Ppt />} />

{/* Assignments (C only) */}
<Route path="/learn-c/unit1/assignments" element={<CUnit1Assignments />} />

{/* Coding */}
<Route path="/learn-c/unit1/coding" element={<CUnit1Coding />} />
<Route path="/learn-cpp/unit1/coding" element={<CUnit1Coding />} />

        {/* ----- Unit 2 ----- */}
        <Route path="/learn-c/unit2" element={<CUnit2 />} />
        <Route path="/learn-cpp/unit2" element={<CUnit2 />} />

        <Route path="/learn-c/unit2/ppt" element={<CUnit2Ppt />} />
        <Route path="/learn-c/unit2/coding" element={<CUnit2Coding />} />

        {/* ----- Unit 3 ----- */}
        <Route path="/learn-c/unit3" element={<CUnit3 />} />
        <Route path="/learn-cpp/unit3" element={<CUnit3 />} />

        <Route path="/learn-c/unit3/ppt" element={<CUnit3Ppt />} />
        <Route path="/learn-c/unit3/coding" element={<CUnit3Coding />} />

        {/* ----- Unit 4 ----- */}
        <Route path="/learn-c/unit4" element={<CUnit4 />} />
        <Route path="/learn-cpp/unit4" element={<CUnit4 />} />

        <Route path="/learn-c/unit4/ppt" element={<CUnit4Ppt />} />
        <Route path="/learn-c/unit4/coding" element={<CUnit4Coding />} />
        <Route path="/unit4/coding" element={<Navigate to="/learn-c/unit4/coding" replace />} />

        <Route path="/learn-cpp/unit2/ppt" element={<CUnit2Ppt />} />
        <Route path="/learn-cpp/unit2/coding" element={<CUnit2Coding />} />

        <Route path="/learn-cpp/unit3/ppt" element={<CUnit3Ppt />} />
        <Route path="/learn-cpp/unit3/coding" element={<CUnit3Coding />} />

        <Route path="/learn-cpp/unit4/ppt" element={<CUnit4Ppt />} />
        <Route path="/learn-cpp/unit4/coding" element={<CUnit4Coding />} />



        {/* ⭐ UNIVERSAL NOTES PAGE */}
        <Route path="/student/notes/:subject/:unitId" element={<StudentNotes />} />

      {/* C NOTES */}
<Route path="/learn-c/unit1/notes" element={<Navigate to="/student/notes/c/1" replace />} />
<Route path="/learn-c/unit2/notes" element={<Navigate to="/student/notes/c/2" replace />} />
<Route path="/learn-c/unit3/notes" element={<Navigate to="/student/notes/c/3" replace />} />
<Route path="/learn-c/unit4/notes" element={<Navigate to="/student/notes/c/4" replace />} />

{/* CPP NOTES */}
<Route path="/learn-cpp/unit1/notes" element={<Navigate to="/student/notes/cpp/1" replace />} />
<Route path="/learn-cpp/unit2/notes" element={<Navigate to="/student/notes/cpp/2" replace />} />
<Route path="/learn-cpp/unit3/notes" element={<Navigate to="/student/notes/cpp/3" replace />} />
<Route path="/learn-cpp/unit4/notes" element={<Navigate to="/student/notes/cpp/4" replace />} />

        {/* General student pages */}
        <Route path="/notes" element={<CNotes />} />
        <Route path="/ppts" element={<CPPTs />} />
        <Route path="/assignments" element={<CAssignments />} />
        <Route path="/coding" element={<CCodingPractice />} />

        {/* ======================
            TEACHER DASHBOARD
        ====================== */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/manage-c" element={<ManageCLanguage />} />
        <Route path="/teacher/manage-cpp" element={<ManageCppLanguage />} />


        {/* Teacher Unit 1 */}
        <Route path="/teacher/unit1" element={<TeacherUnit1 />} />
        <Route path="/teacher/unit1/assignments" element={<TeacherUnit1Assignment />} />
        <Route path="/teacher/unit1/manage-assignments" element={<ManageAssignments />} />
        <Route path="/teacher/unit1/results" element={<AssignmentResults />} />
        <Route path="/teacher/unit1/coding" element={<TeacherUnit1Coding />} />
        <Route path="/teacher/unit1/upload-notes"element={<TeacherUnit1UploadNotes course="c" unit={1} />}/>
        <Route path="/teacher/unit1/upload-ppt" element={<TeacherUnit1UploadPPT />} /> {/* ⭐ FIXED */}

        {/* Teacher Unit 2 */}
        <Route path="/teacher/unit2" element={<TeacherUnit2 />} />
        <Route path="/teacher/unit2/assignments" element={<TeacherUnit2Assignment />} />
        <Route path="/teacher/unit2/assignment-manage" element={<TeacherUnit2ManageAssignments />} />
        <Route path="/teacher/unit2/results" element={<TeacherUnit2Results />} />
        <Route path="/teacher/unit2/results/:assignmentId" element={<AssignmentResultTable />} />
        <Route path="/teacher/unit2/coding" element={<TeacherUnit2Coding />} />
        <Route path="/teacher/unit2/upload-ppt" element={<TeacherUnit2UploadPPT />} />
        <Route path="/teacher/unit2/upload-notes"element={<TeacherUnit2UploadNotes course="c" unit={2} />}/>

        {/* Teacher Unit 3 */}
        <Route path="/teacher/unit3" element={<TeacherUnit3 />} />
        <Route path="/teacher/unit3/upload-notes"element={<TeacherUnit3UploadNotes course="c" unit={3} />}/>        
        <Route path="/teacher/unit3/upload-ppt" element={<TeacherUnit3UploadPPT />} />
        <Route path="/teacher/unit3/assignments" element={<TeacherUnit3Assignment />} />
        <Route path="/teacher/unit3/manage-assignments" element={<TeacherUnit3ManageAssignments />} />
        <Route path="/teacher/unit3/results" element={<TeacherUnit3Results />} />
        <Route path="/teacher/unit3/coding" element={<TeacherUnit3Coding />} />

        <Route
          path="/teacher/unit3/uploadNotes"
          element={<Navigate to="/teacher/unit3/upload-notes" replace />}
        />

        {/* Teacher Unit 4 */}
        <Route path="/teacher/unit4" element={<TeacherUnit4 />} />
        <Route path="/teacher/unit4/upload-notes"element={<TeacherUnit4UploadNotes course="c" unit={4} />}/>      
        <Route path="/teacher/unit4/upload-ppt" element={<TeacherUnit4UploadPPT />} />
        <Route path="/teacher/unit4/assignments" element={<TeacherUnit4Assignment />} />
        <Route path="/teacher/unit4/coding" element={<TeacherUnit4Coding />} />


        <Route path="/teacher/cpp/unit1" element={<TeacherCppUnit1 />} />
        <Route path="/teacher/cpp/unit1/upload-notes"element={<TeacherCppUnit1UploadNotes />}/>
        <Route path="/teacher/cpp/unit1/upload-ppt" element={<TeacherCppUnit1UploadPPT />} />
        <Route path="/teacher/cpp/unit1/coding"element={<TeacherCppUnit1Coding />}/>
        <Route path="/teacher/cpp/unit1/assignments"element={<TeacherCppUnit1Assignment />}/>
        <Route path="/teacher/cpp/unit1/assignment-manage"element={<ManageAssignments />}/>
        <Route path="/teacher/cpp/unit1/results"element={<SubmissionResult />}/>



        <Route path="/teacher/cpp/unit2" element={<TeacherCppUnit2 />} />
        <Route path="/teacher/cpp/unit2/upload-notes" element={<TeacherCppUnit2UploadNotes />} />
        <Route path="/teacher/cpp/unit2/upload-ppt" element={<TeacherCppUnit2UploadPPT />} />
        <Route path="/teacher/cpp/unit2/assignments"element={<TeacherCppUnit2Assignment />}/>
        <Route path="/teacher/cpp/unit2/coding"element={<TeacherCppUnit2Coding />}/>


       <Route path="/teacher/cpp/unit3" element={<TeacherCppUnit3 />} />
        <Route path="/teacher/cpp/unit3/upload-notes" element={<TeacherCppUnit3UploadNotes />} />
        <Route path="/teacher/cpp/unit3/upload-ppt" element={<TeacherCppUnit3UploadPPT />} />
        <Route path="/teacher/cpp/unit3/assignments"element={<TeacherCppUnit3Assignment />}/>
        <Route path="/teacher/cpp/unit3/coding"element={<TeacherCppUnit3Coding />}/>


        <Route path="/teacher/cpp/unit4" element={<TeacherCppUnit4 />} />
        <Route path="/teacher/cpp/unit4/upload-notes" element={<TeacherCppUnit4UploadNotes />} />
        <Route path="/teacher/cpp/unit4/upload-ppt" element={<TeacherCppUnit4UploadPPT />} />
        <Route path="/teacher/cpp/unit4/assignments"element={<TeacherCppUnit4Assignment />}/>
        <Route path="/teacher/cpp/unit4/coding"element={<TeacherCppUnit4Coding />}/>



      





        {/* Assignments */}
        <Route path="/teacher/create-assignment" element={<CreateAssignment />} />

        {/* Performance */}
        <Route path="/teacher-assignment" element={<TeacherAssignment />} />
        <Route path="/student-assignment" element={<StudentAssignment />} />
        <Route path="/track-performance" element={<TrackPerformance />} />
        <Route path="/track-performance/assignments" element={<TrackAssignments />} />

        {/* File Uploads */}
        <Route path="/view-uploads" element={<ViewUploads />} />

        {/* Submissions */}
        <Route path="/submission/:id" element={<SubmissionResult />} />
        <Route path="/submissions" element={<SubmissionHistory />} />

        {/* Leaderboard */}
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h2>⚠️ Page Not Found</h2>
              <a href="/" style={{ color: "blue" }}>Go Home</a>
            </div>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;