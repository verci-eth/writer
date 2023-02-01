import { useState } from 'react';
import Image from 'next/image';
import verci from '../assets/verci.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>suh dude</h1>
          </div>
          <div className="header-subtitle">
            <h2>insert your subtitle here</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="start typing here" 
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a className="generate-button" onClick={null}>
              <div className="generate">
                <p>generate</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/verci_eth"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>built by </p>
            <Image src={verci} alt="buildspace logo" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;