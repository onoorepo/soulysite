"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Terminal,
  Cpu,
  Zap,
  Activity,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  BarChart3,
  Globe,
  ArrowRight,
  User,
  Layers,
  Sparkles,
  Sliders,
  SendHorizontal
} from "lucide-react";

// Types for Chat
interface ChatMessage {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: string;
}

// Pre-defined Custom Souly Agents
const SOULY_AGENTS = [
  {
    id: "synthetix",
    name: "Synthetix",
    title: "Core System Architect",
    themeColor: "cyan",
    colorClass: "text-cyan-400",
    bgGlow: "rgba(6, 182, 212, 0.15)",
    borderClass: "neon-border-cyan",
    textGlow: "text-glow-cyan",
    stats: { speed: "94ms", autonomy: "98%", reasoning: "96%", load: "12%" },
    description: "Specializes in complex micro-services orchestration, self-healing system blueprints, and automated code compilation pipelines.",
    capabilities: ["Autonomous Code Gen", "Docker Swarm Orchestrator", "Self-Correction Loop", "API Gateway Weaver"]
  },
  {
    id: "hesperia",
    name: "Hesperia",
    title: "Creative Story & Brand Strategist",
    themeColor: "purple",
    colorClass: "text-purple-400",
    bgGlow: "rgba(168, 85, 247, 0.15)",
    borderClass: "neon-border-purple",
    textGlow: "text-glow-purple",
    stats: { speed: "135ms", autonomy: "91%", reasoning: "94%", load: "18%" },
    description: "Drives customer acquisition through real-time emotional analysis, narrative engineering, and autonomous copy generation.",
    capabilities: ["Semantic Theme Mapping", "Behavioral Target Logic", "Omni-Channel Synthesis", "Real-time Narrative Flow"]
  },
  {
    id: "axiom",
    name: "Axiom",
    title: "Market Insight & High-Performance Analyst",
    themeColor: "emerald",
    colorClass: "text-emerald-400",
    bgGlow: "rgba(16, 185, 129, 0.15)",
    borderClass: "neon-border-emerald",
    textGlow: "text-glow-emerald",
    stats: { speed: "112ms", autonomy: "94%", reasoning: "98%", load: "8%" },
    description: "Parses complex transactional metrics, identifies predictive arbitrage, and crafts structural vector market intelligence summaries.",
    capabilities: ["Vector Flow Quantifying", "Dynamic Price Modeling", "Strategic Anomaly Audit", "Risk-Arbitrage Pipeline"]
  }
];

const BOOT_LOGS = [
  "Establishing secure network socket directly to SoulyEG.online gateway...",
  "Neural node array mounted successfully. Status: GREEN",
  "Initializing generative core processors: gemini-3.5-flash online.",
  "Injecting advanced micro-orchestrations protocols in workspace [PORT: 3000]...",
  "Syncing primary agents: [Synthetix], [Hesperia], [Axiom].",
  "Mounting autonomous glassmorphism canvas widgets...",
  "Souly Agent System Engine compiled. System Ready."
];

export default function Home() {
  // System states
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"playground" | "swarm" | "evolution" | "portal">("playground");
  
  // Selection
  const [selectedAgentId, setSelectedAgentId] = useState("synthetix");
  const selectedAgent = SOULY_AGENTS.find(a => a.id === selectedAgentId) || SOULY_AGENTS[0];

  // Playground States
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>({
    synthetix: [
      {
        id: "init-1",
        role: "agent",
        text: "System initialized. Greetings, Architect. I am Synthetix. Input your parameters or code framework specifications so we can compile your next swarm integration.",
        timestamp: "14:09"
      }
    ],
    hesperia: [
      {
        id: "init-2",
        role: "agent",
        text: "Creative matrix compiled. I am Hesperia. Ready to weave high-impact narrative logic and custom brand copy. What story are we setting free today?",
        timestamp: "14:09"
      }
    ],
    axiom: [
      {
        id: "init-3",
        role: "agent",
        text: "[INTELLIGENCE ABSTRACT: INITIALIZED]\n\nData nodes linked. I am Axiom. Provide market vectors or telemetry parameters to analyze competitive opportunity matrixes.",
        timestamp: "14:09"
      }
    ]
  });
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Swarm Simulator States
  const [simulateState, setSimulateState] = useState<"idle" | "planning" | "routing" | "synthesizing" | "completed">("idle");
  const [swarmLogs, setSwarmLogs] = useState<string[]>([]);
  const [simGoal, setSimGoal] = useState("Automate multi-channel customer checkout logic & verify inventory ledger");

  // Portal States
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", project: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Log simulation during boot
  useEffect(() => {
    if (currentLogIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setSystemLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${BOOT_LOGS[currentLogIndex]}`]);
        setCurrentLogIndex(prev => prev + 1);
        setLoadingProgress(Math.min(100, Math.floor(((currentLogIndex + 1) / BOOT_LOGS.length) * 100)));
      }, 500 + Math.random() * 500);
      return () => clearTimeout(timer);
    }
  }, [currentLogIndex]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isSending, selectedAgentId]);

  // Trigger loading screen off
  const handleAccessSystem = () => {
    setLoading(false);
  };

  // Swarm Simulator Run
  const triggerSwarmSimulation = () => {
    if (simulateState !== "idle") return;
    
    setSimulateState("planning");
    setSwarmLogs([`[System] Initiating dynamic swarm goal: "${simGoal}"`, `[Planner] Decomposing goal into autonomous child tasks...`]);

    const steps = [
      {
        state: "routing" as const,
        log: "[Swarm Router] Dynamically assigning tasks matching agent capabilities...",
        delay: 2000
      },
      {
        state: "routing" as const,
        log: "-> Task [System Code Execution] routed to Agent Synthetix.\n-> Task [Marketing Strategy & Campaign Tone] routed to Agent Hesperia.\n-> Task [Arbitrage Risk & Math ledger Audit] routed to Agent Axiom.",
        delay: 3500
      },
      {
        state: "synthesizing" as const,
        log: "[Synthetix] Activating workspace sandbox. Generated 14 auto-healing scripts\n[Hesperia] Semantic brand blueprints mapped. Copied localized content drafts.\n[Axiom] Calculating predictive matrix. Vector audit matched validation constraints.",
        delay: 5500
      },
      {
        state: "completed" as const,
        log: "[Swarm Manager] Neural consensus achieved. Combining compiled payloads...\n[Success] Swarm solution verified and compiled successfully. Active on SoulyEG.online sandbox server.",
        delay: 8000
      }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        setSimulateState(step.state);
        setSwarmLogs(prev => [...prev, step.log]);
      }, step.delay);
    });
  };

  const resetSwarmSimulation = () => {
    setSimulateState("idle");
    setSwarmLogs([]);
  };

  // Send Chat message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isSending) return;

    const userText = userInput;
    setUserInput("");

    // Create unique message IDs
    const userMessageId = `msg-user-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: "user",
      text: userText,
      timestamp
    };

    // Update state to append user message
    setChatHistory(prev => ({
      ...prev,
      [selectedAgentId]: [...(prev[selectedAgentId] || []), newUserMsg]
    }));

    setIsSending(true);

    try {
      // Collect current chat history from state to send (max last 6 messages as context)
      const currentHistory = chatHistory[selectedAgentId] || [];
      const historyPayload = currentHistory.slice(-6).map(item => ({
        role: item.role === "user" ? "user" : "model",
        text: item.text
      }));

      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent: selectedAgentId,
          message: userText,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Neural transmission failed.");
      }

      const data = await res.json();
      const agentMsg: ChatMessage = {
        id: `msg-agent-${Date.now()}`,
        role: "agent",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => ({
        ...prev,
        [selectedAgentId]: [...(prev[selectedAgentId] || []), agentMsg]
      }));

    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: "agent",
        text: "[CONNECTION INTERRUPTED] Failed to connect with Souly agent core. Please verify your internet link or ensure your server environment is online.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => ({
        ...prev,
        [selectedAgentId]: [...(prev[selectedAgentId] || []), errMsg]
      }));
    } finally {
      setIsSending(false);
    }
  };

  // Inquiry form submit
  const handlePortalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.project) return;
    setFormSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050507] bg-grid-pattern text-white font-sans scanline-effect overflow-hidden">
      
      {/* Background Decorative Neon Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[30%] w-[25vw] h-[25vw] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      {/* Visual Overlay: Glass Noise Texture simulation */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-amber-50 mix-blend-overlay" />

      <AnimatePresence mode="wait">
        {/* Loading / Boot System */}
        {loading ? (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#050507]"
          >
            {/* Ambient pulse wrapper */}
            <div className="relative w-full max-w-xl flex flex-col items-center">
              
              {/* Outer glass boundary */}
              <div className="w-full glass p-8 rounded-2xl border border-cyan-500/15 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.05)]">
                
                {/* Glowing tech scanner line mockup */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

                {/* Crest Logo */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-cyan-400/30 bg-zinc-950/80 mb-3 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse">
                    <Bot className="w-10 h-10 text-cyan-400" />
                    <div className="absolute inset-0 border border-cyan-400/40 rounded-full scale-75 animate-ping opacity-30" />
                  </div>
                  <h1 className="text-3xl font-display font-medium tracking-wider text-white">
                    SOULY<span className="text-cyan-400 animate-pulse">.</span>
                  </h1>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mt-1">
                    SoulyEG.online &bull; IA Swarms
                  </span>
                </div>

                {/* Simulated Loading Bar */}
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <RefreshCw className="animate-spin w-3.5 h-3.5 text-cyan-400" />
                      Loading Neural Network Engine...
                    </span>
                    <span className="text-cyan-400 font-bold">{loadingProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      style={{ width: `${loadingProgress}%` }}
                      layoutId="loading-bar-fill"
                    />
                  </div>
                </div>

                {/* Console System Log Streamer */}
                <div className="h-44 bg-zinc-950/90 border border-white/5 rounded-lg p-4 overflow-y-auto font-mono text-[11px] text-zinc-400/95 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
                  <div className="text-cyan-400 flex items-center gap-1 border-b border-white/5 pb-1 mb-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>SOULY HYPERION ENGINE [V2.6]</span>
                  </div>
                  {systemLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="leading-relaxed hover:text-white transition-colors"
                    >
                      {log}
                    </motion.div>
                  ))}
                  {currentLogIndex < BOOT_LOGS.length && (
                    <div className="flex items-center gap-0.5 mt-1 text-cyan-500/70 animate-pulse">
                      <span>_</span>
                    </div>
                  )}
                </div>

                {/* Active boot finish trigger */}
                <div className="mt-6 flex justify-center">
                  <AnimatePresence>
                    {loadingProgress >= 100 && (
                      <motion.button
                        id="btn-access-sys"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="px-8 py-3.5 rounded-xl font-display font-medium text-sm tracking-widest text-[#030303] bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.65)] flex items-center gap-2 group cursor-pointer"
                        onClick={handleAccessSystem}
                      >
                        ACCESS SOULY INTERFACE
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <span className="text-[11px] text-zinc-600 font-mono mt-4">
                Designed for PC, Mac, & Mobile viewports.
              </span>
            </div>
          </motion.div>
        ) : (
          /* Main Platform View */
          <motion.div
            key="main-platform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full min-h-screen flex flex-col"
          >
            {/* Sleek Glass Header */}
            <header className="sticky top-0 z-40 w-full bg-[#050507]/85 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Brand & URL */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    <span className="text-[10px] font-black italic text-[#050507]">S</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-display font-bold text-white tracking-wider uppercase">
                        SOULY<span className="text-cyan-400 font-normal">.AI</span>
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400/90 tracking-wide font-medium">
                      SoulyEG.online
                    </span>
                  </div>
                </div>

                {/* Navigation Stepper / Menu */}
                <nav className="flex items-center p-1 bg-zinc-900/80 rounded-xl border border-white/5">
                  <button
                    id="tab-playground"
                    onClick={() => setActiveTab("playground")}
                    className={`px-4 py-2 rounded-lg font-display text-xs font-semibold tracking-wide transition-all ${
                      activeTab === "playground"
                        ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Agent Sandbox
                  </button>
                  <button
                    id="tab-swarm"
                    onClick={() => setActiveTab("swarm")}
                    className={`px-4 py-2 rounded-lg font-display text-xs font-semibold tracking-wide transition-all ${
                      activeTab === "swarm"
                        ? "bg-purple-500 text-black shadow-md shadow-purple-500/20"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Swarm Simulator
                  </button>
                  <button
                    id="tab-evolution"
                    onClick={() => setActiveTab("evolution")}
                    className={`px-4 py-2 rounded-lg font-display text-xs font-semibold tracking-wide transition-all ${
                      activeTab === "evolution"
                        ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Tech Timeline
                  </button>
                  <button
                    id="tab-portal"
                    onClick={() => setActiveTab("portal")}
                    className={`px-4 py-2 rounded-lg font-display text-xs font-semibold tracking-wide transition-all ${
                      activeTab === "portal"
                        ? "bg-pink-500 text-black shadow-md shadow-pink-500/20"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Inquiry
                  </button>
                </nav>

                {/* Right Engine Status Badges (PC Only) */}
                <div className="hidden lg:flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5 text-[10px] font-mono text-zinc-400">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>SYSTEM RUNNING: SECURE</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5 text-[10px] font-mono text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>SWARM STABILITY: 99.8%</span>
                  </div>
                </div>

              </div>
            </header>

            {/* Main Interactive Stage Grid */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
              
              {/* Dynamic Tagline Showcase */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border border-white/5 bg-zinc-950/40 backdrop-blur-sm p-6 rounded-2xl gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" /> Specialists in AI Agentic Swarms
                  </div>
                  <h2 className="text-2xl font-display font-medium text-white tracking-wide">
                    The Modern Tech Evolution is <span className="text-cyan-400">Autonomous.</span>
                  </h2>
                </div>
                <div className="text-xs text-zinc-400 max-w-md font-sans leading-relaxed">
                  Souly architects bespoke networks of independent AI agents capable of continuous system monitoring, copywriting, predictive data harvesting, and consensus synchronization.
                </div>
              </div>

              {/* ACTIVE TAB STAGE */}
              <AnimatePresence mode="wait">
                
                {/* 1. PLAYGROUND TAB */}
                {activeTab === "playground" && (
                  <motion.div
                    key="playground-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    
                    {/* Left: Agent Profiles selector */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest pl-1">
                        Select Active Agent Configuration
                      </div>
                      
                      <div className="space-y-4">
                        {SOULY_AGENTS.map((agent) => {
                          const isSelected = selectedAgentId === agent.id;
                          return (
                            <div
                              key={agent.id}
                              onClick={() => setSelectedAgentId(agent.id)}
                              className={`glass p-5 rounded-xl cursor-pointer transition-all flex flex-col gap-3 relative overflow-hidden group ${
                                isSelected 
                                  ? `${agent.borderClass} border bg-zinc-950/80` 
                                  : "border-transparent bg-zinc-950/30 hover:border-white/10 hover:bg-zinc-950/50"
                              }`}
                            >
                              {/* Background ambient colors on state */}
                              {isSelected && (
                                <div className="absolute inset-0 opacity-[0.03] transition-opacity pointer-events-none" style={{ backgroundColor: agent.themeColor }} />
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div className={`p-2 rounded-xl bg-zinc-900 border border-white/5 ${agent.colorClass}`}>
                                    <Bot className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                                      {agent.name}
                                    </h3>
                                    <span className="text-[10px] font-mono text-zinc-400">
                                      {agent.title}
                                    </span>
                                  </div>
                                </div>
                                <div className={`px-2 py-0.5 rounded text-[9px] font-mono border ${
                                  isSelected 
                                    ? "bg-white/10 text-white border-white/20" 
                                    : "bg-zinc-900 text-zinc-500 border-transparent"
                                }`}>
                                  AUTONOMY: {agent.stats.autonomy}
                                </div>
                              </div>

                              <p className="text-xs text-zinc-400 leading-relaxed pl-1">
                                {agent.description}
                              </p>

                              {/* Mini metrics bar */}
                              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-400">
                                <div>
                                  <div className="text-zinc-600 text-[9px]">SPEED</div>
                                  <div className="text-white hover:text-cyan-400 transition-colors">{agent.stats.speed}</div>
                                </div>
                                <div>
                                  <div className="text-zinc-600 text-[9px]">REASONING</div>
                                  <div className="text-white hover:text-cyan-400 transition-colors">{agent.stats.reasoning}</div>
                                </div>
                                <div>
                                  <div className="text-zinc-600 text-[9px]">LOAD</div>
                                  <div className="text-white hover:text-cyan-400 transition-colors">{agent.stats.load}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-zinc-600 text-[9px]">STATUS</div>
                                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Technical specifications bento item */}
                      <div className="glass p-5 rounded-xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-cyan-400 animate-pulse" />
                          <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                            Swarm Capabilities Grid
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedAgent.capabilities.map((c, i) => (
                            <span 
                              key={i} 
                              className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-zinc-300"
                            >
                              #{c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Sandbox Chat frame */}
                    <div className="lg:col-span-7 flex flex-col h-[550px] glass rounded-xl border border-white/10 relative overflow-hidden">
                      
                      {/* Active Agent Chat Header */}
                      <div className={`p-4 border-b border-white/5 flex items-center justify-between bg-zinc-950/80`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping`} />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-display font-bold text-white uppercase tracking-wide">
                                Sandbox: {selectedAgent.name}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-500">
                                active_instance_v12
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Reset indicator */}
                        <button
                          onClick={() => {
                            setChatHistory(prev => ({
                              ...prev,
                              [selectedAgentId]: [
                                {
                                  id: `reset-${Date.now()}`,
                                  role: "agent",
                                  text: `Neural logs cleared. I am ${selectedAgent.name}. Ready to process new objectives.`,
                                  timestamp: "Now"
                                }
                              ]
                            }));
                          }}
                          className="p-1 px-2.5 rounded-md hover:bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" /> Clear Matrix
                        </button>
                      </div>

                      {/* Chat Messages Log */}
                      <div 
                        ref={scrollRef}
                        className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 bg-zinc-950/20"
                      >
                        {chatHistory[selectedAgentId]?.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`max-w-[85%] flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                              
                              {/* Avatar item */}
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs font-mono ${
                                msg.role === "user" 
                                  ? "bg-zinc-800 border-zinc-700 text-zinc-300"
                                  : "bg-zinc-950 border-cyan-500/20 text-cyan-400"
                              }`}>
                                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                              </div>

                              {/* Message bubble */}
                              <div className={`p-3.5 rounded-xl text-xs leading-relaxed space-y-1 relative ${
                                msg.role === "user"
                                  ? "bg-zinc-900 border border-white/5 text-zinc-200"
                                  : "bg-zinc-950/60 border border-cyan-500/10 text-zinc-100 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                              }`}>
                                <div className="whitespace-pre-line font-sans prose prose-invert prose-xs">
                                  {msg.text}
                                </div>
                                <div className="text-[9px] font-mono text-zinc-600 text-right">
                                  {msg.timestamp}
                                </div>
                              </div>

                            </div>
                          </div>
                        ))}

                        {/* Sending state typing bubble spinner */}
                        {isSending && (
                          <div className="flex justify-start">
                            <div className="flex gap-2.5 max-w-[80%] items-center">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-zinc-950 border-cyan-500/20 text-cyan-400 shrink-0">
                                <Bot className="w-4 h-4 animate-spin" />
                              </div>
                              <div className="p-3.5 rounded-xl text-xs bg-zinc-950/60 border border-cyan-500/10 text-zinc-400">
                                <span className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                                  <span>Agent compiling context...</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chat Input form */}
                      <form 
                        onSubmit={handleSendMessage}
                        className="p-4 bg-zinc-950/80 border-t border-white/5 flex gap-3 items-center"
                      >
                        <input
                          id="input-playground"
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder={`Instruct ${selectedAgent.name} (e.g. 'Code a webhook validator' or 'Design our brand tone')`}
                          className="flex-grow bg-zinc-900 hover:bg-zinc-900/80 focus:bg-zinc-950 border border-white/5 focus:border-cyan-500/30 rounded-xl px-4 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
                          disabled={isSending}
                        />
                        <button
                          id="btn-send-play"
                          type="submit"
                          className="p-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:bg-zinc-800 disabled:text-zinc-600 font-bold transition-all text-[#030303] flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:shadow-none shrink-0 cursor-pointer"
                          disabled={!userInput.trim() || isSending}
                        >
                          <SendHorizontal className="w-4 h-4" />
                        </button>
                      </form>

                    </div>

                  </motion.div>
                )}

                {/* 2. SWARM ORCHESTRATOR SIMULATOR */}
                {activeTab === "swarm" && (
                  <motion.div
                    key="swarm-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    
                    {/* Goal Intake Banner */}
                    <div className="glass p-6 rounded-xl border border-white/10 flex flex-col md:flex-row gap-6 justify-between items-center bg-zinc-950/50">
                      <div className="space-y-2 w-full md:max-w-2xl">
                        <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5" /> Swarm Automation Sandbox
                        </span>
                        <h3 className="text-lg font-display text-white">
                          Test Multi-Agent Collaboration Consensuses
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Configure a core business goal. Trigger the simulation to watch Souly orchestrators map variables, delegate logic tasks, and resolve multi-agent deadlocks.
                        </p>
                      </div>
                      <div className="w-full md:w-auto shrink-0">
                        {simulateState === "idle" ? (
                          <button
                            id="btn-trigger-swarm"
                            onClick={triggerSwarmSimulation}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-display font-medium text-xs tracking-wider text-black bg-purple-400 hover:bg-purple-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
                          >
                            RUN SWARM SIMULATION <PlayIcon />
                          </button>
                        ) : (
                          <button
                            id="btn-reset-swarm"
                            onClick={resetSwarmSimulation}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-display font-medium text-xs tracking-wider text-white bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            RESET MATRIX <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Interactive Node Map Canvas */}
                    <div className="relative glass p-6 rounded-2xl border border-white/5 h-[400px] flex items-center justify-center overflow-hidden bg-zinc-950/20">
                      
                      {/* Connection wires using SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        {/* Define glowing particle linear gradients */}
                        <defs>
                          <linearGradient id="cyan-to-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                          <linearGradient id="purple-to-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                          <linearGradient id="cyan-to-emerald" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>

                        {/* Static connection mesh lines */}
                        <line x1="50%" y1="15%" x2="20%" y2="50%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                        <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="50%" y1="15%" x2="80%" y2="50%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />

                        <line x1="20%" y1="50%" x2="50%" y2="85%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                        <line x1="80%" y1="50%" x2="50%" y2="85%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" strokeDasharray="4 4" />

                        {/* Animated Pulses on Simulation */}
                        {simulateState === "routing" && (
                          <>
                            <path d="M 500,60 L 200,200" stroke="url(#cyan-to-purple)" strokeWidth="3" className="animated-wire opacity-70" strokeDasharray="10 150" />
                            <path d="M 500,60 L 800,200" stroke="url(#cyan-to-purple)" strokeWidth="3" className="animated-wire opacity-70" strokeDasharray="20 180" />
                          </>
                        )}
                        {simulateState === "synthesizing" && (
                          <>
                            <path d="M 200,200 L 500,340" stroke="url(#purple-to-emerald)" strokeWidth="3" className="animated-wire opacity-70" strokeDasharray="15 120" />
                            <path d="M 800,200 L 500,340" stroke="url(#purple-to-emerald)" strokeWidth="3" className="animated-wire opacity-70" strokeDasharray="10 130" />
                            <path d="M 500,200 L 500,340" stroke="url(#purple-to-emerald)" strokeWidth="3" className="animated-wire opacity-70" strokeDasharray="25 150" />
                          </>
                        )}
                      </svg>

                      {/* Top Node: Swarm Planner */}
                      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                        <div className={`p-3 rounded-full bg-zinc-950 border flex items-center justify-center transition-all ${
                          simulateState === "planning"
                            ? "border-cyan-400 neon-border-cyan scale-110"
                            : "border-white/10"
                        }`}>
                          <Sparkles className={`w-5 h-5 ${simulateState === "planning" ? "text-cyan-400" : "text-zinc-500"}`} />
                        </div>
                        <span className="text-[10px] font-mono font-semibold tracking-wider text-zinc-400 mt-2 bg-zinc-950 py-0.5 px-2 rounded-full border border-white/5">
                          Swarm Planner
                        </span>
                      </div>

                      {/* Left Node: Synthetix Agent */}
                      <div className="absolute top-[42%] left-[12%] sm:left-[18%] flex flex-col items-center z-10">
                        <div className={`p-4 rounded-xl bg-zinc-950 border flex flex-col items-center justify-center w-24 sm:w-28 transition-all ${
                          simulateState === "routing" || simulateState === "synthesizing"
                            ? "border-cyan-500 neon-border-cyan scale-105"
                            : "border-white/10"
                        }`}>
                          <Cpu className={`w-5 h-5 ${simulateState === "synthesizing" ? "text-cyan-400 animate-spin" : "text-zinc-500"}`} />
                          <span className="text-[10px] font-display font-bold text-white mt-1">Synthetix</span>
                          <span className="text-[8px] font-mono text-cyan-400/80">98% Autonomy</span>
                        </div>
                      </div>

                      {/* Center Node: Hesperia Agent */}
                      <div className="absolute top-[42%] left-1/3 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center z-10">
                        <div className={`p-4 rounded-xl bg-zinc-950 border flex flex-col items-center justify-center w-24 sm:w-28 transition-all ${
                          simulateState === "routing" || simulateState === "synthesizing"
                            ? "border-purple-500 neon-border-purple scale-105"
                            : "border-white/10"
                        }`}>
                          <MessageSquare className={`w-5 h-5 ${simulateState === "synthesizing" ? "text-purple-400 animate-bounce" : "text-zinc-500"}`} />
                          <span className="text-[10px] font-display font-bold text-white mt-1">Hesperia</span>
                          <span className="text-[8px] font-mono text-purple-400/80">91% Autonomy</span>
                        </div>
                      </div>

                      {/* Right Node: Axiom Agent */}
                      <div className="absolute top-[42%] right-[12%] sm:right-[18%] flex flex-col items-center z-10">
                        <div className={`p-4 rounded-xl bg-zinc-950 border flex flex-col items-center justify-center w-24 sm:w-28 transition-all ${
                          simulateState === "routing" || simulateState === "synthesizing"
                            ? "border-emerald-500 neon-border-emerald scale-105"
                            : "border-white/10"
                        }`}>
                          <BarChart3 className={`w-5 h-5 ${simulateState === "synthesizing" ? "text-emerald-400 animate-pulse" : "text-zinc-500"}`} />
                          <span className="text-[10px] font-display font-bold text-white mt-1">Axiom</span>
                          <span className="text-[8px] font-mono text-emerald-400/80">94% Autonomy</span>
                        </div>
                      </div>

                      {/* Bottom Node: Consensuses Gateway */}
                      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                        <div className={`p-3 rounded-full bg-zinc-950 border flex items-center justify-center transition-all ${
                          simulateState === "completed"
                            ? "border-emerald-400 neon-border-emerald scale-110"
                            : "border-white/10"
                        }`}>
                          <CheckCircle2 className={`w-5 h-5 ${simulateState === "completed" ? "text-emerald-400" : "text-zinc-500"}`} />
                        </div>
                        <span className="text-[10px] font-mono font-semibold tracking-wider text-zinc-400 mt-2 bg-zinc-950 py-0.5 px-2 rounded-full border border-white/5">
                          Consensus Gateway
                        </span>
                      </div>

                      {/* Status Abstract Overlay */}
                      <div className="absolute right-4 bottom-4 glass p-3 rounded-lg border border-white/5 max-w-[150px] sm:max-w-xs text-[9px] font-mono space-y-1 bg-zinc-950/95">
                        <div className="text-zinc-400 flex items-center gap-1.5 justify-between">
                          <span>STAGE STATUS:</span>
                          <span className="text-cyan-400 font-bold uppercase">{simulateState}</span>
                        </div>
                        <div className="text-zinc-600">
                          Active telemetry linked to SoulyEG.online servers.
                        </div>
                      </div>
                    </div>

                    {/* Simulation Logs Output Terminal */}
                    <div className="bg-zinc-950 border border-white/5 rounded-xl p-5 font-mono text-xs text-zinc-400 space-y-2.5 h-44 overflow-y-auto">
                      <div className="flex justify-between items-center text-[10px] font-semibold text-purple-400 border-b border-white/5 pb-2 mb-2">
                        <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> AGENT ORCHESTRATOR TELEMETRY STREAM</span>
                        <span className="text-[9px] text-zinc-600">[3 NEURAL LINK INSTANCES]</span>
                      </div>
                      {swarmLogs.length === 0 ? (
                        <div className="text-zinc-600 italic text-center py-4">
                          Simulator offline. Configure goal above and click &quot;Run Swarm Simulation&quot;.
                        </div>
                      ) : (
                        swarmLogs.map((log, index) => (
                          <div key={index} className="leading-relaxed whitespace-pre-line border-l-2 border-purple-500/30 pl-3">
                            {log}
                          </div>
                        ))
                      )}
                    </div>

                  </motion.div>
                )}

                {/* 3. TECH EVOLUTION TIMELINE */}
                {activeTab === "evolution" && (
                  <motion.div
                    key="evolution-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 max-w-4xl mx-auto"
                  >
                    <div className="text-center space-y-2 mb-8">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded bg-zinc-900 border border-white/5">
                        Historical Context & Vector
                      </span>
                      <h3 className="text-2xl font-display text-white">
                        The Technological Evolution of AI Orchestration
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-lg mx-auto">
                        Track how artificial intelligence progressed from single prompt interfaces into highly autonomous, self-healing modular agent teams.
                      </p>
                    </div>

                    {/* Timeline items */}
                    <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-[1px] before:bg-white/10">
                      
                      {/* item 1 */}
                      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                        <div className="absolute left-4 sm:left-1/2 -translate-x-[5px] sm:-translate-x-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border border-white/25 z-10 transition-colors group-hover:border-emerald-400" />
                        <div className="w-full sm:w-1/2 sm:text-right pr-0 sm:pr-8 pl-8 sm:pl-0">
                          <span className="text-[10px] font-mono text-zinc-500">PHASE 01 &bull; 2021-2022</span>
                          <h4 className="text-sm font-display font-medium text-white group-hover:text-emerald-400 transition-colors">
                            The Prompt & Static Query Era
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            Interactions were purely transactional. Users input general statements, and models return single output responses. No state memory, tools, or memory access loops existed.
                          </p>
                        </div>
                        <div className="hidden sm:block w-1/2" />
                      </div>

                      {/* item 2 */}
                      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                        <div className="absolute left-4 sm:left-1/2 -translate-x-[5px] sm:-translate-x-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border border-white/25 z-10 transition-colors group-hover:border-emerald-400" />
                        <div className="hidden sm:block w-1/2" />
                        <div className="w-full sm:w-1/2 pl-8 pr-0">
                          <span className="text-[10px] font-mono text-zinc-500">PHASE 02 &bull; 2023-2024</span>
                          <h4 className="text-sm font-display font-medium text-white group-hover:text-emerald-400 transition-colors">
                            RAG, Agents & Chained API tools
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            Discovery of vector indexing and external retrieval (RAG). Development of basic recursive loops like AutoGPT, linking models with internet searches and file directories.
                          </p>
                        </div>
                      </div>

                      {/* item 3 */}
                      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                        <div className="absolute left-4 sm:left-1/2 -translate-x-[5px] sm:-translate-x-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border border-white/25 z-10 transition-colors group-hover:border-emerald-400" />
                        <div className="w-full sm:w-1/2 sm:text-right pr-0 sm:pr-8 pl-8 sm:pl-0">
                          <span className="text-[10px] font-mono text-zinc-500">PHASE 03 &bull; 2025-2026</span>
                          <h4 className="text-sm font-display font-medium text-white group-hover:text-emerald-400 transition-colors">
                            Hierarchical Swarms & Parallel Consensus
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            Agents gain complete modular roles with custom tool access. They run parallel workflows, debate proposed solutions, autocorrect syntax syntax, and utilize consensus verification.
                          </p>
                        </div>
                        <div className="hidden sm:block w-1/2" />
                      </div>

                      {/* item 4 (Souly focus) */}
                      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                        <div className="absolute left-4 sm:left-1/2 -translate-x-[5px] sm:-translate-x-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-emerald-400 neon-border-emerald z-10" />
                        <div className="hidden sm:block w-1/2" />
                        <div className="w-full sm:w-1/2 pl-8 pr-0">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">SOULY LEVEL &bull; NEXT GENERATION</span>
                          <h4 className="text-sm font-display font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                            Autonomous Enterprise Self-Assembly
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            Whole departments running on self-healing, synchronized agent networks hosted securely via SoulyEG.online. Zero infrastructure setup needed for clients—simply provide goals and deploy.
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* 4. CLIENT INQUIRY PORTAL */}
                {activeTab === "portal" && (
                  <motion.div
                    key="portal-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-xl mx-auto"
                  >
                    <div className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden bg-zinc-950/40">
                      
                      {/* Top boundary gradient decoration */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

                      <AnimatePresence mode="wait">
                        {!formSubmitted ? (
                          <motion.form 
                            key="form-inquiry"
                            onSubmit={handlePortalSubmit}
                            className="space-y-6"
                          >
                            <div className="space-y-2 text-center">
                              <span className="text-[9px] font-mono text-pink-400 uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
                                Souly Client Gateway
                              </span>
                              <h3 className="text-xl font-display font-medium text-white">
                                Deploy a Swarm System for Your Enterprise
                              </h3>
                              <p className="text-xs text-zinc-400">
                                Connect with our specialists, and within 24 hours we will outline a custom network architecture configured directly for your business needs.
                              </p>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4 pt-4 text-xs">
                              <div className="space-y-1">
                                <label className="text-zinc-400 font-medium">Your Name</label>
                                <input
                                  id="inquire-name"
                                  type="text"
                                  required
                                  value={inquiryForm.name}
                                  onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                                  placeholder="e.g. Elena Vance"
                                  className="w-full bg-zinc-900 focus:bg-zinc-950 border border-white/5 focus:border-pink-500/30 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none transition-all"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-zinc-400 font-medium">Email Address</label>
                                <input
                                  id="inquire-email"
                                  type="email"
                                  required
                                  value={inquiryForm.email}
                                  onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                                  placeholder="e.g. elena@company.com"
                                  className="w-full bg-zinc-900 focus:bg-zinc-950 border border-white/5 focus:border-pink-500/30 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none transition-all"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-zinc-400 font-medium">Brief Project Goal or Parameter</label>
                                <textarea
                                  id="inquire-project"
                                  rows={3}
                                  required
                                  value={inquiryForm.project}
                                  onChange={(e) => setInquiryForm(prev => ({ ...prev, project: e.target.value }))}
                                  placeholder="e.g. We want to automate our market index harvesting and output copy narratives automatically."
                                  className="w-full bg-zinc-900 focus:bg-zinc-950 border border-white/5 focus:border-pink-500/30 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none transition-all resize-none"
                                />
                              </div>
                            </div>

                            <button
                              id="btn-portal-submit"
                              type="submit"
                              className="w-full py-4 rounded-xl font-display font-medium text-xs tracking-wider text-black bg-pink-400 hover:bg-pink-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_35px_rgba(244,63,94,0.5)] flex items-center justify-center gap-2"
                            >
                              SUBMIT PARAMS TO SOULY EDGE <ArrowRight className="w-4 h-4" />
                            </button>
                          </motion.form>
                        ) : (
                          <motion.div
                            key="form-success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-6 space-y-4"
                          >
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink-950 border border-pink-400/30 text-pink-400 mb-2">
                              <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-display text-white">
                              Form Parameters Synced!
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                              Thank you, <span className="text-pink-400 font-bold">{inquiryForm.name}</span>. The Intake Agency Swarm has mapped your request: &ldquo;{inquiryForm.project}&rdquo;. We will reach out to <span className="text-pink-400 font-bold">{inquiryForm.email}</span> within 24 hours.
                            </p>
                            <div className="pt-4">
                              <button
                                onClick={() => {
                                  setFormSubmitted(false);
                                  setInquiryForm({ name: "", email: "", project: "" });
                                }}
                                className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/15 text-[10px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                              >
                                Submit Another Inquiry
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </main>

            {/* Futuristic Footer Status Bar */}
            <footer className="mt-auto border-t border-white/5 bg-[#050507]/90 backdrop-blur-md py-5 px-6 sm:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">System Nominal</span>
                </div>
                <div className="w-[1px] h-3 bg-white/10 hidden sm:block"></div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold hidden sm:inline">Evolve Protocol v4.0.1</span>
                <span className="text-[10px] text-cyan-400 font-bold hidden md:inline ml-2">SoulyEG.online</span>
              </div>
              <div className="text-[10px] text-white/40 font-mono italic">
                &copy; 2026 SOULY. ALL RIGHTS RESERVED. TECHNOLOGICAL EVOLUTION INTERFACE
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Custom styled pulses inside SVG canvas */
        .animated-wire {
          stroke-dasharray: 20 150;
          animation: flowPulse 3s linear infinite;
        }

        @keyframes flowPulse {
          to {
            stroke-dashoffset: -340;
          }
        }
      `}</style>

    </div>
  );
}

// Visual helpers
function PlayIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
