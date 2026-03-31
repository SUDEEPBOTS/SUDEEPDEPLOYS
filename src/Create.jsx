import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Box, Terminal, Settings, Plus, Trash2, Rocket, Server } from 'lucide-react';

export default function Create() {
  const [repo, setRepo] = useState('');
  const [branch, setBranch] = useState('main');
  const [runtime, setRuntime] = useState('auto');
  const [buildCmd, setBuildCmd] = useState('');
  const [startCmd, setStartCmd] = useState('');
  const [envVars, setEnvVars] = useState([{ key: '', value: '' }]);

  // Naya Env Variable Add karna
  const addEnvVar = () => setEnvVars([...envVars, { key: '', value: '' }]);
  
  // Env Variable Delete karna
  const removeEnvVar = (index) => setEnvVars(envVars.filter((_, i) => i !== index));

  // Env Variable Update karna
  const updateEnvVar = (index, field, val) => {
    const newVars = [...envVars];
    newVars[index][field] = val;
    setEnvVars(newVars);
  };

  const handleDeploy = (e) => {
    e.preventDefault();
    alert("Deploy logic trigger hoga! Docker container banne jayega ab.");
  };

  return (
    <div className="min-h-screen bg-[#010101] text-gray-200 font-sans p-6 md:p-12 selection:bg-purple-500/30">
      
      <div className="max-w-4xl mx-auto mt-20 relative z-10">
        
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-10">
          <h1 className="text-4xl font-black text-white flex items-center gap-3 tracking-tighter">
            <Server className="text-purple-500" size={36} /> 
            CREATE WEB SERVICE
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-2">Deploy from GitHub repository</p>
        </motion.div>

        <form onSubmit={handleDeploy} className="space-y-8">
          
          {/* 📦 Section 1: Repository Detail */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Github className="text-purple-400" /> Source Code</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">GitHub Repository URL</label>
                <input 
                  type="text" required placeholder="https://github.com/username/repo" value={repo} onChange={(e) => setRepo(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-purple-500 transition-all font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Branch</label>
                <input 
                  type="text" required value={branch} onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-purple-500 transition-all font-mono text-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* ⚙️ Section 2: Build Configuration */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Terminal className="text-purple-400" /> Build Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Runtime Environment</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['auto', 'node', 'python', 'docker'].map((env) => (
                    <div 
                      key={env} onClick={() => setRuntime(env)}
                      className={`cursor-pointer border py-3 px-4 rounded-xl text-center font-bold uppercase tracking-wider text-sm transition-all ${runtime === env ? 'bg-purple-600/20 border-purple-500 text-purple-300' : 'bg-[#050505] border-white/10 text-gray-500 hover:border-white/30'}`}
                    >
                      {env === 'auto' ? 'Auto Detect' : env}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">Auto-detect uses Dockerfile, package.json or requirements.txt</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Build Command</label>
                  <input 
                    type="text" placeholder="e.g. npm install" value={buildCmd} onChange={(e) => setBuildCmd(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-all font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Start Command</label>
                  <input 
                    type="text" placeholder="e.g. npm start" value={startCmd} onChange={(e) => setStartCmd(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-all font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 🔐 Section 3: Environment Variables */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Settings className="text-purple-400" /> Environment Variables</h2>
              <button type="button" onClick={addEnvVar} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all"><Plus size={20} /></button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {envVars.map((env, index) => (
                  <motion.div key={index} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-4 items-center">
                    <input 
                      type="text" placeholder="API_KEY" value={env.key} onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                      className="w-1/3 bg-[#050505] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                    />
                    <span className="text-gray-600 font-bold">=</span>
                    <input 
                      type="text" placeholder="your_secret_value_here" value={env.value} onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                      className="flex-1 bg-[#050505] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                    />
                    <button type="button" onClick={() => removeEnvVar(index)} className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {envVars.length === 0 && <p className="text-gray-500 text-sm italic py-4 text-center border border-dashed border-white/10 rounded-2xl">No environment variables added.</p>}
            </div>
          </motion.div>

          {/* 🚀 Deploy Button */}
          <motion.button 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)] text-lg uppercase tracking-widest hover:scale-[1.02]"
          >
            <Rocket size={24} /> Deploy Service
          </motion.button>

        </form>
      </div>
    </div>
  );
      }
