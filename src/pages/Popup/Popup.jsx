import React from 'react';
import { useEffect, useState } from 'react';
import logo from '../../assets/img/robot.png';
import Greetings from '../../containers/Greetings/Greetings';
import Switch from '@mui/material/Switch';
import './Popup.css';

const Popup = () => {
  useEffect(() => {
    chrome.storage.local.get(['enabled'], function (result) {
      if (result?.enabled) setOn(true);
      else setOn(false);
    });
  }, []);
  const [on, setOn] = useState(false);
  const update = (e) => {
    setOn(e.target.checked);
    console.log('update', e.target.checked);
    chrome.storage.local.set({ enabled: e.target.checked });
    // reload the content script to update the page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log('reload page');
      chrome.tabs.reload(tabs[0].id);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ borderRadius: '25px' }}
        />
        <div
          style={{
            margin: '20px 0',
            color: 'black',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>Play weird web</div>
          <Switch onChange={update} checked={on} />
        </div>
      </header>
    </div>
  );
};

export default Popup;
