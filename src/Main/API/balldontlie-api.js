import axios from 'axios';

const BASE_URL = 'https://www.balldontlie.io/api/v1';

export async function getAllPlayers() {
  let allPlayers = [];
  let page = 1;
  const totalPages = 5; 

  while (page <= totalPages) {
    const res = await axios.get(`${BASE_URL}/players`, {
      params: { page, per_page: 25 }
    });
    allPlayers = allPlayers.concat(res.data.data);
    page++;
  }

  return allPlayers;
}

export async function getPlayerStats(playerId, season = 2023) {
  const res = await axios.get(`${BASE_URL}/season_averages`, {
    params: { season, player_ids: [playerId] }
  });

  return res.data.data[0]; 
}
