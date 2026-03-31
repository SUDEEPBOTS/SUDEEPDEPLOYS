import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Saare naye pages import kar rahe hain
import Login from './Login';
import DeployDashboard from './Deploy';
import Create from './Create';
import Logs from './Logs';
import AdminPanel from './Adminpanel';
import Background from './components/Background'; // Tera animated background

export default function App() {
  return (
    <Router>
      {/* Background component har page ke peeche chalega */}
      <Background />
      
      {/* Ye Routes decide karenge ki URL ke hisaab se kaunsa page dikhana hai */}
      <Routes>
        {/* Jab koi direct aayega toh pehle Login dikhega */}
        <Route path="/" element={<Login />} />
        
        {/* Baaki saare URLs */}
        <Route path="/dashboard" element={<DeployDashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
