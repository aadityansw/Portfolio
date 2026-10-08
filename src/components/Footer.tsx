import React, { useState } from "react";
import { ArrowUp, Check, Copy } from "lucide-react";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "soni.aadithya1@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full max-w-[1200px] mx-auto px-6 py-16 border-t border-zinc-200 mt-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500 font-light">
            &copy; {new Date().getFullYear()} Aaditya Narayan. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-600" />
                <span className="text-emerald-600">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>{email}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-black transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
