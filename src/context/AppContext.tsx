import { createContext, useContext, useState } from "react";
import { Context } from "../types/Context";
import { InfoBox } from "../types/InfoBox";
import { InfoBoxesData } from "../components/constant/InfoBox";
import { preset } from "../components/constant/preset";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [sound, setSound] = useState<boolean>(true);
  const [preset, setPreset] = useState<preset>("night");
  const [infoBoxes, setInfoBoxes] = useState<InfoBox[]>(InfoBoxesData as InfoBox[]);

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
    setInfoBoxes,
    tab,
    setTab,
    sound, 
    setSound,
    preset,
    setPreset
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export const useStore = () => useContext(AppContext);
