import { createContext, useContext, useEffect, useState } from "react";
import { Context } from "../types/Context";
import { INFO_BOXES_DATA } from "../constant/infoBox";
import { preset } from "../constant/preset";

export const AppContext = createContext<Context>({} as Context);

type ProviderProps = {
  children: React.ReactNode;
};
export const Provider = ({ children }: ProviderProps) => {
  const [view, setView] = useState<number>(1);
  const [fpvScrollProgress, setFpvScrollProgress] = useState<number>(0);
  const [droneScrollProgress, setDroneScrollProgress] = useState<number>(0);
  const [gardenScrollProgress, setGardenScrollProgress] = useState<number>(0);
  const [tab, setTab] = useState<number>(0);
  const [tabView, setTabView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [sound, setSound] = useState<boolean>(true);
  const [preset, setPreset] = useState<preset>("city");
  const infoBoxes = INFO_BOXES_DATA
  

  const store = {
    view,
    setView,
    fpvScrollProgress,
    setFpvScrollProgress,
    droneScrollProgress,
    setDroneScrollProgress,
    gardenScrollProgress,
    setGardenScrollProgress,
    loading, 
    setLoading,
    infoBoxes,
    tab,
    setTab,
    sound, 
    setSound,
    preset,
    setPreset,
    tabView,
    setTabView
  };

  useEffect(() => console.log("ye dekh -> https://fr.tusharr.xyz/"), [])

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export const useStore = () => useContext(AppContext);
