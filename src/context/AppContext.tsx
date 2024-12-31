import { createContext, useContext, useState } from "react";
import { Context } from "../types/Context";
import { INFO_BOXES_DATA } from "../constant/infoBox";
import { preset } from "../constant/preset";
import { Vector3 } from "three";

interface AppContextType {
  view: number;
  setView: (view: number) => void;
  fpvScrollProgress: number;
  setFpvScrollProgress: (fpvScrollProgress: number) => void;
  droneScrollProgress: number;
  setDroneScrollProgress: (droneScrollProgress: number) => void;
  gardenScrollProgress: number;
  setGardenScrollProgress: (gardenScrollProgress: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  infoBoxes: typeof INFO_BOXES_DATA;
  tab: number;
  setTab: (tab: number) => void;
  sound: boolean;
  setSound: (sound: boolean) => void;
  preset: preset;
  setPreset: (preset: preset) => void;
  tabView: boolean;
  setTabView: (tabView: boolean) => void;
  selectedBuilding: string | null;
  setSelectedBuilding: (building: string | null) => void;
  cameraPosition: Vector3;
  setCameraPosition: (position: Vector3) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

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
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3());
  

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
    setTabView,
    selectedBuilding,
    setSelectedBuilding,
    cameraPosition,
    setCameraPosition
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export const useStore = () => useContext(AppContext);
