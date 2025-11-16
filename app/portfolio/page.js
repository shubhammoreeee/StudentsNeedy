"use client";
import { useState } from "react";
import Link from "next/link";
import { FaLaptopCode, FaFileArchive } from "react-icons/fa";

export default function PortfolioPage() {
  const [resumeText, setResumeText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, prompt }),
      });

      if (!res.ok) {
        console.error(await res.text());
        throw new Error("Failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "portfolio.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Error generating portfolio");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#0c0c0f] to-[#09090d] text-white p-4 sm:p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Portfolio Generator
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

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-[#111113]/70 border border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg">

        <div className="flex items-center gap-3 mb-5">
          <FaLaptopCode size={26} className="text-purple-400" />
          <h2 className="text-xl font-semibold">Generate Vite + React + Tailwind Portfolio</h2>
        </div>

        <form onSubmit={generate} className="space-y-6">

          {/* Resume Text */}
          <div>
            <label className="text-gray-400 text-sm">Resume / Content Input</label>
            <textarea
              placeholder="Paste resume content here (used to generate portfolio sections)"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full h-40 p-3 mt-1 bg-black/20 border border-gray-700/60 text-gray-200 rounded-lg focus:border-purple-400 outline-none transition"
            />
          </div>

          {/* Additional Prompt */}
          <div>
            <label className="text-gray-400 text-sm">Extra Prompt (Optional)</label>
            <textarea
              placeholder="Example: minimal, modern, animations, creative UI"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-24 p-3 mt-1 bg-black/20 border border-gray-700/60 text-gray-200 rounded-lg focus:border-purple-400 outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600/80 hover:bg-purple-700 transition-all py-3 px-4 rounded-lg font-medium"
          >
            <FaFileArchive />
            {loading ? "Generating ZIP..." : "Generate Portfolio ZIP"}
          </button>

        </form>
      </div>
    </div>
  );
}
