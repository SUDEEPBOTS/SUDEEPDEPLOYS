import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Play, Square, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

// FAKE LOG STREAM (Ye baad mein WebSockets se replace hoga)
const mockLogStream = [
  "System: Provisioning new instance (t3.micro)...",
  "System: Attaching Elastic IP...",
  "Git: Cloning repository SUDEEPBOTS/nex-music-bot...",
  "Git: Resolving delta objects... 100% (34/34), done.",
  "Docker: Building image from Dockerfile...",
  "--> RUN apt-get update && apt-get install -y ffmpeg",
  "--> Fetching dependencies...",
  "--> npm install",
  "added 245 packages, and audited 246 packages in 12s",
  "14 packages are looking for funding",
  "found 0 vulnerabilities",
  "Docker: Build completed successfully. Tagging image...",
  "System: Starting container...",
  "App: > nex-music-bot@1.0.0 start",
  "App: > node index.js",
  "App: [INFO] Bot connected to Telegram servers.",
  "App: [INFO] Listening for commands on Port 8080...",
  "System: ✅ DEPLOYMENT SUCCESSFUL. APPLICATION IS LIVE."
];

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('building'); // building, live, failed
  const logsEndRef = useRef(null);

  // 🚀 LIVE STREAM EFFECT (Simulating WebSocket)
  useEffect(() => {
    let currentIndex = 0;
    setLogs([]); // Reset
    setStatus('building');

    const interval = setInterval(() => {
      if (currentIndex < mockLogStream.length) {
        setLogs((prev) => [...prev, mockLogStream[currentIndex]]);
        
        // Check if last line reached
        if (currentIndex === mockLogStream.length - 1) {
          setStatus('live');
        }
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800); // Har 0.8 second mein naya log aayega

    return () => clearInterval(interval);
  }, []);

  // 📜 AUTO-SCROLL LOGIC (Naya log aate hi neeche scroll karega)
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Copy Logs Handler
  const copyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    alert("Logs copied to clipboard! Hacker alert! 💻");
  };

  return (
    <div className="min-h-screen bg-[#010101] text-gray-200 font-sans p-6 md:p-12 selection:bg-purple-500/30">
      
      <div className="max-w-5xl mx-auto mt-20 relative z-10 flex flex-col h-[80vh]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tighter">
              <Terminal className="text-purple-500" size={32} /> 
              DEPLOYMENT LOGS
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2 flex items-center gap-2">
              Project: <span className="text-purple-400">nex-music-bot</span>
            </p>
          </motion.div>
          
          {/* Status Indicator */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-4">
            {status === 'building' && <div className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border bg-yellow-500/10 text-yellow-400 border-yellow-500/20"><Loader2 size={16} className="animate-spin" /> Building</div>}
            {status === 'live' && <div className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border bg-green-500/10 text-green-400 border-green-500/20"><CheckCircle2 size={16} /> Live</div>}
            
            <button onClick={copyLogs} className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all" title="Copy Logs">
              <Copy size={18} />
            </button>
          </motion.div>
        </div>

        {/* 💻 THE TERMINAL WINDOW */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex-1 bg-[#050505] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
        >
          {/* Terminal Top Bar (Mac OS Style) */}
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <RefreshCw size={12} className={status === 'building' ? "animate-spin" : ""} /> Build Output
            </div>
            <div className="w-12"></div> {/* Spacer for balance */}
          </div>

          {/* Actual Log Stream Area */}
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed tracking-tight">
            {logs.length === 0 ? (
              <div className="text-gray-600 italic">Waiting for connection...</div>
            ) : (
              logs.map((log, index) => {
                // Thoda color coding for hacker feel
                let colorClass = "text-gray-300";
                if (log.includes("System:")) colorClass = "text-blue-400";
                if (log.includes("Docker:")) colorClass = "text-cyan-400";
                if (log.includes("ERROR") || log.includes("failed")) colorClass = "text-red-400 font-bold";
                if (log.includes("SUCCESSFUL") || log.includes("LIVE")) colorClass = "text-green-400 font-bold";
                if (log.startsWith("-->")) colorClass = "text-purple-400";

                return (
                  <div key={index} className={`mb-1 ${colorClass} break-words`}>
                    <span className="text-gray-600 mr-4 select-none">{String(index + 1).padStart(3, '0')}</span>
                    {log}
                  </div>
                );
              })
            )}
            
            {/* Blinking Cursor (Agar build chal raha hai) */}
            {status === 'building' && (
              <div className="mt-2 animate-pulse text-purple-500">_</div>
            )}
            
            {/* Auto-scroll target */}
            <div ref={logsEndRef} />
          </div>
        </motion.div>

        {/* Server Actions (Start/Stop) */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 flex gap-4 justify-end">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all">
            <RefreshCw size={16} /> Restart
          </button>
          <button className="bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all">
            <Square size={16} fill="currentColor" /> Stop Instance
          </button>
        </motion.div>

      </div>
    </div>
  );
                                 }
