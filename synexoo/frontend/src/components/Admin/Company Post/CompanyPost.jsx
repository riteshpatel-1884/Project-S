import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyPost = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    applicationLink: "",
    role: "",
    shortDescription: "",
    type: "internship",
  });
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
    const interval = setInterval(() => {
      setCompanies((prevCompanies) => {
        return prevCompanies.map((company) => ({ ...company }));
      });
    }, 60000); // Update every 1 min
    return () => clearInterval(interval);
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "https://project-s-nuaq.onrender.com/auth/companies"
      );
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCompany) {
        await axios.put(
          `https://project-s-nuaq.onrender.com/auth/companies/${editingCompany._id}`,
          newCompany
        );
        setEditingCompany(null);
      } else {
        await axios.post("https://project-s-nuaq.onrender.com/auth/companies", newCompany);
      }
      fetchCompanies();
      setNewCompany({
        companyName: "",
        applicationLink: "",
        role: "",
        shortDescription: "",
        type: "internship",
      });
    } catch (error) {
      console.error("Error creating/updating company:", error);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setNewCompany(company);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://project-s-nuaq.onrender.com/auth/companies/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400 * 7) {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
      return past.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">
          Company Dashboard
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                {editingCompany ? "Edit Company" : "Add New Company"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={newCompany.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="applicationLink"
                    placeholder="Application Link"
                    value={newCompany.applicationLink}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={newCompany.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <textarea
                    name="shortDescription"
                    placeholder="Short Description"
                    value={newCompany.shortDescription}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none h-32 resize-none"
                  />
                </div>
                <div>
                  <select
                    name="type"
                    value={newCompany.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-white"
                  >
                    <option value="internship">Internship</option>
                    <option value="job">Job</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
                  >
                    {editingCompany ? "Update" : "Add"}
                  </button>
                  {editingCompany && (
                    <button
                      onClick={() => {
                        setEditingCompany(null);
                        setNewCompany({
                          companyName: "",
                          applicationLink: "",
                          role: "",
                          shortDescription: "",
                          type: "internship",
                        });
                      }}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-100"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Company List Section */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {companies.map((company) => (
                <div
                  key={company._id}
                  className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(company)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(company._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        company.type === "internship"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {company.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {company.companyName}
                  </h3>

                  <div className="text-gray-600 mb-2 font-medium">
                    {company.role}
                  </div>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {company.shortDescription}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-400">
                      {timeAgo(company.postDate)}
                    </div>
                    <a
                      href={company.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Apply Now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPost;
