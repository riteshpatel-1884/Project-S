import React, { useState, useEffect } from "react";
import { projectIdeas } from "./project";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.classList.add("dark");
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const filteredProjects =
    filter === "All"
      ? projectIdeas
      : projectIdeas.filter((project) => project.difficulty === filter);

  const categoryCounts = {
    All: projectIdeas.length,
    Beginner: projectIdeas.filter(
      (project) => project.difficulty === "Beginner"
    ).length,
    Intermediate: projectIdeas.filter(
      (project) => project.difficulty === "Intermediate"
    ).length,
    Advanced: projectIdeas.filter(
      (project) => project.difficulty === "Advanced"
    ).length,
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text mb-8 md:mb-12 animate-pulse">
          Web Development Project Ideas
        </h1>

        {/* Difficulty Filters */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8 md:mb-12 flex-wrap">
          {["All", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setFilter(difficulty)}
              className={`px-4 py-1 md:px-6 md:py-2 rounded-full font-semibold transition-all text-sm md:text-base flex items-center ${
                filter === difficulty
                  ? "bg-indigo-500 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-200"
              }`}
            >
              {difficulty}
              <span
                className={`ml-2 text-xs md:text-sm text-gray-400 ${
                  isMobile ? "text-xs" : "text-sm"
                } `}
              >
                ({categoryCounts[difficulty]})
              </span>
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg cursor-pointer border border-gray-700"
              onClick={() => handleProjectClick(project)}
            >
              <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
                  {project.title}
                </h2>
                <p
                  className={`text-gray-400 mb-2 md:mb-4 line-clamp-3 ${
                    isMobile ? "text-sm" : "text-base"
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs md:text-sm font-semibold ${
                    project.difficulty === "Beginner"
                      ? "bg-green-900 text-green-200"
                      : project.difficulty === "Intermediate"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-red-900 text-red-200"
                  }`}
                >
                  {project.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm z-50 overflow-y-auto">
            {" "}
            {/* Added overflow-y-auto to the modal container */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 max-w-2xl w-full mx-4 relative border border-gray-700 overflow-y-auto max-h-[90vh] text-white">
              {" "}
              {/* Added overflow-y-auto and max-h-[90vh] to the modal content div */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                {selectedProject.title}
              </h2>
              <p
                className={`text-gray-300 mb-4 md:mb-6 ${
                  isMobile ? "text-sm" : "text-base"
                }`}
              >
                {selectedProject.description}
              </p>
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-4">
                  Features:
                </h3>
                <ul
                  className={`list-disc list-inside text-gray-400 ${
                    isMobile ? "text-sm" : "text-base"
                  }`}
                >
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-4">
                  Technologies:
                </h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded-lg text-xs md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-4">
                  Difficulty:
                </h3>
                <span
                  className={`inline-block px-2 py-1 rounded-lg text-xs md:text-sm font-semibold ${
                    selectedProject.difficulty === "Beginner"
                      ? "bg-green-900 text-green-200"
                      : selectedProject.difficulty === "Intermediate"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-red-900 text-red-200"
                  }`}
                >
                  {selectedProject.difficulty}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
