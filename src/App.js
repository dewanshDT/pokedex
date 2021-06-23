import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokelist from "./components/Pokelist";
import Info from "./components/Info";
import Header from "./components/Header";

function App() {
  const [Pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState({
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"
  });
  const [currentPageURL, setCurrentPageURL] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [nextPageURL, setNextPageURL] = useState();
  const [previousPageURL, setPreviousPageURL] = useState();
  const [loading, setLoading] = useState(false);

  async function getPokemons() {
    let cancel;
    try {
      const res = await axios({
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        method: "get",
        url: currentPageURL,
        params: {
          limit: 70,
        },
      });
      setPokemons(res.data.results);
      setLoading(false);
      setNextPageURL(res.data.next);
      setPreviousPageURL(res.data.previous);
    } catch (e) {
      console.error(e);
    }
    cancel();
  }

  useEffect(() => {
    setLoading(true);
    getPokemons();
  }, [currentPageURL]);

  function nextPage() {
    setCurrentPageURL(nextPageURL);
  }

  function previousPage() {
    setCurrentPageURL(previousPageURL);
  }

  if (loading) return <h1>🔃 loading....</h1>;

  return (
    <>
      <Header />
      <div className="container">
      <Pokelist
        Pokemons={Pokemons}
        setCurrentPokemon={setCurrentPokemon}
        nextPage={nextPageURL && nextPage}
        previousPage={previousPageURL && previousPage}
      />
      <Info currentPokemon={currentPokemon} />
      </div>
    </>
  );
}

export default App;
