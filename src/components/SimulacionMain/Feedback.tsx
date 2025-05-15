// Feedback educativo y consecuencias
import React from "react";

const Feedback: React.FC<{ texto: string }> = ({ texto }) => (
  <div className="feedback">{texto}</div>
);

export default Feedback;
