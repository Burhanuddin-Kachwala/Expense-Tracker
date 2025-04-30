import React from 'react'
import { Link, NavLink } from 'react-router'

function Header() {
return (
    <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">
                    <h2>Expense Tracker</h2>
                </div>
                <ul className="flex space-x-6">
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            isActive ? "text-blue-800 font-bold" : "text-blue-600 hover:text-blue-800"
                        }
                    >
                        <li className="cursor-pointer">About</li>
                    </NavLink>
                    <NavLink 
                        to="/dashboard" 
                        className={({ isActive }) => 
                            isActive ? "text-blue-800 font-bold" : "text-blue-600 hover:text-blue-800"
                        }
                    >
                        <li className="cursor-pointer">Dashboard</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    </nav>
)
}

export default Header