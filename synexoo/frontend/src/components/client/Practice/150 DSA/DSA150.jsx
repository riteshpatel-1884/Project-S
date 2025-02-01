import React, { useState, useEffect } from "react";
import { questions } from "./dsa150questions";
import {
  Check,
  Circle,
  Star,
  BookmarkPlus,
  Lock,
  Sparkles,
} from "lucide-react";
import axios from "axios";

function DSA150() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const [bookmarked, setBookmarked] = useState(new Set());
  const [questionsList, setQuestionsList] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showWithNotes, setShowWithNotes] = useState(false);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isNotesLocked, setIsNotesLocked] = useState(true); // Lock notes by default

  // Apply dark mode classes to the body element
  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://project-s-nuaq.onrender.com/api/user/progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const solvedQuestions = response.data?.solvedQuestions || [];
        const bookmarkedQuestions = response.data?.bookmarkedQuestions || [];
        const userNotes = response.data?.notes || [];

        setSolvedQuestions(new Set(solvedQuestions));
        setBookmarked(new Set(bookmarkedQuestions));

        const notesObj = Array.isArray(userNotes)
          ? userNotes.reduce((acc, note) => {
              if (note && note.questionId) {
                acc[note.questionId] = note.note;
              }
              return acc;
            }, {})
          : {};
        setNotes(notesObj);

        setQuestionsList(questions);
      } catch (err) {
        setError("Failed to load progress. Please try again later.");
        console.error("Error fetching user progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, []);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "bg-green-900 text-green-200",
      Medium: "bg-yellow-900 text-yellow-200",
      Hard: "bg-red-900 text-red-200",
    };
    return colors[difficulty] || "bg-gray-900 text-gray-200";
  };

  const getDifficultyStats = () => {
    const stats = { Easy: 0, Medium: 0, Hard: 0 };
    solvedQuestions.forEach((id) => {
      const question = questionsList.find((q) => q.id === id);
      if (question) {
        stats[question.difficulty]++;
      }
    });
    return stats;
  };

  const toggleSolved = async (id, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${serverUrl}/api/user/progress/solved`,
        {
          questionId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSolvedQuestions(new Set(response.data.solvedQuestions));
    } catch (err) {
      console.error("Error toggling solved status:", err);
    }
  };

  const toggleBookmark = async (id, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${serverUrl}/api/user/progress/bookmarked`,
        {
          questionId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookmarked(new Set(response.data.bookmarkedQuestions));
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  const handleNoteChange = async (questionId, noteText) => {
    if (isNotesLocked) {
      alert("Notes feature is locked, you need to subscribe to unlock it");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${serverUrl}/api/user/progress/notes`,
        {
          questionId,
          note: noteText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedNotes = response.data.notes.reduce((acc, note) => {
        acc[note.questionId] = note.note;
        return acc;
      }, {});
      setNotes(updatedNotes);
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  const IconButton = ({
    isActive,
    activeIcon,
    inactiveIcon,
    onClick,
    tooltip,
  }) => (
    <button
      onClick={onClick}
      className={`relative group p-2 hover:bg-gray-700 rounded inline-flex items-center`}
      title={tooltip}
    >
      <span className="text-lg">{isActive ? activeIcon : inactiveIcon}</span>
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800  text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap mb-1">
        {tooltip}
      </span>
    </button>
  );

  const filteredQuestions = questionsList.filter((question) => {
    if (showBookmarked && !bookmarked.has(question.id)) return false;
    if (showWithNotes && !notes[question.id]) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-gray-900">
        {error}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white p-4 sm:p-6`} // Adjusted padding for smaller screens
    >
      <div className="max-w-6xl mx-auto">
        {/* Stats Section */}
        <h1 className="text-3xl font-bold mb-4">150 Elite DSA Challenges</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg shadow-sm bg-gray-800`}>
            <h3 className="text-lg font-semibold text-gray-300">
              Total Solved
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {solvedQuestions.size}
            </p>
            <p className="text-sm text-gray-400">
              out of {questionsList.length}
            </p>
          </div>
          {Object.entries(getDifficultyStats()).map(([difficulty, count]) => (
            <div
              key={difficulty}
              className={`p-4 rounded-lg shadow-sm bg-gray-800`}
            >
              <h3 className="text-lg font-semibold text-gray-300">
                {difficulty}
              </h3>
              <p className="text-3xl font-bold text-blue-600">{count}</p>
              <p className="text-sm text-gray-400">solved</p>
            </div>
          ))}
        </div>

        {/* Filter Toggles */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowBookmarked(!showBookmarked)}
            className={`px-4 py-2 rounded-lg ${
              showBookmarked
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Show Bookmarked
          </button>
          <button
            onClick={() => setShowWithNotes(!showWithNotes)}
            className={`px-4 py-2 rounded-lg ${
              showWithNotes
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Show With Notes
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {" "}
          {/* Reduced gap for mobile */}
          {/* Questions List */}
          <div className={`rounded-lg shadow-sm p-4 sm:p-6 bg-gray-800`}>
            <h2 className="text-xl font-bold mb-4 text-white">All Questions</h2>
            <div className="space-y-2">
              {" "}
              {/* Reduced spacing for mobile */}
              {filteredQuestions.map((question) => (
                <div key={question.id}>
                  <div
                    onClick={() =>
                      setSelectedQuestion(
                        selectedQuestion?.id === question.id ? null : question
                      )
                    }
                    className={`p-2 sm:p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                      // Reduced padding for mobile
                      selectedQuestion?.id === question.id
                        ? "border-blue-500"
                        : "border-gray-700"
                    } bg-gray-700 hover:bg-gray-600`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {" "}
                        {/* Reduced gap for mobile */}
                        <span className="text-gray-300">{question.id}.</span>
                        <span className="font-medium text-white">
                          {question.title}
                        </span>
                        <span
                          className={`px-1 sm:px-2 py-0.5 rounded-full text-xs ${getDifficultyColor(
                            // Reduced padding and text size for mobile
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty}
                        </span>
                      </div>
                      <div className="flex gap-1 sm:gap-2">
                        {" "}
                        {/* Reduced gap for mobile */}
                        <IconButton
                          isActive={bookmarked.has(question.id)}
                          activeIcon={
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          }
                          inactiveIcon={<BookmarkPlus className="w-5 h-5" />}
                          onClick={(e) => toggleBookmark(question.id, e)}
                          tooltip={
                            bookmarked.has(question.id)
                              ? "Remove Bookmark"
                              : "Add Bookmark"
                          }
                        />
                        <IconButton
                          isActive={solvedQuestions.has(question.id)}
                          activeIcon={
                            <Check className="w-5 h-5 text-green-500" />
                          }
                          inactiveIcon={<Circle className="w-5 h-5" />}
                          onClick={(e) => toggleSolved(question.id, e)}
                          tooltip={
                            solvedQuestions.has(question.id)
                              ? "Mark as Unsolved"
                              : "Mark as Solved"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question Details - Shown inline for mobile */}
                  {isMobile && selectedQuestion?.id === question.id && (
                    <div
                      className={`rounded-lg shadow-sm mt-2 sm:mt-3 bg-gray-800`}
                    >
                      <div className="p-4 sm:p-6 border-b border-gray-700">
                        {" "}
                        {/* Reduced padding for mobile */}
                        <div className="flex justify-between items-start mb-2 sm:mb-4">
                          {" "}
                          {/* Reduced margin for mobile */}
                          <h2 className="text-xl font-bold text-white">
                            {selectedQuestion.title}
                          </h2>
                          <div className="flex gap-1 sm:gap-2">
                            {" "}
                            {/* Reduced gap for mobile */}
                            <IconButton
                              isActive={bookmarked.has(selectedQuestion.id)}
                              activeIcon={
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              }
                              inactiveIcon={
                                <BookmarkPlus className="w-5 h-5" />
                              }
                              onClick={(e) =>
                                toggleBookmark(selectedQuestion.id, e)
                              }
                              tooltip={
                                bookmarked.has(selectedQuestion.id)
                                  ? "Remove Bookmark"
                                  : "Add Bookmark"
                              }
                            />
                            <IconButton
                              isActive={solvedQuestions.has(
                                selectedQuestion.id
                              )}
                              activeIcon={
                                <Check className="w-5 h-5 text-green-500" />
                              }
                              inactiveIcon={<Circle className="w-5 h-5" />}
                              onClick={(e) =>
                                toggleSolved(selectedQuestion.id, e)
                              }
                              tooltip={
                                solvedQuestions.has(selectedQuestion.id)
                                  ? "Mark as Unsolved"
                                  : "Mark as Solved"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {" "}
                          {/* Reduced gap for mobile */}
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                              // Reduced padding and text size for mobile
                              selectedQuestion.difficulty
                            )}`}
                          >
                            {selectedQuestion.difficulty}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300`}
                          >
                            👥 {selectedQuestion.solvedBy.toLocaleString()}{" "}
                            solved
                          </span>
                        </div>
                      </div>

                      {/* Tabs */}
                      <div className="border-b border-gray-700">
                        <div className="flex">
                          {["description", "companies", "notes"].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`px-4 py-2 font-medium text-sm sm:text-base relative ${
                                // Reduced padding and text size for mobile
                                activeTab === tab
                                  ? "border-b-2 border-blue-500 text-blue-400"
                                  : "text-gray-400 hover:text-gray-200"
                              }`}
                            >
                              {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tab Content */}
                      <div className="p-4 sm:p-6">
                        {" "}
                        {/* Reduced padding for mobile */}
                        {activeTab === "description" && (
                          <div className="space-y-4 sm:space-y-6">
                            {" "}
                            {/* Reduced spacing for mobile */}
                            <div>
                              <p className="text-gray-300">
                                {selectedQuestion.description}
                              </p>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1 sm:mb-2 text-white">
                                {" "}
                                {/* Reduced margin for mobile */}
                                Examples
                              </h3>
                              {selectedQuestion.examples.map(
                                (example, index) => (
                                  <div
                                    key={index}
                                    className={`p-2 sm:p-4 rounded-lg mb-1 sm:mb-2 bg-gray-700`}
                                  >
                                    <p
                                      className={`mb-0.5 sm:mb-1 text-gray-300`}
                                    >
                                      <span className="font-medium">
                                        Input:
                                      </span>{" "}
                                      {example.input}
                                    </p>
                                    <p
                                      className={`mb-0.5 sm:mb-1 text-gray-300`}
                                    >
                                      <span className="font-medium">
                                        Output:
                                      </span>{" "}
                                      {example.output}
                                    </p>
                                    <p className="text-gray-300">
                                      <span className="font-medium">
                                        Explanation:
                                      </span>{" "}
                                      {example.explanation}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1 sm:mb-2 text-white">
                                {" "}
                                {/* Reduced margin for mobile */}
                                Constraints
                              </h3>
                              <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                                {" "}
                                {/* Reduced padding and margin for mobile */}
                                {selectedQuestion.constraints.map(
                                  (constraint, index) => (
                                    <li key={index} className="text-gray-300">
                                      {constraint}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                        {activeTab === "companies" && (
                          <div>
                            <h3 className="font-semibold mb-2 sm:mb-4 text-white">
                              {" "}
                              {/* Reduced margin for mobile */}
                              Companies that ask this question
                            </h3>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {" "}
                              {/* Reduced gap for mobile */}
                              {selectedQuestion.companies.map((company) => (
                                <span
                                  key={company}
                                  className={`px-2 py-1 rounded-lg text-xs sm:text-sm bg-gray-700 text-gray-300`}
                                >
                                  {company}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {activeTab === "notes" && (
                          <div className="relative">
                            <textarea
                              value={notes[selectedQuestion.id] || ""}
                              onChange={(e) =>
                                handleNoteChange(
                                  selectedQuestion.id,
                                  e.target.value
                                )
                              }
                              disabled={isNotesLocked}
                              placeholder="Write your approach, time complexity analysis, and key insights here..."
                              className={`w-full h-40 sm:h-64 p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-gray-700 text-white border-gray-600 ${
                                isNotesLocked ? "cursor-not-allowed" : ""
                              }`}
                            />
                            {isNotesLocked && (
                              <Lock className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 text-center">UPDATING SOON...</div>
          </div>
          {/* Question Details - Shown on right for non mobile devices */}
          {!isMobile && selectedQuestion && (
            <div className={`rounded-lg shadow-sm bg-gray-800`}>
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {selectedQuestion.title}
                  </h2>
                  <div className="flex gap-2">
                    <IconButton
                      isActive={bookmarked.has(selectedQuestion.id)}
                      activeIcon={
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      }
                      inactiveIcon={<BookmarkPlus className="w-5 h-5" />}
                      onClick={(e) => toggleBookmark(selectedQuestion.id, e)}
                      tooltip={
                        bookmarked.has(selectedQuestion.id)
                          ? "Remove Bookmark"
                          : "Add Bookmark"
                      }
                    />
                    <IconButton
                      isActive={solvedQuestions.has(selectedQuestion.id)}
                      activeIcon={<Check className="w-5 h-5 text-green-500" />}
                      inactiveIcon={<Circle className="w-5 h-5" />}
                      onClick={(e) => toggleSolved(selectedQuestion.id, e)}
                      tooltip={
                        solvedQuestions.has(selectedQuestion.id)
                          ? "Mark as Unsolved"
                          : "Mark as Solved"
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                      selectedQuestion.difficulty
                    )}`}
                  >
                    {selectedQuestion.difficulty}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300`}
                  >
                    👥 {selectedQuestion.solvedBy.toLocaleString()} solved
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-700">
                <div className="flex">
                  {["description", "companies", "notes"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-medium relative ${
                        activeTab === tab
                          ? "border-b-2 border-blue-500 text-blue-400"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "description" && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-300">
                        {selectedQuestion.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-white">
                        Examples
                      </h3>
                      {selectedQuestion.examples.map((example, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg mb-2 bg-gray-700`}
                        >
                          <p className={`mb-1 text-gray-300`}>
                            <span className="font-medium">Input:</span>{" "}
                            {example.input}
                          </p>
                          <p className={`mb-1 text-gray-300`}>
                            <span className="font-medium">Output:</span>{" "}
                            {example.output}
                          </p>
                          <p className="text-gray-300">
                            <span className="font-medium">Explanation:</span>{" "}
                            {example.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-white">
                        Constraints
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedQuestion.constraints.map(
                          (constraint, index) => (
                            <li key={index} className="text-gray-300">
                              {constraint}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "companies" && (
                  <div>
                    <h3 className="font-semibold mb-4 text-white">
                      Companies that ask this question
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedQuestion.companies.map((company) => (
                        <span
                          key={company}
                          className={`px-4 py-2 rounded-lg bg-gray-700 text-gray-300`}
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="relative">
                    <textarea
                      value={notes[selectedQuestion.id] || ""}
                      onChange={(e) =>
                        handleNoteChange(selectedQuestion.id, e.target.value)
                      }
                      disabled={isNotesLocked}
                      placeholder="Write your approach, time complexity analysis, and key insights here..."
                      className={`w-full h-64 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white border-gray-600 ${
                        isNotesLocked ? "cursor-not-allowed" : ""
                      }`}
                    />
                    {isNotesLocked && (
                      <Lock className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <section className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Main Content Container */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-purple-300">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Coming Soon
                  </span>
                  <Sparkles className="w-5 h-5" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Something Exciting is Coming
                </h1>
                <p className="text-lg text-purple-200 max-w-xl mx-auto">
                  We're crafting something amazing for you. Join our waitlist to
                  be the first to experience it.
                </p>
              </div>

              {/* Newsletter Signup */}
              {/* <div className="max-w-md mx-auto space-y-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-purple-400/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-purple-300">
                  We'll notify you as soon as we launch. No spam, we promise!
                </p>
              </div> */}

              {/* <div className="pt-4">
                <div className="flex justify-center gap-6">
                  <a href="#">Instagram</a>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DSA150;
