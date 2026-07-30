/**
 * Quiz bank. Each quiz is a short set of multiple-choice questions with a
 * correct-answer index and an explanation shown after grading.
 */

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
};

export type Quiz = {
  slug: string;
  title: string;
  topic: string;
  questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
  {
    slug: "iso-27001-basics",
    title: "ISO/IEC 27001 basics",
    topic: "GRC",
    questions: [
      {
        q: "What does an ISMS primarily manage?",
        options: [
          "Physical inventory only",
          "Information security risk",
          "Marketing campaigns",
          "Source-code style",
        ],
        answer: 1,
        explanation: "An ISMS is a risk-based system for managing information security.",
      },
      {
        q: "The Statement of Applicability documents…",
        options: [
          "Every employee's salary",
          "Which Annex A controls apply and why",
          "The company's marketing plan",
          "Network IP addresses",
        ],
        answer: 1,
        explanation: "The SoA justifies which Annex A controls are (or are not) applicable.",
      },
      {
        q: "How many controls are in Annex A of the 2022 edition?",
        options: ["114", "93", "50", "20"],
        answer: 1,
        explanation: "The 2022 revision consolidated Annex A to 93 controls across four themes.",
      },
    ],
  },
  {
    slug: "nist-csf-functions",
    title: "NIST CSF 2.0 functions",
    topic: "GRC",
    questions: [
      {
        q: "Which function was added in CSF 2.0?",
        options: ["Detect", "Protect", "Govern", "Recover"],
        answer: 2,
        explanation: "CSF 2.0 added Govern, making six functions in total.",
      },
      {
        q: "Which function covers restoring services after an incident?",
        options: ["Identify", "Recover", "Protect", "Detect"],
        answer: 1,
        explanation: "Recover restores capabilities and services impaired by an incident.",
      },
    ],
  },
  {
    slug: "ai-security-intro",
    title: "AI security fundamentals",
    topic: "AI",
    questions: [
      {
        q: "Prompt injection is best described as…",
        options: [
          "A SQL database attack",
          "Manipulating a model's instructions via crafted input",
          "A type of encryption",
          "A network port scan",
        ],
        answer: 1,
        explanation: "Prompt injection manipulates model behavior through attacker-controlled text.",
      },
      {
        q: "Indirect prompt injection typically arrives via…",
        options: [
          "The system prompt",
          "Retrieved or fetched content the model processes",
          "The model weights",
          "The GPU driver",
        ],
        answer: 1,
        explanation: "Indirect injection hides instructions inside data the model is asked to process.",
      },
    ],
  },
];
