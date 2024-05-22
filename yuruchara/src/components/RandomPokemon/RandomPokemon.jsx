"use client"

import React, { useEffect, useState } from 'react'
import Type from '../Type/Type'
import styles from "./styles.module.css"
import { getRandomInteger, maxId } from '@/utils/getRandomInteger'
import { pokeClient } from '@/common/apiClient'

const RandomPokemon = () => {
    const [data, setData] = useState({})
    const [type1, setType1] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPokeInfo = async () => {
            const id = getRandomInteger(1, maxId)
            const res = await pokeClient.get(`/pokemon/${id}`)
            console.log(res.data)
            setData(res.data)
            setType1(res.data.type[0])
            setLoading(false)
        }
        getPokeInfo()
    }, [])

    return (
        <div className={`${styles.container} ${styles[type1]}`}>
            {loading && "データを読み込み中......"}
            <h2>{data?.name}</h2>
            <div>{data?.desc}</div>
            <img src={data?.imgUrl} alt="" />
            <div>
                {
                    data?.type?.map((t) => (
                        <Type type={t} />
                    ))
                }
            </div>
        </div>
    )
}

export default RandomPokemon