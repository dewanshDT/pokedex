import React from 'react'
import logo from "../favicon_io/android-chrome-192x192.png"

const Header = () => {
    return (
        <header>
            <div>
            <img src={logo} />
            <h1>Pokédex</h1>
            </div>
        </header>
    )
}

export default Header
