// questions.js

const generateWeeklyQuestions = () => {
  const categories = [
    {
      week: 1,
      topic: "Arrays & Hashing",
      questions: [
        {
          id: 1,
          title: "Two Sum",
          difficulty: "Easy",
          companies: ["Google", "Amazon", "Facebook"],
          solvedBy: 1000000,
          description:
            "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
          examples: [
            {
              input: "nums = [2,7,11,15], target = 9",
              output: "[0,1]",
              explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]",
            },
          ],
          constraints: [
            "2 <= nums.length <= 104",
            "-109 <= nums[i] <= 109",
            "-109 <= target <= 109",
          ],
        },
        // Add more Array questions here (total 15 per week)
      ],
    },
    {
      week: 2,
      topic: "Two Pointers & Strings",
      questions: [
        {
          id: 16,
          title: "Valid Palindrome",
          difficulty: "Easy",
          companies: ["Microsoft", "Apple", "Amazon"],
          solvedBy: 750000,
          description:
            "Given a string s, return true if it is a palindrome, or false otherwise.",
          examples: [
            {
              input: "s = 'A man, a plan, a canal: Panama'",
              output: "true",
              explanation:
                "After removing non-alphanumeric characters and converting to lowercase, it reads the same forward and backward",
            },
          ],
          constraints: [
            "1 <= s.length <= 2 * 105",
            "s consists only of printable ASCII characters",
          ],
        },
        // Add more String questions here (total 15 per week)
      ],
    },
    {
      week: 3,
      topic: "Stack & Queue",
      questions: [
        {
          id: 31,
          title: "Valid Parentheses",
          difficulty: "Easy",
          companies: ["Amazon", "Facebook", "Bloomberg"],
          solvedBy: 950000,
          description:
            "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
          examples: [
            {
              input: "s = '()'",
              output: "true",
              explanation: "Simple pair of parentheses is valid",
            },
          ],
          constraints: [
            "1 <= s.length <= 104",
            "s consists of parentheses only '()[]{}'",
          ],
        },
        // Add more Stack/Queue questions here (total 15 per week)
      ],
    },
    {
      week: 4,
      topic: "Stack & Queue",
      questions: [
        {
          id: 31,
          title: "Valid Parentheses",
          difficulty: "Easy",
          companies: ["Amazon", "Facebook", "Bloomberg"],
          solvedBy: 950000,
          description:
            "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
          examples: [
            {
              input: "s = '()'",
              output: "true",
              explanation: "Simple pair of parentheses is valid",
            },
          ],
          constraints: [
            "1 <= s.length <= 104",
            "s consists of parentheses only '()[]{}'",
          ],
        },
        // Add more Stack/Queue questions here (total 15 per week)
      ],
    },
  ];

  // Helper function to ensure each week has a good distribution of difficulties
  const populateWeekQuestions = (week) => {
    const baseQuestions = week.questions;
    const totalQuestions = 15;
    const easyCount = 5;
    const mediumCount = 7;
    const hardCount = 3;

    while (baseQuestions.length < totalQuestions) {
      const currentLength = baseQuestions.length;
      const difficulty =
        currentLength < easyCount
          ? "Easy"
          : currentLength < easyCount + mediumCount
          ? "Medium"
          : "Hard";

      baseQuestions.push({
        id: week.week * 15 + currentLength + 1,
        title: `${week.topic} Problem ${currentLength + 1}`,
        difficulty,
        companies: ["Google", "Amazon", "Microsoft"],
        solvedBy: Math.floor(Math.random() * 500000) + 100000,
        description: `A ${difficulty.toLowerCase()} level problem about ${
          week.topic
        }.`,
        examples: [
          {
            input: "Example Input",
            output: "Example Output",
            explanation: "Standard explanation here",
          },
        ],
        constraints: [
          "Standard constraints apply",
          "Time Complexity: O(n)",
          "Space Complexity: O(1)",
        ],
      });
    }
  };

  // Populate all weeks with full question sets
  categories.forEach(populateWeekQuestions);
  return categories;
};


export const weeklyQuestions = generateWeeklyQuestions();
