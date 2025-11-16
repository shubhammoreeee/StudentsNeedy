"use client";
import { useState } from "react";
import { FaStickyNote, FaBookOpen } from "react-icons/fa";
import Link from "next/link";

export default function NotesPage() {
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, chapter }),
      });

      const data = await res.json();
      setNotes(data.notes);

    } catch (err) {
      console.error(err);
      alert("Error generating notes");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#0c0c0f] to-[#09090d] text-white p-4 sm:p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Short Notes Generator
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

      {/* Input Section */}
      <div className="bg-[#111113]/70 border border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-4">
          <FaBookOpen size={26} className="text-yellow-400" />
          <h2 className="text-2xl font-semibold">Generate Chapter Short Notes</h2>
        </div>

        <form onSubmit={generate} className="space-y-5">

          <div>
            <label className="text-gray-400 text-sm">Subject</label>
            <input
              type="text"
              placeholder="e.g. Computer Networks"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 mt-1 bg-black/20 border border-gray-700/60 text-gray-200 rounded-lg focus:border-yellow-400 outline-none transition"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Chapter</label>
            <input
              type="text"
              placeholder="e.g. Transport Layer"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="w-full p-3 mt-1 bg-black/20 border border-gray-700/60 text-gray-200 rounded-lg focus:border-yellow-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-yellow-600/80 hover:bg-yellow-700 transition-all py-2 px-4 rounded-lg font-medium"
          >
            <FaStickyNote />
            {loading ? "Generating..." : "Generate Notes"}
          </button>
        </form>
      </div>

      {/* Output Section */}
      {notes && (
        <div className="mt-8 bg-[#111113]/70 border border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg max-w-3xl mx-auto">

          <h3 className="text-xl font-semibold text-yellow-300 mb-3">
            📝 Generated Notes
          </h3>

          <pre className="whitespace-pre-wrap bg-black/20 p-4 rounded-lg border border-gray-700/60 text-gray-300 max-h-[420px] overflow-y-auto">
            {notes}
          </pre>
        </div>
      )}
    </div>
  );
}
