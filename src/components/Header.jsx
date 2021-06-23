import React from 'react'
import logo from "../favicon_io/android-chrome-192x192.png"
import Search from './Search'

const Header = ({setCurrentPokemon}) => {
    return (
        <header>
            <div>
            <img src={logo} />
            <h1>DEW | Pokédex</h1>
            <Search setCurrentPokemon={setCurrentPokemon} />
            </div>
        </header>
    )
}

export default Header
