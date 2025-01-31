const validateweeklyQuestionId = (req, res, next) => {
  const { questionId } = req.body;

  if (!questionId || !Number.isInteger(Number(questionId)) || questionId < 1) {
    return res.status(400).json({
      error: "Invalid question ID",
    });
  }

  next();
};

module.exports = {
  validateweeklyQuestionId,
};
