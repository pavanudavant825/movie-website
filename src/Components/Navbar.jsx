import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
     <input type="checkbox" id="check"/>
     <label htmlFor="check" className="checkbtn"><i className="fas fa-bars"></i></label>
      <h1>Movie Heist</h1>
    </div>
  )
}

export default Navbar