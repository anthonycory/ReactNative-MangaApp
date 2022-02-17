import React, { useState, useEffect, createContext } from 'react'

export const LikeContext = createContext();

export const LikeConsumer = ({children}) => {

    const [liked, setLiked] = useState([]);

    return (
        <LikeContext.Provider value={{ liked, setLiked}}>
            { children }
        </LikeContext.Provider>
    )
}