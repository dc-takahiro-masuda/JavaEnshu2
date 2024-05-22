import React from 'react'
import styles from "./styles.module.css"
import RandomPokemon from '../RandomPokemon/RandomPokemon'

const PokemonContainer = () => {
  return (
    <div className={styles.container}>
        <RandomPokemon />
        <RandomPokemon />
        <RandomPokemon />
        <RandomPokemon />
        <RandomPokemon />
    </div>
  )
}

export default PokemonContainer