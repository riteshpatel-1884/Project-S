import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/client/login/login";
import Signup from "./components/client/register/register";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";
import Home from "./components/client/Home/home";
import { useState, useEffect } from "react";
import RefrshHandler from "./RefreshHandler";
import Profile from "./components/client/profile/profile";
import SidebarLayout from "./components/client/sidebar/sidebarlayout";
import DashboardHeader from "./components/client/DashboardHeader/DashboardHeader";
import Admindashboard from "./components/Admin/Admindashboard/Home";
import Dashboardadmin from "./components/Admin/DashboardAdmin/Dashboardadmin";
import AdminProfile from "./components/Admin/Profile/AdminProfile";
import Users from "./components/Admin/ProgressList/UsersWithProgress";
import DSA150 from "./components/client/Practice/150 DSA/dsa150";
import Projects from "./components/client/Projects/projects";
import WeeklySeries from "./components/client/Practice copy/150 DSA/DSA150";
import CompanyApply from "./components/client/Company Apply/CompanyApply";
import CompanyPost from "./components/Admin/Company Post/CompanyPost";
import HRQuestions from "./components/client/HR Questions/HRQuestions";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (token) {
      setIsAuthenticated(true);
    }

    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const AdminPrivateRoute = ({ element }) => {
    return isAdminAuthenticated ? element : <Navigate to="/admin/login" />;
  };

  return (
    <div className="App bg-gray-900">
      <RefrshHandler
        setIsAuthenticated={setIsAuthenticated}
        setIsAdminAuthenticated={setIsAdminAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin/login"
          element={
            <AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />
          }
        />
        <Route path="/admin/create" element={<AdminRegister />} />

        {/* Client Routes  */}
        <Route path="/" element={<PrivateRoute element={<SidebarLayout />} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<DashboardHeader />} />
          <Route path="/150-dsa-questions" element={<DSA150 />} />
          <Route path="/weekly-series" element={<WeeklySeries />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/apply" element={<CompanyApply />} />
          <Route path="/hr-questions" element={<HRQuestions />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<AdminPrivateRoute element={<Dashboardadmin />} />}
        >
          <Route path="dashboard" element={<Admindashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="post-jobs" element={<CompanyPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
