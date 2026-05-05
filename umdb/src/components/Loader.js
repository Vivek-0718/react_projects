import React from "react";
import "./Loader.css";

/**
 * Loader component
 *
 * Props:
 *   size        — 'sm' | 'md' (default) | 'lg'
 *   variant     — 'dual' (default) | 'solid' | 'dots' | 'bars' | 'pulse'
 *   text        — string (default: 'Loading')
 *   accentColor — any valid CSS color (default: '#7F77DD')
 */
const Loader = ({
  size = "md",
  variant = "dual",
  text = "Loading",
  accentColor = "#7F77DD",
  className = "loader",
}) => {
  const renderSpinner = () => {
    switch (variant) {
      case "solid":
        return <div className={`spinner-solid ${size}`} />;
      case "dots":
        return (
          <div className="dots">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        );
      case "bars":
        return (
          <div className="bars">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        );
      case "pulse":
        return <div className={`pulse-ring ${size}`} />;
      default:
        return <div className={`spinner-ring ${size}`} />;
    }
  };

  return (
    <div
      className={`loader-wrap ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`${text}...`}
      style={{ "--accent": accentColor }}
    >
      {renderSpinner()}
      {text && (
        <span className="loading-text">
          {text}
          <span className="ellipsis" aria-hidden="true" />
        </span>
      )}
    </div>
  );
};

export default Loader;
