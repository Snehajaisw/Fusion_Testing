import React from "react";
import UploadPage from "./UploadPage";
import "./PageStyles.css";

export default function TeacherCppUnit3UploadNotes() {
  return (
    <UploadPage
      unit={3}
      course="cpp"
      category="notes"
      title="Upload C++ Notes (Unit 3)"
    />
  );
}
