/**
 * Predetermined career assessment questions
 * These questions are used in the chatbot instead of generating them with AI
 */

export const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "Hi there! 👋 I'm your Career Discovery Assistant. I'm here to help you explore career paths in the entertainment industry. Let's start with something fun - what activities or hobbies do you enjoy the most in your free time?",
    type: "greeting"
  },
  {
    id: 2,
    question: "When you think about your future career, what type of work excites you the most?",
    type: "career_interest"
  },
  {
    id: 3,
    question: "If you could spend your day doing something creative or artistic, what would it be?",
    type: "creative_interest"
  },
  {
    id: 4,
    question: "Are you more interested in the technical side of things (like editing, sound design, production) or the creative side (like performing, writing, designing)?",
    type: "technical_vs_creative"
  }
];

/**
 * Acknowledgment phrases to make the conversation feel natural
 */
export const ACKNOWLEDGMENTS = [
  "That's really interesting! ",
  "Great to know! ",
  "I love hearing that! ",
  "Fascinating! ",
  "Thanks for sharing! ",
  "That tells me a lot! ",
  "Wonderful! ",
  "I appreciate you sharing that! "
];

/**
 * Final message after all questions are answered
 */
export const COMPLETION_MESSAGE = `Thank you so much for sharing all of that with me! 🎉

I have a much better understanding of your interests, strengths, and what drives you.

Based on our conversation, I'm analyzing your responses to recommend the best career paths in the entertainment industry that align with your unique profile.

Give me just a moment to process everything...`;
