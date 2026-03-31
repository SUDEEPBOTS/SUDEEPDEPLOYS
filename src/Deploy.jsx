import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Globe, Terminal, GitCommit, Clock, Server, CheckCircle2, AlertCircle, Loader2, ArrowUpRight, Github } from 'lucide-react';

// FAKE DATA (Baad mein ye tere VPS/Database se aayega)
const mockDeployments = [
  {
    id: 'dep_01',
    name: 'nex-music-bot',
    repo: 'SUDEEPBOTS/nex-music-bot',
    status: 'live', // live, building, failed
    url: 'https://nex-music-bot.onrender.com', // Ya IP address
    ram: '245 MB',
    cpu: '12%',
    commit: 'Fix audio stream bug',
    time: '2 hours ago',
    type: 'Python'
  },
  {
    id: 'dep_02',
    name: 'kaito-portfolio',
    repo: 'SUDEEPBOTS/kaito-portfolio',
    status: 'building',
    url: 'Pending...',
    ram: '1.2 GB (Build)',
    cpu: '85%',
    commit: 'Update React UI',
    time: 'Just now',
    type: 'Node.js'
  },
  {
    id: 'dep_03',
    name: 'anti-spam-system',
    repo: 'SUDEEPBOTS/telegram-shield',
    status: 'failed',
    url: 'N/A',
    ram: '0 MB',
    cpu: '0%',
    commit: 'Add rate limiting',
    time: '1 day ago',
    type: 'Docker'
  }
];

export default function DeployDashboard() {
  const [deployments] = useState(mockDeployments);

  // Status ke hisaab se colors aur icons set karne ka helper
  const getStatusConfig = (status) => {
    switch(status) {
      case 'live': 
        return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: <CheckCircle2 size={16} />, text: 'Live' };
      case 'building': 
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: <Loader2 size={16} className="animate-spin" />, text: 'Building' };
      case 'failed': 
        return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: <AlertCircle size={16} />, text: 'Failed' };
      default: 
        return { color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: <Activity size={16} />, text: 'Unknown' };
    }
  };

  return (
    <div className="min-h-screen bg-[#010101] text-gray-200 font-sans p-6 md:p-12 selection:bg-purple-500/30">
      
      <div className="max-w-6xl mx-auto mt-20 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-4xl font-black text-white flex items-center gap-3 tracking-tighter">
              <Activity className="text-purple-500" size={36} /> 
              DASHBOARD
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-2">Manage your active deployments</p>
          </motion.div>
          
          <motion.button 
            initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            className="bg-white/10 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2"
          >
            <Server size={18} /> New Service
          </motion.button>
        </div>

        {/* Deployments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deployments.map((dep, index) => {
            const status = getStatusConfig(dep.status);
            
            return (
              <motion.div 
                key={dep.id}
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 p-6 rounded-[2rem] shadow-xl group transition-all"
              >
                {/* Card Header (Status & Type) */}
                <div className="flex justify-between items-center mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border ${status.bg} ${status.color} ${status.border}`}>
                    {status.icon} {status.text}
                  </div>
                  <span className="text-xs font-bold text-gray-600 bg-white/5 px-2 py-1 rounded-lg border border-white/5">{dep.type}</span>
                </div>

                {/* Project Name & Repo */}
                <h3 className="text-2xl font-black text-white mb-1 group-hover:text-purple-400 transition-colors cursor-pointer">
                  {dep.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium cursor-pointer hover:text-gray-300">
                  <Github size={14} /> {dep.repo}
                </div>

                {/* Metrics Box (RAM & CPU) */}
                <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Memory</p>
                    <p className="text-sm font-mono text-gray-300">{dep.ram}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">CPU Load</p>
                    <p className="text-sm font-mono text-gray-300">{dep.cpu}</p>
                  </div>
                </div>

                {/* Footer Info (Commit & Time) */}
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
                  <div className="flex items-center gap-1"><GitCommit size={14} /> <span className="truncate w-24">{dep.commit}</span></div>
                  <div className="flex items-center gap-1"><Clock size={14} /> {dep.time}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-white/5 hover:border-white/10">
                    <Terminal size={16} /> Logs
                  </button>
                  <a 
                    href={dep.status === 'live' ? dep.url : '#'} 
                    target="_blank" rel="noreferrer"
                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${dep.status === 'live' ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white border border-purple-500/30' : 'bg-white/5 text-gray-600 cursor-not-allowed'}`}
                  >
                    <Globe size={16} /> Visit
                  </a>
                </div>

              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
          }
      
