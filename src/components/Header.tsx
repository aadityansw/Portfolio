import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowDown, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenSkills?: () => void;
}

export function Header({ onOpenSkills }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header className="w-full max-w-[1200px] mx-auto px-6 py-8 flex items-center justify-between relative z-50">
      <Link
        to="/"
        className="font-medium text-xl text-zinc-900 tracking-tight hover:opacity-80 transition-opacity"
      >
        Aaditya Narayan
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-7 text-[1.05rem]">
        {isHome ? (
          <a
            href="#projects"
            className="text-zinc-800 hover:text-black transition-colors"
          >
            Work
          </a>
        ) : (
          <Link
            to="/#projects"
            className="text-zinc-800 hover:text-black transition-colors"
          >
            Work
          </Link>
        )}

        <Link
          to="/timelines"
          className={`transition-colors ${
            location.pathname === "/timelines"
              ? "text-black font-semibold underline underline-offset-4"
              : "text-zinc-800 hover:text-black"
          }`}
        >
          Timelines
        </Link>

        {isHome ? (
          <a
            href="#archive"
            className="text-zinc-800 hover:text-black transition-colors"
          >
            Archive
          </a>
        ) : (
          <Link
            to="/#archive"
            className="text-zinc-800 hover:text-black transition-colors"
          >
            Archive
          </Link>
        )}


        <Link
          to="/about"
          className={`transition-colors ${
            location.pathname === "/about"
              ? "text-black font-semibold underline underline-offset-4"
              : "text-zinc-800 hover:text-black"
          }`}
        >
          About
        </Link>

        <a
          href="/aaditya_narayan_resume.pdf"
          target="_blank"
          download
          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium border border-zinc-900 rounded-full text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all shadow-sm"
        >
          Resume <ArrowDown className="size-3 stroke-[2.5]" />
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl flex flex-col gap-4 text-base font-medium z-50">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-800 hover:text-black py-1"
          >
            Work
          </Link>
          <Link
            to="/timelines"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-800 hover:text-black py-1"
          >
            Project Timelines
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-800 hover:text-black py-1"
          >
            About
          </Link>
          <a
            href="/aaditya_narayan_resume.pdf"
            target="_blank"
            download
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-zinc-900 rounded-full text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            Download Resume <ArrowDown className="size-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
