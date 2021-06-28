import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Search = ({ setCurrentPokemon }) => {
  const [text, setText] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [searchedPokemons, setSearchedPokemons] = useState([]);

  async function getPokemons() {
    let cancel;
    try {
      const res = await axios({
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        method: "get",
        url: "https://pokeapi.co/api/v2/pokemon",
        params: {
          limit: 2000,
        },
      });
      setPokemons(res.data.results);
    } catch (e) {
      console.error(e);
    }
    cancel();
  }

  useEffect(() => {
    getPokemons();
    let pokeArr = pokemons.filter((pokemon) => {
      return pokemon.name.includes(text.toLowerCase());
    });
    const sortedPokeArr = pokeArr.sort(function (a, b) {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return a.name.length - b.name.length;
    });
    setSearchedPokemons(sortedPokeArr);
  }, [text]);

  function submitHandler(e) {
    e.preventDefault();
    searchedPokemons[0] && setCurrentPokemon(searchedPokemons[0]);
    setText("");
  }

  return (
    <form className="search" onSubmit={(e) => submitHandler(e)}>
      <input
        type="text"
        placeholder="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="48"
          height="48"
          viewBox="0 0 172 172"
        >
          <g fill="none">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#ffffff">
              <path d="M73.45833,21.5c-28.61092,0 -51.95833,23.34743 -51.95833,51.95833c0,28.6109 23.34741,51.95833 51.95833,51.95833c11.72882,0 22.53529,-3.96669 31.24919,-10.56803l33.55876,33.55176c1.79752,1.87223 4.46675,2.62641 6.97825,1.97168c2.5115,-0.65472 4.47282,-2.61605 5.12755,-5.12755c0.65472,-2.5115 -0.09946,-5.18073 -1.97168,-6.97825l-33.55176,-33.55876c6.60135,-8.7139 10.56803,-19.52038 10.56803,-31.24919c0,-28.6109 -23.34741,-51.95833 -51.95833,-51.95833zM73.45833,35.83333c20.86462,0 37.625,16.76039 37.625,37.625c0,10.01796 -3.89127,19.06549 -10.2181,25.7902c-0.61586,0.44585 -1.15686,0.98684 -1.6027,1.6027c-6.72616,6.33487 -15.77907,10.2321 -25.8042,10.2321c-20.86462,0 -37.625,-16.76039 -37.625,-37.625c0,-20.86461 16.76038,-37.625 37.625,-37.625z"></path>
            </g>
          </g>
        </svg>
      </button>
      <div className="search-results">
        {text && (
          <ul>
            {searchedPokemons.map((poke) => (
              <li
                onClick={() => {
                  setCurrentPokemon(poke);
                  setText("");
                }}
              >
                {poke.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default Search;
