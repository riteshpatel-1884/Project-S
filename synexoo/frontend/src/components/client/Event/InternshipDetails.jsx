import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./InternshipDetails.css";
import {
  CheckCircle,
  Award,
  BookOpen,
  Shield,
  Target,
  Building2,
  Network,
  UserCircle,
  Users2,
  Code,
  Brain,
  ArrowRight,
  Lock,
  Users,
  MessageCircle,
  Send,
  ClipboardCheck,
} from "lucide-react";
const InternshipProgram = () => {
  //First Section
  const programBenefits = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Transparency & Accountability",
      description:
        "Detailed project outlines, clear expectations, and measurable outcomes before enrollment",
      subFeatures: [
        "Project Roadmaps",
        "Skill Development Path",
        "Regular Progress Tracking",
      ],
      bgColor: "bg-blue-50 hover:bg-blue-100",
      iconColor: "text-blue-500",
      hoverIconColor: "group-hover:text-blue-600",
    },
    {
      icon: <UserCircle className="w-8 h-8" />,
      title: "Expert Mentorship",
      description:
        "Learn from industry professionals with proven expertise in their fields",
      subFeatures: ["Regular Feedback", "Expert Guidance", "Weekly Sessions"],
      bgColor: "bg-purple-50 hover:bg-purple-100",
      iconColor: "text-purple-500",
      hoverIconColor: "group-hover:text-purple-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Niche Specialization",
      description: "Focused programs in Web Development, AI & Data Science",
      subFeatures: [
        "Industry-Specific Projects",
        "Specialized Knowledge",
        "Real-World Challenges",
      ],
      bgColor: "bg-green-50 hover:bg-green-100",
      iconColor: "text-green-500",
      hoverIconColor: "group-hover:text-green-600",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Industry Partnerships",
      description:
        "Work on real projects with leading companies in your chosen field",
      subFeatures: ["Real Projects", "Company Mentors", "Job Opportunities"],
      bgColor: "bg-red-50 hover:bg-red-100",
      iconColor: "text-red-500",
      hoverIconColor: "group-hover:text-red-600",
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Community Learning",
      description:
        "Join a vibrant community of peers and alumni for collaborative growth",
      subFeatures: ["Peer Projects", "Study Groups", "Networking Events"],
      bgColor: "bg-orange-50 hover:bg-orange-100",
      iconColor: "text-orange-500",
      hoverIconColor: "group-hover:text-orange-600",
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: "Alumni Network",
      description:
        "Access a growing network of successful graduates for mentorship and opportunities",
      subFeatures: ["Career Support", "Mentorship", "Industry Connections"],
      bgColor: "bg-teal-50 hover:bg-teal-100",
      iconColor: "text-teal-500",
      hoverIconColor: "group-hover:text-teal-600",
    },
  ];
  // End

  //Second Section
  const features = [
    {
      title: "Value-Based Pricing",
      description:
        "We transparently showcase the value behind your investment.",
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-800",
      borderColor: "border-indigo-200",
      items: [
        {
          title: "Detailed Breakdown",
          description:
            "See where your money goes – mentor access, software & resources.",
        },
        {
          title: "ROI (Return on Investment)",
          description: "This Investment Makes You Stand Out in Career Growth",
        },
      ],
    },
    {
      title: "Scholarship Opportunities",
      description:
        "We support motivated learners with partial and full scholarships, making our program accessible.",
      icon: <Award className="w-8 h-8 text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      borderColor: "border-green-200",
    },
    {
      title: "Free Introductory Sessions",
      description:
        "Experience our program first hand with free webinars and introductory mini-projects.",
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      borderColor: "border-blue-200",
    },
    {
      title: "Guarantee/Refunds",
      description:
        "We offer partial or full refunds if you create an outstanding project.",
      icon: <Shield className="w-8 h-8 text-yellow-600" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  //end

  //third section
  const [activeModule, setActiveModule] = useState(0);

  const curriculumModules = [
    {
      icon: <BookOpen />,
      title: "Foundation Phase",
      duration: "Day 1 - 2",
      description: "Internship Details & Overview",
      topics: [
        "Industry Overview",
        "Development Environment Setup",
        "Version Control &  Tools",
        "Basic Project Architecture",
        "Code Review Process",
      ],
      color: "blue",
    },
    {
      icon: <Code />,
      title: "Development Phase 1",
      duration: "DAY 3 - 20",
      description: "Begin Your Project Creation",
      topics: [
        "Setup Development Environment",
        "Install dependencies & Libraries",
      ],
      color: "yellow",
    },
    {
      icon: <Target />,
      title: "Internship Progress Tracking & Feedback",
      duration: "Day 21 - 23",
      description: "Sharing Project Progress with Your Assigned Mentors",
      topics: [
        "Highlight the key tasks and milestones that have been completed",
        "Share the obstacles encountered during the project",
        "Mention any new tools, frameworks, or technologies learned and applied.",
        "Outline the next steps or what will be worked on in the upcoming days",
      ],
      color: "purple",
    },
    {
      icon: <Code />,
      title: "Development Phase 2",
      duration: "Days 24 - 45",
      description: "Continue Your Project Creation",
      topics: [
        "Ensure that all the remaining features identified during the initial stages are developed and integrated into the project.",
      ],
      color: "green",
    },
    {
      icon: <ClipboardCheck />,
      title: "Testing Phase",
      duration: "Days 46 - 50",
      description: "Testing, Optimizing & Bug Fixing ",
      topics: [
        "Perform comprehensive testing to identify any bugs or issues.",
        "Work on optimizing the codebase for better performance ",
        "Focus on enhancing the user interface to make it more user-friendly and visually appealing.",
        "Ensure the application is secure by implementing necessary security features ",
      ],
      color: "purple",
    },
    {
      icon: <Send />,
      title: "Project Submission & Documentation",
      duration: "Days 41 - 55",
      description: "Guidelines for Project Submission & Documentation",
      topics: [
        "Organize your project on GitHub, GitLab, or Bitbucket.",
        "List all tools, frameworks, and libraries used.",
        "Create a short video (3–5 minutes) demonstrating key features and project functionality.",
        "Deploy your project on platforms like Netlify, Vercel, Heroku/Railway or Firebase Hosting ",
      ],
      color: "blue",
    },
    {
      icon: <MessageCircle />,
      title: " Final Assessment & Feedback",
      duration: "Days 46 - 60",
      description:
        "Once the internship period concludes, the Internship Evaluation serves as a critical step in determining the intern's overall performance, growth, and the skills they have developed. ",
      topics: [
        "Checking if the project meets the set objectives and requirements.",
        "Evaluation of creativity and resourcefulness in overcoming obstacles and finding solutions.",
        "Mentors will provide feedback on the overall project, highlighting strengths, areas for improvement, and recommendations.",
        "Based on the evaluation, successful interns can be awarded a certificate of completion",
        "If the internship includes job placement opportunities, an evaluation will also determine whether the intern qualifies for full-time roles",
      ],
      color: "green",
    },
  ];
  //end

  //Fourth Section
  const [activeCard, setActiveCard] = useState(null);

  //fifth popup
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="responsive flex flex-col items-center py-8 bg-white">
        {/* Title Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-7xl font-bold text-gray-900 mb-4">
            {" "}
            Code & Create Internship
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your passion into impact. Code, design, and build with
            Synexoo.
          </p>
        </motion.div>
        {/* Card Grid */}

        <section>
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programBenefits.map((feature, index) => (
                <div
                  key={index}
                  className={`group ${feature.bgColor} rounded-xl p-6 
              transform transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-xl
              cursor-pointer relative overflow-hidden`}
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-black" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-start">
                    {/* Icon with bounce animation */}
                    <div
                      className={`mb-4 transform transition-all duration-300 
                ${feature.iconColor} ${feature.hoverIconColor}
                group-hover:-translate-y-1`}
                    >
                      {feature.icon}
                    </div>

                    {/* Title with slide-up animation */}
                    <h3
                      className="text-xl font-semibold text-gray-800 mb-3
                transform transition-all duration-300
                translate-y-0 group-hover:-translate-y-1"
                    >
                      {feature.title}
                    </h3>

                    {/* Description with fade-in animation */}
                    <p
                      className="text-gray-600 text-sm mb-4
                transition-all duration-300
                group-hover:text-gray-800"
                    >
                      {feature.description}
                    </p>

                    {/* Sub-features with stagger animation */}
                    <ul className="space-y-2 w-full">
                      {feature.subFeatures.map((subFeature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600
                      transform transition-all duration-300 
                      translate-y-0 opacity-80
                      group-hover:translate-x-1 group-hover:opacity-100"
                          style={{
                            transitionDelay: `${idx * 50}ms`,
                          }}
                        >
                          <div
                            className={`w-1 h-1 rounded-full ${feature.iconColor} mr-2`}
                          />
                          {subFeature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Addressing Your Fee Hesitations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We understand your concerns about investment. Here's how we make
                our program worth every penny.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  className={`${feature.bgColor} rounded-xl p-6 border ${feature.borderColor} shadow-lg`}
                >
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3
                      className={`${feature.textColor} text-xl font-semibold ml-3`}
                    >
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 mb-4">{feature.description}</p>

                  {feature.items && (
                    <ul className="space-y-3">
                      {feature.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-indigo-600"></span>
                          <span className="ml-2 text-gray-600">
                            <span className="font-medium">{item.title}: </span>
                            {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section>
          <div className="min-h-screen bg-white p-8">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Your Internship Journey
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                A transformative 2 months Internship project curriculum designed
                to take you from basics to mastery
              </p>
            </div>

            {/* Timeline Navigation */}
            <div className="relative mb-16 max-w-4xl mx-auto">
              <div className="absolute top-1/2 w-full h-1 bg-gray-200"></div>
              <div className="flex justify-between relative">
                {curriculumModules.map((module, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveModule(index)}
                    className="relative group"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center 
                transform transition-all duration-500 shadow-lg
                ${
                  index <= activeModule
                    ? `bg-${module.color}-500`
                    : "bg-gray-100"
                }
                group-hover:scale-110 group-hover:rotate-[360deg]`}
                    >
                      <div
                        className={`text-xl ${
                          index <= activeModule ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {module.icon}
                      </div>
                    </div>
                    <div
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                whitespace-nowrap text-sm font-medium
                ${
                  index <= activeModule
                    ? `text-${module.color}-600`
                    : "text-gray-400"
                }`}
                    >
                      {module.duration}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div
              className="bg-white rounded-3xl shadow-xl p-8 transition-all duration-500
        border border-gray-100 hover:shadow-2xl"
            >
              <div className="space-y-8">
                <div
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-full
              bg-${curriculumModules[activeModule].color}-50
              text-${curriculumModules[activeModule].color}-600`}
                >
                  {curriculumModules[activeModule].icon}
                  <span className="font-semibold">
                    {curriculumModules[activeModule].title}
                  </span>
                </div>

                <p className="text-gray-600 text-lg">
                  {curriculumModules[activeModule].description}
                </p>

                <div className="space-y-4">
                  <h4 className="text-gray-900 font-semibold flex items-center gap-2">
                    <Brain className="text-gray-500" />
                    Key Topics
                  </h4>
                  <ul className="space-y-3">
                    {curriculumModules[activeModule].topics.map(
                      (topic, index) => (
                        <li
                          key={index}
                          className={`flex items-center gap-3 text-gray-600 p-3
                      rounded-lg bg-gray-50 transform transition-all duration-300
                      hover:translate-x-2 hover:bg-${curriculumModules[activeModule].color}-50`}
                        >
                          <ArrowRight
                            className={`w-4 h-4 text-${curriculumModules[activeModule].color}-500`}
                          />
                          {topic}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center animate-fade-in">
                Web Development Projects
              </h2>
              <p className="text-gray-600 text-center mb-12 animate-slide-up">
                Explore our comprehensive project collection
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Authentication System Card */}
                <div
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-out
                       ${
                         activeCard === 0
                           ? "scale-[1.02] shadow-2xl"
                           : "hover:scale-[1.01] hover:shadow-xl"
                       }
                       border-t-4 border-indigo-500`}
                  onMouseEnter={() => setActiveCard(0)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6 transform transition-transform duration-300 hover:translate-x-2">
                      <div className="p-3 bg-indigo-100 rounded-lg transform transition-transform duration-300 hover:rotate-12">
                        <Lock className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        User Authentication System
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Develop a robust and secure system for user registration,
                      login, and access control.
                    </p>

                    <div className="space-y-8">
                      {/* Features Section */}
                      <div className="transform transition-all duration-300 hover:translate-x-2">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-indigo-500" />
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {[
                            "Registration & Email Verification",
                            "Secure Login with Session Management",
                            "Password Reset Functionality",
                            "Role-Based Access Control (optional)",
                          ].map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-center text-gray-600 transition-all duration-300 
                                 hover:translate-x-2 hover:text-indigo-600"
                            >
                              <ArrowRight className="w-4 h-4 mr-2 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies Section */}
                      <div className="transform transition-all duration-300 hover:translate-x-2">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Code className="w-5 h-5 text-indigo-500" />
                          Technologies
                        </h4>
                        <div className="space-y-3">
                          {[
                            {
                              label: "Backend",
                              content:
                                "Node.js (Express) or Python (Flask/Django), Bcrypt",
                            },
                            {
                              label: "Frontend",
                              content:
                                "HTML, CSS, JavaScript, React/Angular/Vue",
                            },
                            {
                              label: "Database",
                              content: "PostgreSQL/MySQL/MongoDB",
                            },
                          ].map((tech, i) => (
                            <div
                              key={i}
                              className="text-gray-600 transition-all duration-300 hover:translate-x-2"
                            >
                              <span className="font-medium text-indigo-600">
                                {tech.label}:
                              </span>{" "}
                              {tech.content}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Learning Section */}
                      <div className="transform transition-all duration-300 hover:translate-x-2">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">
                          Learning Opportunities
                        </h4>
                        <ul className="space-y-3">
                          {[
                            "Authentication protocols and security best practices",
                            "Backend and Frontend Integration",
                            "Database Management",
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center text-gray-600 transition-all duration-300 
                                 hover:translate-x-2 hover:text-indigo-600"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 transition-all duration-300" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Platform Card */}
                <div
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-out
                       ${
                         activeCard === 1
                           ? "scale-[1.02] shadow-2xl"
                           : "hover:scale-[1.01] hover:shadow-xl"
                       }
                       border-t-4 border-emerald-500`}
                  onMouseEnter={() => setActiveCard(1)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6 transform transition-transform duration-300 hover:translate-x-2">
                      <div className="p-3 bg-emerald-100 rounded-lg transform transition-transform duration-300 hover:rotate-12">
                        <Users className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        Social Media Platform
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Create a basic platform for users to share content,
                      interact, and follow others.
                    </p>

                    <div className="space-y-8">
                      {/* Features Section */}
                      <div className="transform transition-all duration-300 hover:translate-x-2">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-emerald-500" />
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {[
                            "User profiles & content creation",
                            "Like/comment/follow functionality",
                            "User authentication and session management",
                            "Real-time features (optional)",
                            "News Feed",
                          ].map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-center text-gray-600 transition-all duration-300 
                                 hover:translate-x-2 hover:text-emerald-600"
                            >
                              <ArrowRight className="w-4 h-4 mr-2 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies Section */}
                      <div className="transform transition-all duration-300 hover:translate-x-2">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Code className="w-5 h-5 text-emerald-500" />
                          Technologies
                        </h4>
                        <div className="space-y-3">
                          {[
                            {
                              label: "Frontend",
                              content:
                                "HTML, CSS, JavaScript, React/Angular/Vue",
                            },
                            {
                              label: "Backend",
                              content:
                                "Node.js (Express) or Python (Flask/Django)",
                            },
                            {
                              label: "Optional",
                              content: "WebSockets, Cloudinary, Firebase",
                            },
                          ].map((tech, i) => (
                            <div
                              key={i}
                              className="text-gray-600 transition-all duration-300 hover:translate-x-2"
                            >
                              <span className="font-medium text-emerald-600">
                                {tech.label}:
                              </span>{" "}
                              {tech.content}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Learning Section */}
                      <div className="transform transition-all duration-300 hover:translate-x-2">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">
                          Learning Opportunities
                        </h4>
                        <ul className="space-y-3">
                          {[
                            "Full-stack Web Development",
                            "Database design and management",
                            "API design and client-server interaction",
                            "Handling real-time updates",
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center text-gray-600 transition-all duration-300 
                                 hover:translate-x-2 hover:text-emerald-600"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 transition-all duration-300" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div>
            {/* Link to open the image */}
            <a
              href="#"
              onClick={openPopup}
              className="text-blue-500 hover:text-blue-700"
            >
              View Sample Certificate
            </a>

            {/* Popup with image */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
                onClick={closePopup}
              >
                <div
                  className="bg-white p-4 rounded-md max-w-[500px] w-full"
                  onClick={(e) => e.stopPropagation()} // Prevent click from closing the popup
                >
                  {/* Close button */}
                  <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>

                  {/* Image Viewer */}
                  <img
                    src="src/assets/images/Black and Red Business Application Letter.png" // Replace with your image path
                    alt="Sample Certificate"
                    className="w-full h-auto object-contain max-h-[600px] "
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="cta fade-in">
            <Link to="/assessment">
              <button className="cta-button">Register Now</button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default InternshipProgram;
