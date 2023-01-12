import React from 'react'
import Exercises from './components/Exercises/Exercises'
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <p>Treningi</p>
          <Link to="/exercise"><button>Click</button></Link>
        </>
      } />
      <Route path="/exercise" element={<Exercises />} />
    </Routes>
  )
}

export default App