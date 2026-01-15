import React from 'react';
import Header from '../components/Header/Header';
import Calendar from '../components/Calendar/Calendar';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Header />
      <Calendar />
    </div>
  );
};

export default Home;
