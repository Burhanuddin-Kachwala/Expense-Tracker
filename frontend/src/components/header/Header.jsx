import React from 'react'
import { Link } from 'react-router'

function Header() {
return (
    <nav className="navbar">
        <div className="container">
            <div className="logo">
                <h2>Expense Tracker</h2>
            </div>
            <ul className="nav-links">
               <Link to="/about" className='text-blue-500'><li>About</li></Link>
            </ul>
        </div>
    </nav>
)
}

export default Header