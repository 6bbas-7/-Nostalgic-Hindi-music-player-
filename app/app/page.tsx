"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
        <div className="hero-bg absolute inset-0 -z-20" />

        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/35 via-transparent to-black/60" />

        <div className="grain absolute inset-0 -z-10 opacity-20" />

        <Header />

        <div className="relative z-10 mb-8 flex w-full flex-col items-center justify-center px-4 sm:mb-12">
          <MusicPlayer />
        </div>
      </main>

      <Analytics />
      <SpeedInsights />
    </>
  );
}
