// pages/summarize.tsx

import { useState } from "react";

export default function Summarize() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSummary(""); // Clear any previous summary

    try {
      // Send the user's input text to the API route
      const response = await fetch("/api/getanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputText), // Send input text as JSON
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.messages[0]?.content || "No summary found.");
      } else {
        console.error("Failed to get summary:", data.error);
        setSummary("Error fetching summary.");
      }
    } catch (error) {
      console.error("Error during request:", error);
      setSummary("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6">
            Ask any questions reagrding science and technology and get the answer
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            We have Fine Tuned Our Model specifically for 10th NCERT
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="inputText"
            className="block text-left text-sm font-semibold text-gray-700"
          >
            Let's Learn
          </label>
          <input
            id="inputText"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type here..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Generating..." : "Know"}
          </button>
        </form>

        {summary && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Summary:
            </h3>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
