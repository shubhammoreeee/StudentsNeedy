"use client";
import { useState } from "react";
import Link from "next/link";
import { FaFileAlt, FaFilePdf } from "react-icons/fa";

export default function ResumePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
    projects: "",
    summary: "",
  });

  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed generating resume");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.name || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Error generating resume, check logs.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#0c0c0f] to-[#09090d] text-white p-4 sm:p-8">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Resume Generator
        </h1>

        <Link
          href="/"
          className="text-gray-300 hover:text-blue-400 transition font-medium"
        >
          ❌ <span className="hidden sm:inline truncate">
                back
              </span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-[#111113]/70 border border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg">

        <div className="flex items-center gap-3 mb-6">
          <FaFileAlt size={26} className="text-blue-400" />
          <h2 className="text-xl font-semibold">Generate ATS-Friendly Resume</h2>
        </div>

        <form onSubmit={submit} className="space-y-6">

          {/* Name */}
          <FormInput
            label="Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />

          {/* Email */}
          <FormInput
            label="Email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          {/* Summary */}
          <FormTextarea
            label="Short Summary"
            value={form.summary}
            onChange={(v) => setForm({ ...form, summary: v })}
          />

          {/* Skills */}
          <FormTextarea
            label="Skills (comma separated)"
            value={form.skills}
            onChange={(v) => setForm({ ...form, skills: v })}
          />

          {/* Education */}
          <FormTextarea
            label="Education"
            value={form.education}
            onChange={(v) => setForm({ ...form, education: v })}
          />

          {/* Projects */}
          <FormTextarea
            label="Projects"
            value={form.projects}
            onChange={(v) => setForm({ ...form, projects: v })}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600/80 hover:bg-blue-700 transition-all py-3 px-4 rounded-lg font-medium"
          >
            <FaFilePdf />
            {loading ? "Generating..." : "Generate PDF"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* Reusable input component */
function FormInput({ label, value, onChange }) {
  return (
    <div>
      <label className="text-gray-400 text-sm">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 mt-1 bg-black/20 border border-gray-700/60 text-gray-200 rounded-lg focus:border-blue-400 outline-none transition"
      />
    </div>
  );
}

/* Reusable textarea component */
function FormTextarea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-gray-400 text-sm">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-28 p-3 mt-1 bg-black/20 border border-gray-700/60 text-gray-200 rounded-lg focus:border-blue-400 outline-none transition"
      />
    </div>
  );
}
