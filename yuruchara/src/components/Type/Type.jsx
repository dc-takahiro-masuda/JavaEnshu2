"use client"

import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"

const Type = ({ type }) => {
    const [typeJa, setTypeJa] = useState("")

    useEffect(() => {
        switch (type) {
            case "normal":
                setTypeJa("ノーマル")
                break
            case "electric":
                setTypeJa("でんき")
                break
            case "water":
                setTypeJa("みず")
                break
            case "grass":
                setTypeJa("くさ")
                break
            case "fire":
                setTypeJa("ほのお")
                break
            case "fighting":
                setTypeJa("かくとう")
                break
            case "bug":
                setTypeJa("むし")
                break
            case "flying":
                setTypeJa("ひこう")
                break
            case "poison":
                setTypeJa("どく")
                break
            case "fairy":
                setTypeJa("フェアリー")
                break
            case "rock":
                setTypeJa("いわ")
                break
            case "steel":
                setTypeJa("はがね")
                break
            case "ghost":
                setTypeJa("ゴースト")
                break
            case "dark":
                setTypeJa("あく")
                break
            case "psychic":
                setTypeJa("エスパー")
                break
            case "ice":
                setTypeJa("こおり")
                break
            case "steal":
                setTypeJa("はがね")
                break
            case "ground":
                setTypeJa("じめん")
                break
            case "dragon":
                setTypeJa("ドラゴン")
                break
        }
    }, [type])

    return (
        <>
            <span key={type} className={`${styles.common} ${styles[type]}`}>
                {typeJa}
            </span>
        </>
    )
}

export default Type