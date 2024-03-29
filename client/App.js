import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'

// const App = () => {
//   return (
//     <div style={{ textAlign: "center" }}>
// <div style={{ display: "inline-block", backgroundColor: "#007bff", borderRadius: "10px", padding: "10px 20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "20px", marginTop: "40px", textAlign: "center", marginLeft: "10px", marginRight: "10px" }}>
//   <h1 style={{ fontSize: "3rem", color: "#fff", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "bold", fontFamily: "Arial, sans-serif", margin: "0" }}>Qb Connection</h1>
// </div>
//       {/* <Navbar /> */}
//       <Routes />
//     </div>
//   )
// }

// export default App

const App = () => {
  return (
    <div className="app-container">
      <div className="title-container">
        <h1 className="title">Qb Connection</h1>
      </div>
      {/* <Navbar /> */}
      <Routes />
    </div>
  );
}

export default App;
