"use client";
import { useState } from "react";
import { FaFileUpload, FaDownload, FaBook } from "react-icons/fa";
import Link from "next/link";

export default function AssignmentPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answerText, setAnswerText] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file.");

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/pdf", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setAnswerText(data.answer);

    } catch (err) {
      console.error(err);
      alert("Error solving assignment.");
    }
    setLoading(false);
  }

  async function downloadPdf() {
    const res = await fetch("/api/pdf-to-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: answerText }),
    });

    if (!res.ok) return alert("PDF generation failed");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assignment-answers.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#0c0c0f] to-[#09090d] text-white p-4 sm:p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Assignment Solver
        </h1>

        <Link
          href="/"
          className="text-gray-300 hover:text-purple-400 transition font-medium"
        >
          ❌ <span className="hidden sm:inline truncate">
                back
              </span>
        </Link>
      </div>

      {/* Upload Section */}
      <div className="bg-[#111113]/70 border border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-4">
          <FaBook size={26} className="text-purple-400" />
          <h2 className="text-2xl font-semibold">Upload & Solve Assignment</h2>
        </div>

        <form onSubmit={submit} className="space-y-5">

          {/* Upload Box */}
          <label className="block text-gray-400 text-sm font-medium">
            Select your assignment PDF
          </label>

          <div className="p-4 bg-black/20 border border-gray-700/60 hover:border-purple-400 transition rounded-lg">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-gray-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600/80 hover:bg-purple-700 transition-all py-2 px-4 rounded-lg font-medium"
          >
            <FaFileUpload />
            {loading ? "Solving..." : "Upload & Solve"}
          </button>
        </form>
      </div>

      {/* Answer Box */}
      {answerText && (
        <div className="mt-8 bg-[#111113]/70 border border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg max-w-3xl mx-auto">

          <h3 className="text-xl font-semibold text-purple-300 mb-3">
            ✔ Solved Answers
          </h3>

          <pre className="whitespace-pre-wrap bg-black/20 p-4 rounded-lg border border-gray-700/60 text-gray-300 max-h-[420px] overflow-y-auto">
            {answerText}
          </pre>

          <button
            onClick={downloadPdf}
            className="mt-4 flex items-center gap-2 bg-purple-600/80 hover:bg-purple-700 transition-all py-2 px-4 rounded-lg font-medium"
          >
            <FaDownload /> Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
