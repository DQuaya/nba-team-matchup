import React, { useState } from 'react';
import PlayerCarousel from '../PlayersCarousel/PlayerCarousel';
import Players from '../Players/Players';
import './Main.css';


const Main = () => {
  const [teamA, setTeamA] = useState(Array(5).fill(null));
  const [teamB, setTeamB] = useState(Array(5).fill(null));
  const [result, setResult] = useState(null);

  const addToTeam = (teamSetter, team, player) => {
    const idx = team.findIndex((p) => p === null);
    if (idx !== -1) {
      const updated = [...team];
      updated[idx] = player;
      teamSetter(updated);
    }
  };

  const calculateScore = (team) =>
  team.reduce((total, player) => {
    if (!player) return total;
    const points = player.points || 0;
    const rebounds = player.rebounds || 0;
    const assists = player.assists || 0;
    const steals = player.steals || 0;
    const blocks = player.blocks || 0;

    const score =
      points * 0.5 +
      rebounds * 0.2 +
      assists * 0.2 +
      steals * 0.05 +
      blocks * 0.05;

    return total + score;
  }, 0);


  const simulateGame = () => {
    const scoreA = calculateScore(teamA);
    const scoreB = calculateScore(teamB);
    setResult({
      teamAScore: scoreA.toFixed(1),
      teamBScore: scoreB.toFixed(1),
      winner: scoreA === scoreB ? 'Tie' : scoreA > scoreB ? 'Team A' : 'Team B',
    });
  };

  const renderTeamCard = (team, label, bgColor) => (
    <div className="team-container" style={{ backgroundColor: bgColor }}>
      <div className="tm-btn">{label}</div>

      {team.map((player, i) => (
        <div key={i} className="team-box">
          <div className="team-img">
            {player && player.image ? (
              <img src={player.image} alt={player.name} />
            ) : (
              <img src="https://www.citypng.com/public/uploads/preview/download-hd-basketball-ball-png-704081694878797nkckgheyr0.png" alt="Empty Slot" />
            )}
          </div>
          <div className="team-name">{player ? player.name : ''}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="main-container">
      <h1>Matchup</h1>

      <PlayerCarousel
          players={Players}
          addToTeamA={(player) => addToTeam(setTeamA, teamA, player)}
          addToTeamB={(player) => addToTeam(setTeamB, teamB, player)}
          teamAFull={teamA.every((p) => p !== null)}
          teamBFull={teamB.every((p) => p !== null)}
        />

      <div className="teams-wrapper">
<div className="team-section">
  <h2 className="team-label">Team A</h2>
  {renderTeamCard(teamA)} 
</div>

  
  <div className="vs-divider">VS</div>

<div className="team-section">
  <h2 className="team-label">Team B</h2>
  {renderTeamCard(teamB)}
</div>
</div>

      <div className="basketball">
        <div className="ball">
          <div className="lines"></div>
        </div>
        <div className="shadow"></div>
      </div>

      <button onClick={simulateGame}>Predict</button>

      {result && (
        <div className="results">
          <h2>Result</h2>
          <p>Team A: {result.teamAScore}</p>
          <p>Team B: {result.teamBScore}</p>
          <h3>🏆 Winner: {result.winner}</h3>
        </div>
      )}
    </div>
  );
};

export default Main;