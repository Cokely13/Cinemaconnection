import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'



const App = () => {
  return (
    <div className="app-container">
      <div className="title-container">
        <h1 className="title">CinemaConnection!!</h1>
      </div>
      {/* <Navbar /> */}
      <Routes />
    </div>
  );
}

export default App;
