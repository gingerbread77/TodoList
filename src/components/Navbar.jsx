import React from 'react'
import './Navbar.css'
import sunny_icon from '../assets/sunny.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={sunny_icon} alt="sunny icon" />
      <h1>My Day</h1>
    </div>
  )
}

export default Navbar