import React from 'react'
import Exercises from './components/Exercises/Exercises'
import { Route, Routes, Link } from "react-router-dom";
import Trainings from './components/Trainings/Trainings';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Trainings/>} />
      <Route path="/:id" element={<Exercises/>} />
    </Routes>
  )
}

export default App