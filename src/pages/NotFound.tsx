import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center">
        <h1 className="text-6xl font-urbanist font-bold mb-4 text-dark-accent">404</h1>
        <p className="text-xl text-white/80 mb-6">Oops! Page not found</p>
        <a href="/" className="px-6 py-2 rounded-md bg-dark-accent text-white hover:bg-dark-accent/80 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
