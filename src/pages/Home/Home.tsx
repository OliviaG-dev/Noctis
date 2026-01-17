import React from 'react';
import Header from '../../components/Header/Header';
import Calendar from '../../components/Calendar/Calendar';
import EventsList from '../../components/EventsList/EventsList';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div className="home-left">
          <EventsList />
        </div>
        <div className="home-right">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Home;
