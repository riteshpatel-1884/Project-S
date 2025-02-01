import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User as UserCircleIcon,
  MessageCircle as FeedbackIcon,
  Clock as HistoryIcon,
  FileText as DocumentTextIcon,
  ClipboardList as ClipboardListIcon,
  BarChart2 as ChartBarIcon,
  Send as SendIcon,
  X as XIcon,
  Trash2 as Trash2Icon,
  Search as SearchIcon,
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [error, setError] = useState(null);
  const [isFeedbackHistoryOpen, setIsFeedbackHistoryOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      // Change from Cookies to localStorage
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "https://project-s-nuaq.onrender.com/api/users-with-progress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchFeedbackHistory = async (userId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `https://project-s-nuaq.onrender.com/api/admin/feedback-history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeedbackHistory(response.data);
      setIsFeedbackHistoryOpen(true);
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Failed to fetch feedback history"
      );
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(
        `https://project-s-nuaq.onrender.com/api/admin/feedback/${feedbackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFeedbackHistory(selectedUser._id); // Refresh history
    } catch (error) {
      console.error("Detailed delete error:", error.response?.data || error);
      setError(error.response?.data?.message || "Feedback deletion failed");
    }
  };
  // Render progress bar
  const renderProgressBar = (percentage) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  const handleSendFeedback = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Consistent token retrieval
      const response = await axios.post(
        "https://project-s-nuaq.onrender.com/api/send-feedback",
        {
          userId: selectedUser._id,
          message: feedbackMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Explicitly set content type
          },
        }
      );

      setFeedbackMessage("");
      setIsFeedbackModalOpen(false);
      alert("Feedback sent successfully!");
    } catch (error) {
      console.error("Detailed feedback error:", error.response?.data || error);
      setError(error.response?.data?.message || "Feedback sending failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar with User List */}
      <div className="w-64 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <UserCircleIcon className="mr-2" /> Users
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* User List */}
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              cursor-pointer p-3 mb-2 rounded-lg transition-all 
              ${
                selectedUser?._id === user._id
                  ? "bg-blue-100 border-blue-300"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <div className="flex items-center">
              <div className="flex-grow">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-8">
        {selectedUser ? (
          <div className="space-y-6">
            {/* Header with Feedback Button */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{selectedUser.name}</h1>
                <p className="text-gray-600">
                  {selectedUser.college} | {selectedUser.course}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFeedbackModalOpen(true)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FeedbackIcon className="mr-2" /> Send Feedback
                </button>
                <button
                  onClick={() => fetchFeedbackHistory(selectedUser._id)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <HistoryIcon className="mr-2" /> Feedback History
                </button>
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-blue-600">
                    Graduation: {selectedUser.graduationYear}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <DocumentTextIcon className="mr-2 text-blue-500" />
                  <h3 className="font-semibold">Project Details</h3>
                </div>
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedUser.projectName || "Not Assigned"}
                </p>
                <p>
                  <strong>Credential:</strong>{" "}
                  {selectedUser.credential || "Pending"}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <ChartBarIcon className="mr-2 text-green-500" />
                  <h3 className="font-semibold">Progress Status</h3>
                </div>
                <p>
                  <strong>Status:</strong> {selectedUser.status}
                </p>
                <div className="mt-2">
                  {renderProgressBar(selectedUser.completionPercentage || 0)}
                  <p className="text-sm mt-1">
                    {selectedUser.completionPercentage || 0}% Completed
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <ClipboardListIcon className="mr-2 text-purple-500" />
                  <h3 className="font-semibold">Additional Details</h3>
                </div>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Course:</strong> {selectedUser.course}
                </p>
              </div>
            </div>

            {/* Detailed Progress */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                Detailed Progress Insights
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Challenges</h4>
                  <p className="text-gray-600">
                    {selectedUser.challanges || "No challenges reported"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Next Steps</h4>
                  <p className="text-gray-600">
                    {selectedUser.next_steps || "No next steps defined"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Completed Work</h4>
                  <p className="text-gray-600">
                    {selectedUser.completed || "No work completed yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p>Select a user to view detailed progress</p>
          </div>
        )}
      </div>

      {/* Feedback History Modal */}
      {isFeedbackHistoryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Feedback History for {selectedUser.name}
              </h2>
              <button
                onClick={() => setIsFeedbackHistoryOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <XIcon />
              </button>
            </div>

            {feedbackHistory.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No feedback history found
              </div>
            ) : (
              <div className="space-y-4">
                {feedbackHistory.map((feedback) => (
                  <div
                    key={feedback._id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">
                        Feedback Details
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {new Date(feedback.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteFeedback(feedback._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2Icon size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600">{feedback.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Send Feedback to {selectedUser.name}
              </h2>
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <XIcon />
              </button>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <textarea
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder={`Write your feedback for ${selectedUser.name}`}
              className="w-full h-96 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFeedback}
                disabled={isSubmittingFeedback}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center ${
                  isSubmittingFeedback ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmittingFeedback ? (
                  "Sending..."
                ) : (
                  <>
                    <SendIcon className="mr-2" /> Send Feedback
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
