// Simulated AI Service tailored for SA Context
const generateQuestion = (subject, grade, topic) => {
  // In a real app, this would call OpenAI/Gemini
  // "Generate a CAPS aligned Grade 12 Math question on Calculus..."
  
  const mockDatabase = {
    'Mathematics': [
      {
        question: "Solve for x: 2x² + 5x - 3 = 0",
        options: ["x = 0.5 or x = -3", "x = 1 or x = -3", "x = 0.5 or x = 3", "x = -0.5 or x = 3"],
        correctAnswer: 0,
        explanation: "Factorizing the trinomial (2x - 1)(x + 3) = 0 gives x = 1/2 or x = -3."
      },
      {
        question: "Calculate the effective interest rate if 12% p.a. is compounded monthly.",
        options: ["12.68%", "12.55%", "13.01%", "12.00%"],
        correctAnswer: 0,
        explanation: "1 + i_eff = (1 + 0.12/12)^12"
      }
    ],
    'Physical Sciences': [
      {
        question: "Which of Newton's laws explains why a passenger moves forward when a taxi brakes suddenly?",
        options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Universal Gravitation"],
        correctAnswer: 0,
        explanation: "Inertia: An object in motion continues in motion unless acted upon by a net force."
      }
    ]
  };

  const questions = mockDatabase[subject] || [];
  const randomQ = questions[Math.floor(Math.random() * questions.length)];
  
  return {
    ...randomQ,
    aiContext: `Generated for Grade ${grade} ${topic} (CAPS Aligned)`
  };
};

module.exports = { generateQuestion };
