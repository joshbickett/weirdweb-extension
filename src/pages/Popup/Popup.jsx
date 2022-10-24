import React from 'react';
import logo from '../../assets/img/robot.png';
import Greetings from '../../containers/Greetings/Greetings';
import Switch from '@mui/material/Switch';
import './Popup.css';

const Popup = () => {
  const update = (e) => {
    console.log('update', e.target.checked);
    chrome.storage.local.set({ enabled: e.target.checked });
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
          <div>Make weird</div>
          <Switch onChange={update} />
        </div>
      </header>
    </div>
  );
};

export default Popup;
