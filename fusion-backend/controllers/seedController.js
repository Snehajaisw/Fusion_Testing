import CodingQuestion from "../models/CodingQuestion.js";

export const createEvenOddQuestion = async (req, res) => {
  try {
    const q = await CodingQuestion.create({
      unit: "1",
      title: "Check even or odd",
      description: "Write a C program to input a number and check whether it is even or odd.",
      language: "c",
      testcases: [
        { input: "4\n", expected: "Even\n" },
        { input: "7\n", expected: "Odd\n" },
        { input: "12\n", expected: "Even\n" },
      ],
      evaluationSteps: [
        { label: "Uses scanf", type: "code-contains", value: "scanf", marks: 1 },
        { label: "Uses modulus operator", type: "code-contains", value: "% 2", marks: 1 },
        { label: "Uses if condition", type: "code-contains", value: "if", marks: 1 },
        { label: "All testcases passed", type: "all-testcases-pass", marks: 2 },
      ],
    });

    res.json({ success: true, question: q });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error creating question" });
  }
};
