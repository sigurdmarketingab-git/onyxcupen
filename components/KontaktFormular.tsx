"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import Button from "@/components/Button";

export default function KontaktFormular() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1400);
  }

  return (
    <div className="rounded-2xl bg-[#232830] border border-white/12 p-6">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
          <CheckCircle className="h-12 w-12 text-[#F3811F]" />
          <h3 className="text-lg font-bold text-white">Meddelande skickat!</h3>
          <p className="text-sm text-[#9ca3af] max-w-xs leading-relaxed">
            Tack för ditt meddelande. Vi återkommer till dig så snart vi kan.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-sm text-[#F3811F] hover:text-white"
          >
            Skicka nytt meddelande
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-[#9ca3af] mb-6 leading-relaxed">
            Fyll i formuläret nedan så återkommer vi till dig så snart som möjligt.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#c4cad4]">Namn</label>
                <input
                  type="text"
                  placeholder="Ditt namn"
                  required
                  className="rounded-xl bg-[#181B22] border border-white/20 px-4 py-3 text-sm text-[#EFEFEF] placeholder-[#6b7280] focus:outline-none focus:border-[#F3811F] focus:bg-[#1e2229] focus:shadow-[0_0_0_3px_rgba(243,129,31,0.15)] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#c4cad4]">E-post</label>
                <input
                  type="email"
                  placeholder="din@email.se"
                  required
                  className="rounded-xl bg-[#181B22] border border-white/20 px-4 py-3 text-sm text-[#EFEFEF] placeholder-[#6b7280] focus:outline-none focus:border-[#F3811F] focus:bg-[#1e2229] focus:shadow-[0_0_0_3px_rgba(243,129,31,0.15)] transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#c4cad4]">Ämne</label>
              <input
                type="text"
                placeholder="Vad gäller din fråga?"
                required
                className="rounded-xl bg-[#181B22] border border-white/20 px-4 py-3 text-sm text-[#EFEFEF] placeholder-[#6b7280] focus:outline-none focus:border-[#F3811F] focus:bg-[#1e2229] focus:shadow-[0_0_0_3px_rgba(243,129,31,0.15)] transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#c4cad4]">Meddelande</label>
              <textarea
                placeholder="Skriv ditt meddelande här..."
                rows={5}
                required
                className="rounded-xl bg-[#181B22] border border-white/20 px-4 py-3 text-sm text-[#EFEFEF] placeholder-[#6b7280] focus:outline-none focus:border-[#F3811F] focus:bg-[#1e2229] focus:shadow-[0_0_0_3px_rgba(243,129,31,0.15)] transition-all resize-none"
              />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Skickar...
                </>
              ) : (
                "Skicka meddelande"
              )}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
