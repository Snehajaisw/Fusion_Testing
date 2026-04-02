import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* ==========================================================
   FIX: ResizeObserver loop completed with undelivered 
        notifications
   (Clean, stable & browser-safe)
========================================================== */
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    if (
      e.message &&
      (e.message.includes("ResizeObserver loop limit exceeded") ||
       e.message.includes("ResizeObserver loop completed"))
    ) {
      e.stopImmediatePropagation();
    }
  });

  window.addEventListener("unhandledrejection", (e) => {
    if (
      e.reason &&
      e.reason.message &&
      e.reason.message.includes("ResizeObserver loop")
    ) {
      e.stopImmediatePropagation();
    }
  });
}

/* ========================================================== */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // STRICT MODE OFF (avoid duplicate effects)
  <App />
);

reportWebVitals();
