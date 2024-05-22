"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { pokeClient } from "@/common/apiClient";
import RandomPokemon from "@/components/RandomPokemon/RandomPokemon";
import PokemonContainer from "@/components/PokemonContainer/PokemonContainer";
import { register } from 'swiper/element/bundle';

function getRandomInteger(min, max) {
  // minからmaxまでの整数を含む範囲の乱数を生成する
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
  const [data1, setData1] = useState({});
  const maxId = 1008;

  useEffect(() => {
    console.log("api test")
    const getPokeInfo = async () => {
      const id1 = getRandomInteger(1, maxId);
      const res = await pokeClient.get(`/pokemon/${id1}`)
      console.log(res.data)
      setData1(res.data)
    }
    getPokeInfo()
    register()
  }, [])

  return (
    <div>
      <div className={styles.upperSlide}>
        <swiper-container
          slides-per-view="4"
          speed="20000"
          loop="true"
          css-mode="true"
          autoplay-delay="0"
          allowTouchMove= "false"
          transition-timing-function="linear"
          autoplay-disable-on-interaction= "false"
        >
          {Array.from({ length: 30 }, (_, index) => (
            <swiper-slide><RandomPokemon key={index} /></swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div>
        <swiper-container
          slides-per-view="4"
          speed="10000"
          loop="true"
          css-mode="true"
          autoplay-delay="0"
          autoplay-reverse-direction="true"
          allow-touch-move= "false"
          transition-timing-function="linear"
          autoplay-disable-on-interaction= "false"
        >
          {Array.from({ length: 30 }, (_, index) => (
            <swiper-slide><RandomPokemon key={index} /></swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  );
}
