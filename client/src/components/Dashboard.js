import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ToggleSwitch.css';

function Dashboard() {
  const [bannerText, setBannerText] = useState("");
  const [timer, setTimer] = useState(0);
  const [bannerLink, setBannerLink] = useState("");
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        const { text, link, timer, visible } = response.data;
        setBannerText(text);
        setBannerLink(link);
        setTimer(timer);
        setBannerVisible(visible);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSave = () => {
    axios.post('http://localhost:5000/api/banner', {
      text: bannerText,
      link: bannerLink,
      timer,
      visible: bannerVisible,
    })
      .then(response => {
        alert("Banner settings saved!");
        window.location.reload(); // Reload the page to display changes immediately
      })
      .catch(error => console.log(error));
  };

  const toggleVisibility = () => {
    setBannerVisible(!bannerVisible);
  };

  return (
    <div className="dashboard p-4 bg-light rounded">
      <h2 className="text-center">Dashboard</h2>
      <form>
        <div className="form-group">
          <label>Banner Text:</label>
          <input
            type="text"
            className="form-control"
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Banner Link:</label>
          <input
            type="text"
            className="form-control"
            value={bannerLink}
            onChange={(e) => setBannerLink(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Banner Timer (seconds):</label>
          <input
            type="number"
            className="form-control"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Banner Visibility:</label>
          <div className="mt-3">
            <input
              type="checkbox"
              id="switch"
              className="checkbox"
              checked={bannerVisible}
              onChange={toggleVisibility}
            />
            <label htmlFor="switch" className="toggle">
              <p> No     Yes</p>
            </label>
          </div>
          <br/>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
