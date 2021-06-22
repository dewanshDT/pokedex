import axios from "axios";
import React, { useEffect, useState } from "react";

const Pokebox = ({ pokemon, setCurrentPokemon }) => {
  const [thumbnail, setThumbnail] = useState();

  useEffect(() => {
    axios.get(pokemon.url).then((res) => {
      setThumbnail(res.data.sprites.front_default);
    });
  }, []);

  return (
    <div className="pokebox" onClick={() => setCurrentPokemon(pokemon)}>
      <img src={thumbnail} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export default Pokebox;
