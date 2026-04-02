import React from "react";
import UploadPage from "./UploadPage";
import "./PageStyles.css";

export default function TeacherCppUnit2UploadNotes() {
  return (
    <UploadPage
      unit={2}
      course="cpp"
      category="notes"
      title="Upload C++ Notes (Unit 2)"
    />
  );
}
