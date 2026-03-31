import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, HardDrive, DollarSign, Trash2, Ban, Save, Zap, Activity } from 'lucide-react';

// FAKE DATA (Backend se aayega MongoDB ke through)
const mockUsers = [
  { id: 'u_01', name: 'Kaito', email: 'kaito@example.com', balance: 500, servers: 2, status: 'active' },
  { id: 'u_02', name: 'Sasuke', email: 'sasuke@leaf.com', balance: 50, servers: 1, status: 'warning' },
  { id: 'u_03', name: 'SpammerBoy', email: 'spam@bot.com', balance: 0, servers: 0, status: 'banned' },
];

const mockServers = [
  { id: 'srv_99', owner: 'Kaito', name: 'nex-music-bot', ram: '8GB', status: 'Live', node: 'aws-us-east-1' },
  { id: 'srv_88', owner: 'Sasuke', name: 'giveaway-bot', ram: '4GB', status: 'Live', node: 'aws-ap-south-1' },
];

export default function AdminPanel() {
  const [users, setUsers] = useState(mockUsers);
  const [servers, setServers] = useState(mockServers);
  
  // VPS Pricing State
  const [price4GB, setPrice4GB] = useState(100);
  const [price8GB, setPrice8GB] = useState(250);

  // Handlers
  const handleSavePricing = () => {
    alert(`Pricing Updated: 4GB = ₹${price4GB} | 8GB = ₹${price8GB}`);
  };

  const handleBanUser = (id) => {
    alert(`User ${id} suspended! Uske saare servers band ho jayenge.`);
  };

  const handleKillServer = (id) => {
    alert(`Server ${id} killed forcefully. AWS API triggered.`);
  };

  return (
    <div className="min-h-screen bg-[#010101] text-gray-200 font-sans p-6 md:p-12 selection:bg-red-500/30">
      
      {/* Background Danger Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto mt-16 relative z-10">
        
        {/* God Mode Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white flex items-center gap-3 tracking-tighter">
              <ShieldAlert className="text-red-500" size={40} /> 
              GOD MODE
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Superadmin Authorization Active
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="bg-[#050505] border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
              <Users className="text-purple-400" size={24} />
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total Users</p>
                <p className="text-xl font-black text-white">1,204</p>
              </div>
            </div>
            <div className="bg-[#050505] border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
              <Activity className="text-green-400" size={24} />
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Active Nodes</p>
                <p className="text-xl font-black text-white">34</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 💰 PRICING CONTROLS (Left Column) */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="lg:col-span-1 space-y-8">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><DollarSign className="text-green-400" /> Resource Pricing</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                    <span>4GB Instance Price</span>
                    <span className="text-green-400 font-mono">₹{price4GB}/mo</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-black text-xl">₹</span>
                    <input 
                      type="number" value={price4GB} onChange={(e) => setPrice4GB(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-green-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                    <span>8GB Instance Price</span>
                    <span className="text-green-400 font-mono">₹{price8GB}/mo</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-black text-xl">₹</span>
                    <input 
                      type="number" value={price8GB} onChange={(e) => setPrice8GB(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-green-500 font-mono"
                    />
                  </div>
                </div>

                <button onClick={handleSavePricing} className="w-full bg-green-500/10 hover:bg-green-500 border border-green-500/20 hover:border-green-500 text-green-400 hover:text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                  <Save size={18} /> Update Pricing
                </button>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-yellow-500/5 border border-yellow-500/20 p-6 rounded-3xl">
              <h3 className="text-sm font-bold text-yellow-500 mb-2 flex items-center gap-2"><Zap size={16} /> AWS Limit Warning</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">Account Acc_01 is nearing its $100 limit. The fallback script will automatically switch to Acc_02 for new deployments.</p>
            </div>
          </motion.div>

          {/* 👥 USERS & SERVERS MANAGEMENT (Right Column) */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-8">
            
            {/* USERS TABLE */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Users className="text-purple-400" /> User Database</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#050505] text-[10px] text-gray-500 uppercase tracking-widest">
                      <th className="p-4 font-bold">User Info</th>
                      <th className="p-4 font-bold text-center">Wallet</th>
                      <th className="p-4 font-bold text-center">Servers</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </td>
                        <td className="p-4 text-center font-mono text-green-400 font-bold">₹{user.balance}</td>
                        <td className="p-4 text-center font-bold text-gray-300">{user.servers}</td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => handleBanUser(user.id)} className="p-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors" title="Suspend User">
                            <Ban size={16} />
                          </button>
                          <button className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors" title="Delete User">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ACTIVE SERVERS TABLE */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><HardDrive className="text-blue-400" /> Active Infrastructure</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#050505] text-[10px] text-gray-500 uppercase tracking-widest">
                      <th className="p-4 font-bold">Server Name & ID</th>
                      <th className="p-4 font-bold">Owner</th>
                      <th className="p-4 font-bold text-center">Specs</th>
                      <th className="p-4 font-bold text-right">Kill Switch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {servers.map(server => (
                      <tr key={server.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{server.name}</div>
                          <div className="text-xs text-gray-500 font-mono">{server.node}</div>
                        </td>
                        <td className="p-4 text-purple-400 font-bold">{server.owner}</td>
                        <td className="p-4 text-center">
                          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-md text-xs font-black">{server.ram}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleKillServer(server.id)} className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl font-bold text-xs flex items-center justify-end gap-2 ml-auto transition-all">
                            <Trash2 size={14} /> Force Kill
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
      }
                          
