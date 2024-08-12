import React from 'react';

function Banner({ text, link, timeLeft }) {
  return (
    <div className="banner p-3 mb-3 bg-info text-white text-center rounded">
      <h2>{text}</h2>
      <p>{timeLeft} seconds left</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-2">
          Click here
        </a>
      )}
    </div>
  );
}

export default Banner;
