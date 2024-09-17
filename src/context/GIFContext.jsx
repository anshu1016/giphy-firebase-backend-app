/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react";

const GIFContext = createContext();

export const GIFContextProvider = ({ children }) => {
  const [word, setWord] = useState("");
  const [gifs, setGifs] = useState("");
  return (
    <GIFContext.Provider
      value={{
        word,
        setWord,
        gifs,
        setGifs,
      }}
    >
      {children}
    </GIFContext.Provider>
  );
};
// props.types.children = React.node.children;
export const useGIF = () => useContext(GIFContext);
