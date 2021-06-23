import axios from "axios";
import React, { useEffect, useState } from "react";

const Info = ({ currentPokemon }) => {
  const [pokeData, setPokeData] = useState({ types: [], stats: [] });
  const [thumbnail, setThumbnail] = useState("");

  async function getPokeData() {
    let cancel;
    try {
      const res = await axios({
        method: "GET",
        url: currentPokemon.url,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      setPokeData(res.data);
      setThumbnail(res.data.sprites.other.dream_world.front_default);
    } catch (e) {
      console.error(e);
    }
    cancel();
  }

  useEffect(() => {
    getPokeData();
  }, [currentPokemon]);

  return (
    <div className="info-sec">
      <div className="content">
        <img src={thumbnail} alt="" />
        <h1>{pokeData.name}</h1>
        <ul>
          <li>Height: {pokeData.height * 10}cm</li>
          <li>Weight: {pokeData.weight / 10}kg</li>
        </ul>
        <h3>Type</h3>
        <div className="tag-group">
          {pokeData.types.map((item) => (
            <span className="tag" key={item.slot}>
              {item.type.name}
            </span>
          ))}
        </div>
        <h3>Stats</h3>
        {pokeData.stats.map((stat, indx) => {
          return (
            <p className="stat" key={indx}>
              <span>{stat.stat.name}</span>{" "}
              <span className="progress-bar">
                <span
                  className="progress"
                  style={{ width: `${stat.base_stat}%` }}
                >{stat.base_stat}</span>
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
