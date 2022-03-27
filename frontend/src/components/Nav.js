import React from 'react';
import {
    Link, useNavigate
} from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img
                alt='logo'
                className='logo'
                src='https://cdn-icons-png.flaticon.com/512/2038/2038116.png' />
            {
                auth ?

                    <ul className="nav-ul">
                        <li><Link to="/">Books</Link></li>
                        <li><Link to="/add">Add Books</Link></li>
                        {/* <li><Link to="/update"></Link></li> */}
                        <li><Link to="/profile">Profile</Link></li>
                        <li> <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li> <Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }


        </div>
    )
}

export default Nav;