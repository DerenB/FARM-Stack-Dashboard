import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const sidebar = () => {
  return (
    <div>
        <div>
            <NavLink to="/home">
                Home
            </NavLink>
        </div>
        <div>
            <NavLink to="/todo">
                To-Do
            </NavLink>
        </div>
        <div>
            <NavLink to="/calendar">
                Calendar
            </NavLink>
        </div>
    </div>
  )
}

export default sidebar