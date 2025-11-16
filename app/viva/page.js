"use client";
import { useState } from "react";
import Link from "next/link";
import { FaQuestionCircle } from "react-icons/fa";

export default function VivaPage() {
  const [subject, setSubject] = useState("");
  const [qna, setQna] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/viva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject }),
    });

    const data = await res.json();

    setQna(
      typeof data.qna === "string"
        ? data.qna
        : JSON.stringify(data.qna, null, 2)
    );

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#0c0c0f] to-[#09090d] text-white p-4 sm:p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Viva Question Generator
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

      {/* Container */}
      <div className="max-w-3xl mx-auto bg-[#111113]/70 border border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg">

        <div className="flex items-center gap-3 mb-6">
          <FaQuestionCircle size={26} className="text-purple-400" />
          <h2 className="text-xl font-semibold">Generate Top 20 Viva Q&A</h2>
        </div>

        <form onSubmit={generate} className="space-y-6">

          {/* Input */}
          <div>
            <label className="text-gray-400 text-sm">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject name (e.g. DBMS, Python, AI)"
              className="w-full mt-1 p-3 bg-black/20 border border-gray-700/60 text-gray-200 rounded-lg focus:border-purple-400 outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            className="w-full bg-purple-600/80 hover:bg-purple-700 transition-all py-3 px-4 rounded-lg font-medium"
          >
            {loading ? "Generating..." : "Generate Viva Questions"}
          </button>
        </form>

        {/* Answer Section */}
        {qna && (
          <div className="mt-6 bg-black/20 border border-gray-700/60 rounded-lg p-5 text-gray-200 max-h-[500px] overflow-y-auto">
            <pre className="whitespace-pre-wrap">{qna}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
