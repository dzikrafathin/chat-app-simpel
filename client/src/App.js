import React from "react";
import {
  Routes, 
  Route 
} from 'react-router-dom';
import Masuk from "./views/Masuk";
import Chat from "./views/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Masuk />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
