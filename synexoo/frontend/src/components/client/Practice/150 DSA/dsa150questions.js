// questions.js
export const questions = [
  {
    id: 1,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    companies: [
      "Google",
      "Amazon",
      "Facebook",
      "Flipkart",
      "TCS",
      "Wipro",
      "HCL",
      "Microsoft",
    ],
    solvedBy: 257,
    category: "Arrays",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: `Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.`,
      },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
  },
  {
    id: 2,
    title: "3Sum",
    difficulty: "Medium",
    companies: [
      "Meesho",
      "Disney + Hotstar",
      "Paytm",
      "Cognizant",
      "Myntra",
      "Goldman Sachs",
      "Adobe",
      "Samsung",
      "Oracle",
      "Accenture",
      "Facebook",
      "Salesforce",
    ],
    solvedBy: 203,
    category: "Arrays",
    description:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "The triplets that sum to zero are [-1,-1,2] and [-1,0,1]",
      },
    ],
    constraints: ["3 <= nums.length <= 3000", "-105 <= nums[i] <= 105"],
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    companies: [
      "Paytm",
      "Cognizant",
      "Myntra",
      "Goldman Sachs",
      "Amazon",
      "TCS",
      "Apple",
      "Paypal",
      "JP Morgan",
    ],
    solvedBy: 312,
    category: "Linked List",
    description:
      "Merge two sorted linked lists and return it as a sorted list.",
    examples: [
      {
        input: "l1 = [1,2,4], l2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merge the two lists in ascending order",
      },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50]",
      "-100 <= Node.val <= 100",
    ],
  },
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    companies: [
      "Oracle",
      "Swiggy",
      "American Express",
      "Cognizant",
      "Samsung",
      "Infosys",
      "Morgan Stanley",
      "Microsoft",
      "OYO",
      "Paytm",
      "Amazon",
      "Facebook",
      "Bloomberg",
    ],
    solvedBy: 115,
    category: "Stack",
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
  {
    id: 5,
    title: "LRU Cache",
    difficulty: "Hard",
    companies: ["OLA","Flipkart","Zomato","Qualcomm","Oracle","OYO","JP Morgan","TCS","Walmart","Swiggy","Goldman Sachs"],
    solvedBy: 62,
    category: "Design",
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    examples: [
      {
        input:
          "LRUCache cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2);",
        output: "cache.get(1);    // returns 1",
        explanation: "Basic LRU cache operations",
      },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 104",
      "0 <= value <= 105",
    ],
  },
];
