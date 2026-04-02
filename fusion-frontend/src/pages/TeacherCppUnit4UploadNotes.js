import React from "react";
import UploadPage from "./UploadPage";
import "./PageStyles.css";

export default function TeacherCppUnit4UploadNotes() {
  return (
    <UploadPage
      unit={4}
      course="cpp"
      category="notes"
      title="Upload C++ Notes (Unit 4)"
    />
  );
}
