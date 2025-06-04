"use client";

import React from 'react';

const NotesSection = () => {
  const [noteValue, setNoteValue] = React.useState("C&apos;était une bonne séance !");

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteValue(event.target.value);
  };

  return (
    <div className="notes-section fade-in">
      <div className="section-header">
        <div className="section-icon">📝</div>
        <h2 className="section-title">Journal d&apos;entraînement</h2>
      </div>
      <div className="notes-editor">
        <textarea value={noteValue} onChange={handleNoteChange} placeholder="Notez vos impressions, sensations, difficultés ou progrès d&apos;aujourd&apos;hui..."></textarea>
      </div>
      <button className="btn-primary">
        <i className="fas fa-save"></i> Sauvegarder mes données
      </button>
      <p>N&apos;oubliez pas de noter vos observations</p>
    </div>
  );
};

export default NotesSection; 