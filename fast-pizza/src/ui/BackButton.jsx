import { Link } from "react-router-dom";

function BackButton({ children,to }) {
  return (
    <Link
      to={to}
      className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
    >
      {children}
    </Link>
  );
}

export default BackButton;
