import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css";

const NavbarInMobile = () => {
    return (
        <>
            <div className="navbar-mobile flex justify-between items-center">
                <div className="navbar-mobile__logo">
                    <div>
                        <Link to="/">
                            SAFE<span style={{ color: "#e50087" }}>LENS</span>
                        </Link>
                    </div>
                </div>
                <div className="navbar-mobile__menu items text-white pr-10">
                    <ul>
                        <li>
                            <a href="/map">Map</a>
                        </li>
                        <li>
                            <a href="/camera">Camera</a>
                        </li>
                        <li>
                            <a href="/signin">Sign In</a>
                        </li>
                        <li>
                            <a href="/dashboard">Dashboard</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavbarInMobile