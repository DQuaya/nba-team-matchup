import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './PlayerCarousel.css';
import Players from '../Players/Players';

const PlayerCarousel = ({ addToTeamA, addToTeamB, teamAFull, teamBFull }) => {
  useEffect(() => {
    new Swiper('.mySwiper', {
      spaceBetween: 30,
      grabCursor: true,
      loop: true,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }, []);

  return (
    <section>
      <div className="swiper mySwiper container">
        <div className="swiper-wrapper content">
          {Players.map((player, index) => (
            <div className="swiper-slide card" key={index}>
              <div className="card-content">
                <div className="image">
                  <img src={player.image} alt={player.name} />
                </div>
                <div className="media-icons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-trophy"></i>
                </div>
                <div className="name-position">
                  <span className="name">{player.name}</span>
                  <span className="position">{player.position}</span>
                </div>
                <div className="rating">
                  <ul className="stat-grid">
                    <li>PPG| {player.points}</li>
                    <li>RPG| {player.rebounds}</li>
                    <li>APG| {player.assists}</li>
                    <li>SPG| {player.steals}</li>
                  </ul>
                </div>
                <div className="button">
                  <button className="teamA" onClick={() => !teamAFull && addToTeamA(player)}>Team A</button>
                  <button className="teamB" onClick={() => !teamBFull && addToTeamB(player)}>Team B</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-pagination"></div>
    </section>
  );
};

export default PlayerCarousel;