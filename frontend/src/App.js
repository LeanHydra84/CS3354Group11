import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Main from './Components/Main/Main';
import CreateEvent from './Components/CreateEvent/CreateEvent';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/home" element={<Main />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
