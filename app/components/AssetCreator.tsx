"use client";
import React, { useState } from "react";
import { Download, IterationCcw, Code2, Paintbrush } from "lucide-react";

export default function AssetCreator({ lang }: { lang: "en" | "eg" }) {
  const [seed, setSeed] = useState(Date.now().toString());
  const [primaryColor, setPrimaryColor] = useState("#06b6d4");
  const [secondaryColor, setSecondaryColor] = useState("#a855f7");
  const [variant, setVariant] = useState(0); // 0, 1, 2

  const generateNew = () => {
    setSeed(Date.now().toString());
    const colors = ["#06b6d4", "#a855f7", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];
    setPrimaryColor(colors[Math.floor(Math.random() * colors.length)]);
    setSecondaryColor(colors[Math.floor(Math.random() * colors.length)]);
    setVariant(Math.floor(Math.random() * 3));
  };

  const getSvgContent = () => {
    const s = Number(seed.slice(-4)) || 1000;
    
    // Some pseudorandom math
    const cx = 200;
    const cy = 200;
    const r1 = 80 + (s % 40);
    const r2 = 60 + ((s * 2) % 30);
    const r3 = 40 + ((s * 3) % 20);
    
    let path = "";
    if (variant === 0) {
      // Abstract Neural
      path = `<circle cx="${cx}" cy="${cy}" r="${r1}" stroke="url(#grad)" stroke-width="8" fill="none" />
              <circle cx="${cx}" cy="${cy}" r="${r2}" stroke="url(#grad2)" stroke-width="4" stroke-dasharray="10 5" fill="none" />
              <polygon points="${cx},${cy-r3} ${cx+r3},${cy+r3/2} ${cx-r3},${cy+r3/2}" fill="url(#grad3)" opacity="0.8" />`;
    } else if (variant === 1) {
      // Hexagon Core
      path = `<path d="M${cx} ${cy-r1} L${cx+r1*0.866} ${cy-r1/2} L${cx+r1*0.866} ${cy+r1/2} L${cx} ${cy+r1} L${cx-r1*0.866} ${cy+r1/2} L${cx-r1*0.866} ${cy-r1/2} Z" stroke="url(#grad)" stroke-width="10" fill="none"/>
              <circle cx="${cx}" cy="${cy}" r="${r2}" fill="url(#grad2)" opacity="0.6"/>`;
    } else {
      // Swarm Nodes
      path = `<circle cx="${cx}" cy="${cy}" r="${r1}" fill="url(#grad)" opacity="0.3"/>
              <circle cx="${cx-r2}" cy="${cy-r2}" r="20" fill="url(#grad2)" />
              <circle cx="${cx+r2}" cy="${cy-r2/2}" r="25" fill="url(#grad3)" />
              <circle cx="${cx-r2/2}" cy="${cy+r2}" r="15" fill="url(#grad2)" />`;
    }

    return `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="${primaryColor}" />
          <stop offset="100%" stopColor="${secondaryColor}" />
        </linearGradient>
        <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="${secondaryColor}" />
          <stop offset="100%" stopColor="${primaryColor}" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="${primaryColor}" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#09090b" rx="40" />
      ${path}
    </svg>`;
  };

  const handleDownload = () => {
    const svgStr = getSvgContent();
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-launcher-${seed}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-6">
        <Paintbrush className="w-5 h-5 text-purple-400" />
        <h3 className="text-white font-display font-medium text-lg">
          {lang === "eg" ? "صانع أيقونات الذكاء الاصطناعي" : "AI Launcher Asset Creator"}
        </h3>
      </div>
      
      <div 
        className="w-[200px] h-[200px] mb-6 rounded-3xl shadow-2xl overflow-hidden glass border border-white/10"
        dangerouslySetInnerHTML={{ __html: getSvgContent().replace('width="400" height="400"', 'width="100%" height="100%"') }}
      />

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button 
          onClick={generateNew}
          className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <IterationCcw className="w-4 h-4" /> 
          {lang === "eg" ? "توليد جديد" : "GENERATE NEW"}
        </button>
        <button 
          onClick={handleDownload}
          className="flex-1 py-3 px-4 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Download className="w-4 h-4" /> 
          {lang === "eg" ? "تحميل SVG" : "DOWNLOAD SVG"}
        </button>
      </div>
    </div>
  );
}
