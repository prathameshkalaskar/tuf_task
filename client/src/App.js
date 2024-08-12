import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerText, setBannerText] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        const { text, link, timer, visible } = response.data;
        setBannerText(text);
        setBannerLink(link);
        setTimeLeft(timer);
        setBannerVisible(visible);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setBannerVisible(false);
    }
  }, [timeLeft]);

  return (
    <div className="App container">
      <div className="row">
        <div className="col">
          {bannerVisible && <Banner text={bannerText} link={bannerLink} timeLeft={timeLeft} />}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
