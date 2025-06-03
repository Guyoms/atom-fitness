"use client";

import React from 'react';

const NotesSection = () => {
  return (
    <div className="notes-section fade-in">
      <div className="section-header">
        <div className="section-icon">📝</div>
        <h2 className="section-title">Journal d'entraînement</h2>
      </div>
      <div className="notes-editor">
        <textarea id="daily-notes" placeholder="Notez vos impressions, sensations, difficultés ou progrès d'aujourd'hui...">C'était une bonne séance !</textarea>
      </div>
      <button className="btn-primary">
        <i className="fas fa-save"></i> Sauvegarder mes données
      </button>
    </div>
  );
};

export default NotesSection; 