import Link from "next/link";
import {
  FaFileAlt,
  FaBook,
  FaQuestionCircle,
  FaStickyNote,
  FaLaptopCode,
  FaHome,
  FaUser,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#0c0c0f] to-[#09090d] text-white flex">

      {/* Sidebar */}
      <aside className="hidden sm:flex flex-col w-64 bg-[#111113]/80 backdrop-blur-xl border-r border-white/10 p-6">
        <h1 className="text-2xl font-extrabold mb-10 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          StudentNeedy
        </h1>

        <nav className="space-y-4">
          <SidebarLink icon={<FaHome />} text="Dashboard" href="/" active />
          <SidebarLink icon={<FaFileAlt />} text="Resume Generator" href="/resume" />
          <SidebarLink icon={<FaBook />} text="Assignment Solver" href="/assignment" />
          <SidebarLink icon={<FaQuestionCircle />} text="Viva Q&A" href="/viva" />
          <SidebarLink icon={<FaStickyNote />} text="Short Notes" href="/notes" />
          <SidebarLink icon={<FaLaptopCode />} text="Portfolio Builder" href="/portfolio" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Hero Section */}
        <section className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Your Personal Student AI Assistant
          </h2>
          <p className="text-gray-400 text-lg">
            Generate resumes, solve assignments, create portfolios & more — instantly.
          </p>
        </section>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <DashboardCard
            href="/resume"
            icon={<FaFileAlt size={30} />}
            title="Resume Generator"
            desc="Create ATS-friendly professional resumes."
          />

          <DashboardCard
            href="/assignment"
            icon={<FaBook size={30} />}
            title="Assignment Solver"
            desc="Upload PDFs and get solved answers."
          />

          <DashboardCard
            href="/viva"
            icon={<FaQuestionCircle size={30} />}
            title="Viva Questions"
            desc="Generate top 20 viva questions with answers."
          />

          <DashboardCard
            href="/notes"
            icon={<FaStickyNote size={30} />}
            title="Short Notes"
            desc="Instant notes for exams & revisions."
          />

          <DashboardCard
            href="/portfolio"
            icon={<FaLaptopCode size={30} />}
            title="Portfolio Builder"
            desc="Generate full React + Tailwind portfolio ZIP."
          />
        </div>
      </main>
    </div>
  );
}

/* Sidebar link component */
function SidebarLink({ icon, text, href, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-lg transition ${
        active
          ? "bg-purple-600/30 text-purple-300 border border-purple-500/20"
          : "text-gray-400 hover:bg-white/5"
      }`}
    >
      <div>{icon}</div>
      <span>{text}</span>
    </Link>
  );
}

/* Dashboard card component */
function DashboardCard({ href, icon, title, desc }) {
  return (
    <Link
      href={href}
      className="group p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-600/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3 text-purple-400 group-hover:text-purple-300">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{desc}</p>
    </Link>
  );
}
