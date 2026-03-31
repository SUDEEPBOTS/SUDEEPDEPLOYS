import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ghLoading, setGhLoading] = useState(false);

  // Fake login handler (Isko baad mein apne backend se connect kar lena)
  const handleEmailLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login logic yahan aayega bhai!");
    }, 2000);
  };

  const handleGithubLogin = () => {
    setGhLoading(true);
    setTimeout(() => {
      setGhLoading(false);
      alert("GitHub OAuth redirect yahan lagega!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#010101] flex flex-col justify-center items-center p-6 relative overflow-hidden text-gray-200 font-sans selection:bg-purple-500/30">
      
      {/* Background Glow (Tere background theme se match karne ke liye) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Brand Logo */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, type: "spring" }}
        className="mb-8 text-center z-10"
      >
        <div className="flex items-center justify-center gap-2 text-4xl font-black tracking-tighter text-white mb-2">
          <Zap className="text-purple-500 fill-current w-10 h-10" /> NEX<span className="text-purple-600">.</span>
        </div>
        <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">Cloud Deployment Engine</p>
      </motion.div>

      {/* Login Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_0_40px_rgba(168,85,247,0.05)] z-10"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Welcome Back, Hacker</h2>

        {/* GitHub Login (Primary for PaaS) */}
        <button 
          onClick={handleGithubLogin}
          disabled={ghLoading}
          className="w-full bg-white text-black hover:bg-gray-200 disabled:opacity-70 font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg mb-6"
        >
          {ghLoading ? <Loader2 className="animate-spin text-black" size={20} /> : <FaGithub size={22} />}
          {ghLoading ? "Connecting to GitHub..." : "Continue with GitHub"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Or Email</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" size={18} />
              <input 
                type="email" 
                required
                placeholder="admin@nex.network"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-2 mb-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
              <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" size={18} />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition-all font-mono"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600/20 hover:bg-purple-600 border border-purple-500/50 hover:border-purple-500 text-purple-300 hover:text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Initialize Session"}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

      </motion.div>

      {/* Footer link */}
      <p className="mt-8 text-gray-500 text-sm z-10">
        New to NEX? <a href="#" className="text-purple-400 hover:text-purple-300 font-bold ml-1 transition-colors">Request Access</a>
      </p>
    </div>
  );
    }
