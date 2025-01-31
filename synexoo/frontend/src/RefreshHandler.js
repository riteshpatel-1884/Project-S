// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function RefrshHandler({ setIsAuthenticated }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//     setLoading(false);
//   }, [setIsAuthenticated]);

//   useEffect(() => {
//     if (!loading) {
//       const token = localStorage.getItem("token");
//       if (token) {
//         if (
//           location.pathname === "/" ||
//           location.pathname === "/login" ||
//           location.pathname === "/signup"
//         ) {
//           navigate("/dashboard", { replace: true });
//         }
//       } else {
//         if (
//           location.pathname !== "/login" &&
//           location.pathname !== "/signup" &&
//           location.pathname !== "/"
//         ) {
//           navigate("/login", { replace: true });
//         }
//       }
//     }
//   }, [location, navigate, setIsAuthenticated, loading]);

//   return null;
// }

// export default RefrshHandler;




import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    // Add a small delay to prevent rapid state updates
    const timeoutId = setTimeout(checkAuth, 50);
    return () => clearTimeout(timeoutId);
  }, [setIsAuthenticated]);

  useEffect(() => {
    if (!loading) {
      const token = localStorage.getItem("token");
      const publicRoutes = ["/login", "/signup", "/"];
      const isPublicRoute = publicRoutes.includes(location.pathname);

      if (token && isPublicRoute) {
        navigate("/dashboard", { replace: true });
      } else if (!token && !isPublicRoute) {
        navigate("/login", { replace: true });
      }
    }
  }, [location.pathname, navigate, loading]);

  // Show nothing while checking authentication
  if (loading) {
    return null;
  }

  return null;
}

export default RefreshHandler;