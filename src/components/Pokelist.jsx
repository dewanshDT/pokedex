import React from "react";
import Pokebox from "./Pokebox";
import Pagination from "./Pagination";

const Pokelist = ({ Pokemons, nextPage, previousPage, setCurrentPokemon }) => {
  return (
    <div className="pokelist">
      {Pokemons.map((pokemon) => (
        <Pokebox key={Pokemons.indexOf(pokemon)} pokemon={pokemon} setCurrentPokemon={setCurrentPokemon} />
      ))}
    <Pagination
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
};

export default Pokelist;
