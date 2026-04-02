import axios from "axios";

export const runCodeAgainstTestcases = async (code, language, testcases) => {
  let results = [];

  for (const tc of testcases) {
    try {
      const response = await axios.post("https://fusion0-1.onrender.com/run", {
        code,
        language,
        stdin: tc.input,
      });

      const actualOutput = (response.data.output || "").trim();
      const expectedOutput = (tc.expected || "").trim();

      results.push({
        input: tc.input,
        expected: expectedOutput,
        output: actualOutput,
        passed: actualOutput === expectedOutput,
      });

    } catch (err) {
      console.error(err);

      results.push({
        input: tc.input,
        expected: tc.expected,
        output: "Error executing code",
        passed: false,
      });
    }
  }

  const passedCount = results.filter(r => r.passed).length;

  return {
    results,
    passedCount,
    total: testcases.length
  };
};
