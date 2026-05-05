import { useState } from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
};
export default function StarRating({
  maxrating = 10,
  color = "#fcc419",
  size = 48,
  className = "",
  defaultRating = 0,
  outerStateSetter
}) {
  const [currStar, setStar] = useState(defaultRating);
  const [currHovStar, setHovStar] = useState(0);
  function handlesetstar(i) {
    setStar(i + 1)
    outerStateSetter?.(i+1)
  }
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        {Array.from({ length: maxrating }, (_, i) => (
          <span
            onClick={() => handlesetstar(i)}
            onMouseEnter={() => setHovStar(() => i + 1)}
            onMouseLeave={() => setHovStar(0)}
            className="star"
            key={i + 1}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              display: "block",
              cursor: "pointer",
            }}
          >
            <Star
              currStar={currStar}
              i={i + 1}
              currHovStar={currHovStar}
              color={color}
            ></Star>
          </span>
        ))}
      </div>

      <p
        style={{
          lineHeight: 1,
          margin: "0px",
          color: color,
          fontSize: `${size / 1.5}px`,
        }}
      >
        {currHovStar || currStar || ""}
      </p>
    </div>
  );
}

function Star({ currStar, i, currHovStar,color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={
        currHovStar
          ? currHovStar >= i
            ? color
            : "none"
          : currStar >= i
            ? color
            : "none"
      }
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}
