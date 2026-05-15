import { createContext, useContext, useState } from "react";
import { cities } from "./../../data/cities.json";

const Datacontext = createContext();

function ProvideContext({ children }) {
  let [currCities, setcities] = useState(cities);
  let [currCity, setcity] = useState({});
  function handleRemoveCity(c) {
    setcities(currCities.filter((i) => i.id !== c.id));
  }
  return (
    <Datacontext.Provider
      value={{
        currCities,
        currCity,
        setcities,
        setcity,
        handleRemoveCity,
      }}
    >
      {children}
    </Datacontext.Provider>
  );
}

function useData() {
  const context = useContext(Datacontext);
  if (context === undefined) {
    throw new Error("Not able to use outside provider");
  }
  return context;
}

export { ProvideContext, useData };
