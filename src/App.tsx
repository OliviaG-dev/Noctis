import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NewMoons from './pages/NewMoons/NewMoons';
import FullMoons from './pages/FullMoons/FullMoons';
import PlanetIngress from './pages/PlanetIngress/PlanetIngress';
import Eclipses from './pages/Eclipses/Eclipses';
import PlanetRetrograde from './pages/PlanetRetrograde/PlanetRetrograde';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-moons" element={<NewMoons />} />
        <Route path="/full-moons" element={<FullMoons />} />
        <Route path="/planet-ingress" element={<PlanetIngress />} />
        <Route path="/eclipses" element={<Eclipses />} />
        <Route path="/planet-retrograde" element={<PlanetRetrograde />} />
      </Routes>
    </Router>
  );
};

export default App;
