import React, { useState } from "react";
import { ArrowDown, Check, Copy, ExternalLink, Mail } from "lucide-react";

export function AboutPage() {
  const [copied, setCopied] = useState(false);
  const email = "soni.aadithya1@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="w-full">
      <div className="max-w-[760px] mx-auto px-6 py-16 sm:py-24">
        {/* Bio Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-[1.15]">
          Flutter Developer &amp; Systems Engineer specializing in user-centric innovation and product evolution.
        </h1>

        <div className="mt-8 space-y-6 text-lg text-zinc-600 font-light leading-relaxed">
          <p>
            I'm Aaditya, a developer with deep experience across dynamic environments. Throughout my career, I've led end-to-end projects, specializing in optimizing user experiences and driving scalable product architecture. I thrive in problem-solving, prioritizing user-centric needs, and delivering robust engineering that elevates satisfaction.
          </p>
          <p>
            I excel in guiding comprehensive projects: from strategic architecture planning and telemetry systems to fluid Flutter UI/UX design and seamless cross-platform deployment. With a methodical approach to software engineering and performance profiling, I leverage modern tooling to build interfaces that feel instantaneous.
          </p>
          <p>
            My expertise spans high-performance cross-platform Flutter applications, Linux server telemetry automation, Python daemons, and modern responsive web systems.
          </p>
        </div>

        {/* Experience Section */}
        <div className="mt-20 pt-12 border-t border-zinc-200">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-8">
            Work Experience
          </h2>

          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 group">
              <div>
                <h3 className="text-lg font-medium text-zinc-900">
                  Flutter Application Developer &amp; UI/UX Designer
                </h3>
                <p className="text-sm text-zinc-600 font-light mt-0.5">
                  3 Handshake Innovation
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-400 mt-1 sm:mt-0">
                Jan 2025 &mdash; Aug 2025
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 group">
              <div>
                <h3 className="text-lg font-medium text-zinc-900">
                  Server Administration &amp; Python Developer
                </h3>
                <p className="text-sm text-zinc-600 font-light mt-0.5">
                  Avyukta Intellicall
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-400 mt-1 sm:mt-0">
                Jan 2024 &mdash; Aug 2024
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 group">
              <div>
                <h3 className="text-lg font-medium text-zinc-900">
                  Linux Administration
                </h3>
                <p className="text-sm text-zinc-600 font-light mt-0.5">
                  Avyukta Intellicall
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-400 mt-1 sm:mt-0">
                Jan 2023 &mdash; July 2023
              </span>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16 pt-12 border-t border-zinc-200">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-8">
            Education
          </h2>

          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h3 className="text-lg font-medium text-zinc-900">
                  B.Voc In IT and Networking Skills
                </h3>
                <p className="text-sm text-zinc-600 font-light mt-0.5">
                  Bachelor's Degree
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-400 mt-1 sm:mt-0">
                July 2022 &mdash; Aug 2025
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h3 className="text-lg font-medium text-zinc-900">
                  Govt. ITI Diploma
                </h3>
                <p className="text-sm text-zinc-600 font-light mt-0.5">
                  Electrician &amp; Hardware Engineering
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-400 mt-1 sm:mt-0">
                Aug 2020 &mdash; July 2022
              </span>
            </div>
          </div>
        </div>

        {/* Disciplines & Skills */}
        <div className="mt-16 pt-12 border-t border-zinc-200">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
            Disciplines &amp; Core Competencies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Flutter & Dart Cross-Platform",
              "Python Automation & Daemons",
              "Ubuntu & Linux Server Administration",
              "Full-Stack Modern Web Engineering",
              "UI/UX Design Systems & Micro-Interactions",
              "WebSocket Telemetry & RESTful APIs",
            ].map((skill) => (
              <div
                key={skill}
                className="px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-sm font-medium text-zinc-800"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Links */}
        <div className="mt-16 pt-12 border-t border-zinc-200">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-3">
            Get In Touch
          </h2>
          <p className="text-zinc-500 font-light mb-8">
            Feel free to reach out for projects, technical consulting, or full-time opportunities.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-black transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-400" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="size-4" />
                  <span>{email}</span>
                </>
              )}
            </button>

            <a
              href="https://www.linkedin.com/in/aadityansw/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-800 text-sm font-medium hover:border-black hover:text-black transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink className="size-3.5" />
            </a>

            <a
              href="https://x.com/aadityansw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-800 text-sm font-medium hover:border-black hover:text-black transition-colors"
            >
              <span>Twitter / X</span>
              <ExternalLink className="size-3.5" />
            </a>

            <a
              href="/aaditya_narayan_resume.pdf"
              target="_blank"
              download
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-800 text-sm font-medium hover:border-black hover:text-black transition-colors"
            >
              <span>Download Resume</span>
              <ArrowDown className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
