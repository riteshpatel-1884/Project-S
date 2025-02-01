import React, { useState, useEffect } from "react";
import { Edit2, X, MessageCircle } from "lucide-react";
import "./UpdateProgress.css";
import axios from "axios";

const InternProgress = () => {
  const [projects, setProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const phases = [
    {
      name: "Internship Progress Tracking & Feedback",
      startDate: new Date("2025-01-30"),
      endDate: new Date("2025-01-31"),
    },
    {
      name: "Development Phase 2",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-12"),
    },
    {
      name: "Project Testing, Submission & Documentation",
      startDate: new Date("2025-02-13"),
      endDate: new Date("2025-02-14"),
    },
    {
      name: "Final Assessment & Feedback",
      startDate: new Date("2025-02-16"),
      endDate: new Date("2025-02-20"),
    },
  ];

  const INTERNSHIP_END_DATE = new Date("2025-02-15");

  const [formData, setFormData] = useState({
    fullName: "",
    credential: "",
    projectName: "",
    completed: "",
    challanges: "",
    next_steps: "",
    status: "Not Started",
    completionPercentage: 0,
  });

  const API_BASE_URL = "https://project-s-nuaq.onrender.com";
  useEffect(() => {
    document.body.classList.add("dark");
    fetchProjects();
    fetchFeedbacks(); // New method to fetch feedbacks
    calculateDaysRemaining();
    updateUpcomingEvent();

    const timer = setInterval(() => {
      calculateDaysRemaining();
      updateUpcomingEvent();
    }, 86400000);

    return () => clearInterval(timer);
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://project-s-nuaq.onrender.com/api/user-feedbacks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const markFeedbackAsRead = async (feedbackId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://project-s-nuaq.onrender.com/api/feedback/${feedbackId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state to mark as read
      setFeedbacks(
        feedbacks.map((feedback) =>
          feedback._id === feedbackId ? { ...feedback, isRead: true } : feedback
        )
      );
    } catch (error) {
      console.error(
        "Error marking feedback as read:",
        error.response?.data || error.message
      );
      // Optionally set an error state to show to the user
      setError("Could not mark feedback as read");
    }
  };

  const updateUpcomingEvent = () => {
    const now = new Date();
    const nextEvent = phases.find((phase) => phase.startDate > now);

    if (nextEvent) {
      const daysToEvent = Math.ceil(
        (nextEvent.startDate - now) / (1000 * 3600 * 24)
      );
      setUpcomingEvent({ ...nextEvent, daysRemaining: daysToEvent });
    }
  };

  const calculateDaysRemaining = () => {
    const today = new Date();
    const timeDiff = INTERNSHIP_END_DATE.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysRemaining(daysDiff > 0 ? daysDiff : 0);
  };

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const handleApiError = (error) => {
    if (error.message.includes("401")) {
      setError("Please login to continue");
    } else if (error.message.includes("403")) {
      setError("You do not have permission to perform this action");
    } else {
      setError("An error occurred. Please try again later.");
    }
    setTimeout(() => setError(null), 5000);
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/progress`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = getAuthToken();
      const url = isEditing
        ? `${API_BASE_URL}/api/progress/${selectedProject._id}`
        : `${API_BASE_URL}/api/progress`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      await fetchProjects();
      resetForm();
      setIsFormVisible(false);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      credential: "",
      projectName: "",
      completed: "",
      challanges: "",
      next_steps: "",
      status: "Not Started",
      completionPercentage: 0,
    });
    setIsEditing(false);
    setSelectedProject(null);
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setSelectedProject(project);
    setFormData({
      fullName: project.fullName,
      credential: project.credential,
      projectName: project.projectName,
      completed: project.completed,
      challanges: project.challanges,
      next_steps: project.next_steps,
      status: project.status,
      completionPercentage: project.completionPercentage,
    });
    setIsFormVisible(true);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      resetForm();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 text-blue-400"></div>
      </div>
    );
  }

  return (
    <div className=" max-w-6xl mx-auto min-h-screen bg-gray-900 text-white">
      {/* Countdown Timer Banner */}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-5 w-full">
        {/* Add Progress Button */}
        <button
          onClick={toggleFormVisibility}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm sm:text-base"
        >
          Add New Progress
        </button>

        {/* Feedback Button */}
        <button
          onClick={() => setIsFeedbackModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center bg-blue-500 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          View Feedbacks
          {feedbacks.filter((f) => !f.isRead).length > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {feedbacks.filter((f) => !f.isRead).length}
            </span>
          )}
        </button>
      </div>

      <div className="mb-6 p-4 bg-blue-900 border-l-4 border-blue-500 text-white rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Internship Timeline</h2>
            <p className="mt-1">
              End Date: {INTERNSHIP_END_DATE.toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-300">{daysRemaining}</p>
            <p className="text-sm font-medium">
              {daysRemaining === 1 ? "Day" : "Days"} Remaining
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900 border-l-4 border-red-500 text-white rounded-lg">
          <p>{error}</p>
        </div>
      )}
      {/* Progress Cards Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">
            No progress entries found. Start by adding a new progress entry.
          </p>
        </div>
      ) : (
        <div className="gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Project Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {project.projectName}
                </h3>
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-gray-400 hover:text-blue-300 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              </div>

              {/* Project completed */}
              <p className="text-gray-300 mb-4">{project.completed}</p>

              {/* Status and Completion */}
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      project.status === "Completed"
                        ? "bg-green-900 text-green-200"
                        : project.status === "In Progress"
                        ? "bg-blue-900 text-blue-200"
                        : "bg-gray-900 text-gray-300"
                    }`}
                >
                  {project.status}
                </span>
                <span className="text-gray-300 text-sm">
                  {project.completionPercentage}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    project.status === "Completed"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${project.completionPercentage}%` }}
                ></div>
              </div>

              {upcomingEvent && (
                <div className="mb-6 p-4 bg-gray-700 border-l-4 border-gray-500 text-green-500 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        Upcoming: {upcomingEvent.name}
                      </p>
                      <p className="text-sm mt-1">
                        {upcomingEvent.startDate.toLocaleDateString()} -{" "}
                        {upcomingEvent.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ⏱️ {upcomingEvent.daysRemaining}{" "}
                        {upcomingEvent.daysRemaining === 1 ? "Day" : "Days"}{" "}
                        left
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-h-[90vh] overflow-y-auto shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? "Update Progress" : "Add New Progress"}
              </h2>
              <button
                onClick={toggleFormVisibility}
                className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Credential ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your Credential ID"
                  value={formData.credential}
                  onChange={(e) =>
                    setFormData({ ...formData, credential: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Key features that have been completed
                </label>
                <textarea
                  placeholder="Enter the key features that have been completed"
                  value={formData.completed}
                  onChange={(e) =>
                    setFormData({ ...formData, completed: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] transition-all bg-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Any challenges encountered during the project
                </label>
                <textarea
                  placeholder="Enter details of any challenges encountered during the project"
                  value={formData.challanges}
                  onChange={(e) =>
                    setFormData({ ...formData, challanges: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] transition-all bg-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your next steps or what will be worked on in the upcoming days
                </label>
                <textarea
                  placeholder="Enter details of any challenges encountered during the project"
                  value={formData.next_steps}
                  onChange={(e) =>
                    setFormData({ ...formData, next_steps: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] transition-all bg-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Completion Percentage
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.completionPercentage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        completionPercentage: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading
                    ? "Saving..."
                    : isEditing
                    ? "Update Progress"
                    : "Add Progress"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Internship Feedback
              </h2>
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="text-gray-400 hover:text-red-400"
              >
                <X />
              </button>
            </div>

            {feedbacks.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No feedbacks received yet
              </div>
            ) : (
              <div className="space-y-4">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback._id}
                    className={`
                      p-4 rounded-lg border 
                      ${
                        !feedback.isRead
                          ? "bg-blue-900 border-blue-700 text-white"
                          : "bg-gray-700 border-gray-600 text-gray-300"
                      }
                    `}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-200">
                        From: Aarohi Sharma
                      </span>
                      {!feedback.isRead && (
                        <button
                          onClick={() => markFeedbackAsRead(feedback._id)}
                          className="text-sm text-blue-300 hover:text-blue-400"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                    <p className="text-gray-400">{feedback.message}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      Sent on: {new Date(feedback.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InternProgress;
