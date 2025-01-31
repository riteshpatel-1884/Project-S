import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hrQuestions } from "./HRQuestionsData";
import "./HR.css";
import {
  ChevronDown,
  Lightbulb,
  BookOpen,
  Search,
  Tag,
  User,
  Target,
  Briefcase,
  Brain,
  Activity,
  MessageSquare,
} from "lucide-react";

const HRQuestions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.classList.add("dark");
    setTimeout(() => setIsLoading(false), 1000);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Calculate category counts
  const categoryCounts = hrQuestions.reduce((acc, question) => {
    acc[question.category] = (acc[question.category] || 0) + 1;
    return acc;
  }, {});

  // Add total count for "All" category
  categoryCounts["All"] = hrQuestions.length;

  const categories = ["All", ...new Set(hrQuestions.map((q) => q.category))];

  const getCategoryIcon = (category) => {
    if (isMobile) return null;

    const icons = {
      Personal: User,
      "Career Goals": Target,
      Experience: Briefcase,
      Skills: Brain,
      Behavioral: Activity,
    };
    const Icon = icons[category] || BookOpen;
    return <Icon size={20} />;
  };

  const filteredQuestions = hrQuestions.filter((q) => {
    const matchesSearch = q.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="space-y-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isMobile ? "p-4" : "p-6"
      }  bg-gray-900 text-white`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl text-center font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          HR Interview Questions
        </h1>
        <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
          Master your interview with our comprehensive guide to common HR
          questions
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-sm font-medium ${
                      selectedCategory === category
                        ? "bg-white text-blue-500"
                        : "bg-blue-900 text-blue-200"
                    }`}
                  >
                    {categoryCounts[category] || 0}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Questions List */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((q, index) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-700"
              >
                <button
                  onClick={() =>
                    setSelectedQuestion(selectedQuestion === q.id ? null : q.id)
                  }
                  className="w-full text-left p-4 focus:outline-none"
                >
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-start gap-3">
                      {!isMobile && (
                        <div className="flex-shrink-0 bg-blue-900 p-3 rounded-lg">
                          {getCategoryIcon(q.category)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">
                          {q.question}
                        </h3>
                        <div className="flex items-center">
                          {!isMobile && (
                            <Tag className="text-blue-500 mr-2" size={16} />
                          )}
                          <span className="text-sm text-blue-500 font-medium">
                            {q.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: selectedQuestion === q.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-gray-400 w-6 h-6" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {selectedQuestion === q.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-8 pt-2 space-y-6">
                        {/* Tips Section */}
                        <div className="p-5 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl border border-gray-700">
                          <div className="flex items-start gap-4">
                            {!isMobile && (
                              <div className="flex-shrink-0 bg-yellow-900 p-3 rounded-lg">
                                <Lightbulb
                                  className="text-yellow-500"
                                  size={24}
                                />
                              </div>
                            )}
                            <div>
                              <h4 className="font-semibold text-gray-300 mb-4 text-lg">
                                Tips for answering:
                              </h4>
                              <ul className="space-y-4">
                                {q.tips.map((tip, index) => (
                                  <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3 text-gray-400"
                                  >
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <span className="text-lg">{tip}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Example Answer Section */}
                        <div className="p-6 bg-gradient-to-br from bg-green-200 rounded-xl border border-gray-700">
                          <div className="flex items-start gap-4">
                            {!isMobile && (
                              <div className="flex-shrink-0 bg-green-900 p-3 rounded-lg">
                                <MessageSquare
                                  className="text-green-500"
                                  size={24}
                                />
                              </div>
                            )}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                                Example Answer:
                              </h4>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-800 text-lg leading-relaxed"
                              >
                                {q.exampleAnswer}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default HRQuestions;
