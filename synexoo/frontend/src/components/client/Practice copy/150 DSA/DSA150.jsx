import React, { useState, useEffect } from "react";
import {
  Check,
  Circle,
  Star,
  BookmarkPlus,
  Lock,
  Sparkles,
} from "lucide-react";
import { weeklyQuestions } from "./dsa150questions";

const WeeklySeries = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const [bookmarked, setBookmarked] = useState(new Set());
  const [activeTab, setActiveTab] = useState("description");
  const [notes, setNotes] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    document.body.classList.add("dark");
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleWeekClick = (weekNum) => {
    setSelectedWeek(weekNum);
    setShowQuestions(true);
    setSelectedQuestion(null);
  };

  const isWeekUnlocked = (weekNum) => {
    if (weekNum === 1) return true;
    const previousWeekQuestions = weeklyQuestions[weekNum - 2].questions;
    const solvedInPreviousWeek = previousWeekQuestions.filter((q) =>
      solvedQuestions.has(q.id)
    ).length;
    return solvedInPreviousWeek >= 12;
  };

  const getWeekProgress = (weekNum) => {
    const weekQuestions = weeklyQuestions[weekNum - 1].questions;
    const solvedCount = weekQuestions.filter((q) =>
      solvedQuestions.has(q.id)
    ).length;
    return (solvedCount / 15) * 100;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "bg-green-900 text-green-200",
      Medium: "bg-yellow-900 text-yellow-200",
      Hard: "bg-red-900 text-red-200",
    };
    return colors[difficulty];
  };

  const toggleSolved = async (id) => {
    setSolvedQuestions((prevSolved) => {
      const newSolved = new Set(prevSolved);
      if (newSolved.has(id)) {
        newSolved.delete(id);
      } else {
        newSolved.add(id);
      }
      return newSolved;
    });

    // Make request to backend to update
    try {
      await fetch(
        "https://project-s-nuaq.onrender.com/api/user/weeklyprogress/solved",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ questionId: id }),
        }
      );
    } catch (error) {
      console.error("error while toggling solved:", error);
    }
  };

  const toggleBookmark = async (id) => {
    setBookmarked((prevBookmarked) => {
      const newBookmarked = new Set(prevBookmarked);
      if (newBookmarked.has(id)) {
        newBookmarked.delete(id);
      } else {
        newBookmarked.add(id);
      }
      return newBookmarked;
    });
    try {
      await fetch(
        "https://project-s-nuaq.onrender.com/api/user/weeklyprogress/bookmarked",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ questionId: id }),
        }
      );
    } catch (error) {
      console.error("error while toggling bookmarked:", error);
    }
  };

  // Update notes state
  const handleNoteChange = (questionId, note) => {
    setNotes((prevNotes) => {
      const updatedNotes = { ...prevNotes, [questionId]: note };
      return updatedNotes;
    });
  };

  // Send updated notes to the backend
  const handleNoteBlur = async (questionId) => {
    try {
      await fetch(
        "https://project-s-nuaq.onrender.com/api/user/weeklyprogress/notes",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            questionId: questionId,
            note: notes[questionId],
          }),
        }
      );
    } catch (error) {}
  };

  // useEffect to fetch the user progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await fetch(
          "https://project-s-nuaq.onrender.com/api/user/weeklyprogress",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSolvedQuestions(new Set(data.solvedQuestions));
          setBookmarked(new Set(data.bookmarkedQuestions));

          const notesObj = data.notes.reduce((acc, note) => {
            acc[note.questionId] = note.note;
            return acc;
          }, {});

          setNotes(notesObj);
        } else {
          console.error("Error fetching user progress:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };
    fetchUserProgress();
  }, []);

  return (
    <div className={`min-h-screen bg-gray-900 text-white sm:p-6`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Weekly DSA Challenge</h1>
            <p className="text-gray-400">Master one topic every week</p>
          </div>
        </div>

        {/* Weeks List */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeklyQuestions.map((week) => {
              const isUnlocked = isWeekUnlocked(week.week);
              const progress = getWeekProgress(week.week);

              return (
                <div
                  key={week.week}
                  className={`p-4 rounded-lg border border-gray-700 bg-gray-800/50 ${
                    selectedWeek === week.week ? "ring-2 ring-blue-500" : ""
                  } ${
                    isUnlocked
                      ? "hover:border-blue-500 cursor-pointer"
                      : "opacity-75"
                  }`}
                  onClick={() => isUnlocked && handleWeekClick(week.week)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Week {week.week}</h3>
                    {!isUnlocked && <Lock className="w-4 h-4 text-gray-500" />}
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{week.topic}</p>
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between items-center text-sm">
                    <span className="text-gray-400">
                      {Math.round(progress)}% Complete
                    </span>
                    <span className="text-gray-400">
                      {
                        weeklyQuestions[week.week - 1].questions.filter((q) =>
                          solvedQuestions.has(q.id)
                        ).length
                      }
                      /15
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Week Content */}
        {selectedWeek && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Questions List */}
            <div
              className={`rounded-lg border border-gray-700 bg-gray-800/50 p-2 ${
                isMobile ? "block mb-6" : "block"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    Week {selectedWeek}:{" "}
                    {weeklyQuestions[selectedWeek - 1].topic}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Complete 12 questions to unlock next week
                  </p>
                </div>
              </div>
              <div>Updating Soon....</div>
              {/* <div className="space-y-3">
                {weeklyQuestions[selectedWeek - 1].questions.map((question) => (
                  <div
                    key={question.id}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedQuestion?.id === question.id
                        ? "border-blue-500"
                        : "border-gray-700"
                    } hover:bg-gray-700/50 cursor-pointer`}
                  >
                    <div
                      className="flex items-center justify-between"
                      onClick={() => setSelectedQuestion(question)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-500">{question.id}.</span>
                        <span className="font-medium">{question.title}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(question.id);
                          }}
                          className={`p-1 rounded hover:bg-gray-700`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              bookmarked.has(question.id)
                                ? "fill-yellow-400 text-yellow-400"
                                : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSolved(question.id);
                          }}
                          className={`p-1 rounded hover:bg-gray-700`}
                        >
                          {solvedQuestions.has(question.id) ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    {isMobile && selectedQuestion?.id === question.id && (
                      <div
                        className={`rounded-lg border border-gray-700 bg-gray-800/50 p-6 mt-2`}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h2 className="text-xl font-bold mb-2">
                              {selectedQuestion.title}
                            </h2>
                            <div className="flex space-x-2">
                              <span
                                className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                                  selectedQuestion.difficulty
                                )}`}
                              >
                                {selectedQuestion.difficulty}
                              </span>
                              <span
                                className={`px-2 py-1 rounded text-xs bg-gray-700 text-gray-300`}
                              >
                                👥 {selectedQuestion.solvedBy.toLocaleString()}{" "}
                                solved
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                toggleBookmark(selectedQuestion.id)
                              }
                              className={`p-2 rounded hover:bg-gray-700`}
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  bookmarked.has(selectedQuestion.id)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : ""
                                }`}
                              />
                            </button>
                            <button
                              onClick={() => toggleSolved(selectedQuestion.id)}
                              className={`p-2 rounded hover:bg-gray-700`}
                            >
                              {solvedQuestions.has(selectedQuestion.id) ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <p className="text-gray-300">
                              {selectedQuestion.description}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Examples</h3>
                            {selectedQuestion.examples.map((example, index) => (
                              <div
                                key={index}
                                className={`p-4 rounded-lg mb-3 bg-gray-700`}
                              >
                                <p className="mb-2">
                                  <span className="font-medium">Input:</span>{" "}
                                  {example.input}
                                </p>
                                <p className="mb-2">
                                  <span className="font-medium">Output:</span>{" "}
                                  {example.output}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Explanation:
                                  </span>{" "}
                                  {example.explanation}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Constraints</h3>
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
                        <div>
                          <h3 className="font-semibold mb-3">Notes</h3>
                          <textarea
                            value={notes[selectedQuestion.id] || ""}
                            onChange={(e) =>
                              handleNoteChange(
                                selectedQuestion.id,
                                e.target.value
                              )
                            }
                            onBlur={() => handleNoteBlur(selectedQuestion.id)}
                            className={`w-full p-2 h-40 rounded border border-gray-600 bg-gray-700 text-white`}
                            placeholder="Add your notes here..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div> */}
            </div>

            {/* Question Details */}
            {!isMobile && selectedQuestion && (
              <div
                className={`rounded-lg border border-gray-700 bg-gray-800/50 p-6`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {selectedQuestion.title}
                    </h2>
                    <div className="flex space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                          selectedQuestion.difficulty
                        )}`}
                      >
                        {selectedQuestion.difficulty}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs bg-gray-700 text-gray-300`}
                      >
                        👥 {selectedQuestion.solvedBy.toLocaleString()} solved
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleBookmark(selectedQuestion.id)}
                      className={`p-2 rounded hover:bg-gray-700`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          bookmarked.has(selectedQuestion.id)
                            ? "fill-yellow-400 text-yellow-400"
                            : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => toggleSolved(selectedQuestion.id)}
                      className={`p-2 rounded hover:bg-gray-700`}
                    >
                      {solvedQuestions.has(selectedQuestion.id) ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-300">
                      {selectedQuestion.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Examples</h3>
                    {selectedQuestion.examples.map((example, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg mb-3 bg-gray-700`}
                      >
                        <p className="mb-2">
                          <span className="font-medium">Input:</span>{" "}
                          {example.input}
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Output:</span>{" "}
                          {example.output}
                        </p>
                        <p>
                          <span className="font-medium">Explanation:</span>{" "}
                          {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Constraints</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedQuestion.constraints.map((constraint, index) => (
                        <li key={index} className="text-gray-300">
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Notes</h3>
                  <textarea
                    value={notes[selectedQuestion.id] || ""}
                    onChange={(e) =>
                      handleNoteChange(selectedQuestion.id, e.target.value)
                    }
                    onBlur={() => handleNoteBlur(selectedQuestion.id)}
                    className={`w-full p-2 h-80 rounded border border-gray-600 bg-gray-700 text-white`}
                    placeholder="Add your notes here..."
                  />
                </div>
              </div>
            )}
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeeklySeries;
