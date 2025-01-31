import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_PROFILE_API, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
       
        setUser(response.data.user);
      } catch (err) {
        console.error("Axios Error:", err.response?.data || err.message);
      }
    };

    fetchUser();
  }, [token]);

  if (!user) {
    return <div className="text-center text-white py-8">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-xl shadow-xl mt-12 md:mt-20"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">{user.name}</h1>
        <h2 className=" text-lg text-white font-medium">Your Profile</h2>
      </div>

      {/* Personal Details Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
          <FaUser className="mr-2" />
          Personal Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-md shadow-sm p-4 hover:shadow-md transition duration-300">
            <div className="flex items-center text-white font-medium mb-1">
              <FaEnvelope className="mr-2 text-white" />
              Email:
            </div>
            <div className="text-white">{user.email}</div>
          </div>
          <div className="bg-gray-700 rounded-md shadow-sm p-4 hover:shadow-md transition duration-300">
            <div className="flex items-center text-white font-medium mb-1">
              <FaPhone className="mr-2 text-white" />
              Phone:
            </div>
            <div className="text-white">{user.phone}</div>
          </div>
        </div>
      </section>

      {/* Educational Details Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
          <FaGraduationCap className="mr-2 " />
          Educational Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-md shadow-sm p-4 hover:shadow-md transition duration-300">
            <div className="flex items-center text-white font-medium mb-1">
              College Name:
            </div>
            <div className="text-white">{user.college}</div>
          </div>
          <div className="bg-gray-700 rounded-md shadow-sm p-4 hover:shadow-md transition duration-300">
            <div className="flex items-center text-white font-medium mb-1">
              Course:
            </div>
            <div className="text-white">{user.course}</div>
          </div>
          <div className="bg-gray-700 rounded-md shadow-sm p-4 hover:shadow-md transition duration-300">
            <div className="flex items-center text-white font-medium mb-1">
              Graduation Year:
            </div>
            <div className="text-white">{user.graduationYear}</div>
          </div>
        </div>
      </section>

      {/* Experience/Internships Section */}
      <section>
        <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
          <FaBriefcase className="mr-2" />
          Experience / Internships
        </h2>
        {user.experience && user.experience.length > 0 ? (
          <div className="space-y-4">
            {user.experience.map((exp, index) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-700 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-300"
                key={index}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {exp.duration}
                </h3>
                <p className="text-white mb-1">
                  <span className="font-medium text-white mr-1">Duration:</span>{" "}
                  {exp.year}
                </p>
                <p className="text-white">
                  <span className="font-medium text-white mr-1">Details:</span>{" "}
                  {exp.details}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-white">
            No experience or internships to display.
          </p>
        )}
      </section>
    </motion.div>
  );
};

export default Profile;
