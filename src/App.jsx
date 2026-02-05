import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import HustleHub from './pages/HustleHub';
import EnglishGrind from './pages/EnglishGrind';
import StudyMode from './pages/StudyMode';
import Settings from './pages/Settings';

function App() {
  return (
    <GameProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hustle" element={<HustleHub />} />
            <Route path="/english" element={<EnglishGrind />} />
            <Route path="/study" element={<StudyMode />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </GameProvider>
  );
}

export default App;
