import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Saare naye pages .jsx extension ke sath!
import Login from './Login.jsx';
import DeployDashboard from './Deploy.jsx';
import Create from './Create.jsx';
import Logs from './Logs.jsx';
import AdminPanel from './Adminpanel.jsx';
import Background from './components/Background.jsx';

export default function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DeployDashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
